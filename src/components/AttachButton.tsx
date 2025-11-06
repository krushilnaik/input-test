import { useState, useRef } from "react";
import { AttachPopover } from "./AttachPopover";
import { AttachIcon } from "../atoms/AttachIcon";

interface AttachButtonProps {
  onFileUpload?: (file: File) => void;
}

export function AttachButton({ onFileUpload }: AttachButtonProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleUseExisting = () => {
    console.log("Use existing file");
    // TODO: Implement file selection from existing files
  };

  const handleUploadNew = (file: File) => {
    console.log("[AttachButton] handleUploadNew called with file:", file.name, file.size);
    console.log("[AttachButton] onFileUpload exists:", !!onFileUpload);
    onFileUpload?.(file);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsPopoverOpen(!isPopoverOpen);
        }}
        className="ml-4 shrink-0 p-2 text-gray-400 hover:text-white transition-colors"
        aria-label="Attach file"
        aria-expanded={isPopoverOpen}
      >
        <AttachIcon />
      </button>
      <AttachPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        onUseExisting={handleUseExisting}
        onUploadNew={handleUploadNew}
        buttonRef={buttonRef}
      />
    </div>
  );
}
