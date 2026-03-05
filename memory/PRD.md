# DynoPay - PRD & Progress

## Problem Statement
1. Set up `.env` configuration for the DynoPay Next.js application
2. Analyze frontend design for 18 API endpoint implementations
3. Redesign onboarding flow from passive checklist to sequential guided modals
4. Add step progress indicator to onboarding modals

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **State Management**: Redux + Redux-Saga
- **UI**: Material UI (MUI)
- **Auth**: NextAuth with Google OAuth
- **API**: Axios to `api.dynopay.com`
- **Encryption**: CryptoJS AES
- **Integrations**: Telegram, Flutterwave payments

## What's Been Implemented

### Session 1: .env Setup (2026-03-05)
- Created `/app/.env` with all 8 required environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod preview URL

### Session 2: Frontend API Endpoint Audit (2026-03-05)
- Verified all 18 endpoints across 5 modules are fully wired in frontend

### Session 3: Onboarding Flow Redesign (2026-03-05)
- **Removed**: Old `OnboardingChecklist` (passive task list on dashboard)
- **Created**: Sequential modal-based onboarding flow:
  - `OnboardingFlow/index.tsx` — Orchestrator managing phases: loading → company → wallet → celebration → done
  - `OnboardingFlow/CreateCompanyModal.tsx` — MUI Dialog for company creation
  - `OnboardingFlow/CelebrationOverlay.tsx` — Confetti + "You're all set!" celebration dialog
- **Reused**: Existing `AddWalletModal` for wallet creation step
- **Updated**: `dashboard.tsx` to import `OnboardingFlow` instead of `OnboardingChecklist`

### Session 4: Step Progress Indicator (2026-03-05)
- **Created**: `OnboardingFlow/StepIndicator.tsx` — Reusable step indicator with numbered dots, labels, and connector lines
- **Added to CreateCompanyModal**: Shows "Step 1 of 2" (Company → Wallet) at top of modal
- **Added to AddWalletModal**: Shows "Step 2 of 2" via new optional `headerExtra` prop
- **Updated**: `AddWalletModalProps` in `wallet.ts` with `headerExtra?: React.ReactNode`
- Step dots animate color transitions, completed steps show checkmark, active step is highlighted
- Tests: 100% pass rate

## Files Modified/Created
- **NEW**: `/app/Components/UI/OnboardingFlow/index.tsx`
- **NEW**: `/app/Components/UI/OnboardingFlow/CreateCompanyModal.tsx`
- **NEW**: `/app/Components/UI/OnboardingFlow/CelebrationOverlay.tsx`
- **NEW**: `/app/Components/UI/OnboardingFlow/StepIndicator.tsx`
- **MODIFIED**: `/app/pages/dashboard.tsx` (swapped OnboardingChecklist → OnboardingFlow)
- **MODIFIED**: `/app/Components/UI/AddWalletModal/index.tsx` (added headerExtra prop + rendering)
- **MODIFIED**: `/app/utils/types/wallet.ts` (added headerExtra to AddWalletModalProps)

## Backlog
- P1: Google OAuth redirect URI whitelisting for pod URL
- P1: Test full onboarding flow with real user credentials
- P2: Add i18n translations for onboarding modal strings
- P2: Mobile responsiveness testing for onboarding modals
- P3: Consider "Skip for now" option on company modal
