# DynoPay Frontend - PRD

## Original Problem Statement
Read the README doc, analyze and set up the DynoPay Next.js frontend application. Update the `.env` file with the provided environment variables, using the pod URL for `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL`.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **Language**: TypeScript
- **UI**: Material UI (MUI) v5
- **State**: Redux Toolkit + Redux-Saga
- **Auth**: NextAuth.js v4 (Google OAuth)
- **Backend**: Remote API at `https://api.dynopay.com/api/`
- **Styling**: MUI sx prop + custom themes

## What's Been Implemented (2026-03-04)
- Created `/app/.env` with all 8 environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod preview URL
- Installed all Node.js dependencies via `yarn install --frozen-lockfile`
- Successfully built Next.js production build
- Frontend running on port 3000 via supervisor
- Backend health check running on port 8001
- All tests passing (100% backend, 95% frontend)

## Core Requirements
- Landing page with DynoPay branding
- Auth pages (login, register, social login via Google)
- Dashboard, Transactions, Wallet, Pay Links, Profile
- Admin panel
- Payment flow (payment, verify, success, failed)
- API key management
- i18n support

## Backlog / Future Tasks
- P0: None (setup complete)
- P1: Wire frontend to live DynoPay API endpoints
- P2: Custom domain configuration
- P2: Production deployment optimization
