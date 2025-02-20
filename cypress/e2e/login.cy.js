import { loginPage, menuButton, inventoryPage } from '../support/pages/index';
import { getPassword } from '../support/utils';

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should test login for all users with a common password', () => {
    cy.fixture('users').then((data) => {
      data.users.forEach((user) => {
        const { username } = user;
        cy.loginUser(username);
        loginPage.visit();
      });
    });
  });

  it('should display an error message for invalid credentials', () => {

    loginPage.enterUsername('invalid_user');
    loginPage.enterPassword('wrong_password');
    loginPage.clickLoginButton();

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', "Epic sadface: Username and password do not match any user in this service");
  });

  it('should prevent login when username is empty', () => {
    loginPage.enterUsername('abc');

    loginPage.clickLoginButton();

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Epic sadface: Password is required');

  });

  it('should prevent login when password is empty', () => {
    loginPage.enterPassword('abc');
    loginPage.clickLoginButton();

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
  });
});

describe('Session Handling Tests', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.loginUser('standard_user');
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  });

  it('should keep the user logged in when navigating between inventory pages', () => {
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');

    cy.reload();
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');

    cy.getCookies().should('not.be.empty');
    cy.getCookie('session-username').should('exist');

    cy.window().then((win) => {
      cy.log('Local Storage:', win.localStorage);
    });
  });

  it('should keep the user logged in when navigating between cart pages', () => {
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');

    inventoryPage.getShoppingCartLink().click();
    cy.url().should('include', '/cart.html');

    cy.reload();

    cy.url().should('include', '/cart.html');

    cy.get('.title').should('contain', 'Your Cart');

    cy.getCookies().should('not.be.empty');
    cy.getCookie('session-username').should('exist');

    cy.window().then((win) => {
      cy.log('Local Storage:', win.localStorage);
    });
  });

  it('should log the user out when clicking the logout button', () => {

    menuButton.getOpenMenu().click();
    menuButton.getLogoutSidebarLink().click();

    cy.url().should('eq', 'https://www.saucedemo.com/');

    loginPage.getUserNameSelector().should('be.visible');

    cy.reload();
    cy.url().should('eq', 'https://www.saucedemo.com/');
  });
});

/**
 * SauceDemo handles authentication entirely on the frontend using:
 * - React state (`useState`)
 * - `setCredentials(username, password)`
 * - `verifyCredentials()`
 * 
 * There is no actual API request (`POST /login`).
 * Authentication is managed via **localStorage or cookies** instead.
 * 
 * How to Validate Login & Session in Cypress:
 * Simulate login via the UI by entering valid credentials.
 * Verify session persistence by checking `localStorage` and cookies.
 * Ensure the user remains logged in after navigating between pages and reloading.
 */

describe("SauceDemo Login & Session Handling", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should log in and persist the session", () => {

    loginPage.enterUsername("standard_user");
    getPassword().then((password) => {
      loginPage.enterPassword(password);
      loginPage.clickLoginButton();
    });

    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("contain", "Products");

    cy.window().then((win) => {
      cy.log("LocalStorage Data:", win.localStorage);
      expect(win.localStorage.length).to.eq(2);
    });

    cy.getCookies().then((cookies) => {
      cy.log("Cookies:", cookies);
      expect(cookies.length).to.eq(1);
    });

    cy.reload();
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("contain", "Products");

    inventoryPage.getShoppingCartLink().click();
    cy.url().should('include', '/cart.html');

    cy.window().then((win) => {
      cy.log("LocalStorage Data:", win.localStorage);
      expect(win.localStorage.length).to.eq(2);
    });
  });

  it("should fail login for an invalid user and show an error", () => {
    loginPage.enterUsername("invalid_user");
    loginPage.enterPassword("wrong_password");
    loginPage.clickLoginButton();

    loginPage.getErrorMessage()
      .should("be.visible")
      .and("contain", "Epic sadface: Username and password do not match any user in this service");
  });

  it("should log out the user and clear the session", () => {

    loginPage.enterUsername("standard_user");
    getPassword().then((password) => {
      loginPage.enterPassword(password);
      loginPage.clickLoginButton();
    });

    menuButton.getOpenMenu().click();
    menuButton.getLogoutSidebarLink().click();

    cy.url().should("eq", "https://www.saucedemo.com/");

    cy.getCookies().should("be.empty");

    cy.window().then((win) => {
      win.localStorage.clear();
      expect(win.localStorage.length).to.eq(0);
    });

    cy.reload();
    cy.url().should("eq", "https://www.saucedemo.com/");
    loginPage.getUserNameSelector().should("be.visible");
  });
});
