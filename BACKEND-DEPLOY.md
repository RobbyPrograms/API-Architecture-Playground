# Deploy the backend (free) and connect to your Vercel frontend

You didn’t mess anything up. Your **Vercel frontend is correct.** You’ll add a **separate backend** on a free host, then point the frontend at it with one env var. That’s it.

---

## What you’ll have when done

| Part | Where | Cost |
|------|--------|------|
| **Frontend** | Vercel (already deployed) | Free |
| **Backend** | Render (or another free host) | Free tier |

The backend is the **Express app** in the `backend` folder (REST, GraphQL, WebSocket, SSE, etc.). It runs as a real Node server.

---

## Free backend hosts (no “7 days then $5”)

| Host | Free tier | Notes |
|------|-----------|--------|
| **Render** | 750 hours/month, no credit card | Spins down after ~15 min idle (first request after that may take 30–60s). Good for demos. |
| **Fly.io** | Free allowance (e.g. 3 shared VMs) | Stays on; no spin-down. Slightly more setup. |

This guide uses **Render** (simple and common). You can use Fly.io or another host the same way: deploy the `backend` folder, get a URL, then set that URL in Vercel.

---

## Part 1: Deploy the backend to Render

### 1.1 Sign up and create a Web Service

1. Go to [render.com](https://render.com) and sign up (e.g. with GitHub).
2. **Dashboard** → **New +** → **Web Service**.
3. Connect your **GitHub** account if asked, then select the **API-Architecture-Playground** repo (or your fork).
4. Click **Connect**.

### 1.2 Configure the service

Use these settings:

| Field | Value |
|--------|--------|
| **Name** | e.g. `api-architecture-playground-backend` (any name is fine). |
| **Region** | Pick one close to you. |
| **Branch** | `main` (or your default branch). |
| **Root Directory** | **`backend`** ← important. |
| **Runtime** | **Node**. |
| **Build Command** | `npm install` (or leave default). |
| **Start Command** | `npm start` (or `node index.js`). |
| **Instance Type** | **Free**. |

Do **not** leave Root Directory blank — set it to **`backend`** so Render uses the folder with `package.json` and `index.js`.

### 1.3 Deploy and get the URL

1. Click **Create Web Service**.
2. Wait for the first deploy to finish (a few minutes).
3. At the top you’ll see a URL like `https://api-architecture-playground-backend-xxxx.onrender.com`. **Copy that URL** (no trailing slash). This is your **backend URL**.

### 1.4 Test the backend

Open in a browser:

`https://YOUR-BACKEND-URL/health`

You should see: `{"ok":true,"message":"API is up"}`.

If that works, the backend is live. (REST, GraphQL, WebSocket, etc. are on the same host, e.g. `/api/rest/users`, `/graphql`, `/ws`.)

---

## Part 2: Point the Vercel frontend at the backend

### 2.1 Add the env var in Vercel

1. Go to [vercel.com](https://vercel.com) → your **API-Architecture-Playground** project.
2. Open **Settings** → **Environment Variables**.
3. Add one variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** your Render backend URL, e.g. `https://api-architecture-playground-backend-xxxx.onrender.com` (no trailing slash).
   - **Environment:** leave all checked (Production, Preview, Development) or at least Production.
4. Save.

### 2.2 Redeploy the frontend

1. Go to the **Deployments** tab.
2. Open the **⋯** menu on the latest deployment → **Redeploy** (or push a small commit to trigger a new deploy).
3. Wait for the deploy to finish.

Redeploy is required so the frontend is built with the new `NEXT_PUBLIC_API_URL`.

### 2.3 Verify

1. Open your **Vercel site URL** (e.g. `https://api-architecture-playground-xxx.vercel.app`).
2. Go to the **REST** page and click **Send** — it should hit the **Render** backend and return data.
3. Go to the **WebSocket** page — **Connect** should work now (real WebSocket on the backend).

If REST and WebSocket work, the setup is correct: **Vercel = frontend, Render = backend, and it’s all real.**

---

## Summary

| Step | What you did |
|------|----------------|
| 1 | Deployed frontend to Vercel ✅ (you already did this) |
| 2 | Deployed backend to Render (root directory = `backend`, free instance) |
| 3 | Set `NEXT_PUBLIC_API_URL` in Vercel to the Render URL |
| 4 | Redeployed the frontend on Vercel |

You now have a **real API** on a **real server** (Render), and a **real frontend** on Vercel. Nothing is messed up — you just added a backend and one env var.

---

## Render free tier notes

- **Spins down** after about 15 minutes with no traffic. The first request after that can take 30–60 seconds (cold start); after that it’s fast until it spins down again.
- **750 hours/month** free — more than enough for a portfolio or demo.
- No credit card required for the free tier.

If you want no spin-down, you can use **Fly.io** (or another host) and follow the same idea: deploy the `backend` folder, get the URL, set `NEXT_PUBLIC_API_URL` in Vercel, redeploy.


