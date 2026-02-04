import { SSEDemo } from "./components/SSEDemo";

export default function SSEPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Server-Sent Events (SSE)
        </h1>
        <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
          One-way streaming
        </p>

        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Why it exists
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Simpler than WebSockets when you only need server → client</li>
            <li>Uses plain HTTP (no upgrade)</li>
            <li>Auto-reconnect and event IDs built into the spec</li>
          </ul>
          <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Tradeoffs
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>One direction only (no client → server over same connection)</li>
            <li>Often limited to 6 connections per domain (browser)</li>
          </ul>
          <div className="mt-4 rounded-lg bg-zinc-100 p-3 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            GET /api/sse/stream — connection stays open, server pushes events
          </div>
        </div>

        <div className="mt-8">
          <SSEDemo />
        </div>
      </main>
    </div>
  );
}
