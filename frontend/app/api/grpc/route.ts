import { NextRequest, NextResponse } from "next/server";
import { getUsers, getUserById, addUser } from "@/lib/store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { method, message = {} } = body ?? {};
  if (!method) {
    return NextResponse.json({ error: "method required" }, { status: 400 });
  }

  let result: unknown;
  switch (method) {
    case "ListUsers":
      result = { users: getUsers() };
      break;
    case "GetUser": {
      const id = (message as { id?: string }).id;
      result = id ? getUserById(id) ?? { error: "User not found" } : { error: "User not found" };
      break;
    }
    case "CreateUser": {
      const { name, email } = message as { name?: string; email?: string };
      if (!name || !email) {
        return NextResponse.json({ error: "name and email required" }, { status: 400 });
      }
      result = addUser({ name, email });
      break;
    }
    default:
      return NextResponse.json({ error: "Method not found" }, { status: 400 });
  }
  return NextResponse.json(result);
}
