module.exports = {
  root: true,
  extends: ['custom/react.js'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
}
