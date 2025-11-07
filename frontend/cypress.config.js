const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    video: true,
    screenshotOnRunFailure: true,
    // Frontend’in çalıştığı adres
    setupNodeEvents(on, config) {
      // Event handler gerekirse buraya
      

    },
  },
})
