# DynoPay Frontend — PRD & Project Memory

## Original Problem Statement
Set up `.env` file for the DynoPay Next.js application. Use the pod preview URL for `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL`. Create a README documenting the setup. Then analyze and complete the implementation plan phases.

## Architecture
- **Framework**: Next.js 14 (Pages Router) + TypeScript
- **UI**: Material UI v5
- **State**: Redux Toolkit + Redux-Saga
- **Auth**: NextAuth.js v4 (Google OAuth)
- **API**: Remote backend at `https://api.dynopay.com/api/` via axios
- **Hosting**: Emergent pod (supervisor-managed)

## What's Been Implemented

### Session 1 (2026-03-04) — Env Setup & README
- [x] Created `/app/.env` with all 8 required environment variables
- [x] Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod preview URL
- [x] Installed Node.js dependencies at `/app` via `yarn install`
- [x] Fixed TypeScript build error in `Components/UI/AuthLayout/InputFields/index.tsx`
- [x] Built Next.js production app, frontend service running
- [x] Created comprehensive `/app/README.md` for future agents

### Session 2 (2026-03-04) — Phase 1 & 2 Completion
**Phase 1 — Core Pages:**
- [x] Dashboard: Removed hardcoded fallbacks (4, 6479.25, 12%, 8.5% → 0)
- [x] Dashboard: Fixed `CURRENT_TIER` constant → dynamic `currentTier`
- [x] Payment Links: Removed hardcoded `fallbackLinks` array
- [x] User Profile: Added `USER_PROFILE_FETCH` action, saga, reducer
- [x] User Profile: Wired `pages/profile.tsx` to dispatch and merge API data

**Phase 2 — Existing Pages Expanded:**
- [x] Transaction detail fetch (`GET /transaction/{id}`)
- [x] Transaction export (`POST /transactions/export` with CSV blob download)
- [x] Wallet update/delete with OTP (`PUT/DELETE /wallet/...`)
- [x] API key regenerate/update/toggle (`POST/PUT /userApi/...`)
- [x] Company tax validation (`POST /company/validateTax`)
- [x] Payment link fee preview (`POST /pay/feePreview`)

## Testing Status
- Build: Passes (no TypeScript errors)
- Frontend: 95% (homepage, dashboard, auth, profile, pay-links all load)
- Backend health: 100%
- Known issue: `/apis` and `/api-status` routes 404 due to Kubernetes ingress `/api` prefix routing

## Prioritized Backlog

### P0 — Remaining from Phase 2
- [ ] Wire fee preview UI component to dispatch `PAYLINK_FEE_PREVIEW`
- [ ] Wire tax validation UI component in CompanyDetailsSection
- [ ] Wire API key regenerate/toggle buttons in ApiKeysPage UI

### P1 — Phase 3: New Feature Areas
- [ ] KYC verification flow
- [ ] 2FA security settings
- [ ] Session management & login history
- [ ] Currency exchange
- [ ] User onboarding status

### P2 — Phase 4: Advanced Features
- [ ] Subscriptions, Invoices, Referral program
- [ ] Webhook management UI
- [ ] Auto-stablecoin conversion
- [ ] Real-time SSE events
- [ ] System status page, Knowledge Base
- [ ] Advanced admin analytics

### Infrastructure
- [ ] Fix `/api*` routing conflict for `/apis` and `/api-status` pages

## Next Tasks
1. Wire Phase 2 UI components to their new saga actions (fee preview, tax validation, API regenerate)
2. Begin Phase 3: KYC verification flow
3. Begin Phase 3: 2FA security settings
