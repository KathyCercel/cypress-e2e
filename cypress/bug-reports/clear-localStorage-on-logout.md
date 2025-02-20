# 🐞 Bug Report: LocalStorage Not Cleared on Logout

## **📌 Summary**
After logging out, the **cart-contents** key in `localStorage` is **not cleared**, allowing the previous session’s cart items to persist when the user logs back in. This may lead to security issues and an incorrect shopping experience.

## **🎯 Steps to Reproduce**
1. Navigate to **[SauceDemo](https://www.saucedemo.com/)**
2. Log in using valid credentials (`standard_user`).
3. Add an item to the cart (e.g., **Sauce Labs Backpack**).
4. Observe that the **cart-contents** key in `localStorage` contains `[4]` (or corresponding item ID).
5. Open the side menu and click **Logout**.
6. Observe `localStorage.getItem("cart-contents")` in the browser DevTools. ( more details in `console.log(localStorage);`)
7. **Reload the page and log in again.**
8. The cart **still contains the previously added items**.

## **✅ Expected Behavior**
- Upon logout, `localStorage` should **clear all session-related data** including `cart-contents`.
- The cart should be **empty** when logging in with the same or different user.

## **❌ Actual Behavior**
- `localStorage.getItem("cart-contents")` **persists the old cart data** even after logout.
- The cart still contains previously added items when logging back in.

## **📸 Evidence (Screenshots)**
<details>
  <summary>Before Logout: LocalStorage</summary>
  
  ```json
  {
    "cart-contents": "[4]"
  }
