import { loginPage } from '../support/pages/index';

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