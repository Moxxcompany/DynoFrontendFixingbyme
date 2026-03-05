# DynoPay - PRD & Progress

## Problem Statement
1. Set up `.env` configuration for the DynoPay Next.js application
2. Analyze frontend design for 18 API endpoint implementations

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **State Management**: Redux + Redux-Saga
- **UI**: Material UI (MUI)
- **Auth**: NextAuth with Google OAuth
- **API**: Axios to `api.dynopay.com`
- **Encryption**: CryptoJS AES
- **Integrations**: Telegram, Flutterwave payments

## What's Been Implemented (2026-03-05)
### Session 1: .env Setup
- Created `/app/.env` with all 8 required environment variables
- Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to pod preview URL
- Rebuilt Next.js application (webpack build successful)
- Verified: Homepage loads (HTTP 200), NextAuth Google provider active

### Session 2: Frontend API Endpoint Audit
- Analyzed all 18 endpoints across 5 modules
- **Notification Module (6 endpoints)**: All implemented in NotificationPage.tsx + useNotificationPreferences.ts
- **Referral Module (5 endpoints)**: All implemented in referrals.tsx + ReferralAndKnowledge sidebar
- **API Status Module (2 endpoints)**: Implemented + verified live from screenshot
- **Dashboard Module (4 endpoints)**: Full Redux flow (Actions → Saga → Reducer → Hook → Components)
- **KYC Module (1 endpoint)**: Implemented in NewHeader + MobileNavigationBar

## API Response Contracts Expected by Frontend
### Notification
- `GET /notifications` → `{ status, data: { notifications: [{ notification_id, title, message, type, is_read, created_at }] } }`
- `GET /notifications/unread-count` → `{ status, data: { unread_count: number } }`
- `GET /notifications/preferences` → `{ status, data: { transactionUpdates, paymentReceived, weeklySummary, securityAlerts, emailNotifications, smsNotifications } }`
- `PUT /notifications/preferences` → body: 6 boolean fields, response: `{ status }`
- `PUT /notifications/read-all` → `{ status }`
- `PUT /notifications/{id}/read` → `{ status }`

### Referral
- `GET /referral/my-code` → `{ data: { referral_code, referral_link, stats: { total_referrals, pending, active, rewarded, total_earnings } } }`
- `GET /referral/list` → `{ data: { referrals: [{ id, referred_email, referred_name, status, created_at }] } }`
- `GET /referral/earnings` → `{ data: { summary: { total, pending, credited, withdrawn_earnings }, rewards: [] } }`
- `GET /referral/discount-status` → `{ data: { has_discount, discount_percent, expires_at, reason, days_remaining } }`
- `GET /referral/leaderboard` → `{ data: { leaderboard: [{ rank, name, referral_count, is_current_user }] } }`

### API Status
- `GET /status/services` → `{ data: { services: [{ name, uptime, status }] } }`
- `GET /status/incidents` → `{ data: { incidents: [{ title, formatted_date, description, status }] } }`

### Dashboard
- `GET /dashboard` → `{ data: { total_transactions, total_volume, active_wallets, pending_transactions, fee_tier } }`
- `GET /dashboard/chart` → `{ data: { chart_data: [{ date, volume, transaction_count }] } }`
- `GET /dashboard/fee-tiers` → `{ data: { user_tier, tiers } }`
- `GET /dashboard/recent-transactions` → `{ data: { transactions: [] } }`

### KYC
- `POST /kyc/submit` → `{ data: { verification_url | url } }`

## Backlog
- P1: Google OAuth redirect URI whitelisting for pod URL
- P2: End-to-end auth flow testing with real credentials
- P3: Telegram bot integration testing
- P3: Payment flow testing (Flutterwave)
