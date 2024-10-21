const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 1
  },
  env: {
    url: "https://www.dashboard.seerbit.com/#/auth/login",
    baseUrl: "https://dashboardv3.seerbitapi.com/#/auth/login",
  },
  e2e: {
    experimentalOriginDependencies: true,
    setupNodeEvents, 
    specPattern: 'cypress/integration/BDD/*.feature',
  },
});