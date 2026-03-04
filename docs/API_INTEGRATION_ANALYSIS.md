# DynoPay API Integration Analysis
## Comparing API Docs (https://api.dynopay.com/api/docs/) vs Frontend Codebase

---

## LEGEND
- INTEGRATED = API call exists in codebase and is wired up
- NOT INTEGRATED = API endpoint exists in docs but no corresponding frontend call
- PARTIAL = Some operations integrated, others missing

---

## 1. Authentication
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 1 | `/api/user/registerUser` | POST | INTEGRATED | UserSaga.ts → `registerUser()` |
| 2 | `/api/user/login` | POST | INTEGRATED | UserSaga.ts → `userLogin()` |
| 3 | `/api/user/forgot-password` | POST | INTEGRATED | UserSaga.ts → `generateResetLink()` |
| 4 | `/api/user/reset-password` | POST | INTEGRATED | UserSaga.ts → `resetPassword()` |
| 5 | `/api/user/google-signin` | POST | INTEGRATED | pages/auth/login.tsx (line ~268) |
| 6 | `/api/user/createUser` | POST | NOT INTEGRATED | Direct API / merchant-side only |

## 2. User Management
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 7 | `/api/user/registerPhone` | POST | NOT INTEGRATED | — |
| 8 | `/api/user/registerPhone/verify` | POST | NOT INTEGRATED | — |
| 9 | `/api/user/checkEmail` | GET | INTEGRATED | pages/auth/login.tsx (line ~661) |
| 10 | `/api/user/generateOTP` | POST | INTEGRATED | UserSaga.ts → `generateOTP()` |
| 11 | `/api/user/confirmOTP` | POST | INTEGRATED | UserSaga.ts → `confirmOTP()` |
| 12 | `/api/user/connectSocial` | POST | INTEGRATED | pages/auth/validateSocialLogin.tsx |
| 13 | `/api/user/facebook-signin` | POST | NOT INTEGRATED | — |
| 14 | `/api/user/profile` (GET) | GET | INTEGRATED | UserSaga.ts → `fetchProfile()` |
| 15 | `/api/user/profile` (PUT) | PUT | NOT INTEGRATED | — (uses updateUser instead) |
| 16 | `/api/user/email` (PUT) | PUT | NOT INTEGRATED | — |
| 17 | `/api/user/email` (DELETE) | DELETE | NOT INTEGRATED | — |
| 18 | `/api/user/phone` (PUT) | PUT | NOT INTEGRATED | — |
| 19 | `/api/user/phone` (DELETE) | DELETE | NOT INTEGRATED | — |
| 20 | `/api/user/updateUser` | PUT | INTEGRATED | UserSaga.ts → `updateUser()` |
| 21 | `/api/user/changePassword` | PUT | INTEGRATED | UserSaga.ts → `changePassword()` |
| 22 | `/api/user/account` (DELETE) | DELETE | NOT INTEGRATED | — |
| 23 | `/api/user/onboarding-status` | GET | NOT INTEGRATED | — |

## 3. Company
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 24 | `/api/company/addCompany` | POST | INTEGRATED | CompanySaga.ts → `addCompany()` |
| 25 | `/api/company/updateCompany/{id}` | PUT | INTEGRATED | CompanySaga.ts → `updateCompany()` |
| 26 | `/api/company/getCompany` | GET | INTEGRATED | CompanySaga.ts → `getCompany()` |
| 27 | `/api/company/getCompany/{id}` | GET | NOT INTEGRATED | — |
| 28 | `/api/company/getTransactions/{id}` | GET | NOT INTEGRATED | — |
| 29 | `/api/company/deleteCompany/{id}` | DELETE | INTEGRATED | CompanySaga.ts → `deleteCompany()` |
| 30 | `/api/company/validateTaxId` | POST | INTEGRATED | CompanySaga.ts → `validateTax()` |

