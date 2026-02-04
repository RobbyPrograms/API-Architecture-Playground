# Deploy: API Architecture Playground

Deploy **backend first**, then **frontend**, so you have a backend URL to give the frontend.

---

## Prerequisites

- Code pushed to **GitHub** (this repo).
- Accounts (free): [Railway](https://railway.app), [Vercel](https://vercel.com).

---

## Step 1: Deploy backend (Railway)

1. Go to [railway.app](https://railway.app) and sign in (GitHub is easiest).

2. **New Project** → **Deploy from GitHub repo**.
   - Authorize Railway to access GitHub if asked.
   - Select your **API-Architecture-Playground** repo.

3. Railway may deploy the **root** of the repo. We need only the backend:
   - Open your new **service** (the deployed app).
   - Go to **Settings** (or the service’s **⚙️**).
   - Find **Root Directory** (or **Source**).
   - Set it to: **`backend`**.
   - Save. Railway will redeploy.

4. **Get the public URL:**
   - In the service, open **Settings** → **Networking** / **Public Networking**.
   - Click **Generate Domain** (or use the one given).
   - Copy the URL, e.g. `https://api-architecture-playground-production-xxxx.up.railway.app`.
   - No trailing slash. This is your **backend URL**.

5. (Optional) **Env:** Railway sets `PORT` for you. You don’t need to add it.

6. Wait for the deploy to finish. Test: open `https://YOUR-BACKEND-URL/health` in a browser. You should see `{"ok":true,"message":"API is up"}`.

---

## Step 2: Deploy frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).

2. **Add New** → **Project** → **Import** your **API-Architecture-Playground** repo.

3. **Configure:**
   - **Root Directory:** click **Edit**, set to **`frontend`**, confirm.
   - **Environment Variables:** add one:
     - **Name:** `NEXT_PUBLIC_API_URL`
     - **Value:** your backend URL from Step 1, e.g. `https://api-architecture-playground-production-xxxx.up.railway.app`
   - Leave **Framework Preset** as Next.js.

4. Click **Deploy**. Wait for the build to finish.

5. Open the Vercel URL (e.g. `https://api-architecture-playground-xxx.vercel.app`). The site should load and call your Railway backend (REST, GraphQL, etc. should work).

---

## Step 3: Point frontend at production API

- The frontend uses `NEXT_PUBLIC_API_URL` for all API calls (REST, GraphQL, WebSocket, SSE, etc.).
- You set it in Vercel in Step 2. If you change the backend URL later, update that env var in Vercel and **redeploy** the frontend.

---

## Troubleshooting

- **CORS errors:** The backend uses `cors()` with no origin restriction, so any domain is allowed. If you locked CORS down, ensure your Vercel domain is allowed.
- **WebSocket / SSE:** Railway supports WebSockets. The frontend turns `NEXT_PUBLIC_API_URL` into `wss://...` when needed, so as long as the backend URL is correct, WS and SSE should work.
- **404 on backend:** Confirm **Root Directory** is `backend` on Railway and that the deploy finished.
- **Frontend shows wrong API:** Redeploy the frontend after changing `NEXT_PUBLIC_API_URL` on Vercel.

---

## Summary

| What   | Where   | Root directory | Env / URL |
|--------|--------|----------------|-----------|
| Backend | Railway | `backend`      | (PORT set by Railway) |
| Frontend | Vercel | `frontend`     | `NEXT_PUBLIC_API_URL` = your Railway backend URL |

After this, the playground is live. Add a database next when you’re ready.
