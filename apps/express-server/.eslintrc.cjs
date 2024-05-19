module.exports = {
<<<<<<< HEAD
  extends: ['@packages/eslint-config'],
  parserOptions: {
    sourceType: 'modules',
=======
  extends: ['@repo/eslint-config/library.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    exclude: ['node_modules', 'dist'],
>>>>>>> 2d3dc2846938d8474d827ae86357f7add1da5688
  },
}
