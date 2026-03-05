# DynoPay - PRD & Progress

## Problem Statement
Analyze and set up `.env` configuration for the DynoPay Next.js application, using the pod URL for `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL`.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **State Management**: Redux + Redux-Saga
- **UI**: Material UI (MUI)
- **Auth**: NextAuth with Google OAuth
- **API**: Axios to `api.dynopay.com`
- **Encryption**: CryptoJS AES
- **Integrations**: Telegram, Flutterwave payments

## What's Been Implemented (2026-03-05)
- Created `/app/.env` with all 8 required environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod preview URL
- Rebuilt Next.js application (webpack build successful)
- Verified: Homepage loads (HTTP 200), NextAuth Google provider active with correct callback URLs

## Environment Variables Configured
| Variable | Value |
|---|---|
| NEXT_PUBLIC_BASE_URL | https://api.dynopay.com/ |
| NEXT_PUBLIC_CYPHER_KEY | (AES encryption key) |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | (Google OAuth client ID) |
| NEXT_PUBLIC_GOOGLE_CLIENT_SECRET | (Google OAuth secret) |
| NEXT_PUBLIC_SERVER_URL | Pod preview URL |
| NEXT_PUBLIC_TELEGRAM_BOT_TOKEN | (Telegram bot token) |
| NEXTAUTH_SECRET | (Session encryption secret) |
| NEXTAUTH_URL | Pod preview URL |

## Backlog
- P1: Google OAuth redirect URI needs to be whitelisted in Google Cloud Console for the pod URL
- P2: Telegram bot integration testing
- P3: Payment flow end-to-end testing
