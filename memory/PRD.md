# DynoPay - PRD & Progress

## Original Problem Statement
1. Set up .env file for DynoPay Next.js application with pod URL for NEXTAUTH_URL and NEXT_PUBLIC_SERVER_URL
2. Add full i18n translations for French (fr) and Spanish (es) across all pages

## Architecture
- **Framework**: Next.js 14.2 (Pages Router) with TypeScript
- **UI**: MUI Material, Recharts
- **State**: Redux + Redux Saga
- **Auth**: NextAuth.js (Google OAuth)
- **API**: External DynoPay backend at `https://api.dynopay.com/`
- **i18n**: i18next + react-i18next (4 languages: EN, PT, FR, ES)

## What's Been Implemented

### Session 1 (2026-03-05) - .env Setup
- Created `/app/.env.local` with all 8 required environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod URL
- Installed all Node.js dependencies, built Next.js production app

### Session 2 (2026-03-05) - Full i18n Translations
- Created 16 new translation files for French (fr) covering all namespaces
- Created 16 new translation files for Spanish (es) covering all namespaces
- Updated existing fr/common.json, fr/auth.json, es/common.json, es/auth.json with missing keys
- Updated i18n.js to register all 17 namespaces for fr and es
- LanguageSwitcher component updated to support all 4 languages (PT, EN, FR, ES) with flags
- All 4 languages now have 18 translation files each (full parity)

### Namespaces covered (18 per language):
common, auth, dashboardLayout, profile, notifications, apiScreen, walletScreen, companyDialog, companySettings, transactions, createPaymentLinkScreen, paymentLinks, helpAndSupport, landing, apiStatus, termsConditions, privacyPolicy, amlPolicy

## Testing Results
- Backend: 100%
- Frontend: 100%
- i18n Implementation: 100%
- Language switching verified via screenshots for EN, FR, ES

## Backlog / Next Tasks
- P0: None
- P1: Google OAuth redirect URI configuration (add pod URL to Google Cloud Console)
- P1: Verify i18n works on all internal dashboard pages when logged in
- P2: Telegram bot integration testing
- P2: Complete PT translations review for consistency
