import { Router } from "express";
import { getUsers, getUserById, addUser } from "../store.js";

const router = Router();

/**
 * POST /api/grpc — gRPC-style RPC over HTTP (demo: JSON instead of protobuf).
 * Body: { "method": "ListUsers" | "GetUser" | "CreateUser", "message": { ... } }
 * Real gRPC uses HTTP/2 + Protocol Buffers; this shows the same request/response shape.
 */
router.post("/", (req, res) => {
  const { method, message = {} } = req.body ?? {};
  if (!method) {
    return res.status(400).json({ error: "method required" });
  }

  let result;
  switch (method) {
    case "ListUsers":
      result = { users: getUsers() };
      break;
    case "GetUser":
      result = getUserById(message.id) ?? { error: "User not found" };
      break;
    case "CreateUser":
      if (!message.name || !message.email) {
        return res.status(400).json({ error: "name and email required" });
      }
      result = addUser({ name: message.name, email: message.email });
      break;
    default:
      return res.status(400).json({ error: "Method not found" });
  }

  res.json(result);
});

export default router;
