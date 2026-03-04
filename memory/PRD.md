# DynoPay - PRD & Progress Tracker

## Original Problem Statement
User provided DynoPay Next.js app credentials and asked to:
1. Analyze and set up the app with environment variables
2. Configure pod URL for NEXTAUTH_URL and NEXT_PUBLIC_SERVER_URL
3. Analyze implemented vs missing API endpoints
4. Create implementation plan and execute Phase 1

## Architecture
- **Framework**: Next.js 14.2.4 (Pages Router)
- **Auth**: NextAuth v4 with Google OAuth
- **State Management**: Redux Toolkit + Redux Saga
- **UI**: MUI v5 + Custom Urbanist/Outfit fonts
- **API Client**: Axios (connecting to external API at https://api.dynopay.com/api/)
- **Backend Proxy**: FastAPI on port 8001 proxying /api/auth/* to Next.js on port 3000
- **i18n**: react-i18next with multiple language support

## Environment Configuration
- `.env.local` in `/app` root with all credentials
- `NEXTAUTH_URL` and `NEXT_PUBLIC_SERVER_URL` = pod URL
- `NEXT_PUBLIC_BASE_URL` = https://api.dynopay.com/api/

## What's Been Implemented

### Session 1 — Setup (2026-03-04)
- [x] Analyzed existing Next.js DynoPay codebase
- [x] Created `.env.local` with all provided credentials
- [x] Configured NEXTAUTH_URL and NEXT_PUBLIC_SERVER_URL to pod URL
- [x] Installed all Node.js dependencies and built production app
- [x] Created frontend wrapper for supervisor
- [x] Created FastAPI backend proxy for NextAuth routes

### Session 2 — API Analysis & Phase 1 (2026-03-04)
- [x] Full API analysis: 45 endpoints implemented, ~155 not implemented
- [x] Created comprehensive implementation plan at `/app/docs/IMPLEMENTATION_PLAN.md`
- [x] **Phase 1.1 — Dashboard**: Wired stats (Total Transactions, Volume, Active Wallets) + chart + fee tier progress to live API via new Redux DashboardAction/Reducer/Saga + useDashboardData hook. Graceful fallback to static data when API returns empty.
- [x] **Phase 1.2 — Payment Links**: Wired payment links list to API via new Redux PaymentLinkAction/Reducer/Saga. CRUD operations (create, update, delete) dispatched through Redux. Fallback to hardcoded sample data. Search filtering added.
- [x] **Phase 1.3 — Notifications**: Created useNotificationPreferences hook with GET/PUT to /notifications/preferences API. Toggle states loaded from API, save button calls API. Toast feedback for success/error.
- [x] **Phase 1.4 — Create Payment Link**: Wired handleCreatePaymentLink to dispatch PAYLINK_CREATE/PAYLINK_UPDATE through Redux Saga → API

### New Files Created
- `Redux/Actions/DashboardAction.ts`
- `Redux/Reducers/dashboardReducer.ts`
- `Redux/Sagas/DashboardSaga.ts`
- `Redux/Actions/PaymentLinkAction.ts`
- `Redux/Reducers/paymentLinkReducer.ts`
- `Redux/Sagas/PaymentLinkSaga.ts`
- `hooks/useDashboardData.ts`
- `hooks/useNotificationPreferences.ts`
- `docs/IMPLEMENTATION_PLAN.md`

### Modified Files
- `Redux/Reducers/index.ts` — Added dashboardReducer, paymentLinkReducer
- `Redux/Actions/index.ts` — Added DashboardAction, PaymentLinkAction
- `Redux/Sagas/RootSaga.ts` — Added Dashboard + PaymentLink saga watchers
- `utils/types.ts` — Added dashboardReducer + paymentLinkReducer to rootReducer type
- `Components/Page/Dashboard/DashboardLeftSection.tsx` — API-connected stats + chart
- `Components/Page/Dashboard/DashboardRightSection.tsx` — API-connected fee tiers
- `Components/Page/Payment-link/index.tsx` — Redux-connected payment links list
- `Components/Page/CreatePaymentLink/index.tsx` — API-connected create/update
- `Components/Page/Notification/NotificationPage.tsx` — API-connected preferences

## Test Results
- Session 1: Backend 100%, Frontend 95% (all core tests passed)
- Session 2: Backend 100%, Frontend 100% (13/13 tests passed)

## Prioritized Backlog

### P0 — Phase 2 (Complete Existing Pages)
- Transaction details view (GET /transaction/{id})
- Transaction export (POST /transactions/export)
- Wallet OTP-based update/delete flows
- API key management (update, regenerate, toggle status)
- Company details & tax validation
- Payment link fee preview

### P1 — Phase 3 (New Feature Areas)
- KYC verification flow (5 endpoints)
- 2FA security settings (5 endpoints)
- Session management & login history
- Currency exchange
- User onboarding status
- User profile full data (GET /user/profile)

### P2 — Phase 4 (Advanced Features)
- Subscriptions & Invoices management
- Webhook management UI
- Auto-stablecoin conversion
- Real-time SSE events
- System status page
- Knowledge Base (dynamic from API)
- Advanced admin analytics
- Referral program

## Next Tasks
1. Phase 2: Wire transaction details, wallet OTP flows, API key management
2. Add Google OAuth redirect URI for pod URL in Google Console
3. Test authenticated flows with real DynoPay user credentials
