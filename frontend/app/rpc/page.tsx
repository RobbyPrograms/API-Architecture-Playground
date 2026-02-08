import { RPCDemo } from "./components/RPCDemo";

export default function RPCPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/3 right-[-200px] h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          RPC API
        </h1>
        <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
          Action-based (JSON-RPC 2.0)
        </p>

        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Why it exists
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Explicit intent (method name instead of HTTP verb + path)</li>
            <li>Less ceremony than REST for internal services</li>
          </ul>
          <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Tradeoffs
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Not resource-oriented; caching is less natural</li>
          </ul>
          <div className="mt-4 rounded-lg bg-zinc-100 p-3 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            POST /api/rpc — body: {"{ \"jsonrpc\": \"2.0\", \"method\": \"...\", \"params\": {}, \"id\": 1 }"}
          </div>
        </div>

        <div className="mt-8">
          <RPCDemo />
        </div>
      </main>
    </div>
  );
}
