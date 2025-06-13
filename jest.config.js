// jest.config.js
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],

  // Indicar qué archivos incluir/excluir en el informe de cobertura
  collectCoverageFrom: [
    'pages/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    // Excluir archivos de configuración de Next.js y definiciones de tipo
    '!pages/_app.{js,jsx,ts,tsx}',
    '!pages/_document.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts'
  ],

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
