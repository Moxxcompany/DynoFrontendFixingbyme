# DynoPay - PRD & Progress

## Original Problem Statement
1. Set up .env file for DynoPay Next.js application
2. Add full i18n translations for French (fr) and Spanish (es)
3. Ensure language persistence across the entire application
4. Google OAuth should follow the persisted language
5. Add `<html lang>` attribute that updates dynamically on language change
6. Fix registration onboarding flow: show email OTP verification before dashboard redirect

## Architecture
- **Framework**: Next.js 14.2 (Pages Router) with TypeScript
- **i18n**: i18next + react-i18next + i18next-browser-languagedetector
- **Languages**: EN, PT, FR, ES (4 languages, 18 namespaces each)
- **Auth**: NextAuth.js (Google OAuth) + email/password with OTP verification

## What's Been Implemented

### Session 1 - .env Setup
- Created `/app/.env.local` with all 8 environment variables

### Session 2 - Full i18n Translations
- Created 32 new translation files (16 FR + 16 ES)

### Session 3 - Language Persistence + HTML lang
- i18n reads saved language from localStorage before init
- LanguageBootstrap syncs `<html lang>` attribute on every change

### Session 4 - Registration OTP Verification Flow
- **Fixed `/app/pages/auth/register.tsx`**: After registration, the app now shows an email OTP verification dialog instead of immediately redirecting to dashboard
- Added `pendingVerification` state flag that prevents dashboard redirect until email is verified
- OTP dialog uses the existing `OtpDialog` component (same as login page) with `preventClose=true`
- Flow: Register → API returns success → OTP sent to email → User enters OTP → Verified → Redirect to dashboard → OnboardingFlow (company creation + wallet setup)
- Google OAuth flow: Google login → validateSocialLogin → dashboard → OnboardingFlow (no OTP needed since Google verifies email)

## Registration Flow (Fixed)
```
Email/Password:
  Register form → Sign Up → OTP Dialog → Enter code → Verify → Dashboard → Company Modal → Wallet Modal

Google OAuth:
  Landing/Login → Google Sign-In → Redirect back → Dashboard → Company Modal → Wallet Modal
```

## Key Files Modified
- `/app/pages/auth/register.tsx` - Added OTP verification step post-registration
- `/app/i18n.js` - Language persistence + browser detection
- `/app/helpers/LanguageBootstrap.tsx` - HTML lang sync + browser locale detection
- `/app/langs/locales/fr/*` - 18 French translation files
- `/app/langs/locales/es/*` - 18 Spanish translation files

## Testing Results
- Registration OTP flow: Verified — dialog appears after Sign Up, preventClose works
- Language persistence: Verified across navigation and reloads
- Landing page, login, register pages: All rendering correctly

## Backlog
- P1: Add pod URL to Google Cloud Console for OAuth redirect
- P2: Test full end-to-end OTP flow with real email delivery
- P2: Verify onboarding flow completes fully (company → wallet → celebration → dashboard)
