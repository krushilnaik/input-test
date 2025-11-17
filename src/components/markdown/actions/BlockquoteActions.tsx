import { useState } from "react";

import { CheckIcon } from "@/atoms/icons/CheckIcon";
import { CopyIcon } from "@/atoms/icons/CopyIcon";

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
					<CheckIcon size={14} color="#4ade80" />
				) : (
					<CopyIcon size={14} color="#d1d5db" />
				)}
			</button>
		</div>
	);
};

export default BlockquoteActions;
