import express from "express";
import cors from "cors";
import restRouter from "./rest/index.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use("/api/rest", restRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "API is up" });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
