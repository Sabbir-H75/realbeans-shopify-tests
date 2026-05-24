const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3o8xqw", // Add this line
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});