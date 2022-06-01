'use strict'

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
	plugins: [],
	rules: {
		'linebreak-style': ['error', 'unix'],
		// 'max-len': ['error', { code: 160, tabWidth: 2, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
		'max-len': ['off'],
		'multiline-ternary': ['off'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-useless-catch': 0,
		'no-unused-expressions': 'off',
		'no-unused-vars': 0,
		camelcase: 'off',
		indent: ['error', 'tab'],
		'prettier/prettier': [
			'error',
			{
				printWidth: 140,
			},
		],
		'vue/valid-v-slot': ['error', { allowModifiers: true }],
		'vue/v-slot-style': 'off',
		'vue/no-v-html': 'off',
	},
}
