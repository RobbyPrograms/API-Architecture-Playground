# API Architecture Playground

**A Visual, Interactive Showcase of 9 API Paradigms**

This repository is a full-stack, interactive website that demonstrates nine common API architectures used in real-world systems — not just conceptually, but **live**, with real data flowing back and forth.

The goal is to show **how APIs actually behave**, how clients interact with them, and why one style is chosen over another.

This project is intentionally designed to answer:

> **"Does this developer understand APIs at a systems level?"**

---

## ⚡ Quick start (Phase 1)

1. **Backend** (Terminal 1): `cd backend && npm run dev` → runs at `http://localhost:3001`
2. **Frontend** (Terminal 2): `cd frontend && npm run dev` → runs at `http://localhost:3000`
3. Open `http://localhost:3000`, click **Send request** — you should see the REST users response.

---

## What This Project Is

This is **not** a tutorial repo.  
This is **not** a collection of disconnected demos.

This is:

- **A single website**
- **With a real frontend**
- **Talking to a real backend**
- **Exposing 9 different API styles**
- **While visually showing requests, responses, and data flow**

Think:

> **Postman + DevTools + System Design — in one clean UI**

---

## What the Website Does

The website allows a user to:

1. **Select an API style** (REST, GraphQL, WebSocket, etc.)
2. **Trigger a real request**
3. **See:**
   - The request payload
   - The response payload
   - Headers & metadata
   - Timing
4. **Watch a live animated diagram** showing:
   - `Client → API → Backend`
   - Or async/event-based flows
5. **Read why this API exists** and when it should be used

**Nothing is mocked. Every interaction is real.**

---

## Easiest, Cleanest Tech Stack

This stack is intentionally **simple, beginner-friendly, and interview-safe** — no overengineering.

### Frontend
- **Next.js** (React)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (for animated diagrams)

### Backend
- **Node.js**
- **Express**
- **ws** (WebSockets)
- **Apollo Server** (GraphQL)
- **BullMQ + Redis** (event-based async)
- **Basic in-memory storage** (no DB needed at first)

### Dev Setup
- Single repo
- Single backend
- Single frontend
- Optional Docker later

---

## High-Level Architecture
```
┌──────────────────┐
│     Browser      │
│  Interactive UI  │
└─────────┬────────┘
          │ HTTP / WS / Events
┌─────────▼────────────────────────┐
│        API Showcase Server        │
│ REST • GraphQL • WS • RPC • etc   │
└─────────┬──────────┬─────────────┘
          │          │
┌─────────▼───┐  ┌───▼────────────┐
│ In-Memory   │  │ Event Queue     │
│ Data Store  │  │ (Async APIs)    │
└─────────────┘  └─────────────────┘
```

---

## The 9 API Styles (What's Being Demonstrated)

### 1️RESTful API
**Style:** Resource-based, stateless  
**Used for:** CRUD, public APIs
```
GET    /api/rest/users
POST   /api/rest/users
GET    /api/rest/users/:id
```

**Why it exists**
- Simple
- Universal
- Cache-friendly

**Tradeoff**
- Over-fetching
- Multiple requests

---

### 2️⃣ GraphQL API
**Style:** Client-defined queries  
**Used for:** Complex UIs
```graphql
query {
  users {
    id
    name
  }
}
```

**Why it exists**
- Fetch exactly what you need
- One endpoint

**Tradeoff**
- Caching complexity
- Query abuse risk

---

### WebSocket API
**Style:** Persistent, bi-directional  
**Used for:** Chat, live dashboards
```
Client ⇄ Server (always connected)
```

**Why it exists**
- Real-time communication
- Push-based updates

---

### 4️⃣ Server-Sent Events (SSE)
**Style:** One-way streaming  
**Used for:** Notifications, live feeds
```
GET /api/sse/stream
```

**Why it exists**
- Simpler than WebSockets
- Native HTTP

---

### Webhooks
**Style:** Event callbacks  
**Used for:** System integrations
```
POST /api/webhooks/event
```

**Why it exists**
- No polling
- Event-driven systems

---

### RPC API
**Style:** Action-based  
**Used for:** Internal services
```json
{
  "method": "createUser",
  "params": { "name": "Alex" }
}
```

**Why it exists**
- Explicit intent
- Less ceremony than REST

---

### SOAP API
**Style:** XML + contracts  
**Used for:** Legacy enterprise systems
```xml
<Envelope>
  <CreateUserRequest />
</Envelope>
```

**Why it exists**
- Strict schemas
- Enterprise compatibility

---

### 8️⃣ gRPC API
**Style:** Binary, strongly typed  
**Used for:** Microservices
```
rpc GetUser (Request) returns (Response)
```

**Why it exists**
- Fast
- Strict contracts

---

### 9️⃣ Async / Event-Based API
**Style:** Fire-and-forget  
**Used for:** Decoupled systems
```
Producer → Queue → Consumer
```

**Why it exists**
- Scalability
- Loose coupling

---

## 🎨 Visual Components (Frontend)

Each API page includes:

- **Description panel**
- **Live architecture diagram**
- **Request builder**
- **Raw request / response viewer**
- **Timing & metadata**

When a request is sent:
- Arrows animate
- Nodes highlight
- Async flows show delays

**This is where the "wow" factor lives.**

---

## 🔁 Example Data Flow (REST)

1. User clicks **Send**
2. Frontend builds request
3. Request hits `/api/rest/users`
4. Backend processes and responds
5. UI updates + diagram animates

Same idea applies to all APIs — different mechanics, same visual clarity.

---

## 📂 Repo Structure
```
/api-architecture-playground
  /frontend
  /backend
    /rest
    /graphql
    /websocket
    /sse
    /webhooks
    /rpc
    /soap
    /grpc
    /events
  /docs
```

Each API folder contains:
- Minimal implementation
- Inline comments
- Example payloads

---

## 🛠️ Development Plan (Where to Start)

### Phase 1 — Foundation
- Create Next.js app
- Create Express server
- Add one shared data store
- Wire frontend ↔ backend

**👉 Goal:** One button sends one request successfully

### Phase 2 — REST First
- Build REST API
- Build REST UI page
- Add request/response viewer
- Add diagram animation

**👉 REST becomes the template for everything else**

### Phase 3 — Real-Time APIs
- Add WebSockets
- Add SSE
- Visualize persistent connections

### Phase 4 — Structured APIs
- Add GraphQL
- Add RPC
- Add SOAP

### Phase 5 — Async Systems
- Add event queue
- Show delayed processing
- Visualize async flow

### Phase 6 — Polish
- UI cleanup
- Diagrams
- Copywriting
- Screenshots for README

---

## 🎯 Why This Repo Matters

This project demonstrates:

- **API literacy**
- **System design thinking**
- **Frontend + backend integration**
- **Communication and documentation skill**

It's not about how many frameworks you know — **it's about how you think.**

---

## 🚀 Future Enhancements

- Auth across API styles
- API gateway layer
- Rate limiting
- Docker + CI
- Performance comparisons

---

**Built to showcase real API understanding — not just syntax.**
