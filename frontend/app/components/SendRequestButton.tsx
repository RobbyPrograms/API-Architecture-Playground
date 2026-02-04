"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export function SendRequestButton() {
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(`${API_URL}/api/rest/users`);
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={handleSend}
        disabled={loading}
        className="rounded-lg bg-zinc-900 px-6 py-3 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {loading ? "Sending…" : "Send request"}
      </button>
      {error && (
        <pre className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
          {error}
        </pre>
      )}
      {response !== null && (
        <pre className="rounded-lg bg-zinc-100 p-4 text-sm overflow-auto dark:bg-zinc-800 dark:text-zinc-200">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
