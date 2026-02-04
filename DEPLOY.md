# Deploy — API Architecture Playground

Two ways to run this project:

| Option | Frontend | Backend | WebSocket |
|--------|----------|---------|-----------|
| **A. Vercel only** | Vercel | Vercel (serverless `/api/*`) | No |
| **B. Vercel + Render** | Vercel | Render (Express in `backend/`) | Yes |

Same repo, same frontend. Option B adds a real Node server so WebSocket and long-lived SSE work.

---

## Prerequisites

- Repo pushed to **GitHub**
- Free accounts: [Vercel](https://vercel.com), and for Option B [Render](https://render.com)

---

## Option A — Vercel only (one deploy)

**What you get:** Frontend + API routes on Vercel. No WebSocket.

1. **Import**
   - [vercel.com](https://vercel.com) → **Add New** → **Project** → Import **API-Architecture-Playground**.

2. **Configure**
   - **Root Directory:** `frontend` (required).
   - **Framework:** Next.js (default).
   - **Environment Variables:** none.

3. **Deploy**
   - Click **Deploy**. Use the given URL.

4. **Verify**
   - Open the URL → REST page → **Send** → you should see JSON.
   - Or open `https://YOUR-URL/api/health` → `{"ok":true,"message":"API is up"}`.

---

## Option B — Vercel (frontend) + Render (backend)

**What you get:** Frontend on Vercel, Express backend on Render. All APIs including WebSocket.

### 1. Deploy frontend (Vercel)

Same as Option A: import repo, **Root Directory** = `frontend`, deploy. No env vars yet.

### 2. Deploy backend (Render)

1. [render.com](https://render.com) → **New +** → **Web Service**.
2. Connect GitHub → select **API-Architecture-Playground**.
3. **Settings:**

   | Field | Value |
   |--------|--------|
   | Root Directory | `backend` |
   | Runtime | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |

4. **Create Web Service** → wait for deploy → copy the URL (e.g. `https://your-app.onrender.com`), no trailing slash.

5. **Test:** open `https://YOUR-RENDER-URL/health` → `{"ok":true,"message":"API is up"}`.

### 3. Connect frontend to backend

1. **Vercel** → your project → **Settings** → **Environment Variables**.
2. Add:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** your Render URL (e.g. `https://your-app.onrender.com`).
3. **Deployments** → **⋯** on latest → **Redeploy**.

4. **Verify:** Open your Vercel URL → REST page → **Send** (should hit Render). WebSocket page → **Connect** should work.

---

## APIs (both options)

| API | Path (Vercel) | Path (Render) |
|-----|----------------|----------------|
| REST | `/api/rest/users`, `/api/rest/users/[id]` | Same under your Render URL |
| GraphQL | `/api/graphql` | `/graphql` |
| RPC | `/api/rpc` | `/api/rpc` |
| Webhooks | `/api/webhooks/event`, `/api/webhooks/recent` | Same |
| SOAP | `/api/soap` | Same |
| gRPC-style | `/api/grpc` | Same |
| Events | `/api/events/job`, `/api/events/job/[id]` | Same |
| SSE | `/api/sse/stream` | Same |
| WebSocket | Not available (serverless) | `/ws` |

---

## Troubleshooting

| Issue | Fix |
|--------|-----|
| Build fails / wrong root | Set **Root Directory** to `frontend` (Vercel) or `backend` (Render). |
| API 404 | Check root directory and that deploy finished. Try `/health` or `/api/health`. |
| “Cannot GET /” on Render | Normal. Use `/health` or `/api/rest/users`. Root returns JSON with links. |
| Frontend still uses old API | Set `NEXT_PUBLIC_API_URL` in Vercel and **redeploy** (not just save). |
| Render slow first load | Free tier spins down after ~15 min; first request can take 30–60s. |

---

## Summary

| Option | Vercel | Render | Env var |
|--------|--------|--------|---------|
| **A** | Frontend + API (root: `frontend`) | — | None |
| **B** | Frontend only (root: `frontend`) | Backend (root: `backend`) | `NEXT_PUBLIC_API_URL` = Render URL |

Render free tier: 750 hrs/month, no card; service spins down after idle.
