"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const WEBHOOK_URL = `${API_URL}/api/webhooks/event`;
const RECENT_URL = `${API_URL}/api/webhooks/recent`;

export function WebhooksDemo() {
  const [payload, setPayload] = useState('{"event": "order.created", "orderId": "ord_123"}');
  const [recent, setRecent] = useState<{ at?: string; body?: unknown }[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSent, setLastSent] = useState<unknown>(null);

  function fetchRecent() {
    fetch(RECENT_URL)
      .then((r) => r.json())
      .then((data: { at?: string; body?: unknown }[]) => setRecent(data))
      .catch(() => {});
  }

  useEffect(() => {
    fetchRecent();
    const t = setInterval(fetchRecent, 3000);
    return () => clearInterval(t);
  }, []);

  async function handleSend() {
    setLoading(true);
    setLastSent(null);
    let body: unknown;
    try {
      body = JSON.parse(payload);
    } catch {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setLastSent({ status: res.status, ...data });
      fetchRecent();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Send a webhook (simulate external system calling us)
        </h3>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading}
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-50"
        >
          {loading ? "Sending…" : "POST to /api/webhooks/event"}
        </button>
        {lastSent != null && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Last response: {JSON.stringify(lastSent)}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Recently received webhooks
        </h3>
        <div className="max-h-64 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
          {recent.length === 0 ? (
            <p className="text-zinc-500">Send a webhook above to see it here.</p>
          ) : (
            recent.map((entry, i) => (
              <div key={i} className="mb-4 border-b border-zinc-300 pb-2 dark:border-zinc-600">
                <span className="text-zinc-500">{entry.at}</span>
                <pre className="mt-1">{JSON.stringify(entry.body, null, 2)}</pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
