import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FileIcon } from "../atoms/FileIcon";
import { CloseIcon } from "../atoms/CloseIcon";

interface FilePillsProps {
  files: File[];
  onRemove: (file: File) => void;
}

export function FilePills({ files, onRemove }: FilePillsProps) {
  const pillRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const previousFilesLengthRef = useRef(0);

  console.log(
    "[FilePills] Rendering with files count:",
    files.length,
    "files:",
    files.map((f) => f.name)
  );

  useEffect(() => {
    // Only animate new files when files array grows
    if (files.length > previousFilesLengthRef.current) {
      const newFilesStartIndex = previousFilesLengthRef.current;
      const newFiles = files.slice(newFilesStartIndex);

      console.log(
        "[FilePills] New files detected, animating:",
        newFiles.map((f) => f.name)
      );

      // Use requestAnimationFrame to ensure DOM is updated and refs are set
      requestAnimationFrame(() => {
        newFiles.forEach((file, relativeIndex) => {
          const key = `${file.name}-${file.size}`;
          const pillRef = pillRefs.current.get(key);

          if (pillRef) {
            console.log("[FilePills] Animating pill for:", file.name);
            // Set initial state
            gsap.set(pillRef, {
              scale: 0,
              opacity: 0,
              y: -10,
            });

            // Animate in
            gsap.to(pillRef, {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.4)",
              delay: relativeIndex * 0.1,
            });
          } else {
            console.log("[FilePills] Pill ref not found for:", key);
          }
        });
      });
    }

    previousFilesLengthRef.current = files.length;
  }, [files]);

  if (files.length === 0) {
    console.log("[FilePills] No files, returning null");
    return null;
  }

  return (
    <div className="flex flex-wrap w-full gap-2 mt-3 justify-start">
      {files.map((file, index) => {
        const key = `${file.name}-${file.size}`;
        return (
          <div
            key={`${key}-${index}`}
            ref={(el) => {
              if (el) {
                pillRefs.current.set(key, el);
              } else {
                pillRefs.current.delete(key);
              }
            }}
            className="glass rounded-full px-4 py-2 bg-black/20 text-white text-sm flex items-center gap-2"
          >
            <FileIcon className="shrink-0" />
            <span className="max-w-[200px] truncate">{file.name}</span>
            <button
              onClick={() => onRemove(file)}
              className="shrink-0 hover:opacity-70 transition-opacity ml-1"
              aria-label={`Remove ${file.name}`}
            >
              <CloseIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
}
