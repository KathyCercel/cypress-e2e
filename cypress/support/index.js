// This is processed and loaded automatically before your test files.
// Use this to add custom commands or global setup.

import { getPassword } from './utils';
import { loginPage } from './pages/index';

Cypress.Commands.add('loginUser', (username) => {
  loginPage.enterUsername(username);

  getPassword().then((password) => {
    loginPage.enterPassword(password);
    loginPage.clickLoginButton();

    if (username === 'locked_out_user') {
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Epic sadface');
    } else {
      cy.url().should('include', '/inventory.html');
      cy.get('.title').should('contain', 'Products');
    }
  });
});
