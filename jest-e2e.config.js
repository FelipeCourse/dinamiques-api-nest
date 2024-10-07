const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.(e2e-test|e2e-spec).ts'],
};
