/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testMatch: [
    '**/tests/1_upload.test.ts',
    '**/tests/2_confirm.test.ts',
    '**/tests/3_list.test.ts'
  ],
  testTimeout: 90000,
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  globalTeardown: '<rootDir>/globalTeardown.ts',
};
