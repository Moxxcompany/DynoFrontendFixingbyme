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
- Auto-convert API: GET/PUT `/api/company/auto-convert/{id}` wired into CompanySettingsDialog
- Referrals page: `/referrals` with all 5 GET endpoints, sidebar nav link added

### Session 9 — Copy Feedback Fix (Bug)
- **Root cause**: `Containers/Client/index.tsx` was missing the global `Toast` component — all `TOAST_SHOW` dispatches from authenticated pages (wallet, API keys, webhook settings, etc.) had no visible feedback
- **Fixed**: Added `Toast` + `toastReducer` selector to Client container
- **Also fixed**: 
  - `CreatePaymentLink/index.tsx` — added toast on payment link copy
  - `WebhookNotificationsSection.tsx` — added toast on URL/secret key copy
  - `CryptoComponent.tsx` — replaced `alert("copied")` with proper toast

## Backlog
- P2: 2FA (no UI — build from scratch + 10 backend endpoints)
- P2: Invoices (no UI — build from scratch + 4 backend endpoints)
- P2: Subscriptions (no UI — build from scratch + backend endpoints)
- P3: Referral validate/apply/redeem endpoints (POST)

## Refactoring Notes
- Hardcoded crypto list in `useWalletData.ts` should be fetched from backend
- Redux Sagas could be better organized by feature
