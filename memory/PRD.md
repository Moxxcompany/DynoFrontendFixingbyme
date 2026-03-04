# DynoPay - PRD & Progress Tracker

## Original Problem Statement
User provided DynoPay Next.js app credentials and asked to analyze, setup, and configure the pod URL for NEXTAUTH_URL and NEXT_PUBLIC_SERVER_URL.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **Auth**: NextAuth v4 with Google OAuth
- **State Management**: Redux Toolkit + Redux Saga
- **UI**: MUI v5 + Custom Urbanist/Outfit fonts
- **API Client**: Axios (connecting to external API at https://api.dynopay.com/)
- **Backend Proxy**: FastAPI on port 8001 proxying /api/auth/* to Next.js on port 3000

## Environment Configuration
- `.env.local` in `/app` root with all credentials
- `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` configured to pod URL
- `NEXT_PUBLIC_BASE_URL` pointing to external DynoPay API

## What's Been Implemented (2026-03-04)
- [x] Analyzed existing Next.js DynoPay codebase
- [x] Created `.env.local` with all provided credentials
- [x] Configured NEXTAUTH_URL and NEXT_PUBLIC_SERVER_URL to pod URL
- [x] Installed all Node.js dependencies
- [x] Built Next.js production app
- [x] Created frontend wrapper (`/app/frontend/package.json`) for supervisor
- [x] Created FastAPI backend proxy for NextAuth routes (ingress /api/* routing workaround)
- [x] Verified homepage, login page, register page, and NextAuth OAuth flow

## Test Results
- Backend: 100% (6/6 tests passed)
- Frontend: 95% (14/14 core tests passed, 2 minor non-blocking issues)

## Core Requirements
- Homepage with crypto payment gateway landing page
- User authentication (email/password, email OTP, SMS OTP, Google OAuth)
- Dashboard, transactions, wallets, payment links management
- Admin panel
- Multi-language support (i18n)

## Pages Available
- `/` - Homepage
- `/auth/login` - Login
- `/auth/register` - Register
- `/dashboard` - User Dashboard
- `/transactions` - Transaction history
- `/wallet` - Wallet management
- `/pay-links` - Payment links
- `/create-pay-link` - Create payment link
- `/profile` - User profile
- `/notifications` - Notifications
- `/admin/*` - Admin panel
- `/payment/*` - Payment flow pages
- `/help-support` - Help & Support

## Backlog / Next Tasks
- P0: None (setup complete)
- P1: Google OAuth redirect URI may need to be added to Google Console for this pod URL
- P2: Page title SEO optimization
