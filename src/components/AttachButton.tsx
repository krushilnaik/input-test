import { useState, useRef } from "react";
import { AttachPopover } from "./AttachPopover";

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
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 3C11.12 3 10 4.12 10 5.5V13.5C10 14.8807 11.1193 16 12.5 16C13.8807 16 15 14.8807 15 13.5V6.5C15 6.22386 14.7761 6 14.5 6C14.2239 6 14 6.22386 14 6.5V13.5C14 14.3284 13.3284 15 12.5 15C11.6716 15 11 14.3284 11 13.5V5.5C11 4.11929 9.88071 3 8.5 3C7.11929 3 6 4.11929 6 5.5V13.5C6 15.433 7.567 17 9.5 17C11.433 17 13 15.433 13 13.5V6.5C13 6.22386 12.7761 6 12.5 6C12.2239 6 12 6.22386 12 6.5V13.5C12 14.8807 10.8807 16 9.5 16C8.11929 16 7 14.8807 7 13.5V5.5C7 4.67157 7.67157 4 8.5 4C9.32843 4 10 4.67157 10 5.5V13.5C10 13.7761 10.2239 14 10.5 14C10.7761 14 11 13.7761 11 13.5V5.5C11 4.11929 12.1193 3 13.5 3C14.8807 3 16 4.11929 16 5.5V13.5C16 15.433 14.433 17 12.5 17C10.567 17 9 15.433 9 13.5V5.5C9 4.12 10.12 3 11.5 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
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
