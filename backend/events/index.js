import { Router } from "express";

const router = Router();

// In-memory job store (no Redis required for demo)
const jobs = new Map();

function runJob(jobId, action, payload) {
  const delay = 2000;
  setTimeout(() => {
    const result = action === "echo" ? { echoed: payload } : { done: true, action, payload };
    jobs.set(jobId, { status: "completed", result });
  }, delay);
}

/** POST /api/events/job — enqueue a job, return immediately (fire-and-forget style) */
router.post("/job", (req, res) => {
  const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const { action = "echo", payload = "hello" } = req.body ?? {};
  jobs.set(jobId, { status: "pending" });
  runJob(jobId, action, payload);
  res.status(202).json({ jobId, status: "pending", message: "Job queued" });
});

/** GET /api/events/job/:id — poll for job result */
router.get("/job/:id", (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

export default router;
