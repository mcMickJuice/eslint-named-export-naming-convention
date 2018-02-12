# eslint-enforce-exported-names

## Overview

This rule enforces a file level naming convention for named exports functions.

## Example

This rule is configured by an array of `{filenamePattern: namedExportPattern}`

```json
{
	"rules": {
		"eslint-enforce-exported-names": [{ "action.js": "[Aa]ction$" }]
	}
}
```

The above setting states that all named exports in files named `action.js` must end with `Action` or `action`.

## Why?

You might want to enforce certain file types exported functions all have similar names. My main motivation for writing this rule was to enforce that functions defined in redux `action` and `selector` files follow a convention of `select*` and `*Action`, respectively.