## 4. Wallet Address Management
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 31 | `/api/wallet/getWallet` | GET | INTEGRATED | WalletSaga.ts → `getWallet()` + withdraw.tsx |
| 32 | `/api/wallet/address/{id}` (PUT) | PUT | NOT INTEGRATED | — |
| 33 | `/api/wallet/validateWalletAddress` | POST | INTEGRATED | WalletSaga.ts + walletAddress.tsx |
| 34 | `/api/wallet/verifyOtp` | POST | INTEGRATED | WalletSaga.ts → `verifyOtp()` (as `/wallet/verifyCode`) |
| 35 | `/api/wallet/wallet/update/send-otp` | POST | NOT INTEGRATED | — |
| 36 | `/api/wallet/wallet/update` | POST | NOT INTEGRATED | — |
| 37 | `/api/wallet/wallet/delete/send-otp` | POST | NOT INTEGRATED | — |
| 38 | `/api/wallet/wallet/delete/verify` | POST | NOT INTEGRATED | — |
| 39 | `/api/wallet/getWalletAddresses` | GET | INTEGRATED | withdraw.tsx (line ~299) |
| 40 | `/api/wallet/addWalletAddress` | POST | INTEGRATED | withdraw.tsx (line ~338) |
| 41 | `/api/wallet/address/send-otp` | POST | NOT INTEGRATED | — |
| 42 | `/api/wallet/address/delete/send-otp` | POST | NOT INTEGRATED | — |
| 43 | `/api/wallet/deleteWalletAddress` | POST | INTEGRATED | walletAddress.tsx (line ~287) |

## 5. API Keys
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 44 | `/api/userApi/addApi` | POST | INTEGRATED | ApiSaga.ts → `addApi()` |
| 45 | `/api/userApi/getApi` | GET | INTEGRATED | ApiSaga.ts → `getApi()` |
| 46 | `/api/userApi/getApi/{id}` | GET | NOT INTEGRATED | — |
| 47 | `/api/userApi/updateApi/{id}` | PUT | INTEGRATED | ApiSaga.ts → `updateApi()` |
| 48 | `/api/userApi/regenerateKey/{id}` | POST | INTEGRATED | ApiSaga.ts → `regenerateApi()` (path: `regenerateApi/{id}`) |
| 49 | `/api/userApi/toggleStatus/{id}` | PUT | INTEGRATED | ApiSaga.ts → `toggleApiStatus()` |
| 50 | `/api/userApi/revoke/{id}` | POST | NOT INTEGRATED | — |
| 51 | `/api/userApi/deleteApi/{id}` | DELETE | INTEGRATED | ApiSaga.ts → `deleteApi()` |
| 52 | `/api/userApi/createPlan` | POST | NOT INTEGRATED | — |
| 53 | `/api/userApi/getPlans/{id}` | GET | NOT INTEGRATED | — |
| 54 | `/api/userApi/updatePlan/{id}` | PUT | NOT INTEGRATED | — |
| 55 | `/api/userApi/deletePlan/{id}` | DELETE | NOT INTEGRATED | — |
| 56 | `/api/userApi/getApiCustomers` | POST | NOT INTEGRATED | — |
| 57 | `/api/userApi/updateCustomer/{id}` | PUT | NOT INTEGRATED | — |
| 58 | `/api/userApi/deleteCustomer/{id}` | DELETE | NOT INTEGRATED | — |
| 59 | `/api/userApi/usage/{id}` | GET | NOT INTEGRATED | — |
| 60 | `/api/userApi/logs/{id}` | GET | NOT INTEGRATED | — |
| 61 | `/api/userApi/rateLimit/{id}` | PUT | NOT INTEGRATED | — |
| 62 | `/api/userApi/availableCurrencies/{company_id}` | GET | NOT INTEGRATED | — |

## 6. KYC Verification
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 63 | `/api/kyc/status` | GET | NOT INTEGRATED | — |
| 64 | `/api/kyc/requirements` | GET | NOT INTEGRATED | — |
| 65 | `/api/kyc/history` | GET | NOT INTEGRATED | — |
| 66 | `/api/kyc/submit` | POST | NOT INTEGRATED | — |
| 67 | `/api/kyc/resubmit` | POST | NOT INTEGRATED | — |
| 68 | `/api/kyc/webhook` | POST | NOT INTEGRATED | (server-side) |

