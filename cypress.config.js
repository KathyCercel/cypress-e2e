const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("cypress-audit");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        console.log('Launching browser:', browser.name);
        if (browser.name === 'chrome') {
          launchOptions.args.push('--window-size=1920,1080');
          launchOptions.args.push('--no-sandbox'); // Useful in CI, but remove if running locally
          launchOptions.args.push('--disable-gpu'); // Disables hardware acceleration
          launchOptions.args.push('--disable-software-rasterizer'); // Disables software-based GPU rendering
        }
        return launchOptions;
      });
      on('before:run', (details) => {
        console.log('Running tests with the following details:', details.browser);
      });
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      on('task', {
        lighthouse: (options) => {
          return lighthouse(options);
        }
      });
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      return config;
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
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    responseTimeout: 10000,
    requestTimeout: 10000,
    video: false,
    screenshotOnRunFailure: false,
    screenshotOnRunFailure: true,
    modifyObstructiveCode: false,
    chromeWebSecurity: false,
    experimentalSourceRewriting: false,
    testIsolation: false,
    includeShadowDom: true,
    watchForFileChanges: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalRunAllSpecs: true,
    experimentalCspAllowList: true,
    experimentalInteractiveRunEvents: true
  },
});
