# DynoPay - PRD & Implementation Log

## Original Problem Statement
Analyze/set up `.env`, analyze API integrations, fix endpoint mismatches, wire UI, fix bugs, add missing currencies, and improve onboarding UX.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **UI**: MUI, custom components
- **State**: Redux + Redux Saga
- **Auth**: NextAuth (Google OAuth) + JWT
- **API**: External backend at `https://api.dynopay.com/`

## What's Been Implemented

### Session 1-4
- `.env` setup, API analysis (224 endpoints), 4 endpoint path fixes, KYC banner wiring, Auto-Conversion pre-population, `/apis`->`/developer-keys` route fix

### Session 5
- Logo click -> `/dashboard` instead of `/` (NewHeader)
- Referral copy icon — removed overflow:hidden from ReferralCard

### Session 6 — Wallet Currencies + XRP Tag
- Added 8 missing currencies (total: 16 supported)
- XRP Tag field now conditional (TAG_BASED_CHAINS)

### Session 7 — Onboarding UX Fix (P0)
- Created `Components/UI/OnboardingChecklist/index.tsx` - Setup checklist with 3-step progress
- Confetti celebration (`canvas-confetti`) when user completes all prerequisites
- Modified `pages/dashboard.tsx` - OnboardingChecklist + conditional "Create Payment Link" button
- Modified `pages/create-pay-link.tsx` - Guard blocks access without company/wallet

### Session 8 — Auto-Conversion + Referrals (P1)

#### Auto-Conversion API Integration
- Modified `Components/UI/CompanySettingsDialog/index.tsx`:
  - `GET /api/company/auto-convert/{id}` fetched when dialog opens
  - `PUT /api/company/auto-convert/{id}` called on form submit
  - Properly maps `auto_convert_enabled` boolean and `target_stablecoin`
  - Falls back to company data if dedicated endpoint fails

#### Referral APIs — Full Integration (8 endpoints)
- Created `pages/referrals.tsx` — New dedicated referrals page with:
  - Referral code display with copy button
  - "Copy Invite Link" share button
  - 4 stat cards (Total Referrals, Active, Pending, Total Earnings)
  - Fee Discount section (discount %, days remaining)
  - Earnings Breakdown (Credited, Pending, Withdrawn)
  - My Referrals list (name, email, status chips)
  - Leaderboard (rank, name, referral count, current user highlight)
  - All 12 data-testid attributes for testing
  - All 5 API endpoints called in parallel via `Promise.allSettled`
- Modified `Components/Layout/NewSidebar/index.tsx` — Added "Referrals" nav link with GroupAddRounded icon
- Wired endpoints: `/referral/my-code`, `/referral/list`, `/referral/earnings`, `/referral/discount-status`, `/referral/leaderboard`

## Backlog
- P2: 2FA (no UI — build from scratch + 10 backend endpoints)
- P2: Invoices (no UI — build from scratch + 4 backend endpoints)
- P2: Subscriptions (no UI — build from scratch + backend endpoints)
- P3: Referral validate/apply/redeem endpoints (POST /referral/validate, /referral/apply, /referral/referee/validate, /referral/referee/redeem)

## Refactoring Notes
- Hardcoded crypto list in `useWalletData.ts` should be fetched from backend
- Redux Sagas could be better organized by feature
