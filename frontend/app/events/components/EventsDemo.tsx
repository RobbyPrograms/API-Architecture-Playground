"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const JOBS_URL = `${API_URL}/api/events/job`;

export function EventsDemo() {
  const [payload, setPayload] = useState("hello");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);

  async function handleEnqueue() {
    setLoading(true);
    setJobId(null);
    setStatus(null);
    try {
      const res = await fetch(JOBS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "echo", payload }),
      });
      const data = await res.json();
      setJobId(data.jobId);
      setPolling(true);
    } finally {
      setLoading(false);
    }
  }

  async function pollJob() {
    if (!jobId) return;
    try {
      const res = await fetch(`${API_URL}/api/events/job/${jobId}`);
      const data = await res.json();
      setStatus(data);
      if (data.status === "completed") setPolling(false);
    } catch {
      setPolling(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Enqueue job (fire-and-forget)
        </h3>
        <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
          Server returns 202 immediately; job runs in the background (~2s), then you can poll for the result.
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="Payload to echo"
          />
          <button
            type="button"
            onClick={handleEnqueue}
            disabled={loading}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-50"
          >
            {loading ? "Enqueueing…" : "Enqueue job"}
          </button>
        </div>
        {jobId && (
          <p className="mt-2 text-sm font-mono text-zinc-600 dark:text-zinc-400">
            Job ID: {jobId}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Job status / result
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={pollJob}
            disabled={!jobId || !polling}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600 disabled:opacity-50"
          >
            Poll status
          </button>
        </div>
        {status != null && (
          <pre className="mt-4 max-h-48 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            {JSON.stringify(status, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
