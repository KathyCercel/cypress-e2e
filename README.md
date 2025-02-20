# Test Coverage Strategy

## 📖 Overview
This document outlines our test coverage approach for the SauceDemo application, detailing how we designed our tests, identified bugs, and ensured a robust automation framework.

---

## 🧪 **Testing Scope**

### ✅ **Functional Testing**
We have tested the core functionality of the application, including:
- **Authentication** (valid/invalid login, locked-out users)
- **Inventory Page** (product display, add-to-cart functionality)
- **Cart & Checkout** (adding/removing items, checkout flow validation)
- **Menu Navigation** (sidebar links, logout functionality)

### 🔥 **Negative Testing**
We covered edge cases such as:
- Incorrect login credentials
- Actions on disabled elements
- Handling invalid/missing API responses

### 📊 **API Testing**
We validated:
- **Authentication:** Handled entirely on the frontend (`useState`, `setCredentials()`, `verifyCredentials()`).
- **Inventory & Cart Management:** Uses **Local Storage (`cart-contents`)** instead of API calls.

### ⚡ **Performance Testing**
We tested application performance using **cypress-audit** for **Lighthouse analysis**.

---

## 🔍 **Bug Identification Approach**
Our systematic approach includes:
- **Exploratory Testing** - Manually exploring the app for unexpected behaviors.
- **Automated Failures Analysis** - Investigating Cypress test failures.
- **Error Logs & Console Warnings** - Capturing browser dev tool issues.
- **Regression Testing** - Running all tests after feature changes or bug fixes.

Bugs are documented in [`cypress/bug-reports/`](./cypress/bug-reports/) with:
- Steps to reproduce
- Expected vs actual behavior
- Severity & suggested fixes

---

## 📝 **Test Writing Process**
1. **Define Test Scenarios** based on user stories and acceptance criteria.
2. **Use Page Objects** (`/support/pages/`) for reusable selectors.
3. **Write Automated Tests** in `/cypress/e2e/`, following:
   - **Arrange** - Set up test conditions.
   - **Act** - Perform actions.
   - **Assert** - Verify expected behavior.

---

## 🚀 **How to Run Tests**
### **Local Execution**
- **Run Cypress UI:** `npm run cypress:open`
- **Run Headless Mode:** `npm run cypress:headless`
- **Run Lighthouse Performance Tests:** `npm run cypress:lighthouse`
- **Run Cypress in parallel inside Docker containers:** `npm run cypress:docker:parallel`

---

## 🐳 **Running Cypress in Parallel via Docker**
To ensure consistency and faster execution, we run **Cypress tests in parallel inside Docker containers**.

### **Running Parallel Tests**
- **Start parallel execution:** `./run-cypress-parallel.sh`
- **Manually start Docker tests:** `docker-compose up --build --abort-on-container-exit`
- **Stop & cleanup containers:** `docker-compose down`

---

## 📊 **Merging & Viewing Test Reports**
Since Cypress runs in parallel, multiple JSON reports are generated. We **merge them into a single HTML report** using **Mochawesome**.

### **Automatic Report Generation**
- The `run-cypress-parallel.sh` script **automatically merges reports** and **opens the final HTML**.

### **Manually Merging Reports**
1. Merge JSON reports into **`merged-report.json`**.
2. Generate the final HTML report.
3. Open **`mochawesome-report/merged-report.html`**.

All reports are stored in `/mochawesome-report/` .

---

## 🎯 **Final Outcome**
- ✅ **Tests run in parallel via Docker.**
- ✅ **Automated report generation & merging.**
- ✅ **Final HTML report opens automatically.**
- ✅ **Cypress setup is fully streamlined!**
