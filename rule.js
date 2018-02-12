const isVarDecl = node => node.type === 'VariableDeclaration'
const isIdentifier = node => node.type === 'Identifier'

module.exports = {
	meta: {
		docs: {
			description: 'enforce naming conventions for named exports',
			category: 'Best Practices'
		},
		schema: [
			{
				type: 'object',
				properties: {
					patterns: {
						type: 'array' //pattern of "filename pattern, function name pattern"
					}
				}
			}
		]
	},
	create: function(context) {
		const checkExportedDeclaration = declNode => {
			const name = isIdentifier(declNode) ? declNode.name : declNode.id.name
			const pattern = getFunctionPatternForFile()
			const patternRegex = new RegExp(pattern)
			if (patternRegex.test(name)) return

			const nodeToReport = isIdentifier(declNode) ? declNode : declNode.id
			const filename = context.getFilename()
			context.report({
				message: `Exported function in file '${filename}' does not match pattern '${pattern}'`,
				node: nodeToReport
			})
		}

		const shouldCheckFile = () => {
			const fileName = context.getFilename()
			const { options } = context

			const patterns = options[0].patterns.map(patternObj => {
				const [filePattern] = Object.entries(patternObj)[0]
				return filePattern
			})

			return patterns.some(pattern => {
				const regex = new RegExp(pattern)
				return regex.test(fileName)
			})
		}

		const getFunctionPatternForFile = () => {
			const fileName = context.getFilename()
			const { options } = context

			let functionPatternToReturn

			options[0].patterns.some(patternObj => {
				const [filePattern, functionPattern] = Object.entries(patternObj)[0]

				const regex = new RegExp(filePattern)

				if (regex.test(fileName)) {
					functionPatternToReturn = functionPattern
					return true
				}
				return false
			})

			return functionPatternToReturn
		}

		return {
			ExportNamedDeclaration(node) {
				if (!shouldCheckFile()) return
				const decl = node.declaration

				let declNode
				if (isVarDecl(decl)) {
					const firstDecl = node.declaration.declarations[0]
					declNode = firstDecl
				} else {
					declNode = decl
				}

				checkExportedDeclaration(declNode)
			}
		}
	}
}
