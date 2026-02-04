import { Router } from "express";
import { getUsers } from "../store.js";

const router = Router();

/** GET /api/rest/users — list users (shared data store) */
router.get("/users", (_req, res) => {
  res.json(getUsers());
});

export default router;
