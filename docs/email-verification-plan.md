# Email Verification Integration — Implementation Plan

## Overview

The backend now requires email verification as a mandatory step before users can access
Company, Wallet, and Dashboard features. Two new endpoints have been added:

- `POST /user/verify-email` — Verify email with OTP code
- `POST /user/resend-verification` — Resend OTP (rate-limited, 429 on cooldown)

Additionally, existing endpoints have been updated:
- `POST /user/registerUser` — Now returns `email_verified: false`, sends OTP to email
- `POST /user/login` — Now returns `email_verified` in `userData`
- `GET /user/onboarding-status` — Now includes `email_verification` object in response
- Company/Wallet/Dashboard tags note "Requires verified email"

---

## Architecture Decision

**Approach: Intercept at Redux level + show OTP modal on auth pages**

When login/register API returns `email_verified: false`, we store the pending
auth data in Redux (email + accessToken) WITHOUT completing the login. The auth
pages (login.tsx, register.tsx) detect this state and show an OTP verification
dialog. Only after successful verification do we complete the login dispatch.

This approach:
- Keeps changes minimal (no new pages/routes)
- Reuses the existing `OtpDialog` component
- Prevents unverified users from ever reaching the dashboard
- Works for both login and register flows

---

## Files to Modify (10 files)

### 1. `/app/Redux/Actions/UserAction.ts`
**Change**: Add two new action type constants

```
USER_NEEDS_VERIFICATION = "USER_NEEDS_VERIFICATION"
USER_EMAIL_VERIFIED = "USER_EMAIL_VERIFIED"
```

**Why**: New Redux actions to handle the intermediate verification state.

---

### 2. `/app/utils/types.ts` — `userReducer` interface
**Change**: Add new fields to the `userReducer` type interface

```typescript
needsVerification: boolean;
pendingEmail: string;
pendingAccessToken: string;
pendingUserData: any;
```

**Why**: TypeScript needs to know about the new state shape for type safety
across components that read `useSelector((state) => state.userReducer)`.

---

### 3. `/app/Redux/Reducers/userReducer.ts`
**Change**: 
- Import `USER_NEEDS_VERIFICATION` and `USER_EMAIL_VERIFIED`
- Add to `userInitialState`:
  ```
  needsVerification: false,
  pendingEmail: "",
  pendingAccessToken: "",
  pendingUserData: null,
  ```
- Add case `USER_NEEDS_VERIFICATION`:
  ```
  → Sets needsVerification: true
  → Stores pendingEmail, pendingAccessToken, pendingUserData from payload
  → Sets loading: false
  ```
- Add case `USER_EMAIL_VERIFIED`:
  ```
  → Completes login: stores token in localStorage
  → Sets name, email from pendingUserData
  → Clears all pending* fields and needsVerification
  → Sets loading: false
  ```

**Why**: This is the core state machine change. The reducer now has an
intermediate state between "not logged in" and "fully logged in."

---

### 4. `/app/Redux/Sagas/UserSaga.ts` — `userLogin()` function
**Change**: After successful API response, check `data.userData.email_verified`

```
Before (current):
  → dispatch USER_LOGIN with userData + accessToken

After (new):
  if (data.userData.email_verified === false) {
    → dispatch USER_NEEDS_VERIFICATION with { email, accessToken, userData }
  } else {
    → dispatch USER_LOGIN (existing behavior, unchanged)
  }
```

**Why**: Login API now returns `email_verified`. If false, we don't complete
the login — we park in verification state.

---

### 5. `/app/Redux/Sagas/UserSaga.ts` — `registerUser()` function
**Change**: Same pattern as login

```
Before (current):
  → dispatch USER_REGISTER with userData + accessToken

After (new):
  if (data.userData.email_verified === false) {
    → dispatch USER_NEEDS_VERIFICATION with { email, accessToken, userData }
    → dispatch TOAST_SHOW "Verification code sent to your email"
  } else {
    → dispatch USER_REGISTER (existing behavior, unchanged)
  }
```

**Why**: Register now sends an OTP email. User must verify before proceeding.

---

### 6. `/app/pages/auth/login.tsx`
**Change**: Add email verification OTP dialog

- Import `OtpDialog` component
- Add state: `emailVerifyOpen`, `verifyOtpCountdown`, `verifyOtpError`, `verifyLoading`
- Watch `userState.needsVerification` — when true, open the OTP dialog
- `onVerify` handler: calls `POST /user/verify-email` with `{ email, otp }`
  - On success: dispatch `USER_EMAIL_VERIFIED` → triggers login completion → existing
    `useEffect` on `userState.name` handles redirect to dashboard
  - On error: show error in OTP dialog
- `onResendCode` handler: calls `POST /user/resend-verification` with `{ email }`
  - Resets countdown timer
  - Handles 429 rate limit error gracefully
- Keep ALL existing login logic untouched (email step, password step,
  forgot password, social login button, animations)

**Why**: This is where the user sees the verification prompt after attempting login.

---

### 7. `/app/pages/auth/register.tsx`
**Change**: Same OTP dialog pattern as login

