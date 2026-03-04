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
- Added 8 missing currencies: SOL, XRP, BNB, POLYGON, USDT-POLYGON, USDC-ERC20, RLUSD, RLUSD-ERC20 (total: 16)
- Updated: useWalletData.ts (ALLCRYPTOCURRENCIES, WALLET_ORDER, WALLET_ICONS, WALLET_NAMES)
- Updated: wallet.ts (WalletType, CryptoCode types)
- XRP Tag field now conditional: only shows for XRP and RLUSD (TAG_BASED_CHAINS)
- destination_tag sent in payload only for tag-based chains

### Session 7 — Onboarding UX Fix (P0)
- **Created**: `Components/UI/OnboardingChecklist/index.tsx` - A setup checklist component on the dashboard
  - Shows 3-step progress: Create Company, Add Wallet, Create Payment Link
  - Progress bar with completion count
  - Completed steps show green checkmarks
  - Pending steps are clickable and navigate to the correct page
  - "Create Payment Link" step is disabled until company + wallet exist
  - Checklist auto-hides when all prerequisites (company + wallet) are met
- **Modified**: `pages/dashboard.tsx` - Added OnboardingChecklist, "Create Payment Link" button hidden until setup is complete
- **Modified**: `pages/create-pay-link.tsx` - Added guard that blocks payment link creation when company or wallet is missing, shows missing steps with navigation

## Backlog
- P1: Wire up Auto-Conversion APIs (GET/PUT /api/company/auto-convert/{id})
- P1: Wire up remaining Referral APIs (8 endpoints)
- P2: 2FA (no UI), Invoices (no UI), Webhook Config (no UI)
- P2: Subscriptions (no UI), Knowledge Base dynamic

## Refactoring Notes
- Hardcoded crypto list in `useWalletData.ts` should be fetched from backend
- Redux Sagas could be better organized by feature
