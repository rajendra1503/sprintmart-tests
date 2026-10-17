// @ts-check
const { defineConfig } = require('@playwright/test');

// This repository does NOT contain the application and never starts it.
// The tests run against whichever environment is already deployed and
// reachable at BASE_URL - exactly like a QA team testing a build the Dev
// team has deployed.
//
//   Staging (Jenkins' Docker container):  http://localhost:3001   <- default
//   Your own local `npm start` copy:      BASE_URL=http://localhost:3000
//
// Jenkins passes BASE_URL as a build parameter, so the same suite can be
// pointed at any environment without changing a line of test code.
const baseURL = process.env.BASE_URL || 'http://localhost:3001';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
});
