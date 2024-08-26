const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on);
      // implement node event listeners here
    },
    pageLoadTimeout: 20000,
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    baseUrl: 'https://d36d6dg45qtynd.cloudfront.net/signin'
  },
});
