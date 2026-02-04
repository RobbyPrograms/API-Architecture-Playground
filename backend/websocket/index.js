import { WebSocketServer } from "ws";

/**
 * Attach WebSocket server to the HTTP server.
 * Path: /ws — clients connect to ws://host:port/ws
 */
export function attachWebSocket(server) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "connected", message: "Welcome to the playground" }));

    ws.on("message", (data) => {
      const text = data.toString();
      try {
        const parsed = JSON.parse(text);
        if (parsed.echo) {
          ws.send(JSON.stringify({ type: "echo", payload: parsed.echo }));
          return;
        }
      } catch {
        // not JSON
      }
      ws.send(JSON.stringify({ type: "echo", payload: text }));
    });

    ws.on("close", () => {});
  });

  return wss;
}
