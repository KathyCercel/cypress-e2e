// This is processed and loaded automatically before your test files.
// Use this to add custom commands or global setup.

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', '/api/login', { username, password })
    .then((resp) => {
      window.localStorage.setItem('authToken', resp.body.token);
    });
});