## 7. Payments (Dashboard - Payment Links)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 69 | `/api/pay/createPaymentLink` | POST | INTEGRATED | PaymentLinkSaga.ts |
| 70 | `/api/pay/getPaymentLinks` | GET | INTEGRATED | PaymentLinkSaga.ts |
| 71 | `/api/pay/links/{id}` (GET) | GET | INTEGRATED | pages/pay-links/[slug]/index.tsx |
| 72 | `/api/pay/links/{id}` (PUT) | PUT | INTEGRATED | PaymentLinkSaga.ts |
| 73 | `/api/pay/deletePaymentLink/{id}` | DELETE | INTEGRATED | PaymentLinkSaga.ts |
| 74 | `/api/pay/fee-preview` | GET | INTEGRATED | PaymentLinkSaga.ts |
| 75 | `/api/pay/company-currencies/{company_id}` | GET | NOT INTEGRATED | — |
| 76 | `/api/pay/calculateFees` | POST | NOT INTEGRATED | — |

## 8. Payment Processing (Checkout Flow)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 77 | `/api/wallet/addFunds` | POST | INTEGRATED | payment/index.tsx + multiple payment components |
| 78 | `/api/wallet/authStep` | POST | INTEGRATED | CardComponent.tsx |
| 79 | `/api/wallet/verifyPayment` | POST | INTEGRATED | Multiple payment components |
| 80 | `/api/wallet/confirmPayment` | POST | INTEGRATED | payment/verify.tsx |
| 81 | `/api/wallet/verifyCryptoPayment` | POST | INTEGRATED | CryptoComponent.tsx |
| 82 | `/api/pay/getData` | POST | NOT INTEGRATED | — |
| 83 | `/api/pay/createCryptoPayment` | POST | NOT INTEGRATED | — |
| 84 | `/api/pay/verifyCryptoPayment` | POST | NOT INTEGRATED | — |
| 85 | `/api/pay/confirmPayment` | POST | NOT INTEGRATED | — |
| 86 | `/api/pay/addPayment` | POST | NOT INTEGRATED | — |
| 87 | `/api/pay/verifyPayment` | POST | NOT INTEGRATED | — |
| 88 | `/api/pay/getCurrencyRates` | POST | NOT INTEGRATED | — |
| 89 | `/api/pay/network-fees` | GET | NOT INTEGRATED | — |
| 90 | `/api/pay/calculate-payment` | POST | NOT INTEGRATED | — |
| 91 | `/api/pay/getBalance` | GET | NOT INTEGRATED | — |
| 92 | `/api/pay/getCurrencyRatesInternal` | POST | NOT INTEGRATED | — |
| 93 | `/api/pay/authStep` | POST | NOT INTEGRATED | — |
| 94 | `/api/pay/configured-currencies` | GET | NOT INTEGRATED | — |

## 9. Transactions
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 95 | `/api/wallet/getWalletTransactions/{id}` | POST | NOT INTEGRATED | — |
| 96 | `/api/wallet/getAllTransactions` | POST | INTEGRATED | TransactionSaga.ts |
| 97 | `/api/wallet/transaction/{id}` | GET | INTEGRATED | TransactionSaga.ts |
| 98 | `/api/wallet/transactions/export` | POST | INTEGRATED | TransactionSaga.ts |
| 99 | `/api/wallet/sendConfirmationOTP` | POST | INTEGRATED | withdraw.tsx |
| 100 | `/api/wallet/withdrawAssets` | POST | INTEGRATED | withdraw.tsx |
| 101 | `/api/wallet/exchangeCreate` | POST | NOT INTEGRATED | — |
| 102 | `/api/wallet/confirmExchange` | POST | NOT INTEGRATED | — |
| 103 | `/api/wallet/getExchange` | GET | NOT INTEGRATED | — |
| 104 | `/api/transactions/{id}/invoice` | GET | NOT INTEGRATED | — |

## 10. Dashboard
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 105 | `/api/dashboard` | GET | INTEGRATED | DashboardSaga.ts |
| 106 | `/api/dashboard/chart` | GET | INTEGRATED | DashboardSaga.ts |
| 107 | `/api/dashboard/fee-tiers` | GET | INTEGRATED | DashboardSaga.ts |
| 108 | `/api/dashboard/recent-transactions` | GET | INTEGRATED | DashboardSaga.ts |

