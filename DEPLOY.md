# Deploy: API Architecture Playground (Vercel only)

Everything runs on **Vercel** — frontend and API routes (serverless). No separate backend.

---

## Prerequisites

- Code pushed to **GitHub** (this repo).
- Account (free): [Vercel](https://vercel.com).

---

## Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).

2. **Add New** → **Project** → **Import** your **API-Architecture-Playground** repo.

3. **Configure:**
   - **Root Directory:** click **Edit**, set to **`frontend`**, confirm.
   - **Environment Variables:** you can leave empty. The app uses same-origin `/api/*` by default.
   - Leave **Framework Preset** as Next.js.

4. Click **Deploy**. Wait for the build to finish.

5. Open the Vercel URL. REST, GraphQL, RPC, Webhooks, SOAP, gRPC, Events, and SSE all run as serverless API routes on the same domain.

---

## What works on Vercel

| API        | Works | Notes                                      |
|-----------|--------|--------------------------------------------|
| REST      | ✅     | `/api/rest/users` etc.                     |
| GraphQL   | ✅     | `/api/graphql`                             |
| RPC       | ✅     | `/api/rpc`                                 |
| Webhooks  | ✅     | `/api/webhooks/event`, `/api/webhooks/recent` |
| SOAP      | ✅     | `/api/soap`                                |
| gRPC-style| ✅     | `/api/grpc`                                |
| Events    | ✅     | `/api/events/job` (poll for result)       |
| SSE       | ✅     | `/api/sse/stream` (sends 5 events then ends) |
| WebSocket | ❌     | Not supported on serverless; see below    |

---

## WebSocket

WebSocket needs a **long-lived connection**, which serverless doesn’t support. On the deployed site, the WebSocket page shows a notice and the Connect button is disabled.

To try WebSocket locally, run the **separate backend** (the `backend` folder with Node + Express + `ws`) and set:

- **Environment variable:** `NEXT_PUBLIC_API_URL=http://localhost:3001`  
  (and restart the frontend dev server).

---

## Optional: use a separate backend (e.g. Railway)

If you later deploy the `backend` folder (e.g. on Railway) and want the frontend to call it:

1. Deploy the backend and get its URL.
2. In Vercel → your project → **Settings** → **Environment Variables**, add:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** your backend URL (e.g. `https://xxx.railway.app`), no trailing slash.
3. Redeploy the frontend.

Then REST, GraphQL, WebSocket, etc. will use that backend instead of the serverless `/api` routes.

---

## Summary

| Deploy mode   | What you do |
|---------------|-------------|
| **Vercel only** | Root Directory = `frontend`, no env var. All APIs (except WebSocket) work via `/api/*`. |
| **Vercel + Railway** | Deploy backend on Railway, set `NEXT_PUBLIC_API_URL` on Vercel, redeploy. WebSocket works. |

After this, the playground is live. Add a database next when you’re ready.
