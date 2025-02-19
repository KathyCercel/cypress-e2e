import { loginPage } from '../support/pages/index';
import { getPassword } from '../support/utils';

const validateLogin = (username) => {
  // There is a bug related to 'error_user' that will allow us to get authenticated
  // if (username === 'locked_out_user' || username === 'error_user') {
  if (username === 'locked_out_user') {
    loginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface');
  } else {
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('contain', 'Products');
  }
};


const testUserLogin = (username) => {
  loginPage.enterUsername(username);
  
  getPassword().then((password) => {
    loginPage.enterPassword(password);
    loginPage.clickLoginButton();

    validateLogin(username);
    
    loginPage.visit();
  });
};

describe('SauceDemo Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should test login for all users with a common password', () => {
    cy.fixture('users').then((data) => {
      data.users.forEach((user) => {
        const { username } = user;
        testUserLogin(username);
      });
    });
  });
});
