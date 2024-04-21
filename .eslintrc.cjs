const { resolve } = require('path')

const project = resolve(__dirname, 'tsconfig.json')

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'postcss.config.js',
    'vite.config.ts',
    'tailwind.config.ts',
    'tailwind/*.ts',
    'vitest-setup.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@tanstack/eslint-plugin-query'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-sort-props': 'off',
    'react/jsx-no-leaked-render': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
  },
  parserOptions: { project },
  settings: { 'import/resolver': { typescript: { project } } },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: { project },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
    },
  ],
}
