import express from "express";
import cors from "cors";
import restRouter from "./rest/index.js";
import sseRouter from "./sse/index.js";
import rpcRouter from "./rpc/index.js";
import webhooksRouter from "./webhooks/index.js";
import soapRouter from "./soap/index.js";
import grpcRouter from "./grpc/index.js";
import eventsRouter from "./events/index.js";
import { graphqlServer, graphqlMiddleware } from "./graphql/index.js";
import { attachWebSocket } from "./websocket/index.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

// Log each request so you can see activity in Render → Logs
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/rest", restRouter);
app.use("/api/sse", sseRouter);
app.use("/api/rpc", rpcRouter);
app.use("/api/webhooks", webhooksRouter);
app.use("/api/soap", express.text({ type: ["application/xml", "text/xml"] }), soapRouter);
app.use("/api/grpc", grpcRouter);
app.use("/api/events", eventsRouter);

app.get("/", (_req, res) => {
  res.json({
    name: "API Architecture Playground",
    message: "Backend is running. Try /health or use the frontend.",
    health: "/health",
    rest: "/api/rest/users",
    graphql: "/graphql",
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "API is up" });
});

async function start() {
  await graphqlServer.start();
  app.use("/graphql", cors(), express.json(), graphqlMiddleware());
  const server = app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
  attachWebSocket(server);
}

start().catch(console.error);