- Import `OtpDialog` component
- Add same verification state variables
- Watch `userState.needsVerification` — open OTP dialog
- Same `onVerify` and `onResendCode` handlers as login
- On successful verification: dispatch `USER_EMAIL_VERIFIED` → existing
  `useEffect` on `userState.name` triggers `router.push("/dashboard")`
- Keep ALL existing register logic untouched (form fields, validation,
  password strength, confirm password)

**Why**: After registration, the API sends an OTP — user verifies in the
same page via a modal overlay.

---

### 8. `/app/pages/auth/validateSocialLogin.tsx`
**Change**: Handle `email_verified` from social login response

- After `connectSocial` call, check `data.userData.email_verified`
- If `false`: dispatch `USER_NEEDS_VERIFICATION` instead of `USER_LOGIN`
- Add local state for OTP dialog
- Show OTP dialog for verification
- On success: dispatch `USER_EMAIL_VERIFIED`
- Existing redirect `useEffect` on `userState.name` handles navigation

**Why**: Social login users may also need email verification (e.g., first-time
Google sign-in still needs DynoPay email verification).

---

### 9. `/app/Components/Layout/NewHeader/index.tsx`
**Change**: Read `email_verification` from onboarding-status response

- Current code checks `res.data.data.kyc_required`
- Add check for `res.data.data.email_verification?.verified === false`
- If not verified, show a warning banner/indicator (optional — the auth
  pages should already prevent unverified users from reaching here, but
  this is a safety net for edge cases like token expiry during verification)

**Why**: Backend now includes `email_verification` in onboarding-status.
The header should be aware of it as a fallback guard.

---

### 10. `/app/Components/Layout/MobileNavigationBar/index.tsx`
**Change**: Same as NewHeader — read `email_verification` from onboarding-status

**Why**: Same safety net for mobile layout.

---

## Files NOT Modified

| File | Reason |
|------|--------|
| `OnboardingFlow/index.tsx` | Runs only on dashboard, which requires auth. Unverified users never reach it. No changes needed. |
| `OtpDialog` component | Fully reusable as-is. Props match our needs (open, onVerify, onResendCode, countdown, error, loading). |
| `withAuth.tsx` HOC | Checks `localStorage.token`. We don't set token until verification completes. Unverified users have no token → redirect to login. |
| `axiosConfig.ts` | Auth interceptor reads from localStorage. No token = no auth header. Works correctly. |
| `CompanySaga.ts`, `WalletSaga.ts` | Backend gates these with "requires verified email". If somehow called without verification, API returns 403. No frontend changes needed. |

---

## Implementation Order

```
Step 1: UserAction.ts          — Add action constants (2 lines)
Step 2: types.ts               — Add type fields (4 lines)
Step 3: userReducer.ts         — Add state + cases (~30 lines)
Step 4: UserSaga.ts            — Modify login + register sagas (~10 lines each)
Step 5: login.tsx              — Add OTP dialog + handlers (~60 lines)
Step 6: register.tsx           — Add OTP dialog + handlers (~60 lines)
Step 7: validateSocialLogin.tsx — Add verification check (~40 lines)
Step 8: NewHeader/index.tsx    — Read email_verification (~5 lines)
Step 9: MobileNavigationBar    — Read email_verification (~5 lines)
Step 10: Build + Test
```

Steps 1-4 are backend-facing (Redux layer). Steps 5-9 are UI-facing.
Steps 1-3 can be done in parallel. Step 4 depends on 1. Steps 5-7 depend on 1-4.
Steps 8-9 are independent.

---

## OTP Dialog Props Mapping

The existing `OtpDialog` accepts these props. Here's how we'll use them:

| Prop | Value |
|------|-------|
| `open` | `userState.needsVerification && emailVerifyOpen` |
| `onClose` | Optional — may want to prevent close to enforce verification |
| `title` | "Verify Your Email" |
| `subtitle` | "Enter the 6-digit code sent to" |
| `contactInfo` | `userState.pendingEmail` |
| `contactType` | "email" |
| `otpLength` | 6 |
| `onVerify` | `(otp) => POST /user/verify-email { email, otp }` |
| `onResendCode` | `() => POST /user/resend-verification { email }` |
| `countdown` | Local state, reset to 60 on resend |
| `loading` | Local state, true during API call |
| `error` | Local state, set from API error response |
| `preventClose` | `true` — user must verify, cannot skip |

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| Wrong OTP | Show error message in OTP dialog (from API response) |
| Expired OTP | Show "Code expired, please request a new one" |
| Rate limited (429) | Show "Please wait X seconds before requesting a new code" |
| Network error | Show generic error, allow retry |
| Already verified | API returns success, proceed with login |

---

## Testing Checklist

1. Register → should show OTP dialog instead of redirecting to dashboard
2. Enter correct OTP → should complete registration and redirect to dashboard
3. Enter wrong OTP → should show error, allow retry
4. Click resend → should send new OTP, reset countdown
5. Login with unverified email → should show OTP dialog
6. Login with verified email → should go directly to dashboard (no OTP)
7. Social login with unverified email → should show OTP dialog
8. Returning verified user → no changes, works as before
9. OnboardingFlow still works after verification → company → wallet → celebration
10. NewHeader/MobileNavigationBar handle email_verification field gracefully
