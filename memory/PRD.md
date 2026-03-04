# DynoPay - PRD & Implementation Log

## Original Problem Statement
Analyze and set up `.env` file for the DynoPay Next.js application, analyze API integrations, fix endpoint mismatches, and wire existing UI components to backend API endpoints.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **UI**: MUI (Material UI), custom components
- **State**: Redux + Redux Saga
- **Auth**: NextAuth (Google OAuth) + JWT
- **API**: External backend at `https://api.dynopay.com/`
- **Encryption**: CryptoJS AES with cypher key

## What's Been Implemented

### Session 1 (2026-03-04) - Env Setup
- Created `/app/.env` with all 8 required environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod URL

### Session 2 (2026-03-04) - API Analysis
- Full API integration analysis: 224 endpoints vs codebase → `/app/docs/API_INTEGRATION_ANALYSIS.md`
- ~74 integrated (~33%), ~150 NOT integrated (~67%)

### Session 3 (2026-03-04) - Bug Fixes
Fixed 4 endpoint path mismatches:
1. `wallet/verifyCode` → `wallet/verifyOtp` (WalletSaga.ts)
2. `userApi/regenerateApi/{id}` → `userApi/regenerateKey/{id}` (ApiSaga.ts)
3. `wallet/updateWallet/{id}` → `wallet/address/{id}` (WalletSaga.ts)
4. `wallet/deleteWallet/{id}` DELETE → `wallet/wallet/delete/verify` POST (WalletSaga.ts)

### Session 4 (2026-03-04) - UI Wiring & Route Fix
1. **Fixed /apis 404 bug**: Renamed page to `/developer-keys` to avoid K8s ingress `/api` prefix routing collision. Updated sidebar, mobile nav, and menus.
2. **Wired KYC banner**: Uncommented + connected to `GET /user/onboarding-status` (shows banner when KYC required) + `POST /kyc/submit` (redirects to Veriff on click). Both desktop header & mobile nav.
3. **Fixed Auto-Conversion pre-population**: CompanySettingsDialog now reads `auto_convert_volatile_crypto` and `convert_to_stablecoin` from company data instead of hardcoded defaults.

## Verified Live API Endpoints
All ~150 missing endpoints confirmed LIVE on api.dynopay.com (401/403 auth-required or 200 public).

## Prioritized Backlog
### P0 - Critical (No UI exists - needs full build)
- 2FA/Security (12 endpoints) - No UI
- Invoices (4 endpoints) - No UI
- Webhook Configuration (6 endpoints) - No UI

### P1 - High (No UI exists)
- Subscriptions (5 endpoints) - No UI
- Referral expanded features (8 endpoints - list/earnings/leaderboard) - Only code display exists
- Auto-Conversion history (3 endpoints) - Only toggle exists
- Knowledge Base dynamic content (9 endpoints) - Hardcoded help pages

### P2 - Medium
- Admin Analytics/Users (8 endpoints)
- Payment Processing `/api/pay/*` (13 endpoints)
- Tax System (4 endpoints)
- Real-Time Events/SSE (6 endpoints)
- API Key Plans/Customers/Usage/Logs (11 endpoints)
