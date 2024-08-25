module.exports = {
  root: true,
  extends: ['@packages/eslint/react.js'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
}
