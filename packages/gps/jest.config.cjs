module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@paso-a-paso/config$': '<rootDir>/../config/src/index.ts',
    '^@paso-a-paso/types$': '<rootDir>/../types/src/index.ts',
  },
};
