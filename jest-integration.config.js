const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.(integration-test|integration-spec).ts'],
};
