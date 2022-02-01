/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageReporters: ["json-summary"],
  collectCoverage: false,
  coverageDirectory: "docs/coverage",
  collectCoverageFrom: ["src/**/*.ts"],
};
