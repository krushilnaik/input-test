import { base64Encode, escapeAttr } from "./encoding";

/**
 * Checks if a markdown AST node contains only whitespace
 */
export function isWhitespaceNode(node: any): boolean {
	if (!node) return false;
	if (node.type === "text" && /^\s*$/.test(node.value ?? "")) return true;
	if (node.type === "paragraph" && Array.isArray(node.children)) {
		return node.children.every(
			(c: any) => c.type === "text" && /^\s*$/.test(c.value ?? ""),
		);
	}
	return false;
}

/**
 * Recursively flattens a markdown AST node to plain text while preserving markdown syntax
 */
export function flattenText(node: any): string {
	if (!node) return "";
	switch (node.type) {
		case "text":
			return node.value ?? "";
		case "textDirective":
			return `:${node.name}`;
		case "heading": {
			// Preserve markdown heading syntax: # for depth 1, ## for depth 2, etc.
			const depth = node.depth || 1;
			const headingText = (node.children || []).map(flattenText).join("");
			return "#".repeat(depth) + " " + headingText + "\n";
		}
		case "paragraph":
			// Preserve paragraph content with newline
			return (node.children || []).map(flattenText).join("") + "\n";
		case "blockquote":
			// Preserve blockquote syntax
			return (
				"> " +
				(node.children || []).map(flattenText).join("").replace(/\n/g, "\n> ")
			);
		case "code": {
			// Preserve code block syntax
			const codeLang = node.lang || "";
			const codeValue = node.value || "";
			return "```" + codeLang + "\n" + codeValue + "\n```\n";
		}
		case "inlineCode":
			// Preserve inline code syntax
			return "`" + (node.value || "") + "`";
		case "emphasis":
			// Preserve emphasis syntax
			return "*" + (node.children || []).map(flattenText).join("") + "*";
		case "strong":
			// Preserve strong syntax
			return "**" + (node.children || []).map(flattenText).join("") + "**";
		case "delete":
			// Preserve strikethrough syntax
			return "~~" + (node.children || []).map(flattenText).join("") + "~~";
		case "link": {
			// Preserve link syntax
			const linkText = (node.children || []).map(flattenText).join("");
			const linkUrl = node.url || "";
			return `[${linkText}](${linkUrl})`;
		}
		case "image": {
			// Preserve image syntax
			const imageAlt = node.alt || "";
			const imageUrl = node.url || "";
			return `![${imageAlt}](${imageUrl})`;
		}
		case "break":
			return "\n";
		case "list": {
			// Preserve list syntax (unordered or ordered)
			const listItems = (node.children || [])
				.map((item: any, index: number) => {
					const itemText = flattenText(item);
					if (node.ordered) {
						return `${index + 1}. ${itemText}`;
					} else {
						return `- ${itemText}`;
					}
				})
				.join("");
			return listItems;
		}
		case "listItem":
			// List items are handled by the list parent
			return (node.children || []).map(flattenText).join("");
		case "containerDirective":
			// For container directives, just flatten children
			return (node.children || []).map(flattenText).join("");
		default:
			// For unknown node types, try to extract text if available
			if (node.value) return node.value;
			if (node.children) return (node.children || []).map(flattenText).join("");
			return "";
	}
}

/**
 * Converts a directive node to HTML component markup
 *
 * @param node The directive AST node
 * @param directives Map of directive names to HTML tag names
 * @param preserveStringData Whether to preserve string data as-is (molecules) vs JSON stringify (charts)
 * @returns HTML string for the component
 */
export function makeComponentHtml(
	node: any,
	directives: Record<string, string>,
	preserveStringData: boolean,
): string {
	// --- label ---
	const labelNode = (node.children || []).find(
		(n: any) => n.data?.directiveLabel,
	);
	const label = labelNode
		? labelNode.children
				?.map((c: any) => c.value || "")
				.join("")
				.trim()
		: "";

	// --- size / cols ---
	const attrs = node.attributes ?? {};
	let cols = 12;
	const numericKey = Object.keys(attrs).find((k) => /^\d+$/.test(k));
	if (numericKey) cols = Number(numericKey);

	// --- data body ---
	const contentNodes = (node.children || []).filter(
		(n: any) => !n.data?.directiveLabel,
	);
	const rawText = contentNodes.map(flattenText).join("").trim();

	// Handle data based on whether we're preserving string data (molecules) or JSON stringifying (charts)
	let safeData: string;
	if (!rawText) {
		safeData = "";
	} else if (preserveStringData) {
		// For molecules: preserve raw text with newlines by base64 encoding
		// This avoids double-stringifying and preserves actual newlines
		safeData = base64Encode(rawText);
	} else {
		// For charts: try to parse as JSON first
		try {
			const parsed = JSON.parse(rawText);
			// JSON stringify for charts (objects/arrays)
			safeData = escapeAttr(JSON.stringify(parsed));
		} catch {
			// If not valid JSON, JSON stringify the raw text
			safeData = escapeAttr(JSON.stringify(rawText));
		}
	}

	// Get HTML tag name from config
	const directiveName = node.name;
	const tagName = directives[directiveName] || directiveName;

	const html = `<${tagName} label="${escapeAttr(label)}" cols="${cols}" data="${safeData}"></${tagName}>`;
	return html;
}
