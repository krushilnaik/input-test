import type { Transformer } from "unified";

import { isWhitespaceNode, makeComponentHtml } from "./ast";

export interface RemarkDirectiveConfig {
	/**
	 * Map of directive names to HTML tag names
	 *
	 * Example: { "chart-pie": "piechart", "my-component": "mycomponent" }
	 */
	directives: Record<string, string>;

	/**
	 * Optional wrapper tag name for grouping directives (e.g., "chartrow")
	 *
	 * If provided, multiple directives will be grouped in this wrapper
	 */
	wrapperTag?: string;

	/**
	 * Whether to use column-based grouping (for charts, uses cols attribute)
	 *
	 * Default: false
	 */
	useColumnGrouping?: boolean;

	/**
	 * Whether to preserve string data as-is (for molecules) vs JSON stringify (for charts)
	 *
	 * Default: false (JSON stringify)
	 */
	preserveStringData?: boolean;
}

/**
 * Factory function to create a remark transformer for custom markdown directives
 *
 * Supports the format:
 * :::<component-type>[<some-text>]{<optional-number>}
 * <some-more-optional-text>
 * :::
 *
 * @param config Configuration object specifying directive mappings and options
 * @returns A unified transformer
 */
export function createRemarkDirective(
	config: RemarkDirectiveConfig,
): Transformer {
	const {
		directives,
		wrapperTag,
		useColumnGrouping = false,
		preserveStringData = false,
	} = config;
	const directiveNames = Object.keys(directives);

	return (tree: any) => {
		const children = tree.children || [];
		const newChildren: any[] = [];

		let buffer: string[] = [];
		let colSum = 0;

		/**
		 * Flushes buffered HTML content to the output
		 */
		const flush = () => {
			if (buffer.length > 0) {
				const content = buffer.join("");
				if (wrapperTag) {
					newChildren.push({
						type: "html",
						value: `<${wrapperTag}>${content}</${wrapperTag}>`,
					});
				} else {
					// If no wrapper, add each item individually
					buffer.forEach((item) => {
						newChildren.push({
							type: "html",
							value: item,
						});
					});
				}
				buffer = [];
				colSum = 0;
			}
		};

		/**
		 * Checks if a node is a recognized container directive
		 */
		const isDirectiveNode = (node: any): boolean => {
			return (
				node &&
				node.type === "containerDirective" &&
				directiveNames.includes(node.name)
			);
		};

		for (let i = 0; i < children.length; i++) {
			const node = children[i];
			if (isWhitespaceNode(node)) continue;

			if (!isDirectiveNode(node)) {
				flush();
				newChildren.push(node);
				continue;
			}

			const html = makeComponentHtml(node, directives, preserveStringData);

			if (useColumnGrouping && wrapperTag) {
				const attrs = node.attributes ?? {};
				let cols = 12;
				if (typeof attrs.size !== "undefined") cols = Number(attrs.size);
				else {
					const numericKey = Object.keys(attrs).find((k) => /^\d+$/.test(k));
					if (numericKey) cols = Number(numericKey);
				}

				if (colSum + cols > 12) flush();
				buffer.push(html);
				colSum += cols;

				let j = i + 1;
				while (j < children.length && isWhitespaceNode(children[j])) j++;
				const next = children[j];
				const nextIsDirective = isDirectiveNode(next);
				if (!nextIsDirective) flush();
			} else {
				// No column grouping, flush immediately or buffer for wrapper
				if (wrapperTag) {
					buffer.push(html);
				} else {
					newChildren.push({
						type: "html",
						value: html,
					});
				}

				// Flush if next node is not a directive
				let j = i + 1;
				while (j < children.length && isWhitespaceNode(children[j])) j++;
				const next = children[j];
				const nextIsDirective = isDirectiveNode(next);
				if (!nextIsDirective && wrapperTag) flush();
			}
		}

		flush();
		tree.children = newChildren;
	};
}
