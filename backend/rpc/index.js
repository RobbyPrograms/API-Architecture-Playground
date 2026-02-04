import { Router } from "express";
import { getUsers, getUserById, addUser } from "../store.js";

const router = Router();

/** POST /api/rpc — JSON-RPC 2.0 style: { "jsonrpc": "2.0", "method": "...", "params": {}, "id": 1 } */
router.post("/", (req, res) => {
  const { jsonrpc, method, params, id } = req.body ?? {};
  if (jsonrpc !== "2.0" || !method || id === undefined) {
    return res.status(400).json({
      jsonrpc: "2.0",
      error: { code: -32600, message: "Invalid Request" },
      id: id ?? null,
    });
  }

  let result;
  try {
    switch (method) {
      case "users.list":
        result = getUsers();
        break;
      case "users.get":
        result = getUserById(params?.id) ?? { error: "User not found" };
        break;
      case "users.create":
        if (!params?.name || !params?.email) {
          return res.json({
            jsonrpc: "2.0",
            error: { code: -32602, message: "name and email required" },
            id,
          });
        }
        result = addUser({ name: params.name, email: params.email });
        break;
      default:
        return res.json({
          jsonrpc: "2.0",
          error: { code: -32601, message: "Method not found" },
          id,
        });
    }
  } catch (err) {
    return res.json({
      jsonrpc: "2.0",
      error: { code: -32603, message: String(err.message) },
      id,
    });
  }

  res.json({ jsonrpc: "2.0", result, id });
});

export default router;
