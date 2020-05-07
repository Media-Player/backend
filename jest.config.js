module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@apis/(.*)$': '<rootDir>/src/apis/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@enums/(.*)$': '<rootDir>/src/enums/$1',
    '^@general/(.*)$': '<rootDir>/src/general/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@validators/(.*)$': '<rootDir>/src/validators/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./test.setup.ts'],
  testEnvironment: 'node',
  testRegex: '\\.spec\\.ts',
}
