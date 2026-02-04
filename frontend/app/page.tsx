import { SendRequestButton } from "./components/SendRequestButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          API Architecture Playground
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          One button, one request. Phase 1 — Foundation.
        </p>
        <div className="mt-8">
          <SendRequestButton />
        </div>
      </main>
    </div>
  );
}
