import { NextRequest, NextResponse } from "next/server";
import { getUsers, addUser } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getUsers());
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { name, email } = body ?? {};
  if (!name || !email) {
    return NextResponse.json({ error: "name and email required" }, { status: 400 });
  }
  const user = addUser({ name, email });
  return NextResponse.json(user, { status: 201 });
}
