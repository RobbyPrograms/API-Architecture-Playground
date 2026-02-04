import { NextRequest, NextResponse } from "next/server";
import { addWebhook } from "@/lib/store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const entry = {
    at: new Date().toISOString(),
    headers: {
      "content-type": request.headers.get("content-type") ?? undefined,
      "x-request-id": request.headers.get("x-request-id") ?? undefined,
    },
    body,
  };
  addWebhook(entry);
  return NextResponse.json({ received: true, id: entry.at });
}
