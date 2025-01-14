module.exports = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Use Node.js environment
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  testMatch: ['**/test/**/*.test.ts'], // Run tests in files matching this pattern
};
