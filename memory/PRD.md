# DynoPay - PRD & Progress

## Original Problem Statement
1. Set up .env file for DynoPay Next.js application with pod URL for NEXTAUTH_URL and NEXT_PUBLIC_SERVER_URL
2. Add full i18n translations for French (fr) and Spanish (es) across all pages
3. Ensure language selected/detected on landing page persists throughout the entire application unless switched

## Architecture
- **Framework**: Next.js 14.2 (Pages Router) with TypeScript
- **UI**: MUI Material, Recharts
- **State**: Redux + Redux Saga
- **Auth**: NextAuth.js (Google OAuth)
- **API**: External DynoPay backend at `https://api.dynopay.com/`
- **i18n**: i18next + react-i18next + i18next-browser-languagedetector (4 languages: EN, PT, FR, ES)

## What's Been Implemented

### Session 1 (2026-03-05) - .env Setup
- Created `/app/.env.local` with all 8 required environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod URL

### Session 2 (2026-03-05) - Full i18n Translations
- Created 32 new translation files (16 FR + 16 ES) covering all 18 namespaces
- Updated existing fr/es partial files with missing keys
- LanguageSwitcher updated to support all 4 languages with flags

### Session 3 (2026-03-05) - Language Persistence
- Fixed i18n.js: reads saved language from localStorage before init (no more hardcoded 'en')
- Wired up i18next-browser-languagedetector plugin with `lookupLocalStorage: "lang"`
- Added `supportedLngs` whitelist and `convertDetectedLanguage` for browser locale normalization
- `languageChanged` listener now persists every change to localStorage
- LanguageBootstrap detects browser locale for first-time visitors
- Result: language persists across page navigation, full reloads, and the entire app lifecycle

## Testing Results
- All persistence scenarios passed: switch → navigate → persist, switch → reload → persist
- No flash of English on page reload
- localStorage key 'lang' correctly maintained across all flows

## Backlog / Next Tasks
- P1: Google OAuth redirect URI configuration
- P2: Verify i18n persistence across auth flows (login → dashboard → logout)
- P2: Telegram bot integration testing
