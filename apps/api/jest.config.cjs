module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
};
