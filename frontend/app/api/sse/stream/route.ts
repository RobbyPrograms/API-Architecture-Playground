import { NextResponse } from "next/server";

/**
 * SSE stream. Sends a few events then ends (serverless has time limits).
 */
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ event: "tick", count, time: new Date().toISOString() })}\n\n`)
        );
        if (count >= 5) {
          clearInterval(interval);
          controller.close();
        }
      }, 2000);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
