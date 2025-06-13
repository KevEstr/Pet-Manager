// jest.config.js
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js|jsx)',
    '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'
  ],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  }
};

module.exports = createJestConfig(customConfig);
