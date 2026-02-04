import { Router } from "express";
import { getUsers, getUserById, addUser } from "../store.js";

const router = Router();

function parseSoapBody(raw) {
  const getTag = (name) => {
    const m = raw.match(new RegExp(`<${name}[^>]*>([^<]*)</${name}>`, "i"));
    return m ? m[1].trim() : null;
  };
  return { getTag };
}

function soapEnvelope(body) {
  return `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>${body}</soap:Body>
</soap:Envelope>`;
}

/** POST /api/soap — SOAP 1.1 over HTTP */
router.post("/", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  const raw = typeof req.body === "string" ? req.body : (req.rawBody ?? "");
  const getTag = parseSoapBody(raw).getTag;

  if (raw.includes("GetUsersRequest") || raw.includes("getUsersRequest")) {
    const users = getUsers();
    const list = users.map((u) => `<user><id>${u.id}</id><name>${u.name}</name><email>${u.email}</email></user>`).join("");
    return res.send(soapEnvelope(`<GetUsersResponse><users>${list}</users></GetUsersResponse>`));
  }

  if (raw.includes("GetUserRequest") || raw.includes("getUserRequest")) {
    const id = getTag("id") || getTag("Id");
    const user = id ? getUserById(id) : null;
    if (!user) return res.status(404).send(soapEnvelope("<Fault><message>User not found</message></Fault>"));
    return res.send(
      soapEnvelope(`<GetUserResponse><user><id>${user.id}</id><name>${user.name}</name><email>${user.email}</email></user></GetUserResponse>`)
    );
  }

  if (raw.includes("CreateUserRequest") || raw.includes("createUserRequest")) {
    const name = getTag("name") || getTag("Name");
    const email = getTag("email") || getTag("Email");
    if (!name || !email) return res.status(400).send(soapEnvelope("<Fault><message>name and email required</message></Fault>"));
    const user = addUser({ name, email });
    return res.status(201).send(
      soapEnvelope(`<CreateUserResponse><user><id>${user.id}</id><name>${user.name}</name><email>${user.email}</email></user></CreateUserResponse>`)
    );
  }

  res.status(400).send(soapEnvelope("<Fault><message>Unknown SOAP action</message></Fault>"));
});

export default router;
