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

## 🏋️‍♂️ **Stress Testing with k6**
To ensure the system can handle extreme loads, we perform **stress testing** using **k6**, a powerful load testing tool for APIs.

### ✅ **Setting Up k6**
- **Install k6** (if not installed):
  ```sh
  brew install k6

```
✓ is status 200
     ✓ response time < 500ms

     checks.........................: 100.00% 24406 out of 24406
     data_received..................: 37 MB   728 kB/s
     data_sent......................: 898 kB  18 kB/s
     http_req_blocked...............: avg=3.36ms  min=0s      med=0s      max=306.51ms p(90)=1µs     p(95)=1µs    
     http_req_connecting............: avg=1.42ms  min=0s      med=0s      max=50.92ms  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=41.78ms min=22.82ms med=41.39ms max=235.07ms p(90)=49.56ms p(95)=52.15ms
       { expected_response:true }...: avg=41.78ms min=22.82ms med=41.39ms max=235.07ms p(90)=49.56ms p(95)=52.15ms
     http_req_failed................: 0.00%   0 out of 12203
     http_req_receiving.............: avg=363.2µs min=14µs    med=282µs   max=10.98ms  p(90)=868µs   p(95)=1.13ms 
     http_req_sending...............: avg=45.91µs min=16µs    med=38µs    max=3.62ms   p(90)=74µs    p(95)=87µs   
     http_req_tls_handshaking.......: avg=1.93ms  min=0s      med=0s      max=265.48ms p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=41.37ms min=22.26ms med=40.95ms max=234.38ms p(90)=49.19ms p(95)=51.78ms
     http_reqs......................: 12203   239.146655/s
     iteration_duration.............: avg=1.04s   min=1.02s   med=1.04s   max=1.35s    p(90)=1.05s   p(95)=1.06s  
     iterations.....................: 12203   239.146655/s
     vus............................: 7       min=7              max=499
     vus_max........................: 500     min=500            max=500
```
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

## 🚀 **Automated Testing in GitHub Actions**
All tests are automatically executed in **GitHub Actions** on every **push, pull request, or manual trigger**.

### ✅ **Automated Cypress Tests**
- Runs Cypress in **headless mode** to validate UI functionality.
- Artifacts (screenshots, videos, reports) are uploaded for debugging.

### ✅ **Automated k6 Stress Tests**
- Runs manually **stress tests using k6** to check system scalability.
- Can execute **in parallel with Cypress** to validate UI stability under load.

### ✅ **Automated Security Audit (`npm audit`)**
- Scans for **security vulnerabilities** in dependencies.
- The pipeline **fails if high+critical vulnerabilities exceed 10**.

You can monitor test execution and results in the **GitHub Actions tab** of this repository.

--

## 🎯 **Final Outcome**
- ✅ **Tests run in parallel via Docker.**
- ✅ **Automated report generation & merging.**
- ✅ **Final HTML report opens automatically.**
- ✅ **Cypress setup is fully streamlined!**
- ✅ **GitHub Actions! works as expected!!**
