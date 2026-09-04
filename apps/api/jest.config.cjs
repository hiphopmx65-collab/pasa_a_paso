module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@paso-a-paso/config$': '<rootDir>/../../packages/config/src/index.ts',
    '^@paso-a-paso/gps$': '<rootDir>/../../packages/gps/src/index.ts',
    '^@paso-a-paso/types$': '<rootDir>/../../packages/types/src/index.ts',
  },
};
