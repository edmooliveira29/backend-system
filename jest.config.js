module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['json-summary', 'text', 'lcov']
}
