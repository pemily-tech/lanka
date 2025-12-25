import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import tailwindcss from 'eslint-plugin-tailwindcss';
import unicorn from 'eslint-plugin-unicorn';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ['dist/*', '**/.cache', '**/public', '**/node_modules', '**/*.esm.js', 'src/app/(dashboard)/user-profile/_ui/tabs/personal-details.tsx',
'/src/components/pet-selection-modal/_hooks/use-stepper.ts', 'commitlint.config.js'
],
	},
	...compat.extends(
		'next/core-web-vitals',
		'prettier',
		'eslint:recommended',
		'plugin:prettier/recommended',
		// 'plugin:tailwindcss/recommended'
	),
	{
		plugins: {
			prettier,
			unicorn,
			// tailwindcss,
			'simple-import-sort': simpleImportSort,
			'react-compiler': reactCompiler,
			'@typescript-eslint': tsPlugin,
		},

		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
			},
			globals: {
				process: 'readonly',
				require: 'readonly',
				module: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
			},
		},

		settings: {
			// tailwindcss: {
			// 	callees: ['cn'],
			// 	config: 'tailwind.config.js',
			// },
		},

		rules: {
			'prettier/prettier': [
				'warn',
				{
					useTabs: true,
					tabWidth: 4,
					endOfLine: 'auto',
				},
			],
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: ['/android', '/ios'],
				},
			],
			'max-params': ['error', 3],
			'max-lines-per-function': ['error', 160],
			'react/display-name': 'off',
			'react/no-inline-styles': 'off',
			'react/destructuring-assignment': 'off',
			'react/require-default-props': 'off',
			'@typescript-eslint/comma-dangle': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
					disallowTypeAnnotations: true,
				},
			],
			'import/prefer-default-export': 'off',
			// 'tailwindcss/classnames-order': [
			// 	'warn',
			// 	{
			// 		officialSorting: true,
			// 	},
			// ],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^.+\\.s?css$'],
						[
							'^(assert|buffer|crypto|fs|http|https|os|path|querystring|stream|url|util|zlib)(/|$)',
							'^react',
							'^@?\\w',
						],
						['^components(/.*|$)'],
						['^lib(/.*|$)', '^hooks(/.*|$)', '^ui(/.*|$)', '^core(/.*|$)'],
						['^\\.'],
					],
				},
			],
			'simple-import-sort/exports': 'error',
			// 'tailwindcss/no-custom-classname': 'off',
			'no-tabs': 'off',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'sort-imports': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
		rules: {
			'no-unused-vars': 'off',
			'no-undef': 'off',
		},
	},
];
