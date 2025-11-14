import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { useState } from "react";

interface BlockquoteActionsProps {
	content: string;
}

const BlockquoteActions = ({ content }: BlockquoteActionsProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="flex gap-2">
			<button
				onClick={handleCopy}
				className="rounded bg-gray-700/50 p-2 transition-colors hover:bg-gray-600/50"
				title="Copy quote"
			>
				{copied ? (
					<RiCheckLine size={14} className="text-green-400" />
				) : (
					<RiFileCopyLine size={14} className="text-gray-300" />
				)}
			</button>
		</div>
	);
};

export default BlockquoteActions;
