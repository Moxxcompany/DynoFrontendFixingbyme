# DynoPay Frontend - PRD

## Original Problem Statement
Set up DynoPay Next.js frontend, fix API endpoint integration so existing user data displays correctly. Dashboard total transactions/volume were showing 0 despite user having 640 transactions.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **Language**: TypeScript
- **State**: Redux Toolkit + Redux-Saga
- **Backend**: Remote API at `https://api.dynopay.com/api/`

## What's Been Implemented

### Session 1: Initial Setup + Redux Saga Fixes
- Created .env, installed deps, built Next.js
- Fixed all Redux sagas (Dashboard, PaymentLink, Transaction, Wallet, Company) — response structure mismatches
- Fixed axiosConfig — skip auth header/redirect for login endpoints

### Session 2: API Endpoint Integration (no new pages)
- **Pay Links Edit** → `GET /pay/links/{id}` replaces hardcoded data
- **Referral Code** → `GET /referral/my-code` replaces hardcoded "DYNO2024XYZ"
- **Notifications Inbox** → Added Inbox/Settings tabs with `GET /notifications`, unread count, mark as read
- **API Status** → `GET /status/services` + `GET /status/incidents` replaces hardcoded arrays
- **Backend proxy** → Added `/api-status` route for K8s ingress conflict

### Session 3: Dashboard Total Transactions/Volume Fix
- Root cause: `/dashboard` API returns 0 for total_transactions and total_volume (backend-level issue)
- Fix: DashboardSaga now also calls `POST /wallet/getUserAnalytics` and supplements dashboard data when it returns 0
- Result: Dashboard shows **640 transactions** and **$14,790.38 volume** from analytics data

## Verified Working
- Dashboard: 640 tx, $14,790 vol, 8 wallets, Starter tier ✅
- Transactions: 640+ records ✅
- Wallets: Real balances (BTC, ETH, LTC, DOGE, etc.) ✅
- Payment Links: List + Edit detail ✅
- Notifications: Inbox + Settings ✅
- Referral Code: DYNO2026NOMC92496B9 ✅
- API Status: Live services + incidents ✅

## Backlog
- P1: Help & Support — replace hardcoded articles with KB API
- P2: KYC — dynamic redirect to verification provider
