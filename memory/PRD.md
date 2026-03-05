# DynoPay - PRD & Progress

## Original Problem Statement
1. Set up .env file for DynoPay Next.js application
2. Add full i18n translations for French (fr) and Spanish (es)
3. Ensure language persistence across the entire application
4. Google OAuth should follow the persisted language
5. Add `<html lang>` attribute that updates dynamically on language change

## Architecture
- **Framework**: Next.js 14.2 (Pages Router) with TypeScript
- **i18n**: i18next + react-i18next + i18next-browser-languagedetector
- **Languages**: EN, PT, FR, ES (4 languages, 18 namespaces each)

## What's Been Implemented

### Session 1 - .env Setup
- Created `/app/.env.local` with all 8 environment variables

### Session 2 - Full i18n Translations
- Created 32 new translation files (16 FR + 16 ES) covering all 18 namespaces

### Session 3 - Language Persistence
- i18n.js reads saved language from localStorage before init
- Wired up i18next-browser-languagedetector plugin
- languageChanged listener auto-persists to localStorage

### Session 4 - Google OAuth + HTML lang attribute
- Google OAuth preserves language: localStorage persists across OAuth redirect flow (landing → Google → validateSocialLogin → dashboard)
- LanguageBootstrap now updates `document.documentElement.lang` on init and on every language change
- Verified: switching to FR sets `<html lang="fr">`, navigating to login page maintains `<html lang="fr">`, all text translated
- Google OAuth button and surrounding text translate correctly in all languages

## Key Files Modified
- `/app/i18n.js` - i18n config with browser detection + localStorage persistence
- `/app/helpers/LanguageBootstrap.tsx` - html lang sync + browser locale detection
- `/app/Components/UI/LanguageSwitcher/index.tsx` - 4-language dropdown with flags
- `/app/langs/locales/fr/*` - 18 French translation files
- `/app/langs/locales/es/*` - 18 Spanish translation files

## Known Limitations
- Google OAuth redirect URI needs pod URL added in Google Cloud Console
- `_document.tsx` SSR renders `<html lang="en">` (overridden client-side by LanguageBootstrap)

## Backlog
- P1: Add pod URL to Google Cloud Console for OAuth
- P2: RTL support if Arabic is added in future
