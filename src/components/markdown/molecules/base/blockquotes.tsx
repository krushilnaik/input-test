import type { Components } from "react-markdown";

import BlockquoteActions from "../../actions/BlockquoteActions";
import { flattenText } from "../../utils/ast";

export const blockquoteComponents: Components = {
	blockquote: ({ node, children, ...props }) => {
		// Reconstruct raw markdown from the node using flattenText
		const textContent = node
			? flattenText(node).trim()
			: typeof children === "string"
				? children
				: String(children);

		return (
			<div className="border-tertiary-gray overflow-hidden rounded-lg border">
				<div className="border-tertiary-gray bg-quaternary-gray relative flex items-center justify-between rounded-t-lg border-b px-4 py-2">
					<span className="text-primary-gray text-xs font-medium">Quote</span>
					<BlockquoteActions content={textContent} />
				</div>
				<div>
					<blockquote
						className="bg-quaternary-gray text-primary-gray border-primary rounded-none rounded-r-md border-l-4 px-4 py-4 italic"
						{...props}
					>
						{children}
					</blockquote>
				</div>
			</div>
		);
	},
};
