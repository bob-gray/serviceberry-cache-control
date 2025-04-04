"use strict";

const js = require("@eslint/js"),
	globals = require("globals");

module.exports = [
	js.configs.recommended,
	{
		linterOptions: {
			reportUnusedDisableDirectives: "warn"
		},
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "commonjs",
			globals: globals.node
		},
		rules: {
			"no-await-in-loop": "error",
			"no-compare-neg-zero": "error",
			"no-extra-parens": ["error", "all", {
				"nestedBinaryExpressions": false
			}],
			"array-callback-return": "error",
			"complexity": ["error", 6],
			"curly": "error",
			"dot-notation": "error",
			"eqeqeq": ["error", "smart"],
			"consistent-return": "error",
			"newline-per-chained-call": ["error", {
				"ignoreChainWithDepth": 3
			}],
			"no-implicit-globals": "error",
			"no-magic-numbers": ["warn", {
				"ignore": [-1, 0, 1]
			}],
			"operator-linebreak": ["error", "after"],
			"block-scoped-var": "error",
			"no-alert": "error",
			"no-caller": "error",
			"no-else-return": "warn",
			"no-empty-function": "error",
			"no-eval": "error",
			"no-extra-bind": "error",
			"no-extra-label": "error",
			"no-floating-decimal": "error",
			"no-implicit-coercion": "error",
			"no-implied-eval": "error",
			"no-lone-blocks": "error",
			"no-loop-func": "error",
			"no-new-wrappers": "error",
			"no-octal-escape": "error",
			"no-proto": "error",
			"no-redeclare": "error",
			"no-return-assign": "error",
			"no-script-url": "error",
			"no-self-compare": "error",
			"no-sequences": "error",
			"no-throw-literal": "error",
			"no-unmodified-loop-condition": "error",
			"no-unused-expressions": "error",
			"no-unused-vars": ["error", {
				"ignoreRestSiblings": true
			}],
			"no-useless-call": "error",
			"no-useless-concat": "error",
			"no-useless-escape": "error",
			"no-void": "error",
			"no-with": "error",
			"radix": "error",
			"vars-on-top": "warn",
			"yoda": "error",
			"strict": ["error", "global"],
			"no-catch-shadow": "error",
			"no-label-var": "error",
			"no-restricted-globals": ["error", "event"],
			"no-shadow": "error",
			"no-shadow-restricted-names": "error",
			"no-undef-init": "error",
			"no-use-before-define": ["error", {
				"functions": false
			}],
			"brace-style": "error",
			"camelcase": "error",
			"comma-dangle": "error",
			"comma-spacing": "error",
			"comma-style": "error",
			"func-call-spacing": "error",
			"indent": ["error", "tab"],
			"key-spacing": "error",
			"keyword-spacing": "error",
			"line-comment-position": "error",
			"lines-around-comment": "error",
			"lines-around-directive": "error",
			"max-depth": ["error", 5],
			"max-len": ["error", 120],
			"max-lines": "warn",
			"max-nested-callbacks": ["error", 2],
			"max-params": "warn",
			"max-statements": ["warn", 10, {
				"ignoreTopLevelFunctions": true
			}],
			"max-statements-per-line": "error",
			"no-ternary": "error",
			"new-cap": "error",
			"new-parens": "error",
			"newline-after-var": "error",
			"newline-before-return": "error",
			"no-array-constructor": "error",
			"no-bitwise": "error",
			"no-continue": "error",
			"no-inline-comments": "error",
			"no-lonely-if": "error",
			"no-mixed-operators": "error",
			"no-multi-assign": "error",
			"no-multiple-empty-lines": ["error", {
				"max": 1
			}],
			"no-new-object": "error",
			"no-plusplus": "error",
			"no-restricted-syntax": ["error", "SwitchStatement", "CaseStatement"],
			"no-trailing-spaces": "error",
			"no-whitespace-before-property": "error",
			"object-property-newline": ["error", {
				"allowAllPropertiesOnSameLine": true
			}],
			"one-var": "error",
			"one-var-declaration-per-line": "error",
			"padded-blocks": ["error", "never"],
			"quote-props": ["error", "consistent"],
			"quotes": ["error", "double", {
				"avoidEscape": true
			}],
			"semi": "error",
			"semi-spacing": "error",
			"space-before-blocks": "error",
			"space-before-function-paren": "error",
			"space-infix-ops": "error",
			"space-unary-ops": ["warn", {
				"nonwords": false
			}],
			"spaced-comment": "error"
		}
	}
];
