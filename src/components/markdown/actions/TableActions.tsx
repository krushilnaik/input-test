import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { useState } from "react";

import { ArrowIcon } from "@/components/atoms/icons/ArrowIcon";

interface TableActionsProps {
	tableRef: React.RefObject<HTMLTableElement | null>;
	onViewInCanvas?: (tableHtml: string, title: string) => void;
}

const TableActions = ({ tableRef, onViewInCanvas }: TableActionsProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			// Extract table data as CSV
			const rows = Array.from(tableRef.current?.querySelectorAll("tr") || []);
			const csv = rows
				.map((row) => {
					const cells = Array.from(row.querySelectorAll("td, th"));
					return cells.map((cell) => cell.textContent?.trim() || "").join(",");
				})
				.join("\n");

			await navigator.clipboard.writeText(csv);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy table:", err);
		}
	};

	const handleViewInCanvas = () => {
		if (onViewInCanvas) {
			onViewInCanvas(String(tableRef.current?.outerHTML), "Table");
		}
	};

	return (
		<div className="flex gap-2">
			<button
				onClick={handleCopy}
				className="rounded bg-gray-700 p-1.5 transition-colors hover:bg-gray-600"
				title="Copy table as CSV"
			>
				{copied ? (
					<RiCheckLine size={14} className="text-green-400" />
				) : (
					<RiFileCopyLine size={14} className="text-gray-300" />
				)}
			</button>
			{onViewInCanvas && (
				<button
					onClick={handleViewInCanvas}
					className="flex items-center gap-1 rounded bg-white p-2 px-4 transition-colors hover:bg-gray-600"
					title="View in Canvas"
				>
					<span className="font-medium">View</span>
					<ArrowIcon size={16} />
				</button>
			)}
		</div>
	);
};

export default TableActions;
