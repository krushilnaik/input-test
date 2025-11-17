import { useState } from "react";

import { CheckIcon } from "@/atoms/icons/CheckIcon";
import { CopyIcon } from "@/atoms/icons/CopyIcon";
import { ArrowIcon } from "@/atoms/icons/ArrowIcon";

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
        {copied ? <CheckIcon size={14} color="#4ade80" /> : <CopyIcon size={14} color="#d1d5db" />}
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
