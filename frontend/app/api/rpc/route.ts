import { NextRequest, NextResponse } from "next/server";
import { getUsers, getUserById, addUser } from "@/lib/store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { jsonrpc, method, params, id } = body ?? {};
  if (jsonrpc !== "2.0" || !method || id === undefined) {
    return NextResponse.json({
      jsonrpc: "2.0",
      error: { code: -32600, message: "Invalid Request" },
      id: id ?? null,
    }, { status: 400 });
  }

  let result: unknown;
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
          return NextResponse.json({
            jsonrpc: "2.0",
            error: { code: -32602, message: "name and email required" },
            id,
          });
        }
        result = addUser({ name: params.name, email: params.email });
        break;
      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          error: { code: -32601, message: "Method not found" },
          id,
        });
    }
  } catch (err) {
    return NextResponse.json({
      jsonrpc: "2.0",
      error: { code: -32603, message: String((err as Error).message) },
      id,
    });
  }
  return NextResponse.json({ jsonrpc: "2.0", result, id });
}