## 11. Invoices
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 109 | `/api/transactions/{id}/invoice` | GET | NOT INTEGRATED | — |
| 110 | `/api/invoices` | GET | NOT INTEGRATED | — |
| 111 | `/api/invoices/{id}` | GET | NOT INTEGRATED | — |
| 112 | `/api/invoices/{id}/pdf` | GET | NOT INTEGRATED | — |

## 12. Subscriptions
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 113 | `/api/subscriptions` (GET) | GET | NOT INTEGRATED | — |
| 114 | `/api/subscriptions` (POST) | POST | NOT INTEGRATED | — |
| 115 | `/api/subscriptions/{id}` (GET) | GET | NOT INTEGRATED | — |
| 116 | `/api/subscriptions/{id}` (PUT) | PUT | NOT INTEGRATED | — |
| 117 | `/api/subscriptions/{id}` (DELETE) | DELETE | NOT INTEGRATED | — |

## 13. Auto-Stablecoin Conversion
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 118 | `/api/company/auto-convert/{id}` (GET) | GET | NOT INTEGRATED | — |
| 119 | `/api/company/auto-convert/{id}` (PUT) | PUT | NOT INTEGRATED | — |
| 120 | `/api/company/conversion-history/{id}` | GET | NOT INTEGRATED | — |
| 121 | `/api/company/conversion/{conversionId}` | GET | NOT INTEGRATED | — |
| 122 | `/api/company/conversion/{conversionId}/retry` | POST | NOT INTEGRATED | — |

## 14. Webhooks (Company Config)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 123 | `/api/company/webhook-settings/{id}` (GET) | GET | NOT INTEGRATED | — |
| 124 | `/api/company/webhook-settings/{id}` (PUT) | PUT | NOT INTEGRATED | — |
| 125 | `/api/company/webhook-test/{id}` | POST | NOT INTEGRATED | — |
| 126 | `/api/company/webhook-history/{id}` | GET | NOT INTEGRATED | — |
| 127 | `/api/company/webhook-history/{id}/detail/{logId}` | GET | NOT INTEGRATED | — |
| 128 | `/api/company/webhook-stats/{id}` | GET | NOT INTEGRATED | — |

## 15. Tax
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 129 | `/api/tax/rate/{countryCode}` | GET | NOT INTEGRATED | — |
| 130 | `/api/tax/validate` | POST | NOT INTEGRATED | — |
| 131 | `/api/tax/acronyms` | GET | NOT INTEGRATED | — |
| 132 | `/api/tax/lookup` | GET | NOT INTEGRATED | — |

## 16. Notifications
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 133 | `/api/notifications` (GET) | GET | INTEGRATED | NotificationPage.tsx |
| 134 | `/api/notifications/preferences` (GET) | GET | INTEGRATED | useNotificationPreferences.ts |
| 135 | `/api/notifications/preferences` (PUT) | PUT | INTEGRATED | useNotificationPreferences.ts |
| 136 | `/api/notifications/unread-count` | GET | INTEGRATED | NotificationPage.tsx |
| 137 | `/api/notifications/read-all` | PUT | INTEGRATED | NotificationPage.tsx |
| 138 | `/api/notifications/{id}/read` | PUT | INTEGRATED | NotificationPage.tsx |
| 139 | `/api/notifications/types` | GET | NOT INTEGRATED | — |
| 140 | `/api/notifications/{id}` (DELETE) | DELETE | NOT INTEGRATED | — |
| 141 | `/api/notifications/trigger-weekly-summary` | POST | NOT INTEGRATED | (admin/internal) |
| 142 | `/api/notifications/trigger-wallet-reminder` | POST | NOT INTEGRATED | (admin/internal) |

