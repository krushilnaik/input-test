import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FolderIcon } from "../atoms/FolderIcon";
import { UploadIcon } from "../atoms/UploadIcon";

interface AttachPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onUseExisting: () => void;
  onUploadNew: (file: File) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export function AttachPopover({ isOpen, onClose, onUseExisting, onUploadNew, buttonRef }: AttachPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const option1Ref = useRef<HTMLButtonElement>(null);
  const option2Ref = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positionReady, setPositionReady] = useState(false);

  // Calculate position based on button
  useEffect(() => {
    if (!isOpen || !buttonRef.current) {
      // Reset when closed
      if (!isOpen) {
        setPosition({ top: 0, left: 0 });
        setPositionReady(false);
      }
      return;
    }

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const gap = 8;

        // Measure popover dimensions if available, otherwise use estimate
        let popoverHeight = 88; // Default estimate
        let popoverWidth = 200; // Default min-width
        if (popoverRef.current) {
          popoverHeight = popoverRef.current.offsetHeight;
          popoverWidth = popoverRef.current.offsetWidth;
        }

        setPosition({
          top: rect.top - popoverHeight - gap, // Position above with gap
          left: rect.right - popoverWidth, // Align right edge with button's right edge
        });
        setPositionReady(true);
      }
    };

    // Calculate immediately - use requestAnimationFrame to ensure button is rendered
    requestAnimationFrame(() => {
      updatePosition();
      // Update again after a frame to account for popover height
      requestAnimationFrame(updatePosition);
    });

    // Update on scroll/resize
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, buttonRef]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        onClose();
      }
    };

    // Use click instead of mousedown to avoid conflicts with button clicks
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, [isOpen, onClose, buttonRef]);

  useGSAP(() => {
    if (!isOpen || !positionReady) return;

    if (popoverRef.current && option1Ref.current && option2Ref.current) {
      // Set initial values immediately to prevent flash
      gsap.set(popoverRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 10,
      });

      gsap.set([option1Ref.current, option2Ref.current], {
        x: -10,
        opacity: 0,
      });

      // Use a small delay to ensure DOM is ready, then animate
      const timeoutId = setTimeout(() => {
        if (popoverRef.current && option1Ref.current && option2Ref.current) {
          // Animate in
          gsap.to(popoverRef.current, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out(1.2)",
          });

          // Stagger the menu items
          gsap.to([option1Ref.current, option2Ref.current], {
            x: 0,
            opacity: 1,
            duration: 0.25,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.1,
          });
        }
      }, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, positionReady]);

  const popoverContent = isOpen ? (
    <div
      ref={popoverRef}
      className="glass rounded-xl overflow-hidden bg-black/20 min-w-[200px] z-50"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        transformOrigin: "bottom right",
        ...(positionReady ? {} : { opacity: 0, pointerEvents: "none" }),
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        <button
          ref={option1Ref}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onUseExisting();
            onClose();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full px-4 py-2.5 text-left text-white hover:bg-gray-700 transition-colors text-sm flex items-center gap-3"
        >
          <FolderIcon className="shrink-0" />
          <span>Use existing file</span>
        </button>
        <button
          ref={option2Ref}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log("[AttachPopover] Upload button clicked, triggering file input");
            fileInputRef.current?.click();
            // Don't close immediately - let the file selection happen first
            // onClose will be called after file is selected in onChange
          }}
          onMouseDown={(e) => e.stopPropagation()}
          type="button"
          className="w-full px-4 py-2.5 text-left text-white hover:bg-gray-700 transition-colors text-sm flex items-center gap-3"
        >
          <UploadIcon className="shrink-0" />
          <span>Upload new file</span>
        </button>
      </div>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          console.log("[AttachPopover] File input changed, file:", file);
          if (file) {
            console.log("[AttachPopover] Calling onUploadNew with file:", file.name, file.size);
            onUploadNew(file);
            onClose(); // Close popover after file is selected
          } else {
            console.log("[AttachPopover] No file selected");
          }
          // Reset input so same file can be selected again
          e.target.value = "";
        }}
      />
    </div>
  ) : null;

  return createPortal(popoverContent, document.body);
}
