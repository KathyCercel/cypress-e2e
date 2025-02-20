import { loginPage, menuButton, inventoryPage } from '../support/pages/index';

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
