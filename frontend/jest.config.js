module.exports = {
  preset: '@vue/cli-plugin-unit-jest',


  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "^@/views/(.*)$": "<rootDir>/src/views/$1",
  },
};
