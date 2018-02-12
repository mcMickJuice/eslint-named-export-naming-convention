const rule = require('./rule')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

const exportedConstStartsWithPrefix = {
	code: 'export const selector = () => {}',
	options: [
		{
			patterns: [{ '^selector': '^selector' }]
		}
	],
	filename: 'selector.js'
}

const exportedConstStartsWithPrefix2 = {
	code: 'export const myAction = () => {}',
	options: [
		{
			patterns: [{ '^action': '[aA]ction$' }]
		}
	],
	filename: 'action.js'
}

const exportedFunctionStartsWithPrefix = {
	code: 'export function myAction(){}',
	options: [
		{
			patterns: [{ '^action': '[aA]ction$' }]
		}
	],
	filename: 'action.js'
}

const functionDoesNotMatchPattern = {
	code: 'export const getSomething = () => {}',
	options: [
		{
			patterns: [{ '^selector': '^selector' }]
		}
	],
	filename: 'selector.js',
	errors: [
		{
			message: /^Exported function/ //enhance this to make sure error messages are descriptive
		}
	]
}

const functionDoesNotMatchPattern2 = {
	code: 'export const getSomethingSelector = () => {}',
	options: [
		{
			patterns: [{ '^selector': '^selector' }]
		}
	],
	filename: 'selector.js',
	errors: [
		{
			message: /^Exported function/ //enhance this to make sure error messages are descriptive
		}
	]
}

ruleTester.run('rule', rule, {
	valid: [
		exportedConstStartsWithPrefix,
		exportedConstStartsWithPrefix2,
		exportedFunctionStartsWithPrefix
	],
	invalid: [functionDoesNotMatchPattern, functionDoesNotMatchPattern2]
})
