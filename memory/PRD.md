# DynoPay - PRD & Implementation Log

## Original Problem Statement
Analyze/set up `.env`, analyze API integrations, fix endpoint mismatches, wire UI, fix bugs, and add missing currencies.

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **UI**: MUI, custom components
- **State**: Redux + Redux Saga
- **Auth**: NextAuth (Google OAuth) + JWT
- **API**: External backend at `https://api.dynopay.com/`

## What's Been Implemented

### Session 1-4
- `.env` setup, API analysis (224 endpoints), 4 endpoint path fixes, KYC banner wiring, Auto-Conversion pre-population, `/apis`→`/developer-keys` route fix

### Session 5
- Logo click → `/dashboard` instead of `/` (NewHeader)
- Referral copy icon — removed overflow:hidden from ReferralCard

### Session 6 — Wallet Currencies + XRP Tag
- Added 8 missing currencies: SOL, XRP, BNB, POLYGON, USDT-POLYGON, USDC-ERC20, RLUSD, RLUSD-ERC20 (total: 16)
- Updated: useWalletData.ts (ALLCRYPTOCURRENCIES, WALLET_ORDER, WALLET_ICONS, WALLET_NAMES)
- Updated: wallet.ts (WalletType, CryptoCode types)
- XRP Tag field now conditional: only shows for XRP and RLUSD (TAG_BASED_CHAINS)
- destination_tag sent in payload only for tag-based chains

## Backlog
- P0: 2FA (no UI), Invoices (no UI), Webhook Config (no UI)
- P1: Subscriptions (no UI), Referral expanded, Knowledge Base dynamic
