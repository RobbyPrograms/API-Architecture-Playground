import { RestDemo } from "./components/RestDemo";

export default function RestPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          RESTful API
        </h1>
        <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
          Resource-based, stateless
        </p>

        {/* Description panel */}
        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Why it exists
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Simple and universal</li>
            <li>Cache-friendly (GET is idempotent)</li>
            <li>Standard HTTP verbs map to CRUD</li>
          </ul>
          <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Tradeoffs
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Over-fetching (you get the whole resource)</li>
            <li>Multiple requests for related data</li>
          </ul>
          <div className="mt-4 rounded-lg bg-zinc-100 p-3 font-mono text-xs dark:bg-zinc-800 dark:text-zinc-200">
            GET /api/rest/users · POST /api/rest/users · GET /api/rest/users/:id
          </div>
        </div>

        <div className="mt-8">
          <RestDemo />
        </div>
      </main>
    </div>
  );
}
