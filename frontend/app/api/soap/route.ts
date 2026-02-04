import { NextRequest, NextResponse } from "next/server";
import { getUsers, getUserById, addUser } from "@/lib/store";

function parseSoapBody(raw: string) {
  const getTag = (name: string) => {
    const m = raw.match(new RegExp(`<${name}[^>]*>([^<]*)</${name}>`, "i"));
    return m ? m[1].trim() : null;
  };
  return { getTag };
}

function soapEnvelope(body: string) {
  return `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>${body}</soap:Body>
</soap:Envelope>`;
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  const getTag = parseSoapBody(raw).getTag;

  if (raw.includes("GetUsersRequest") || raw.includes("getUsersRequest")) {
    const users = getUsers();
    const list = users
      .map((u) => `<user><id>${u.id}</id><name>${u.name}</name><email>${u.email}</email></user>`)
      .join("");
    return new NextResponse(soapEnvelope(`<GetUsersResponse><users>${list}</users></GetUsersResponse>`), {
      headers: { "Content-Type": "application/xml" },
    });
  }

  if (raw.includes("GetUserRequest") || raw.includes("getUserRequest")) {
    const id = getTag("id") || getTag("Id");
    const user = id ? getUserById(id) : null;
    if (!user)
      return new NextResponse(soapEnvelope("<Fault><message>User not found</message></Fault>"), {
        status: 404,
        headers: { "Content-Type": "application/xml" },
      });
    return new NextResponse(
      soapEnvelope(
        `<GetUserResponse><user><id>${user.id}</id><name>${user.name}</name><email>${user.email}</email></user></GetUserResponse>`
      ),
      { status: 200, headers: { "Content-Type": "application/xml" } }
    );
  }

  if (raw.includes("CreateUserRequest") || raw.includes("createUserRequest")) {
    const name = getTag("name") || getTag("Name");
    const email = getTag("email") || getTag("Email");
    if (!name || !email)
      return new NextResponse(soapEnvelope("<Fault><message>name and email required</message></Fault>"), {
        status: 400,
        headers: { "Content-Type": "application/xml" },
      });
    const user = addUser({ name, email });
    return new NextResponse(
      soapEnvelope(
        `<CreateUserResponse><user><id>${user.id}</id><name>${user.name}</name><email>${user.email}</email></user></CreateUserResponse>`
      ),
      { status: 201, headers: { "Content-Type": "application/xml" } }
    );
  }

  return new NextResponse(soapEnvelope("<Fault><message>Unknown SOAP action</message></Fault>"), {
    status: 400,
    headers: { "Content-Type": "application/xml" },
  });
}
