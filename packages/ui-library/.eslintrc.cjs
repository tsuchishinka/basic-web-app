module.exports = {
  root: true,
  extends: ['@packages/eslint/react.js'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
}
