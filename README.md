# Test Coverage Strategy

## 📖 Overview
This document outlines our test coverage approach for the SauceDemo application, detailing how we designed our tests, identified bugs, and ensured a robust automation framework.

---

## 🧪 **Testing Scope**

### ✅ **Functional Testing**
We have tested the core functionality of the application, including:
- **Authentication**
  - Valid and invalid login scenarios
  - Handling of locked-out users
- **Inventory Page**
  - Display of products, descriptions, and prices
  - "Add to Cart" functionality
- **Cart & Checkout**
  - Adding/removing items
  - Checkout flow validation
- **Menu Navigation**
  - Verifying all sidebar links
  - Logout functionality

### 🔥 **Negative Testing**
We have deliberately tested edge cases, such as:
- Logging in with incorrect credentials
- Attempting actions on elements that should be disabled
- Handling missing or invalid API responses

### 📊 **API Testing**
- Authentication API (`POST /api/login`)
- Fetching inventory items (`GET /inventory`)
- Adding/removing items from the cart (`POST /cart`)

### ⚡ **Performance Testing**
- Conducted using **cypress-audit** to the lighthouse performances
```sh
npm run cypress:lighthouse   # run performances coverage
---

## 🔍 **Bug Identification Approach**
We follow a systematic approach to identify and report bugs:

1. **Exploratory Testing** - Manually interact with the application to find unexpected behaviors.
2. **Automated Testing Failures** - Investigate Cypress test failures for inconsistencies.
3. **Error Logs & Console Warnings** - Capture issues via browser dev tools.
4. **Boundary Value Analysis** - Test limits (e.g., input lengths, large data loads).
5. **Regression Testing** - Run all automated tests after each new feature or bug fix.

All bugs are documented in [`bug-reports/`](./bug-reports/) with:
- Steps to reproduce
- Expected vs actual results
- Severity and impact analysis
- Suggested fixes

---

## 📝 **Test Writing Process**
1. **Define Test Scenarios**
   - Gather requirements from user stories and acceptance criteria.
   - Identify both positive and negative test cases.

2. **Create Page Objects**  
   - Implement reusable locators in `/support/pages/`.
   
3. **Write Automated Tests**  
   - Cypress tests are stored in `/cypress/e2e/`.
   - Follow a **clear, structured format**:
     - **Arrange**: Setup test state
     - **Act**: Perform actions
     - **Assert**: Verify expected behavior

---

## 🚀 **How to Run Tests**
### **Run All Cypress Tests**
```sh
npm run cypress:open   # Open Cypress UI
npm run cypress:headless    # Run headless mode
