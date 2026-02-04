/**
 * Shared in-memory store for serverless API routes.
 * Uses globalThis so state can persist across invocations in the same instance.
 */

type User = { id: string; name: string; email: string };
type WebhookEntry = { at: string; headers: Record<string, string | undefined>; body: unknown };
type JobEntry = { status: string; createdAt: number; action?: string; payload?: unknown; result?: unknown };

const globalForStore = globalThis as unknown as {
  __store?: {
    users: User[];
    recentWebhooks: WebhookEntry[];
    jobs: Map<string, JobEntry>;
  };
};

if (!globalForStore.__store) {
  globalForStore.__store = {
    users: [
      { id: "1", name: "Alex", email: "alex@example.com" },
      { id: "2", name: "Sam", email: "sam@example.com" },
    ],
    recentWebhooks: [],
    jobs: new Map(),
  };
}

const store = globalForStore.__store;

export function getUsers(): User[] {
  return [...store.users];
}

export function getUserById(id: string): User | null {
  return store.users.find((u) => u.id === id) ?? null;
}

export function addUser(data: { name: string; email: string }): User {
  const id = String(store.users.length + 1);
  const user = { id, ...data };
  store.users.push(user);
  return user;
}

const MAX_RECENT = 20;
export function addWebhook(entry: WebhookEntry): void {
  store.recentWebhooks.unshift(entry);
  if (store.recentWebhooks.length > MAX_RECENT) store.recentWebhooks.pop();
}
export function getRecentWebhooks(): WebhookEntry[] {
  return store.recentWebhooks;
}

const JOB_DELAY_MS = 2000;
export function createJob(action: string, payload: unknown): string {
  const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  store.jobs.set(jobId, { status: "pending", createdAt: Date.now(), action, payload });
  return jobId;
}
export function getJob(jobId: string): JobEntry | null {
  const job = store.jobs.get(jobId);
  if (!job) return null;
  if (job.status === "pending" && Date.now() - job.createdAt >= JOB_DELAY_MS) {
    const result = job.action === "echo" ? { echoed: job.payload } : { done: true, action: job.action, payload: job.payload };
    const completed = { ...job, status: "completed" as const, result };
    store.jobs.set(jobId, completed);
    return completed;
  }
  return job;
}
