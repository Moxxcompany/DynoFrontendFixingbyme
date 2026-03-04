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
- **Created**: `Components/UI/OnboardingChecklist/index.tsx` - Setup checklist with 3-step progress
  - Steps: Create Company, Add Wallet, Create Payment Link
  - Progress bar, green checkmarks for completed steps, disabled steps for unmet prerequisites
  - Checklist auto-hides when company + wallet both exist
  - **Confetti celebration** (`canvas-confetti`) fires when user completes all prerequisites
  - "You're all set!" animated card with bounce + pulse animations
  - Auto-dismisses after 5 seconds
- **Modified**: `pages/dashboard.tsx` - OnboardingChecklist + conditional "Create Payment Link" button
- **Modified**: `pages/create-pay-link.tsx` - Guard blocks access without company/wallet, shows missing steps with navigation

### Dependencies Added
- `canvas-confetti` + `@types/canvas-confetti` for celebration animation

## Backlog
- P1: Wire up Auto-Conversion APIs (GET/PUT /api/company/auto-convert/{id})
- P1: Wire up remaining Referral APIs (8 endpoints)
- P2: 2FA (no UI), Invoices (no UI), Webhook Config (no UI)
- P2: Subscriptions (no UI), Knowledge Base dynamic

## Refactoring Notes
- Hardcoded crypto list in `useWalletData.ts` should be fetched from backend
- Redux Sagas could be better organized by feature
