# DynoPay Frontend — Emergent Agent Setup Guide

## Quick Start (TL;DR for Future Agents)

```bash
# 1. Create /app/.env with the environment variables (see below)
# 2. Install dependencies
cd /app && yarn install --frozen-lockfile
# 3. Build Next.js
cd /app && node_modules/.bin/next build
# 4. Restart frontend
sudo supervisorctl restart frontend
# 5. Verify
curl -s -o /dev/null -w "%{http_code}" https://<POD_URL>/
```

---

## Project Overview

**DynoPay** is a crypto payment gateway SaaS. This repo is the **Next.js 14 frontend** (Pages Router) that connects to a remote backend API at `https://api.dynopay.com/api/`.

- **Framework**: Next.js 14.2.4 (Pages Router, NOT App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI) v5
- **State Management**: Redux Toolkit + Redux-Saga
- **Auth**: NextAuth.js v4 (Google OAuth provider)
- **Styling**: MUI `sx` prop + custom themes (no Tailwind)
- **i18n**: i18next + react-i18next

---

## Architecture & Directory Layout

```
/app/                          ← Next.js project root
├── .env                       ← Environment variables (MUST CREATE)
├── package.json               ← Dependencies & scripts
├── next.config.mjs            ← Next.js config
├── tsconfig.json              ← TypeScript config (@/* path alias → /app/*)
├── store.ts                   ← Redux store (configureStore + sagaMiddleware)
├── axiosConfig.ts             ← Main axios instance (uses NEXT_PUBLIC_BASE_URL)
├── axiosAdmin.ts              ← Admin axios instance
│
├── pages/                     ← Next.js pages (file-based routing)
│   ├── _app.tsx               ← App wrapper (Redux Provider, SessionProvider, ThemeProvider)
│   ├── _document.tsx          ← Custom document
│   ├── api/auth/[...nextauth].ts  ← NextAuth API route (Google OAuth)
│   ├── index.tsx              ← Home/landing page
│   ├── auth/                  ← Login, Register, Social Login
│   ├── dashboard.tsx          ← Main dashboard
│   ├── transactions.tsx       ← Transaction history
│   ├── wallet.tsx             ← Wallet management
│   ├── pay-links/             ← Payment links CRUD
│   ├── payment/               ← Payment flow (index, verify, success, failed)
│   ├── admin/                 ← Admin panel pages
│   └── ...                    ← Profile, Notifications, APIs, etc.
│
├── Components/
│   ├── Layout/                ← Layout wrappers (Header, Sidebar, Footer)
│   ├── Page/                  ← Page-specific components (Dashboard, Wallet, etc.)
│   └── UI/                    ← Reusable UI components (Modals, Tables, Inputs, etc.)
│
├── Redux/
│   ├── Actions/               ← Action creators & types
│   ├── Reducers/              ← Redux slices (user, wallet, transaction, dashboard, etc.)
│   └── Sagas/                 ← Redux-Saga workers (API calls)
│
├── hooks/                     ← Custom React hooks
├── helpers/                   ← Utility functions (encryption, formatting, etc.)
├── utils/                     ← Constants, enums, types
├── assets/                    ← Icons, images, crypto logos
├── styles/                    ← Global CSS, MUI themes
├── langs/                     ← i18n translation files
├── public/                    ← Static assets (favicon, fonts)
│
├── frontend/                  ← Supervisor bridge (contains package.json that proxies to /app)
│   └── package.json           ← Scripts: `cd /app && next start/build/dev`
│
├── backend/                   ← Minimal FastAPI backend (health check only)
│   ├── server.py
│   └── requirements.txt
│
└── docs/
    └── IMPLEMENTATION_PLAN.md ← Phased plan for wiring frontend to live API
```

---

## Environment Variables (.env)

**Location**: `/app/.env` (project root)

