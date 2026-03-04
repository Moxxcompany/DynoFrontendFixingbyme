# DynoPay Frontend — PRD & Project Memory

## Original Problem Statement
Set up `.env` file for the DynoPay Next.js application. Use the pod preview URL for `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL`. Create a README documenting the setup. Then analyze and complete all phases of the implementation plan.

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
- [x] Installed Node.js dependencies, fixed TS build error, built Next.js app
- [x] Created comprehensive `/app/README.md` for future agents

### Session 2 (2026-03-04) — Phase 1 & 2 Redux Layer
- [x] Dashboard: Removed hardcoded fallbacks → 0/loading states
- [x] Dashboard: Fixed `CURRENT_TIER` constant → dynamic `currentTier`
- [x] Payment Links: Removed hardcoded `fallbackLinks` array
- [x] User Profile: Added `USER_PROFILE_FETCH` action, saga, reducer, wired page
- [x] Transaction detail fetch + CSV export sagas
- [x] Wallet update/delete with OTP sagas
- [x] API key regenerate/update/toggle sagas
- [x] Company tax validation saga
- [x] Payment link fee preview saga

### Session 3 (2026-03-04) — Phase 2 UI Wiring (CURRENT)
- [x] API Keys Page: Added Regenerate + Toggle Status buttons per key card
- [x] Company Details: Tax validation button dispatches `COMPANY_VALIDATE_TAX`, shows dynamic result banner
- [x] Create Payment Link: Fee preview dispatches debounced on amount/currency change, displays fee estimate
- [x] Transactions Table: Row click dispatches `TRANSACTION_DETAIL_FETCH` for detail view
- [x] Transaction export: Wired to dispatch with filters (wallet, date range, search)
- [x] Removed hardcoded transaction data (fees, confirmations, txids) — now reads from API response

## Testing Status
- Build: Passes (no TypeScript errors)
- Backend: 100% — All sagas implemented, API secured as expected
- Frontend: 95% — All features implemented, auth-protected routes redirect correctly
- Integration: 100% — Redux actions dispatched from all UI components
- Known issue: `/apis` route 404 due to K8s ingress `/api` prefix routing

## Prioritized Backlog

### P0 — UI Polish (Remaining from Phase 2)
- [ ] Better empty states when loading without auth (LOW priority per testing agent)
- [ ] Fix `/apis` page routing (K8s ingress config issue)

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

## Next Tasks
1. Phase 3: KYC verification flow
2. Phase 3: 2FA security settings
3. Phase 3: Session management & login history
