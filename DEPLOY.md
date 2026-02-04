# Deploy to Vercel — API Architecture Playground

**Frontend and backend both run on Vercel.** The “backend” is the same Next.js app: API routes under `/api/*` are serverless functions. One deploy, one host, no separate server.

---

## Prerequisites

- This repo pushed to **GitHub**.
- A (free) [Vercel](https://vercel.com) account (sign in with GitHub).

---

## Step 1: Import the project

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New** → **Project**.
3. **Import** the **API-Architecture-Playground** repo (or your fork).
4. If prompted, authorize Vercel to access your GitHub.

---

## Step 2: Configure the project

Before deploying, set:

| Setting | Value | Why |
|--------|--------|-----|
| **Root Directory** | `frontend` | The Next.js app (pages + API routes) lives in the `frontend` folder. |
| **Framework Preset** | Next.js | Leave as auto-detected. |
| **Build Command** | (default) | `next build`. |
| **Output Directory** | (default) | Leave blank. |
| **Environment Variables** | (none required) | The app calls its own `/api/*` on the same domain. |

To set **Root Directory**:

- Click **Edit** next to “Root Directory”.
- Enter **`frontend`** (no leading slash).
- Confirm so the path shows as `frontend`.

Do **not** set Root Directory to the repo root, or the build will fail.

---

## Step 3: Deploy

1. Click **Deploy**.
2. Wait for the build to finish (usually 1–2 minutes).
3. Open the deployment URL (e.g. `https://api-architecture-playground-xxx.vercel.app`).

---

## Step 4: Verify

- **Home:** The playground home page loads.
- **REST:** Open the REST page, click **Send** (e.g. GET `/users`) — you should see JSON.
- **Health:** Open `https://YOUR-DEPLOYMENT-URL/api/health` — should return `{"ok":true,"message":"API is up"}`.

If any of these fail, see **Troubleshooting** below.

---

## How it works (Vercel = frontend + backend)

| Part | Where it runs |
|------|----------------|
| **Frontend** | Vercel (Next.js pages and UI). |
| **Backend / APIs** | Vercel (Next.js API routes in the same app, under `/api/*`). |

There is no separate backend server. The same Vercel deployment serves both the site and the API. The browser calls `/api/rest/users`, `/api/graphql`, etc. on the same domain.

---

## APIs included on Vercel

| API | Path | Notes |
|-----|------|--------|
| REST | `/api/rest/users`, `/api/rest/users/[id]` | GET list, GET one, POST create. |
| GraphQL | `/api/graphql` | POST with `{ "query": "..." }`. |
| RPC | `/api/rpc` | POST JSON-RPC 2.0. |
| Webhooks | `/api/webhooks/event`, `/api/webhooks/recent` | POST to receive, GET to list recent. |
| SOAP | `/api/soap` | POST XML. |
| gRPC-style | `/api/grpc` | POST `{ "method", "message" }`. |
| Events | `/api/events/job`, `/api/events/job/[id]` | POST to enqueue, GET to poll (completes after ~2s). |
| SSE | `/api/sse/stream` | GET; returns 5 events in one response. |

WebSocket is not supported on Vercel serverless; the WebSocket page shows a notice and Connect is disabled on deploy.

---

## Troubleshooting

### Build fails: “Error creating build plan” / wrong root

- Set **Root Directory** to **`frontend`** (not the repo root). Redeploy.

### Build fails: TypeScript or module errors

- Run locally: `cd frontend && npm run build`. Fix any errors, push, then redeploy on Vercel.

### API returns 404

- Confirm Root Directory is `frontend` and the deploy succeeded.
- Try `https://YOUR-URL/api/health`; if that works, other routes are under `/api/...` (e.g. `/api/rest/users`).

### CORS errors

- The app uses same-origin requests (no `NEXT_PUBLIC_API_URL`), so CORS should not be an issue. If you add another frontend or domain, you may need CORS headers on API routes.

### Data resets

- The in-memory store is per serverless instance. For persistent data, add a database and use it in the API routes.

---

## Summary

| Item | Value |
|------|--------|
| **Host** | Vercel only |
| **Frontend** | Vercel (Next.js) |
| **Backend** | Vercel (same app, `/api/*` routes) |
| **Root Directory** | `frontend` |
| **Env vars** | None required |

**Want a separate backend?** To run the Express backend on a free host (e.g. Render) and connect your Vercel frontend, see [BACKEND-DEPLOY.md](./BACKEND-DEPLOY.md).

One deploy to Vercel gives you both the frontend and the backend. Add a database or auth when you’re ready.