| Variable | Purpose | Value in Preview |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL (axios) | `https://api.dynopay.com/` |
| `NEXT_PUBLIC_CYPHER_KEY` | Client-side encryption key (crypto-js) | 128-char hex string |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID (NextAuth) | `163670787265-...apps.googleusercontent.com` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret (NextAuth) | `GOCSPX-...` |
| `NEXT_PUBLIC_SERVER_URL` | Frontend's own URL (for redirect URLs in payments) | **Use pod preview URL** |
| `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` | Telegram bot integration | `7098839658:AAF...` |
| `NEXTAUTH_SECRET` | NextAuth session encryption secret | Random string |
| `NEXTAUTH_URL` | NextAuth canonical URL (for callbacks) | **Use pod preview URL** |

### How to get the pod URL:
```bash
# Extract from supervisor config:
grep APP_URL /etc/supervisor/conf.d/*.conf | grep -oP 'https://[^"]*'
# Or check the backend env:
grep APP_URL /etc/supervisor/conf.d/*.conf
```

### .env Template (copy & update pod URL):
```env
NEXT_PUBLIC_BASE_URL="https://api.dynopay.com/"
NEXT_PUBLIC_CYPHER_KEY="e4361761333af9b6a3120cc919db25eb8515d4f425bf22de31ea1ff60f3d695778b83a1e94f2d482226d38a6557a6688bb71145c3f5bedc85ce36e3c448a7399"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="163670787265-g39k8mfhfc4rgv4jpgt6k6n62phif72o.apps.googleusercontent.com"
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET="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"
NEXT_PUBLIC_SERVER_URL="<POD_PREVIEW_URL>/"
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN="7098839658:AAFBGaj4OpIoH-HzVQ3h1rzf2DrvsVso9yI"
NEXTAUTH_SECRET="alksdmaolskndmjqweaADLSKDMAKSLaskldjmasd"
NEXTAUTH_URL="<POD_PREVIEW_URL>/"
```

**IMPORTANT**: `NEXT_PUBLIC_SERVER_URL` and `NEXTAUTH_URL` MUST point to the pod's preview URL (e.g., `https://nextauth-config.preview.emergentagent.com/`). These are used for:
- NextAuth OAuth callback redirects
- Payment redirect URLs (success/failed pages)

---

## Supervisor Services

The Emergent pod runs services via **supervisor**:

| Service | Port | Directory | Command |
|---|---|---|---|
| `frontend` | 3000 | `/app/frontend` | `yarn start` → `cd /app && next start -p 3000 -H 0.0.0.0` |
| `backend` | 8001 | `/app/backend` | `uvicorn server:app --port 8001` |
| `mongodb` | 27017 | — | `mongod --bind_ip_all` |

### Key Insight: Frontend Directory Indirection
The supervisor runs `yarn start` from `/app/frontend/`, but that `package.json` simply does:
```json
{ "scripts": { "start": "cd /app && node_modules/.bin/next start -p 3000 -H 0.0.0.0" } }
```
So the actual Next.js app runs from `/app` (project root). Dependencies must be installed at `/app`, NOT `/app/frontend`.

### Useful Commands:
```bash
# Check service status
sudo supervisorctl status

# Restart frontend (needed after .env changes or dependency install)
sudo supervisorctl restart frontend

# View logs
tail -f /var/log/supervisor/frontend.out.log
tail -f /var/log/supervisor/frontend.err.log
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/backend.err.log
```

---

## Setup Steps (Detailed)

### Step 1: Create .env
```bash
# Create /app/.env with proper values (see template above)
# Replace <POD_PREVIEW_URL> with the actual pod URL
```

### Step 2: Install Dependencies
```bash
cd /app && yarn install --frozen-lockfile
```
This installs all Node.js packages into `/app/node_modules/` including `next`, `react`, `@mui/material`, etc.

### Step 3: Build the Next.js App
```bash
cd /app && node_modules/.bin/next build
```
This creates the `.next/` production build directory. The `next start` command requires this build.

**Known Build Fix**: If build fails with a TypeScript error in `Components/UI/AuthLayout/InputFields/index.tsx` line 354 about `onBeforeInput` type, change the type from:
```ts
onBeforeInput?: (e: React.FormEvent<HTMLInputElement>) => void;
```
to:
```ts
onBeforeInput?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
```

### Step 4: Restart Frontend
```bash
sudo supervisorctl restart frontend
```

