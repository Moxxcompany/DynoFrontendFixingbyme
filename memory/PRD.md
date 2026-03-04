# DynoPay Frontend - PRD

## Original Problem Statement
Set up DynoPay Next.js frontend, configure .env, and fix API endpoint integration so existing user data displays correctly across all pages.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **Language**: TypeScript
- **UI**: Material UI (MUI) v5
- **State**: Redux Toolkit + Redux-Saga
- **Auth**: NextAuth.js v4 (Google OAuth) + JWT localStorage
- **Backend**: Remote API at `https://api.dynopay.com/api/`
- **Styling**: MUI sx prop + custom themes

## Root Cause Analysis
All Redux sagas had response structure mismatches with the actual API:
- API returns `{message, data}` but sagas checked `response?.data?.status` (doesn't exist)
- Field names: API uses `snake_case` (e.g., `total_transactions`), sagas expected `camelCase` (e.g., `totalTransactions`)
- Wallet data returned as company-grouped arrays but frontend expected flat list
- Transaction endpoint paths were wrong (`transaction/{id}` → `wallet/transaction/{id}`)
- axios 401 interceptor caught login attempts and redirected, preventing error handling

## What's Been Implemented (2026-03-04)
1. Created `/app/.env` with all 8 environment variables (NEXTAUTH_URL + NEXT_PUBLIC_SERVER_URL using pod URL)
2. **Fixed DashboardSaga** - Removed `status` check, mapped snake_case → camelCase (total_transactions → totalTransactions, etc.)
3. **Fixed PaymentLinkSaga** - Removed `status` check, handle data as direct array
4. **Fixed TransactionSaga** - Fixed endpoint paths (wallet/transaction, wallet/transactions/export), proper data extraction
5. **Fixed WalletSaga** - Flatten company-grouped response [{company_id, wallets}] → flat wallet list
6. **Fixed CompanySaga** - validateTax → validateTaxId endpoint
7. **Fixed axiosConfig** - Skip auth header and 401 redirect for auth endpoints

## Verified Working Pages
- Dashboard: Stats, chart, fee tiers, wallet icons ✅
- Transactions: 640+ transactions, search, export ✅
- Wallets: 8 wallets with real balances (BTC $3,935, ETH $3,145, LTC $1,298) ✅
- Payment Links: 14 links with CRUD actions ✅
- Notifications: Preferences with toggles ✅
- Login: API works correctly, token stored in localStorage ✅

## Known Environment Issues
- `/apis` page route conflicts with K8s ingress (`/api*` → backend) - works in production, not in preview environment

## Backlog / Future Tasks
- P1: Integrate remaining 90+ API endpoints (KYC, 2FA, Webhooks, Subscriptions, Referral, Knowledge Base)
- P1: Help & Support page - replace hardcoded data with KB API
- P2: Notification inbox (list/read/delete endpoints)
- P2: Wallet OTP flows (create step 2, update/delete with OTP verification)
- P3: Auto-stablecoin conversion, invoice generation
- P3: Real-time events (SSE), referral system
