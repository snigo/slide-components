module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  ignorePatterns: ['*.d.ts', '**/pkg'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 0, /** Provided by lerna.js */
    'import/prefer-default-export': 0, /** I prefer not */
    'jsx-a11y/label-has-associated-control': 0, /** ESLint just being buggy */
    'no-confusing-arrow': 0, /** You're the only one confused */
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }], /** Allow all file extensions */
    'react/react-in-jsx-scope': 0, /** There is no such rule! */
    'react/jsx-props-no-spreading': 0, /** I'm grown up enough */
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'no-unused-vars': 0,
        'no-undef': 0,
        'no-use-before-define': 0,
        'react/prop-types': 0,
      },
    },
  ],
};
