import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import solid from 'eslint-plugin-solid/configs/typescript';
import * as tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,
  {
    ignores: ['dist/'],
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
      },
      globals: {
        ...globals.browser,
      },
    },
  },
]);
