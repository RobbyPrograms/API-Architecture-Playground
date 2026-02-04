"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const GRPC_URL = `${API_URL}/api/grpc`;

const METHODS = ["ListUsers", "GetUser", "CreateUser"] as const;

export function GrpcDemo() {
  const [method, setMethod] = useState<string>(METHODS[0]);
  const [message, setMessage] = useState('{"id": "1"}');
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [timingMs, setTimingMs] = useState<number | null>(null);

  async function handleSend() {
    setLoading(true);
    setResponse(null);
    setTimingMs(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(message || "{}");
    } catch {
      setResponse({ error: "Invalid JSON in message" });
      setLoading(false);
      return;
    }
    const start = performance.now();
    try {
      const res = await fetch(GRPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, message: parsed }),
      });
      const data = await res.json();
      setTimingMs(Math.round(performance.now() - start));
      setResponse(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          gRPC-style call (demo: JSON over HTTP; real gRPC uses HTTP/2 + protobuf)
        </h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="min-w-[200px] flex-1">
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Message (JSON)</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='{"id": "1"} or {"name": "...", "email": "..."}'
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="self-end rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Response
          {timingMs != null && <span className="ml-2 font-normal text-zinc-500">· {timingMs} ms</span>}
        </h3>
        {response != null && (
          <pre className="max-h-64 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
