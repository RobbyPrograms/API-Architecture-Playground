import { Router } from "express";
import { getUsers, getUserById, addUser } from "../store.js";

const router = Router();

/** GET /api/rest/users — list users (shared data store) */
router.get("/users", (_req, res) => {
  res.json(getUsers());
});

/** GET /api/rest/users/:id — get one user */
router.get("/users/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

/** POST /api/rest/users — create user */
router.post("/users", (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) {
    return res.status(400).json({ error: "name and email required" });
  }
  const user = addUser({ name, email });
  res.status(201).json(user);
});

export default router;
