import { SendRequestButton } from "./components/SendRequestButton";
import { Github, Linkedin, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <Terminal size={14} />
            Built & maintained by Robby Rolison
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            API Architecture Playground
          </h1>

          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A live environment showcasing <span className="font-medium text-zinc-900 dark:text-zinc-200">9 production-style APIs</span>,
            designed to demonstrate clean architecture, request flows, and real-world backend patterns.
          </p>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/RobbyPrograms"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              <Github size={16} /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/robert-rolison-233b69212/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: "APIs Built", value: "9" },
            { label: "Architecture Style", value: "REST" },
            { label: "Focus", value: "Scalability & DX" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Playground */}
        <section className="mt-20 rounded-2xl border border-zinc-200 bg-white p-10 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Try a Live Request
          </h2>
          <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
            Fire a real request against the API layer and inspect the response.
            This is the same flow you’d see in production—no mocks.
          </p>

          <div className="mt-6">
            <SendRequestButton />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-sm text-zinc-500 dark:text-zinc-500">
          Built to demonstrate backend fundamentals, not just endpoints.
        </footer>
      </main>
    </div>
  );
}
