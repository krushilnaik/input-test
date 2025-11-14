import { tanstackConfig } from "@tanstack/eslint-config";

export default [
	...tanstackConfig,
	{
		rules: {
			"@typescript-eslint/array-type": ["error", { default: "array" }],
			// Disable problematic import rule that has resolver issues
			"import/no-cycle": "off",
			// Configure import sorting
			"import/order": [
				"error",
				{
					groups: [
						"builtin", // Node.js built-in modules
						"external", // External modules from node_modules
						"internal", // Internal modules (e.g., aliases)
						"parent", // Parent directories
						"sibling", // Sibling modules
						"index", // Index of the current directory
					],
					pathGroups: [
						{
							pattern: "@/**",
							group: "internal",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
			},
		},
	},
	{
		// Disable TypeScript-aware linting for config files
		files: ["*.config.js", "*.config.ts", "eslint.config.js"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
		languageOptions: {
			parserOptions: {
				project: null,
			},
		},
	},
];
