# Helpdesk Client

Frontend for the IT Helpdesk management system, built with React 19, TypeScript, and Vite. Designed for internal employee use.

**API:** [View on Postman](https://ranstack.postman.co/workspace/Personal~a161c18a-46cb-43a7-9866-eca9e1d1d19d/collection/10256898-3098bfb3-d3fd-4e97-8939-23523608d0ea?action=share&source=copy-link&creator=10256898)

## Stack

| Concern       | Technology                                 |
| ------------- | ------------------------------------------ |
| Language      | TypeScript 6                               |
| Framework     | React 19 + Vite 7                          |
| Styling       | Tailwind CSS v4                            |
| UI Components | shadcn/ui + Radix UI                       |
| Data fetching | TanStack Query v5                          |
| Routing       | React Router v7                            |
| Forms         | React Hook Form                            |
| Tables        | TanStack Table v8                          |
| Charts        | Recharts                                   |
| Animations    | Motion                                     |
| i18n          | i18next (English, Indonesian)              |
| Auth          | JWT (cookie) + Google Sign-In via Firebase |
| HTTP client   | Axios                                      |
| PWA           | vite-plugin-pwa (Workbox)                  |
| Linting       | ESLint + Prettier                          |
| Dead code     | Knip                                       |
| Git hooks     | Husky + lint-staged + commitlint           |

## Getting Started

**1. Install dependencies:**

```bash
bun install
```

**2. Copy and fill in environment variables:**

```bash
cp .env.example .env
```

**3. Start the dev server:**

```bash
bun run dev
```

Dev server runs on `http://localhost:3000` and proxies `/storage` to RustFS on `http://localhost:9000`.

## Environment Variables

```env
VITE_APP_NAME="IT Helpdesk"
VITE_API_BASE_URL=http://localhost:8080

VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
VITE_FIREBASE_VAPID_KEY=xxx
```

The six Firebase app credentials are required — the app throws on boot if any are missing. `VITE_GOOGLE_CLIENT_ID` enables Google One Tap; the Google Sign-In button works without it.

## Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `bun run dev`       | Start dev server                           |
| `bun run build`     | Type-check and build for production        |
| `bun run preview`   | Preview production build locally           |
| `bun run lint`      | Run ESLint                                 |
| `bun run format`    | Format all files with Prettier             |
| `bun run typecheck` | Run TypeScript type-check without emitting |
| `bun run knip`      | Report unused files, exports, dependencies |

## Project Structure

```
src/
├── api/            # Axios instance, interceptors, token handling
├── assets/         # Static assets (images, svgs)
├── components/     # Shared UI components
│   ├── layout/     # App shell and headers
│   ├── top-loader/ # Route change progress bar
│   └── ui/         # shadcn/ui primitives
├── constants/      # App-wide constants and route paths
├── features/       # Feature modules
│   ├── antrian/    # Queue (SIMGOS Antrol)
│   ├── auth/       # Login, profile, Google sign-in
│   ├── category/   # Ticket categories
│   ├── dashboard/  # Stats and charts
│   ├── division/   # Divisions
│   ├── feedback/   # Feedback
│   ├── home/       # Landing
│   ├── ihs/        # Patient data (SIMGOS)
│   ├── rbac/       # Roles and permissions
│   ├── ticket/     # Tickets
│   └── user/       # Users
├── hooks/          # Shared custom hooks
├── i18n/           # i18next config and locales (en, id)
├── lib/            # Firebase, axios helpers, formatters, query client
├── pages/          # Page-level components mapped to routes
├── router/         # React Router config, guards, progress bar
└── types/          # Shared TypeScript types
```

Each `features/*` module follows the same layout: `components/`, `pages/`, `queries/` (query keys and query options), `mutation/`, `service/`, `types/`.

## Auth and Session

- The JWT is stored in a cookie named `it_helpdesk_erba` and attached as a `Bearer` header by the Axios request interceptor.
- A `401` with `TOKEN_EXPIRED` or `INVALID_TOKEN` clears the cookie, saves the current path in session storage, and redirects to `/login`. The path is replayed after a successful login.
- The backend keeps a token allowlist in Redis, so a password change or reset invalidates existing tokens immediately — expect a redirect to `/login` right after changing your own password.

## Media URLs

The API returns media paths (`/storage/<bucket>/<key>`) rather than absolute URLs. `resolveMediaUrl` resolves them against `window.location.origin`. Avatar URLs carry a `?v=<updated_at>` version parameter so the browser discards a cached image after the picture changes.

## Query Cache

TanStack Query defaults live in `src/lib/query-client.ts`: `staleTime` 10 minutes, `gcTime` 30 minutes, `refetchOnWindowFocus` disabled. Mutations must invalidate the keys affected by their change — a profile or avatar update invalidates `PROFILE`, `AUTH.ME`, and `USER` (which covers both the user list and the assignable-agent list).

## PWA

`vite-plugin-pwa` generates a Workbox service worker with runtime caching:

| Route pattern | Strategy             | Cache               |
| ------------- | -------------------- | ------------------- |
| `/api/v1/*`   | NetworkFirst         | 100 entries, 24h    |
| `/storage/*`  | StaleWhileRevalidate | 200 entries, 7 days |

Static hashed assets are precached. `registerType: "autoUpdate"` means a new deployment takes effect on the next reload.

## Docker

```bash
docker build -t helpdesk-client .
```

The build is a two-stage image: `oven/bun` compiles the app, `nginx:alpine` serves `dist/` on port 80 with SPA fallback and immutable caching for hashed assets.

All configuration is baked in at build time via build args — `VITE_*` values are compile-time, not runtime. `VITE_API_BASE_URL` is left empty in production so the app issues same-origin requests and the reverse proxy forwards `/api` and `/storage`.

CI builds and pushes `ghcr.io/riyanamanda/helpdesk-client` on every push to `main`, then dispatches a deploy event to the infra repository.
