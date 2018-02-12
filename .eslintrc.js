module.exports = {
	env: {
		es6: true,
		node: true,
		'jest/globals': true
	},
	plugins: ['jest'],
	extends: 'eslint:recommended',
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never']
	}
}
