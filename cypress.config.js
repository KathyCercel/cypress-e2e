const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', (details) => {
        console.log('Running tests with the following details:', details.browser);
      });
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 0,
      openMode: 0,
    },
  },
});
