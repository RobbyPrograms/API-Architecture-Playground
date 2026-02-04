import { Router } from "express";

const router = Router();

/**
 * GET /api/sse/stream — Server-Sent Events: one-way server → client.
 * Keeps connection open and sends events every 2s (demo).
 */
router.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  let count = 0;
  const interval = setInterval(() => {
    count += 1;
    res.write(`data: ${JSON.stringify({ event: "tick", count, time: new Date().toISOString() })}\n\n`);
  }, 2000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

export default router;