## 17. Status (API Status Page)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 143 | `/api/status` | GET | NOT INTEGRATED | — |
| 144 | `/api/status/health` | GET | NOT INTEGRATED | — |
| 145 | `/api/status/check` | POST | NOT INTEGRATED | — |
| 146 | `/api/status/services` | GET | INTEGRATED | pages/api-status.tsx |
| 147 | `/api/status/services/uptime` | GET | NOT INTEGRATED | — |
| 148 | `/api/status/service/{serviceId}` | GET | NOT INTEGRATED | — |
| 149 | `/api/status/service/{serviceId}/uptime` | GET | NOT INTEGRATED | — |
| 150 | `/api/status/uptime` | GET | NOT INTEGRATED | — |
| 151 | `/api/status/incidents` | GET | INTEGRATED | pages/api-status.tsx |
| 152 | `/api/status/incidents/{id}` | GET | NOT INTEGRATED | — |

## 18. Knowledge Base
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 153 | `/api/kb/categories` | GET | NOT INTEGRATED | (hardcoded help pages) |
| 154 | `/api/kb/articles` | GET | NOT INTEGRATED | — |
| 155 | `/api/kb/articles/{slug}` | GET | NOT INTEGRATED | — |
| 156 | `/api/kb/search` | GET | NOT INTEGRATED | — |
| 157 | `/api/kb/popular` | GET | NOT INTEGRATED | — |
| 158 | `/api/kb/articles/{id}/feedback` | POST | NOT INTEGRATED | — |
| 159 | `/api/kb/admin/articles` (POST) | POST | NOT INTEGRATED | — |
| 160 | `/api/kb/admin/articles/{id}` (PUT) | PUT | NOT INTEGRATED | — |
| 161 | `/api/kb/admin/articles/{id}` (DELETE) | DELETE | NOT INTEGRATED | — |

## 19. Admin
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 162 | `/api/admin/login` | POST | INTEGRATED | pages/admin/login.tsx |
| 163 | `/api/admin/createWallets` | POST | INTEGRATED | pages/admin/wallet.tsx |
| 164 | `/api/admin/withdrawAssets` | POST | INTEGRATED | pages/admin/withdraw.tsx |
| 165 | `/api/admin/getWallets` | GET | INTEGRATED | pages/admin/wallet.tsx + withdraw.tsx |
| 166 | `/api/admin/getAllTransactions` | GET | NOT INTEGRATED | — |
| 167 | `/api/admin/getAllUsers` | GET | NOT INTEGRATED | — |
| 168 | `/api/admin/getAdminAnalytics` | POST | NOT INTEGRATED | — |
| 169 | `/api/admin/getTransferFees` | GET | INTEGRATED | pages/admin/transferSpeed.tsx |
| 170 | `/api/admin/updateTransferFees` | PUT | INTEGRATED | pages/admin/transferSpeed.tsx |
| 171 | `/api/admin/getFeeWalletBalance` | GET | INTEGRATED | pages/admin/fee.tsx |
| 172 | `/api/admin/newTransactionFee` | POST | INTEGRATED | pages/admin/index.tsx |
| 173 | `/api/admin/getTransactionFee` | GET | INTEGRATED | pages/admin/index.tsx |
| 174 | `/api/admin/updateFeeLimits` | PUT | INTEGRATED | pages/admin/fee.tsx |
| 175 | `/api/admin/changePassword` | PUT | INTEGRATED | pages/admin/profile.tsx |
| 176 | `/api/admin/updateEmail` | PUT | INTEGRATED | pages/admin/profile.tsx |
| 177 | `/api/admin/users/{userId}` | GET | NOT INTEGRATED | — |
| 178 | `/api/admin/users/{userId}/ban` | PUT | NOT INTEGRATED | — |
| 179 | `/api/admin/users/unlock` | POST | NOT INTEGRATED | — |
| 180 | `/api/admin/alerts/health` | GET | NOT INTEGRATED | — |
| 181 | `/api/admin/alerts/test` | POST | NOT INTEGRATED | — |
| 182 | `/api/admin/analytics/revenue` | GET | NOT INTEGRATED | — |
| 183 | `/api/admin/analytics/users` | GET | NOT INTEGRATED | — |
| 184 | `/api/admin/analytics/cohorts` | GET | NOT INTEGRATED | — |
| 185 | `/api/admin/analytics/funnel` | GET | NOT INTEGRATED | — |

