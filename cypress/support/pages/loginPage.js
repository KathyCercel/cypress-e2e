const getElement = (selector) => cy.get(selector);

export default {
  visit: () => {
    cy.visit('https://www.saucedemo.com/');
    cy.url().should('include', 'saucedemo.com');
  },
  enterUsername: (username) => {
    getElement('[data-test="username"]').type(username);
  },
  enterPassword: (password) => {
    getElement('[data-test="password"]').type(password);
  },
  clickLoginButton: () => {
    getElement('[data-test="login-button"]').click();
  },
  getErrorMessage: () => {
    return getElement('[data-test="error"]');
  },
  getLoginContainer: () => {
    return getElement('[data-test="login-container"]');
  },
  getLoginCredentials: () => {
    return getElement('[data-test="login-credentials"]');
  },
  getLoginPassword: () => {
    return getElement('[data-test="login-password"]');
  },
};
