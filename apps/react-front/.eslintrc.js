const { version } = require('os')

module.exports = {
  root: true,
  extends: ['custom/react.js'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    project: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: true,
  },
}
