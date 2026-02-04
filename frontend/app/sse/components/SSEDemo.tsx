"use client";

import { useState, useRef, useEffect } from "react";
import { SSEDiagram } from "./SSEDiagram";

function getStreamUrl() {
  const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  return `${api}/api/sse/stream`;
}

export function SSEDemo() {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  function connect() {
    if (eventSourceRef.current) return;
    setEvents([]);
    const es = new EventSource(getStreamUrl());
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => setEvents((evts) => [...evts, e.data]);

    es.onerror = () => {
      es.close();
      setConnected(false);
      eventSourceRef.current = null;
    };
  }

  function disconnect() {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
    setConnected(false);
  }

  useEffect(() => () => eventSourceRef.current?.close(), []);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Stream
        </h3>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={connect}
            disabled={connected}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Connect to stream
          </button>
          <button
            type="button"
            onClick={disconnect}
            disabled={!connected}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-600 disabled:opacity-50"
          >
            Disconnect
          </button>
          <span className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-500" : "bg-zinc-400"}`} />
            {connected ? "Receiving events every 2s" : "Disconnected"}
          </span>
        </div>
      </div>

      <SSEDiagram connected={connected} eventCount={events.length} />

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Event log
        </h3>
        <div className="max-h-64 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
          {events.length === 0 ? (
            <p className="text-zinc-500">Connect to the stream to see server-sent events.</p>
          ) : (
            events.map((evt, i) => (
              <div key={i} className="mb-1 text-amber-800 dark:text-amber-200">
                {evt}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
