# DynoPay API Integration — Implementation Plan

## Overview
This document outlines the phased implementation plan for wiring the DynoPay frontend to the live backend API at `https://api.dynopay.com/api/`. The current frontend has ~45 endpoints implemented and ~155 endpoints NOT connected, with several critical pages using hardcoded/mock data.

---

## Phase 1 — Core Pages (Static → Live API) [COMPLETED]
**Goal**: Wire up the 4 core pages that currently use hardcoded/static data to the live API.

### 1.1 Dashboard Stats & Chart — COMPLETED
- Removed hardcoded fallback values (4 transactions, $6,479.25, 12%, 8.5%)
- Dashboard now shows 0/loading states when API has no data
- `DashboardRightSection.tsx` uses dynamic `currentTier` from API instead of constant
- `FeeTierProgress.tsx` default `usedAmount` changed from 6479.25 to 0
- Redux layer (Actions, Reducer, Saga, useDashboardData hook) all wired and calling live API

### 1.2 Payment Links — CRUD — COMPLETED
- Removed hardcoded `fallbackLinks` array (4 demo links)
- Payment links now load exclusively from API; empty state shown when no data
- CRUD operations (create, update, delete) dispatch to live API via Redux saga

### 1.3 Notification Preferences — COMPLETED (previously)
- `useNotificationPreferences` hook fetches and saves via GET/PUT `/notifications/preferences`

### 1.4 User Profile — COMPLETED
- Added `USER_PROFILE_FETCH` action type
- Added profile fetch saga handler (`GET /user/profile`)
- Updated `userReducer` with `profile` and `profileLoading` state
- Wired `pages/profile.tsx` to dispatch `USER_PROFILE_FETCH` and merge API profile data with JWT tokenData

---

## Phase 2 — Complete Existing Pages — COMPLETED
All Phase 2 items have been implemented at the Redux/Saga level:

### 2.1 Transaction Details & Export — COMPLETED
- Added `TRANSACTION_DETAIL_FETCH` action + saga handler (`GET /transaction/{id}`)
- Added `TRANSACTION_EXPORT` action + saga handler (`POST /transactions/export`) with CSV blob download
- Wired export button in `TransactionsTopBar` to dispatch export action with filters

### 2.2 Wallet OTP-based Update/Delete — COMPLETED
- Added `updateWallet` saga handler (`PUT /wallet/updateWallet/{id}` with OTP)
- Added `deleteWallet` saga handler (`DELETE /wallet/deleteWallet/{id}` with OTP)
- Both handlers dispatch TOAST on success/failure and re-fetch wallet list

### 2.3 API Key Management — COMPLETED
- Added `API_UPDATE` action + saga handler (`PUT /userApi/updateApi/{id}`)
- Added `API_REGENERATE` action + saga handler (`POST /userApi/regenerateApi/{id}`)
- Added `API_TOGGLE_STATUS` action + saga handler (`PUT /userApi/toggleStatus/{id}`)
- Updated `apiReducer` to handle update, regenerate, and toggle status actions

### 2.4 Company Tax Validation — COMPLETED
- Added `COMPANY_VALIDATE_TAX` action + saga handler (`POST /company/validateTax`)
- Updated `companyReducer` with `taxValidation` state

### 2.5 Payment Link Fee Preview — COMPLETED
- Added `PAYLINK_FEE_PREVIEW` action + saga handler (`POST /pay/feePreview`)
- Updated `paymentLinkReducer` with `feePreview` state

---

## Phase 3 — New Feature Areas [NOT STARTED]
- KYC verification flow
- 2FA security settings
- Session management & login history
- Currency exchange
- User onboarding status

## Phase 4 — Advanced Features [NOT STARTED]
- Subscriptions, Invoices, Referral program
- Webhook management UI
- Auto-stablecoin conversion
- Real-time SSE events
- System status page, Knowledge Base
- Advanced admin analytics

---

## Known Issues
- **`/apis` and `/api-status` routes return 404**: The Kubernetes ingress routes any path starting with `/api` to the backend service. This causes frontend pages like `/apis` and `/api-status` to be intercepted. This is an infrastructure configuration issue, not a code bug.

## Technical Notes
- All API calls use `axiosBaseApi` (configured with `NEXT_PUBLIC_BASE_URL` = `https://api.dynopay.com/api/`)
- Auth token is automatically attached via axios interceptor
- Error handling follows existing pattern: dispatch ERROR action, toast notification
- Loading states use existing Skeleton/spinner patterns in the codebase
- Static/hardcoded values become fallback defaults when API returns no data
