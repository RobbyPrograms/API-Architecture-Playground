"use client";

import { useState } from "react";
import { FlowDiagram } from "./FlowDiagram";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const REST_BASE = `${API_URL}/api/rest`;

type RequestRecord = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
};

type ResponseRecord = {
  status: number;
  statusText: string;
  body: unknown;
  timingMs: number;
};

export function RestDemo() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [path, setPath] = useState("/users");
  const [body, setBody] = useState('{"name":"Jordan","email":"jordan@example.com"}');
  const [request, setRequest] = useState<RequestRecord | null>(null);
  const [response, setResponse] = useState<ResponseRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setRequest(null);
    setResponse(null);
    setIsAnimating(true);

    const url = path.startsWith("http") ? path : `${REST_BASE}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const options: RequestInit = {
      method,
      headers,
    };
    if (method === "POST" && body.trim()) {
      try {
        JSON.parse(body);
      } catch {
        setError("Invalid JSON in body");
        setLoading(false);
        setIsAnimating(false);
        return;
      }
      options.body = body;
    }

    const requestRecord: RequestRecord = {
      method,
      url,
      headers,
      body: method === "POST" ? body : undefined,
    };
    setRequest(requestRecord);

    const start = performance.now();
    try {
      const res = await fetch(url, options);
      const timingMs = Math.round(performance.now() - start);
      const data = await res.json().catch(() => ({}));
      setResponse({
        status: res.status,
        statusText: res.statusText,
        body: data,
        timingMs,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
      setResponse({
        status: 0,
        statusText: "Error",
        body: null,
        timingMs: Math.round(performance.now() - start),
      });
    } finally {
      setLoading(false);
      setTimeout(() => setIsAnimating(false), 1200);
    }
  }

  return (
    <div className="space-y-8">
      {/* Request builder */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Request builder
        </h3>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "GET" | "POST")}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>
          <div className="min-w-[200px] flex-1">
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Path
            </label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/users or /users/1"
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </div>
        {method === "POST" && (
          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Body (JSON)
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* Flow diagram */}
      <FlowDiagram isAnimating={isAnimating} />

      {/* Request / Response viewer */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Request
          </h3>
          {request ? (
            <pre className="max-h-48 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
              {request.method} {request.url}
              {"\n"}
              {Object.entries(request.headers).map(
                ([k, v]) => `${k}: ${v}`
              ).join("\n")}
              {request.body != null && `\n\n${request.body}`}
            </pre>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Send a request to see it here.
            </p>
          )}
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Response
          </h3>
          {response ? (
            <>
              <div className="mb-2 flex items-center gap-2 text-sm">
                <span
                  className={
                    response.status >= 200 && response.status < 300
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }
                >
                  {response.status} {response.statusText}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  · {response.timingMs} ms
                </span>
              </div>
              <pre className="max-h-40 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
                {JSON.stringify(response.body, null, 2)}
              </pre>
            </>
          ) : error ? (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Response will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