## 20. Security (2FA, Sessions)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 186 | `/api/csrf-token` | GET | NOT INTEGRATED | — |
| 187 | `/api/user/2fa/setup` | POST | NOT INTEGRATED | — |
| 188 | `/api/user/2fa/verify-setup` | POST | NOT INTEGRATED | — |
| 189 | `/api/user/2fa/validate` | POST | NOT INTEGRATED | — |
| 190 | `/api/user/2fa/disable` | POST | NOT INTEGRATED | — |
| 191 | `/api/user/2fa/regenerate-backup-codes` | POST | NOT INTEGRATED | — |
| 192 | `/api/user/2fa/status` | GET | NOT INTEGRATED | — |
| 193 | `/api/user/refresh-token` | POST | NOT INTEGRATED | — |
| 194 | `/api/user/sessions` (GET) | GET | NOT INTEGRATED | — |
| 195 | `/api/user/sessions` (DELETE) | DELETE | NOT INTEGRATED | — |
| 196 | `/api/user/sessions/{id}` (DELETE) | DELETE | NOT INTEGRATED | — |
| 197 | `/api/user/login-history` | GET | NOT INTEGRATED | — |

## 21. Real-Time Events (SSE)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 198 | `/api/events/stream` | GET | NOT INTEGRATED | — |
| 199 | `/api/events/stats` | GET | NOT INTEGRATED | — |
| 200 | `/api/events/push-stats` | GET | NOT INTEGRATED | — |
| 201 | `/api/events/broadcast` | POST | NOT INTEGRATED | (admin) |
| 202 | `/api/events/push` | POST | NOT INTEGRATED | (admin) |
| 203 | `/api/events/admin-event` | POST | NOT INTEGRATED | (admin) |

## 22. Referral System
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 204 | `/api/referral/my-code` | GET | INTEGRATED | ReferralAndKnowledge/index.tsx |
| 205 | `/api/referral/list` | GET | NOT INTEGRATED | — |
| 206 | `/api/referral/earnings` | GET | NOT INTEGRATED | — |
| 207 | `/api/referral/validate` | POST | NOT INTEGRATED | — |
| 208 | `/api/referral/apply` | POST | NOT INTEGRATED | — |
| 209 | `/api/referral/leaderboard` | GET | NOT INTEGRATED | — |
| 210 | `/api/referral/referee/validate` | POST | NOT INTEGRATED | — |
| 211 | `/api/referral/referee/redeem` | POST | NOT INTEGRATED | — |
| 212 | `/api/referral/discount-status` | GET | NOT INTEGRATED | — |

## 23. Currency & Fees
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 213 | `/api/wallet/getCurrencyRates` | POST | INTEGRATED | Multiple payment components |
| 214 | `/api/wallet/estimateFees` | POST | INTEGRATED | withdraw.tsx |
| 215 | `/api/wallet/network-fees` | GET | NOT INTEGRATED | — |
| 216 | `/api/wallet/calculate-payment` | POST | NOT INTEGRATED | — |
| 217 | `/api/wallet/configured-currencies` | GET | NOT INTEGRATED | — |

## 24. Analytics
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 218 | `/api/wallet/getUserAnalytics` | POST | INTEGRATED | DashboardSaga.ts |

## 25. Conversion Tracker
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 219 | `/api/dashboard/conversions` | GET | NOT INTEGRATED | — |
| 220 | `/api/dashboard/conversions/{id}` | GET | NOT INTEGRATED | — |

## 26. Email Unsubscribe (typically no-auth, external links)
| # | Endpoint | Method | Status | Location |
|---|----------|--------|--------|----------|
| 221-224 | Unsubscribe endpoints | GET/POST | NOT INTEGRATED | (triggered via email links, not dashboard) |

---

## SUMMARY STATISTICS

