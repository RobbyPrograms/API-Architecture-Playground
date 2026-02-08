import { SendRequestButton } from "./components/SendRequestButton";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next"

const apiServices = [
  { name: "REST API", desc: "HTTP · JSON · Stateless" },
  { name: "WebSocket", desc: "Bidirectional · Real-time" },
  { name: "SSE", desc: "Server → Client Streams" },
  { name: "GraphQL", desc: "Flexible Queries · Typed" },
  { name: "RPC", desc: "Procedure Calls · Low Overhead" },
  { name: "Webhooks", desc: "Event Push · External Triggers" },
  { name: "SOAP", desc: "XML · Contract-Driven" },
  { name: "gRPC", desc: "Protobuf · High Performance" },
  { name: "Event Bus", desc: "Async · Event-Driven" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* ===== GLOBAL BACKGROUND GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/3 right-[-200px] h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-20">
        <Analytics />
        {/* ================= HERO ================= */}
        <section className="space-y-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Multi-Protocol API Environment
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3 text-sm">
              <a
                href="https://github.com/RobbyPrograms"
                target="_blank"
                className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-zinc-300 transition hover:border-indigo-500 hover:text-zinc-100"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/robert-rolison-233b69212/"
                target="_blank"
                className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-zinc-300 transition hover:border-indigo-500 hover:text-zinc-100"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            API Architecture
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              Playground
            </span>
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            A hands-on system showcasing{" "}
            <span className="font-medium text-zinc-200">
              REST, real-time, async, and contract-based APIs
            </span>
            . Built to demonstrate when—and why—different communication models
            belong in real systems.
          </p>

          <p className="text-sm text-zinc-500">
            Built by{" "}
            <span className="font-medium text-zinc-300">Robby Rolison</span>
          </p>
        </section>

        {/* ================= SYSTEM STATUS ================= */}
        <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: "Services Online", value: "9 / 9", status: "Operational" },
            { label: "Protocols Supported", value: "8+", status: "Active" },
            { label: "System Model", value: "Hybrid", status: "Scalable" },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="text-sm text-zinc-400">{card.label}</div>
              <div className="mt-2 text-3xl font-semibold">{card.value}</div>
              <div className="mt-1 text-xs text-emerald-400">
                {card.status}
              </div>
            </div>
          ))}
        </section>

        {/* ================= API MAP ================= */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold">System Overview</h2>
          <p className="mt-2 max-w-xl text-zinc-400">
            Each service represents a distinct communication model used in modern
            backend systems—chosen intentionally based on latency, coupling, and
            data flow requirements.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {apiServices.map((api) => (
              <div
                key={api.name}
                className="group relative rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-indigo-500/50"
              >
                <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 blur transition group-hover:opacity-100" />

                <div className="relative">
                  <div className="text-sm text-zinc-400">API Protocol</div>
                  <div className="mt-1 font-medium text-zinc-200">
                    {api.name}
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">
                    {api.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PLAYGROUND ================= */}
        <section className="mt-24 rounded-2xl border border-zinc-800 bg-zinc-900 p-10">
          <h2 className="text-2xl font-semibold">Live Request Playground</h2>
          <p className="mt-2 max-w-xl text-zinc-400">
            Send a real request into the system and observe how different API
            styles respond. No mocks. No shortcuts.
          </p>

          <div className="mt-6">
            <SendRequestButton />
          </div>
        </section>

        <footer className="mt-24 text-xs text-zinc-500">
          Designed to demonstrate system design judgment—not just implementation.
        </footer>
      </main>
    </div>
  );
}
