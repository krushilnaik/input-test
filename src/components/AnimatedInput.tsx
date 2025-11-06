import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { calculateInputDimensions, COLORS } from "../constants";
import { useBorderAnimation } from "../hooks/useBorderAnimation";
import { BorderAnimation } from "./BorderAnimation";
import { AttachButton } from "./AttachButton";
import { SendButton } from "./SendButton";
import { FilePills } from "./FilePills";

interface AnimatedInputProps {
  onReady?: (controls: { startAnimation: () => void; isAnimating: boolean }) => void;
}

export function AnimatedInput({ onReady }: AnimatedInputProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const segmentsRef = useRef<(SVGPathElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const borderAnimationStartedRef = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = useCallback((file: File) => {
    console.log("[AnimatedInput] handleFileUpload called with file:", file.name, file.size);
    setFiles((prev) => {
      const newFiles = [...prev, file];
      console.log(
        "[AnimatedInput] Files state updated, count:",
        newFiles.length,
        "files:",
        newFiles.map((f) => f.name)
      );
      return newFiles;
    });
  }, []);

  useEffect(() => {
    console.log(
      "[AnimatedInput] Files state changed, count:",
      files.length,
      "files:",
      files.map((f) => f.name)
    );
  }, [files]);

  const resetSegments = useCallback(() => {
    if (!pathRef.current) return;
    const pathLength = pathRef.current.getTotalLength();
    const numSegments = COLORS.length;
    const segmentLength = (pathLength / numSegments) * 1.5;

    segmentsRef.current.forEach((segment, index) => {
      if (segment) {
        const spacing = segmentLength;
        const offset = spacing * index;
        gsap.set(segment, {
          strokeDasharray: `${segmentLength} ${pathLength}`,
          strokeDashoffset: -offset,
          opacity: 0,
        });
      }
    });
  }, []);

  const { startAnimation } = useBorderAnimation({
    pathRef,
    segmentsRef,
    containerRef,
    borderAnimationStartedRef,
  });

  const handleStartAnimation = useCallback(() => {
    startAnimation(setIsAnimating, resetSegments);
  }, [startAnimation, resetSegments]);

  useGSAP(() => {
    // Set initial visible state for container
    if (containerRef.current) {
      const { width: finalWidth, height: finalHeight } = calculateInputDimensions();
      gsap.set(containerRef.current, {
        width: finalWidth,
        height: finalHeight,
        opacity: 1,
        y: 0,
      });
    }
  }, []);

  useEffect(() => {
    onReady?.({ startAnimation: handleStartAnimation, isAnimating });
  }, [handleStartAnimation, isAnimating, onReady]);

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="relative glass rounded-2xl overflow-hidden bg-black/20">
        <BorderAnimation pathRef={pathRef} segmentsRef={segmentsRef} />
        <div className="relative flex items-center h-full w-full">
          <AttachButton onFileUpload={handleFileUpload} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-5 rounded-2xl text-white placeholder:text-gray-400 outline-none bg-transparent"
            placeholder="Ask anything..."
          />
          <SendButton inputValue={inputValue} />
        </div>
      </div>
      <FilePills files={files} />
    </div>
  );
}
