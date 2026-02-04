import { Router } from "express";

const router = Router();

// In-memory log of received webhooks (for demo display)
const recentWebhooks = [];
const MAX_RECENT = 20;

/** POST /api/webhooks/event — receive a webhook (e.g. from another system) */
router.post("/event", (req, res) => {
  const payload = req.body ?? {};
  const entry = {
    at: new Date().toISOString(),
    headers: { "content-type": req.get("content-type"), "x-request-id": req.get("x-request-id") },
    body: payload,
  };
  recentWebhooks.unshift(entry);
  if (recentWebhooks.length > MAX_RECENT) recentWebhooks.pop();
  res.status(200).json({ received: true, id: entry.at });
});

/** GET /api/webhooks/recent — list recently received webhooks (for UI) */
router.get("/recent", (_req, res) => {
  res.json(recentWebhooks);
});

export default router;
