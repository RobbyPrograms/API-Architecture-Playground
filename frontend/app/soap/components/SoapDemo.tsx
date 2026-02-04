"use client";

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const SOAP_URL = `${API_URL}/api/soap`;

const GET_USERS = `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUsersRequest/>
  </soap:Body>
</soap:Envelope>`;

const GET_USER = (id: string) => `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUserRequest><id>${id}</id></GetUserRequest>
  </soap:Body>
</soap:Envelope>`;

const CREATE_USER = (name: string, email: string) => `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateUserRequest>
      <name>${name}</name>
      <email>${email}</email>
    </CreateUserRequest>
  </soap:Body>
</soap:Envelope>`;

export function SoapDemo() {
  const [action, setAction] = useState<"getUsers" | "getUser" | "createUser">("getUsers");
  const [id, setId] = useState("1");
  const [name, setName] = useState("Drew");
  const [email, setEmail] = useState("drew@example.com");
  const [body, setBody] = useState(GET_USERS);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (action === "getUsers") setBody(GET_USERS);
    else if (action === "getUser") setBody(GET_USER(id));
    else setBody(CREATE_USER(name, email));
  }, [action, id, name, email]);

  async function handleSend() {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(SOAP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: body,
      });
      const text = await res.text();
      setResponse(text);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          SOAP request
        </h3>
        <div className="mb-4 flex flex-wrap gap-4">
          <button type="button" onClick={() => setAction("getUsers")} className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600">GetUsers</button>
          <button type="button" onClick={() => setAction("getUser")} className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600">GetUser</button>
          <button type="button" onClick={() => setAction("createUser")} className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600">CreateUser</button>
          {action === "getUser" && (
            <input value={id} onChange={(e) => setId(e.target.value)} className="rounded border border-zinc-300 px-2 py-1 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800" placeholder="id" />
          )}
          {action === "createUser" && (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800" placeholder="name" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800" placeholder="email" />
            </>
          )}
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          className="w-full rounded-lg border border-zinc-300 bg-white p-3 font-mono text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading}
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900 disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Response (XML)
        </h3>
        {response != null && (
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-zinc-100 p-4 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
}