| Category | Total Endpoints | Integrated | Not Integrated | % Done |
|----------|----------------|------------|----------------|--------|
| Authentication | 6 | 5 | 1 | 83% |
| User Management | 17 | 8 | 9 | 47% |
| Company | 7 | 5 | 2 | 71% |
| Wallet Address Mgmt | 13 | 6 | 7 | 46% |
| API Keys | 19 | 6 | 13 | 32% |
| KYC Verification | 6 | 0 | 6 | 0% |
| Payments (Links) | 8 | 6 | 2 | 75% |
| Payment Processing | 18 | 5 | 13 | 28% |
| Transactions | 10 | 5 | 5 | 50% |
| Dashboard | 4 | 4 | 0 | 100% |
| Invoices | 4 | 0 | 4 | 0% |
| Subscriptions | 5 | 0 | 5 | 0% |
| Auto-Stablecoin | 5 | 0 | 5 | 0% |
| Webhooks Config | 6 | 0 | 6 | 0% |
| Tax | 4 | 0 | 4 | 0% |
| Notifications | 10 | 6 | 4 | 60% |
| Status | 10 | 2 | 8 | 20% |
| Knowledge Base | 9 | 0 | 9 | 0% |
| Admin | 24 | 12 | 12 | 50% |
| Security (2FA) | 12 | 0 | 12 | 0% |
| Real-Time Events | 6 | 0 | 6 | 0% |
| Referral | 9 | 1 | 8 | 11% |
| Currency & Fees | 5 | 2 | 3 | 40% |
| Analytics | 1 | 1 | 0 | 100% |
| Conversion Tracker | 2 | 0 | 2 | 0% |
| Email Unsubscribe | 4 | 0 | 4 | 0% |
| **TOTAL** | **~224** | **~74** | **~150** | **~33%** |

---

## TOP PRIORITY MISSING INTEGRATIONS (User-facing features)

### P0 — Critical (Core user functionality)
1. **KYC Verification** (6 endpoints) — Required for compliance, users can't verify identity
2. **Security / 2FA** (12 endpoints) — No two-factor auth, no session management, no login history
3. **Invoices** (4 endpoints) — Users cannot view/download transaction invoices
4. **Webhook Configuration** (6 endpoints) — Merchants can't configure webhooks from dashboard
5. **Wallet OTP-based Update/Delete** (4 endpoints) — New OTP flow for wallet changes not wired

### P1 — High (Important business features)
6. **Subscriptions** (5 endpoints) — Recurring payments not available
7. **Auto-Stablecoin Conversion** (5 endpoints) — Volatile crypto auto-conversion not in UI
8. **Referral System** (8 endpoints) — Only `my-code` is fetched; no apply, validate, earnings, leaderboard
9. **Knowledge Base** (9 endpoints) — Help pages are hardcoded, not using dynamic KB API
10. **API Key Plans/Customers/Usage/Logs** (11 endpoints) — API management section is basic

### P2 — Medium (Admin & secondary features)
11. **Admin Analytics/Users/Bans** (8 endpoints) — Admin can't view users, analytics, ban/unlock
12. **Payment Processing** (`/api/pay/*` checkout endpoints) — 13 endpoints not used
13. **Tax System** (4 endpoints) — No tax rate lookup or validation in frontend
14. **Status Page** (8 more endpoints) — Only services + incidents; missing uptime, health details
15. **Real-Time Events / SSE** (6 endpoints) — No live updates in dashboard
16. **Conversion Tracker** (2 endpoints) — Dashboard conversion tracking not implemented

### P3 — Low (Nice to have)
17. **User phone registration** (2 endpoints)
18. **Facebook sign-in** (1 endpoint)
19. **Delete account** (1 endpoint)
20. **Email unsubscribe** (4 endpoints — typically email-link triggered)
21. **Notification delete & types** (2 endpoints)

---

## ENDPOINT PATH MISMATCHES (Potential Bugs)

| # | Code Path | API Docs Path | Issue |
|---|-----------|---------------|-------|
| 1 | `wallet/verifyCode` (WalletSaga) | `/api/wallet/verifyOtp` | Path mismatch — may cause 404 |
| 2 | `userApi/regenerateApi/{id}` (ApiSaga) | `/api/userApi/regenerateKey/{id}` | Path mismatch — `regenerateApi` vs `regenerateKey` |
| 3 | `wallet/updateWallet/{id}` (WalletSaga) | `/api/wallet/address/{id}` OR `/api/wallet/wallet/update` | Path mismatch — old endpoint name |
| 4 | `wallet/deleteWallet/{id}` (WalletSaga) | `/api/wallet/wallet/delete/verify` or `/api/wallet/deleteWalletAddress` | Path mismatch — old endpoint name |
