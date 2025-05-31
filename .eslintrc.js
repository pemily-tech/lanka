module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'next/core-web-vitals',
		'prettier',
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:tailwindcss/recommended',
	],
	plugins: [
		'prettier',
		'unicorn',
		'@typescript-eslint',
		'unused-imports',
		'tailwindcss',
		'simple-import-sort',
		'eslint-plugin-react-compiler',
	],
	rules: {
		// Prettier rules
		'prettier/prettier': [
			'warn',
			{
				useTabs: true,
				tabWidth: 4,
				endOfLine: 'auto',
			},
		],

		// ESLint rules
		'unicorn/filename-case': [
			'error',
			{
				case: 'kebabCase',
				ignore: ['/android', '/ios'],
			},
		],
		'max-params': ['error', 3],
		'max-lines-per-function': ['error', 150],
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
		'import/no-cycle': ['error', { maxDepth: '∞' }],
		'tailwindcss/classnames-order': [
			'warn',
			{
				officialSorting: true,
			},
		],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^.+\\.s?css$'],
					[
						`^(${require('module').builtinModules.join('|')})(/|$)`,
						'^react',
						'^@?\\w',
					],
					['^components(/.*|$)'],
					[
						'^lib(/.*|$)',
						'^hooks(/.*|$)',
						'^ui(/.*|$)',
						'^core(/.*|$)',
					],
					['^\\.'],
				],
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
		'simple-import-sort/exports': 'error',
		'@typescript-eslint/no-unused-vars': 'off',
		'tailwindcss/no-custom-classname': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'no-tabs': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'sort-imports': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-require-imports': 'off',
	},
	settings: {
		tailwindcss: {
			callees: ['cn'],
			config: 'tailwind.config.js',
		},
	},
};
