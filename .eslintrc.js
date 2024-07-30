module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['@stylistic/js'],
  // default configuration takes a bunch of predetermined rules into use
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // indentation rule
    '@stylistic/js/indent': ['error', 2],
    // linebreak rule
    '@stylistic/js/linebreak-style': ['error', 'windows'],
    // quotation rules
    '@stylistic/js/quotes': ['error', 'single'],
    // semicolon rules
    '@stylistic/js/semi': ['error', 'always'],
    // warns us, if equality is checked with anything but the triple equals operator
    eqeqeq: 'error',
    // prevent unnecessary trailing spaces
    'no-trailing-spaces': 'error',
    // there is always a space before and after curly braces,
    'object-curly-spacing': ['error', 'always'],
    // consistent use of whitespaces in the function parameters of arrow functions
    'arrow-spacing': ['error', { before: true, after: true }],
    // disable console.logs
    'no-console': 0,
  },
};
