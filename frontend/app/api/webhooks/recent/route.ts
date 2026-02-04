import { NextResponse } from "next/server";
import { getRecentWebhooks } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getRecentWebhooks());
}
