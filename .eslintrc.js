module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'react/react-in-jsx-scope': 'error',
    'react/prop-types': 'off',

    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
