import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)': "<rootDir>/src/$1"
  }
}

export default jestConfig