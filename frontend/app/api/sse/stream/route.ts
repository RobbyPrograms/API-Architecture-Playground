import { NextResponse } from "next/server";

/**
 * SSE: sends 5 events in one response body (no streaming).
 * Avoids timer/stream issues on serverless where the connection can close early.
 */
export async function GET() {
  const now = new Date().toISOString();
  const body = [1, 2, 3, 4, 5]
    .map((count) => `data: ${JSON.stringify({ event: "tick", count, time: now })}\n\n`)
    .join("");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
