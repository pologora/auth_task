import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next' }],
      'no-console': 'warn',
      'no-else-return': 'error',
      'no-magic-numbers': ['error', { ignore: [], ignoreArrayIndexes: true }],
      'no-new-func': 'error',
      'no-shadow': 'error',
      'no-use-before-define': ['error', { functions: false }],
      'prefer-const': 'error',
      'prefer-destructuring': [
        'error',
        {
          AssignmentExpression: { array: true, object: true },
          VariableDeclarator: { array: false, object: true },
        },
      ],
      'prefer-template': 'error',
      'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
    },
  },
  {
    files: ['**/*controller.ts'],
    rules: {
      'sort-keys': 'off',
    },
  },
];
