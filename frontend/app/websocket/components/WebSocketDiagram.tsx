"use client";

import { motion } from "framer-motion";

type WebSocketDiagramProps = {
  connected: boolean;
  lastDirection: "send" | "receive" | null;
};

export function WebSocketDiagram({ connected, lastDirection }: WebSocketDiagramProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Persistent connection — bidirectional
      </p>
      <div className="flex items-center justify-center gap-6 sm:gap-12">
        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-lg sm:h-16 sm:w-16 ${
              connected ? "bg-blue-500 text-white" : "bg-zinc-300 text-zinc-500 dark:bg-zinc-600"
            }`}
          >
            <span className="text-lg font-bold sm:text-xl">C</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Client</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={lastDirection === "send" ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" className="text-emerald-500">
              <path d="M0 12h28m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="mt-1 text-xs text-zinc-500">send</span>
          </motion.div>
          <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-600" />
          <motion.div
            animate={lastDirection === "receive" ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none" className="text-amber-500">
              <path d="M36 12H8m0 0l5-5m-5 5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="mt-1 text-xs text-zinc-500">receive</span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-lg sm:h-16 sm:w-16 ${
              connected ? "bg-violet-500 text-white" : "bg-zinc-300 text-zinc-500 dark:bg-zinc-600"
            }`}
          >
            <span className="text-lg font-bold sm:text-xl">S</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Server</span>
        </div>
      </div>
    </div>
  );
}
