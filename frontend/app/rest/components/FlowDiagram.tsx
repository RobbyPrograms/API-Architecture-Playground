"use client";

import { motion } from "framer-motion";

type FlowDiagramProps = {
  isAnimating: boolean;
};

export function FlowDiagram({ isAnimating }: FlowDiagramProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Request flow
      </p>
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* Client */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={
            isAnimating
              ? { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }
              : {}
          }
          transition={{ duration: 0.4 }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg sm:h-16 sm:w-16">
            <span className="text-lg font-bold sm:text-xl">C</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Client
          </span>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          className="flex flex-col items-center"
          animate={
            isAnimating
              ? { opacity: [0.4, 1, 0.4], x: [0, 4, 0] }
              : { opacity: 0.5 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            className="text-zinc-400 dark:text-zinc-500"
          >
            <path
              d="M0 12h32m0 0l-6-6m6 6l-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-1 text-xs text-zinc-500">request</span>
        </motion.div>

        {/* API */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={
            isAnimating
              ? {
                  scale: [1, 1.08, 1],
                  opacity: [1, 0.95, 1],
                  transition: { delay: 0.3, duration: 0.4 },
                }
              : {}
          }
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg sm:h-16 sm:w-16">
            <span className="text-lg font-bold sm:text-xl">API</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            REST API
          </span>
        </motion.div>

        {/* Arrow 2 */}
        <motion.div
          className="flex flex-col items-center"
          animate={
            isAnimating
              ? { opacity: [0.4, 1, 0.4], x: [0, 4, 0] }
              : { opacity: 0.5 }
          }
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            className="text-zinc-400 dark:text-zinc-500"
          >
            <path
              d="M0 12h32m0 0l-6-6m6 6l-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-1 text-xs text-zinc-500">read/write</span>
        </motion.div>

        {/* Backend */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={
            isAnimating
              ? {
                  scale: [1, 1.05, 1],
                  opacity: [1, 0.9, 1],
                  transition: { delay: 0.6, duration: 0.4 },
                }
              : {}
          }
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg sm:h-16 sm:w-16">
            <span className="text-lg font-bold sm:text-xl">B</span>
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Backend
          </span>
        </motion.div>
      </div>
    </div>
  );
}
