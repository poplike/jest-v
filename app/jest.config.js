// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.*\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lodash-es|other-es-lib))'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  // collectCoverageFrom: ['**/src/**.{js,vue}', '!**/node_modules/**', '!**src/main.js**', '!**src/router.js**'],
  collectCoverageFrom: ['**/src/views/**.{js,vue}', '**/src/components/**.{js,vue}', '!**/node_modules/**', '!**src/main.js**', '!**src/router.js**'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
