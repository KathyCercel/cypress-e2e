# Bug Report: "error_user" Can Log In Despite Expected Failure

## Summary
The **"error_user"** account is expected to fail authentication with an error message, but it successfully logs in and accesses the inventory page.

## Environment
- **Application URL:** [SauceDemo](https://www.saucedemo.com/)
- **Browser:** Chrome 121.0.0.0 (also tested on Firefox)
- **OS:** macOS Sonoma 14.3
- **Cypress Version:** 14.0.3

## Steps to Reproduce
1. Navigate to **https://www.saucedemo.com/**
2. Enter the following credentials:
   - **Username:** `error_user`
   - **Password:** `pick_this_up_from_the_secret_server`
3. Click the **Login** button

## Expected Result
- The user should see an error message:  
  _"Epic sadface: Sorry, this user has been disabled."_
- Login should be blocked, and the user should remain on the login page.

## Actual Result
- The user **successfully logs in** and is redirected to the **inventory page.**
- The page title **"Products"** is visible, confirming successful authentication.

## Screenshots / Logs
_(Attach screenshots or logs if available)_

## Severity
🛑 **High** (Authentication Bypass)

## Impact
- This bug allows a disabled user (`error_user`) to access restricted areas.
- It could indicate a **flaw in user authentication handling** that might affect other accounts.

## Possible Causes
- Backend incorrectly allows authentication for `error_user`.
- Client-side validation might not be properly enforced.
- Incorrect user status handling in session storage/local storage.

## Suggested Fix
- Verify backend logic for disabled users.
- Ensure `error_user` receives a failed
