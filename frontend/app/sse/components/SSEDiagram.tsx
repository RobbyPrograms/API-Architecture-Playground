"use client";

import { motion } from "framer-motion";

type SSEDiagramProps = {
  connected: boolean;
  eventCount: number;
};

export function SSEDiagram({ connected, eventCount }: SSEDiagramProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        One-way stream — server → client
      </p>
      <div className="flex items-center justify-center gap-6 sm:gap-12">
        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-lg sm:h-16 sm:w-16 ${
              connected ? "bg-emerald-500 text-white" : "bg-zinc-300 text-zinc-500 dark:bg-zinc-600"
            }`}
          >
            <span className="text-lg font-bold sm:text-xl">S</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Server</span>
        </div>

        <motion.div
          className="flex flex-col items-center"
          animate={eventCount > 0 ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="text-amber-500">
            <path
              d="M0 12h40m0 0l-6-6m6 6l-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-1 text-xs text-zinc-500">events</span>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-lg sm:h-16 sm:w-16 ${
              connected ? "bg-blue-500 text-white" : "bg-zinc-300 text-zinc-500 dark:bg-zinc-600"
            }`}
          >
            <span className="text-lg font-bold sm:text-xl">C</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Client</span>
          {connected && (
            <span className="text-xs text-zinc-500">{eventCount} event(s) received</span>
          )}
        </div>
      </div>
    </div>
  );
}
