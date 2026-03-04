# DynoPay Frontend — PRD & Project Memory

## Original Problem Statement
Set up and configure `.env` file for the DynoPay Next.js application. Use the pod preview URL for `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL`. Create a README documenting the setup for future agents.

## Architecture
- **Framework**: Next.js 14 (Pages Router) + TypeScript
- **UI**: Material UI v5
- **State**: Redux Toolkit + Redux-Saga
- **Auth**: NextAuth.js v4 (Google OAuth)
- **API**: Remote backend at `https://api.dynopay.com/api/` via axios
- **Hosting**: Emergent pod (supervisor-managed)

## What's Been Implemented (2026-03-04)
- [x] Created `/app/.env` with all 8 required environment variables
- [x] Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod preview URL
- [x] Installed Node.js dependencies at `/app` via `yarn install`
- [x] Fixed TypeScript build error in `Components/UI/AuthLayout/InputFields/index.tsx` (onBeforeInput type)
- [x] Built Next.js production app (`next build`)
- [x] Frontend service running and accessible (HTTP 200)
- [x] Created comprehensive `/app/README.md` with full setup guide for future agents

## Testing Status
- All 15 tests passed (100% backend, frontend, configuration)
- Homepage loads with DynoPay content
- Auth flow accessible, Google OAuth configured
- All env vars loaded correctly

## Prioritized Backlog (from IMPLEMENTATION_PLAN.md)
### P0 — Core Pages (Static → Live API)
- [ ] Dashboard stats & chart (wire to live API)
- [ ] Payment links CRUD
- [ ] Notification preferences
- [ ] User profile

### P1 — Complete Existing Pages
- [ ] Transaction details & export
- [ ] Wallet OTP-based flows
- [ ] API key management
- [ ] Company details & tax validation

### P2 — New Feature Areas
- [ ] KYC verification flow
- [ ] 2FA security settings
- [ ] Session management & login history
- [ ] Currency exchange

### P3 — Advanced Features
- [ ] Subscriptions, Invoices, Referral program
- [ ] Webhook management UI
- [ ] Auto-stablecoin conversion
- [ ] Real-time SSE events

## Next Tasks
1. Wire dashboard page to live API endpoints
2. Implement payment links CRUD with live backend
3. Connect notification preferences to API
