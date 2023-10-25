module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  // default configuration takes a bunch of predetermined rules into use
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
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
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
