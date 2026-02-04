"use client";

import { useState, useRef, useEffect } from "react";
import { WebSocketDiagram } from "./WebSocketDiagram";

function getWsUrl(): string | null {
  const api = process.env.NEXT_PUBLIC_API_URL ?? "";
  if (!api) return null; // Serverless (Vercel) has no WebSocket support
  return api.replace(/^http/, "ws") + "/ws";
}

export function WebSocketDemo() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<{ type: "send" | "receive"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [lastDirection, setLastDirection] = useState<"send" | "receive" | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const wsUrl = getWsUrl();

  function connect() {
    if (!wsUrl) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setMessages((m) => [...m, { type: "receive", text: "[Connected]" }]);
      setLastDirection("receive");
    };

    ws.onmessage = (event) => {
      setMessages((m) => [...m, { type: "receive", text: event.data }]);
      setLastDirection("receive");
    };

    ws.onclose = () => {
      setConnected(false);
      wsRef.current = null;
      setMessages((m) => [...m, { type: "receive", text: "[Disconnected]" }]);
    };

    ws.onerror = () => {
      setMessages((m) => [...m, { type: "receive", text: "[Error]" }]);
    };
  }

  function disconnect() {
    wsRef.current?.close();
    wsRef.current = null;
    setConnected(false);
  }

  function send() {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const text = input.trim() || JSON.stringify({ echo: "Hello!" });
    wsRef.current.send(text);
    setMessages((m) => [...m, { type: "send", text }]);
    setLastDirection("send");
    setInput("");
  }

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Connection
        </h3>
        {!wsUrl && (
          <p className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
            WebSocket is not available on serverless (Vercel). Run the separate backend locally with <code className="font-mono">NEXT_PUBLIC_API_URL=http://localhost:3001</code> to try it.
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={connect}
            disabled={connected || !wsUrl}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Connect
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
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <WebSocketDiagram connected={connected} lastDirection={lastDirection} />

      {connected && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Send message
          </h3>
          <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
            Send text or JSON like {"{ \"echo\": \"your message\" }"} to get it echoed back.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder='{"echo": "Hello"}'
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={send}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Message log
        </h3>
        <div className="max-h-64 overflow-auto rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
          {messages.length === 0 ? (
            <p className="text-zinc-500">Connect and send messages to see them here.</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-1 ${msg.type === "send" ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}
              >
                {msg.type === "send" ? "→ " : "← "}
                {msg.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
