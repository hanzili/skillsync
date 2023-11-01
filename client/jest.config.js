module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/e2e/**/*.spec.js'],
    testTimeout: 30000,
    testEnvironment: 'jest-environment-puppeteer',
    testRunner: 'jest-circus/runner',
  };