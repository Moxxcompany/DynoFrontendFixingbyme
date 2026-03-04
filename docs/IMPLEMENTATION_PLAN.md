# DynoPay API Integration — Implementation Plan

## Overview
This document outlines the phased implementation plan for wiring the DynoPay frontend to the live backend API at `https://api.dynopay.com/api/`. The current frontend has ~45 endpoints implemented and ~155 endpoints NOT connected, with several critical pages using hardcoded/mock data.

---

## Phase 1 — Core Pages (Static → Live API) [CURRENT]
**Goal**: Wire up the 4 core pages that currently use hardcoded/static data to the live API.

### 1.1 Dashboard Stats & Chart
**Files to modify:**
- `Components/Page/Dashboard/DashboardLeftSection.tsx`
- `Components/Page/Dashboard/DashboardRightSection.tsx`
- `Components/Page/Dashboard/FeeTierProgress.tsx`

**New files to create:**
- `Redux/Actions/DashboardAction.ts`
- `Redux/Reducers/dashboardReducer.ts`
- `Redux/Sagas/DashboardSaga.ts`
- `hooks/useDashboardData.ts`

**API Endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/dashboard` | Fetch total transactions, volume, active wallets, % changes |
| GET | `/api/dashboard/chart?period={7d,30d,90d}&startDate=&endDate=` | Transaction volume chart data |
| GET | `/api/dashboard/fee-tiers` | Fee tier progress (monthly limit, used amount, current tier) |
| GET | `/api/dashboard/recent-transactions` | Recent transactions for right section |

**Implementation Steps:**
1. Create `DashboardAction.ts` with action types: `DASHBOARD_INIT`, `DASHBOARD_FETCH`, `DASHBOARD_CHART_FETCH`, `DASHBOARD_FEE_TIERS_FETCH`, `DASHBOARD_ERROR`
2. Create `dashboardReducer.ts` with state: `{ stats, chartData, feeTiers, recentTransactions, loading }`
3. Create `DashboardSaga.ts` calling the 4 dashboard endpoints via `axiosBaseApi`
4. Register new reducer + saga in root files
5. Create `useDashboardData.ts` hook that dispatches actions and returns data from Redux
6. Update `DashboardLeftSection.tsx`: Replace hardcoded `4`, `$6,479.25`, `12%`, `8.5%`, and `rawTransactionData` with live API data
7. Update `DashboardRightSection.tsx`: Replace `DEFAULT_MONTHLY_LIMIT`, `DEFAULT_USED_AMOUNT`, `CURRENT_TIER` with live API fee-tier data
8. Update `FeeTierProgress.tsx`: Accept dynamic props from live data
9. All components gracefully handle loading states and API errors with fallback to current static values

---

### 1.2 Payment Links — CRUD
**Files to modify:**
- `Components/Page/Payment-link/index.tsx`
- `Components/Page/CreatePaymentLink/index.tsx`

**New files to create:**
- `Redux/Actions/PaymentLinkAction.ts`
- `Redux/Reducers/paymentLinkReducer.ts`
- `Redux/Sagas/PaymentLinkSaga.ts`

**API Endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/pay/getPaymentLinks` | Fetch all payment links (replace hardcoded array) |
| POST | `/api/pay/createPaymentLink` | Create new payment link |
| GET | `/api/pay/links/{id}` | Get single payment link details |
| PUT | `/api/pay/links/{id}` | Update payment link |
| DELETE | `/api/pay/deletePaymentLink/{id}` | Delete payment link |

**Implementation Steps:**
1. Create `PaymentLinkAction.ts` with: `PAYLINK_INIT`, `PAYLINK_FETCH`, `PAYLINK_CREATE`, `PAYLINK_UPDATE`, `PAYLINK_DELETE`, `PAYLINK_ERROR`
2. Create `paymentLinkReducer.ts` with state: `{ paymentLinks[], selectedLink, loading, createLoading }`
3. Create `PaymentLinkSaga.ts` with saga workers for each CRUD operation
4. Register in root reducer + root saga
5. Update `Payment-link/index.tsx`: Replace hardcoded `paymentLinks` array with dispatch/selector from Redux
6. Update `CreatePaymentLink/index.tsx`: Wire `handleCreatePaymentLink` and `handleSaveChanges` to dispatch create/update actions
7. Add delete functionality via dispatch

---

### 1.3 Notification Preferences
**Files to modify:**
- `Components/Page/Notification/NotificationPage.tsx`

**New file to create:**
- `hooks/useNotificationPreferences.ts`

**API Endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/notifications/preferences` | Fetch current notification preferences |
| PUT | `/api/notifications/preferences` | Save notification preferences |

**Implementation Steps:**
1. Create `useNotificationPreferences.ts` hook using axios directly (no Redux needed — simple GET/PUT)
2. Update `NotificationPage.tsx`: Initialize toggle states from API response instead of hardcoded `true`/`false`
3. Wire `handleSaveChanges` to PUT the current preferences to API
4. Show loading spinner while fetching, toast on save success/error

---

### 1.4 User Profile
**Files to modify:**
- `Components/Page/Profile/AccountSetting.tsx`

**API Endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/user/profile` | Fetch full user profile data |

**Implementation Steps:**
1. Add profile fetch to existing `UserSaga.ts` (new action type `USER_PROFILE_FETCH`)
2. Update `userReducer.ts` to store profile data
3. Update `AccountSetting.tsx` to use Redux profile data instead of only JWT-decoded fields

---

## Phase 2 — Complete Existing Pages [NEXT]
- Transaction details & export (GET /transaction/{id}, POST /transactions/export)
- Wallet OTP-based update/delete flows
- API key management (update, regenerate, toggle status)
- Company details & tax validation
- Payment link fee preview

## Phase 3 — New Feature Areas
- KYC verification flow
- 2FA security settings
- Session management & login history
- Currency exchange
- User onboarding status

## Phase 4 — Advanced Features
- Subscriptions, Invoices, Referral program
- Webhook management UI
- Auto-stablecoin conversion
- Real-time SSE events
- System status page, Knowledge Base
- Advanced admin analytics

---

## Technical Notes
- All API calls use `axiosBaseApi` (configured with `NEXT_PUBLIC_BASE_URL` = `https://api.dynopay.com/api/`)
- Auth token is automatically attached via axios interceptor
- Error handling follows existing pattern: dispatch ERROR action, toast notification
- Loading states use existing Skeleton/spinner patterns in the codebase
- Static/hardcoded values become fallback defaults when API returns no data
