/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testMatch: [
    '**/tests/1_upload.test.ts',
    '**/tests/2_confirm.test.ts',
    '**/tests/3_list.test.ts'
  ],
  testTimeout: 30000,
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
/*
module.exports = {
  runner: 'jest-runner-groups',
  testTimeout: 30000, // Aumenta o timeout para evitar falhas por timeout em testes longos
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Arquivo de configuração adicional do Jest
};*/
