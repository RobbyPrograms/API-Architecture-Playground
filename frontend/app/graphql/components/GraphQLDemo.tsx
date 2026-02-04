"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
// Render/Express backend uses /graphql; Vercel serverless uses /api/graphql
const GRAPHQL_URL = API_URL ? `${API_URL}/graphql` : "/api/graphql";

const EXAMPLE_QUERY = `query {
  users {
    id
    name
    email
  }
}`;

const EXAMPLE_MUTATION = `mutation {
  addUser(name: "Casey", email: "casey@example.com") {
    id
    name
    email
  }
}`;

export function GraphQLDemo() {
  const [query, setQuery] = useState(EXAMPLE_QUERY);
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timingMs, setTimingMs] = useState<number | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setResponse(null);
    setTimingMs(null);
    const start = performance.now();
    try {
      const isMutation = query.trim().startsWith("mutation");
      const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setTimingMs(Math.round(performance.now() - start));
      setResponse(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Query / Mutation
        </h3>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={10}
          className="w-full rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          spellCheck={false}
        />
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setQuery(EXAMPLE_QUERY)}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs dark:border-zinc-600"
          >
            Load query
          </button>
          <button
            type="button"
            onClick={() => setQuery(EXAMPLE_MUTATION)}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs dark:border-zinc-600"
          >
            Load mutation
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-50"
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
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {response != null && (
          <pre className="max-h-64 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
