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
});
