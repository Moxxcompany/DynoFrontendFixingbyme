# DynoPay Frontend - PRD

## Original Problem Statement
Set up DynoPay Next.js frontend, configure .env, and integrate all API endpoints so existing user data displays correctly across all pages. Replace hardcoded data with live API calls.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **Language**: TypeScript
- **UI**: Material UI (MUI) v5
- **State**: Redux Toolkit + Redux-Saga
- **Auth**: NextAuth.js v4 + JWT localStorage
- **Backend**: Remote API at `https://api.dynopay.com/api/`

## Root Causes Fixed
1. **Redux Sagas** — API returns `{message, data}` but sagas checked `response?.data?.status` (nonexistent). Fixed field mapping (snake_case → camelCase), flattened wallet data, corrected endpoint paths
2. **axiosConfig** — 401 interceptor caught login attempts; fixed to skip auth endpoints
3. **Hardcoded Data** — Pay Links Edit, Referral Code, Notifications, API Status all used static data

## What's Been Implemented

### Session 1 (2026-03-04): Initial Setup
- Created `/app/.env` with all environment variables
- Installed dependencies, built Next.js, launched frontend

### Session 2: Redux Saga Fixes
- Fixed DashboardSaga (snake_case → camelCase mapping)
- Fixed PaymentLinkSaga (removed status check, direct array handling)
- Fixed TransactionSaga (corrected endpoint paths to wallet/*)
- Fixed WalletSaga (flatten company-grouped → flat wallet list)
- Fixed CompanySaga (validateTax → validateTaxId)
- Fixed axiosConfig (skip auth header + 401 redirect for login endpoints)

### Session 3: API Endpoint Integration (no new pages)
- **Pay Links Edit** (`/pay-links/[slug]`) — `GET /pay/links/{id}` replaces hardcoded data
- **Referral Code** (sidebar) — `GET /referral/my-code` replaces hardcoded "DYNO2024XYZ"
- **Notifications Inbox** — Added Inbox/Settings tabs, `GET /notifications`, `GET /notifications/unread-count`, `PUT /notifications/read-all`, `PUT /notifications/{id}/read`
- **API Status** (`/api-status`) — `GET /status/services` + `GET /status/incidents` replace hardcoded arrays
- **Backend proxy** — Added `/api-status` route in FastAPI to bypass K8s ingress conflict

## Verified Working Pages
- Dashboard (stats, chart, fee tiers) ✅
- Transactions (640+ records) ✅
- Wallets (8 wallets with real balances) ✅
- Payment Links list + Edit detail ✅
- Notifications (inbox + settings) ✅
- Profile, Company, API Keys ✅
- Referral Code (live from API) ✅
- API Status (live services + incidents) ✅

## Backlog
- P1: Help & Support — replace hardcoded articles with KB API
- P2: KYC — dynamic redirect to verification provider
- P3: Additional wallet OTP flows
