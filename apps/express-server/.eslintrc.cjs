module.exports = {
  extends: ['@repo/eslint-config/library.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    exclude: ['node_modules', 'dist'],
  },
}