### Step 5: Verify
```bash
# Check service is running
sudo supervisorctl status frontend

# Check HTTP response
curl -s -o /dev/null -w "%{http_code}" https://<POD_URL>/
# Should return 200

# Check logs to confirm env loaded
tail -n 5 /var/log/supervisor/frontend.out.log
# Should see: "url for base https://api.dynopay.com/"
```

---

## How the App Connects to the Backend

- **axios instances** (`axiosConfig.ts`, `axiosAdmin.ts`) use `NEXT_PUBLIC_BASE_URL` + `api/` as base URL
- Auth tokens are stored in `localStorage` (`token` for client, `admin_token` for admin)
- Axios interceptors auto-attach `Authorization: Bearer <token>` headers
- 401 responses auto-clear token and redirect to `/auth/login`
- 403 responses are handled by `unAuthorizedHelper`

---

## Routing & Layout System

The app uses a layout system defined in `_app.tsx`:

| Layout | Routes | Description |
|---|---|---|
| `home` | `/`, `/terms-conditions`, `/privacy-policy`, `/aml-policy`, `/api-status` | Public landing pages |
| `login` | `/auth/*`, `/reset-password`, `/admin/login` | Auth pages |
| `payment` | `/payment/*` | Payment flow pages |
| `admin` | `/admin/*` (except login) | Admin dashboard |
| `client` | Everything else | Main user dashboard |

---

## State Management Pattern

```
User Action → Redux Action → Saga (API call via axiosBaseApi) → Reducer → Component re-render
```

### Redux Modules:
- **User**: Auth, profile, login/register
- **Wallet**: Wallet CRUD, addresses
- **Transaction**: Transaction list, details, export
- **Dashboard**: Stats, charts, fee tiers
- **PaymentLink**: Payment links CRUD
- **Company**: Company details
- **API**: API key management
- **Toast**: Global notifications

---

## Common Gotchas

1. **Dependencies at /app, not /app/frontend**: The `node_modules` must be at `/app` (project root)
2. **Build required**: `next start` needs a `.next` build directory. Always run `next build` after code changes
3. **Hot reload in dev mode only**: Production mode (`next start`) does NOT hot reload. For development, update `frontend/package.json` to use `dev` instead of `start`
4. **.env changes require restart**: After modifying `.env`, you must rebuild AND restart: `cd /app && node_modules/.bin/next build && sudo supervisorctl restart frontend`
5. **NEXT_PUBLIC_ prefix**: Only env vars prefixed with `NEXT_PUBLIC_` are available in browser-side code. `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are server-side only
6. **TypeScript strict mode**: The project has `strict: true` in tsconfig. Type errors will fail the build

---

## Development Workflow

For making code changes during development:

```bash
# Option A: Switch to dev mode (hot reload)
# Edit /app/frontend/package.json to use "dev" script instead of "start"
# Then: sudo supervisorctl restart frontend

# Option B: Stay in production mode (rebuild after each change)
cd /app && node_modules/.bin/next build && sudo supervisorctl restart frontend
```

---

## External Services

| Service | Purpose | Config |
|---|---|---|
| `api.dynopay.com` | Backend API | `NEXT_PUBLIC_BASE_URL` |
| Google OAuth | Social login | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` + `SECRET` |
| Telegram Bot | Notifications | `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` |
| Flutterwave | Payment processing | Integrated via `flutterwave-react-v3` package |

---

## Reference Files

| File | Purpose |
|---|---|
| `/app/.env` | Environment configuration |
| `/app/package.json` | Dependencies & scripts |
| `/app/next.config.mjs` | Next.js configuration |
| `/app/tsconfig.json` | TypeScript configuration |
| `/app/axiosConfig.ts` | Main API client setup |
| `/app/store.ts` | Redux store configuration |
| `/app/pages/_app.tsx` | App entry point & layout system |
| `/app/pages/api/auth/[...nextauth].ts` | NextAuth configuration |
| `/app/docs/IMPLEMENTATION_PLAN.md` | Phased API integration plan |
| `/app/frontend/package.json` | Supervisor bridge scripts |
