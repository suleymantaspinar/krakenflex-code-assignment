/* eslint-disable no-undef */
module.exports = {
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  testEnvironment: 'node',
  verbose: true,
  setupFiles: [
    '<rootDir>/__tests__/testEnv.js'
  ],
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura']
};
