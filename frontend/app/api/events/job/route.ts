import { NextRequest, NextResponse } from "next/server";
import { createJob } from "@/lib/store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { action = "echo", payload = "hello" } = body ?? {};
  const jobId = createJob(action, payload);
  return NextResponse.json(
    { jobId, status: "pending", message: "Job queued" },
    { status: 202 }
  );
}
