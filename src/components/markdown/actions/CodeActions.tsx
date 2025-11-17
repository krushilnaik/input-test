import { useState } from "react";

import { CheckIcon } from "@/atoms/icons/CheckIcon";
import { CopyIcon } from "@/atoms/icons/CopyIcon";
import { ArrowIcon } from "@/atoms/icons/ArrowIcon";

interface CodeActionsProps {
  code: string;
  language?: string;
  onViewInCanvas?: (codeHtml: string, title: string) => void;
}

const CodeActions = ({ code, language, onViewInCanvas }: CodeActionsProps) => {
  const [copied, setCopied] = useState(false);

  const escapeHtml = (text: string) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleViewInCanvas = () => {
    if (onViewInCanvas) {
      const escapedCode = escapeHtml(code);
      const codeHtml = `<pre><code class="language-${language} text-white">${escapedCode}</code></pre>`;
      const title = language ? `${language.charAt(0).toUpperCase() + language.slice(1)} Code` : "Code";
      onViewInCanvas(codeHtml, title);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="rounded bg-gray-700 p-2 px-3 transition-colors hover:bg-gray-600"
        title="Copy code"
      >
        {copied ? <CheckIcon size={16} color="#4ade80" /> : <CopyIcon size={16} color="#d1d5db" />}
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

export default CodeActions;
