# Helpdesk Client

Frontend for the IT Helpdesk management system built with React 19, TypeScript, and Vite. Designed for internal employee use.

**API:** [View on Postman](https://ranstack.postman.co/workspace/Personal~a161c18a-46cb-43a7-9866-eca9e1d1d19d/collection/10256898-3098bfb3-d3fd-4e97-8939-23523608d0ea?action=share&source=copy-link&creator=10256898)

## Stack

| Concern            | Technology                       |
| ------------------ | -------------------------------- |
| Language           | TypeScript 5.9+                  |
| Framework          | React 19 + Vite 7                |
| Styling            | Tailwind CSS v4                  |
| UI Components      | shadcn/ui + Radix UI             |
| Data fetching      | TanStack Query v5                |
| Routing            | React Router v7                  |
| Forms              | React Hook Form                  |
| Tables             | TanStack Table v8                |
| Charts             | Recharts                         |
| Animations         | Motion                           |
| i18n               | i18next                          |
| Push notifications | Firebase (FCM)                   |
| Auth               | JWT + Google OAuth               |
| HTTP client        | Axios                            |
| Linting            | ESLint + Prettier                |
| Git hooks          | Husky + lint-staged + commitlint |

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

## Environment Variables

```env
VITE_APP_NAME="IT Helpdesk"
VITE_API_BASE_URL=http://localhost:8080

# Firebase (push notifications + Google auth)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=

# Google OAuth
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
```

## Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `bun run dev`       | Start dev server                           |
| `bun run build`     | Type-check and build for production        |
| `bun run preview`   | Preview production build locally           |
| `bun run lint`      | Run ESLint                                 |
| `bun run format`    | Format all files with Prettier             |
| `bun run typecheck` | Run TypeScript type-check without emitting |

## Project Structure

```
src/
├── api/            # Axios instance and API call definitions
├── assets/         # Static assets
├── components/     # Shared UI components
├── constants/      # App-wide constants
├── features/       # Feature modules
│   ├── auth/
│   ├── category/
│   ├── dashboard/
│   ├── division/
│   ├── feedback/
│   ├── home/
│   ├── notification/
│   ├── ticket/
│   └── user/
├── hooks/          # Shared custom hooks
├── i18n/           # Translations and i18next config
├── lib/            # Third-party library setup (firebase, etc.)
├── pages/          # Page-level components mapped to routes
├── router/         # React Router config
└── types/          # Shared TypeScript types
```
