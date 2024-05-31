import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://localhost:4000",
    experimentalInteractiveRunEvents: true,
    testIsolation: false,
    specPattern: "__tests__/e2e/*.cy.ts",
    supportFile: "__tests__/support/e2e.ts",
    screenshotsFolder: "__tests__/screenshots",
  },
});
