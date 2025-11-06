import { useRef, useEffect } from "react";
import gsap from "gsap";

interface FilePillsProps {
  files: File[];
}

export function FilePills({ files }: FilePillsProps) {
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M3.5 2.33333C3.5 1.8731 3.8731 1.5 4.33333 1.5H7.58333C7.81333 1.5 8.03333 1.59167 8.19167 1.75L10.25 3.80833C10.4083 3.96667 10.5 4.18667 10.5 4.41667V11.6667C10.5 12.1269 10.1269 12.5 9.66667 12.5H4.33333C3.8731 12.5 3.5 12.1269 3.5 11.6667V2.33333Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="max-w-[200px] truncate">{file.name}</span>
          </div>
        );
      })}
    </div>
  );
}
