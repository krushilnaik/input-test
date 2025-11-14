import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { COLORS, INPUT_DIMENSIONS } from "../constants";
import { useBorderAnimation } from "../hooks/useBorderAnimation";
import { useViewTransitionPause } from "../hooks/useViewTransitionPause";
import { BorderAnimation } from "./BorderAnimation";
import { AttachButton } from "./AttachButton";
import { SendButton } from "./SendButton";
import { FilePills } from "./FilePills";
import { SuggestionPills } from "./SuggestionPills";

interface AnimatedInputProps {
  onReady?: (controls: { startAnimation: () => void; isAnimating: boolean }) => void;
  shouldStartAnimation?: boolean;
}

export function AnimatedInput({ onReady, shouldStartAnimation = true }: AnimatedInputProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const segmentsRef = useRef<(SVGPathElement | null)[]>([]);
  const glowSegmentsRef = useRef<(SVGPathElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const borderAnimationStartedRef = useRef(false);
  const glowAnimationIdRef = useRef<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [shouldAnimatePills, setShouldAnimatePills] = useState(false);
  const hasStartedRef = useRef(false);

  // Preserve GSAP animations during view transitions
  useViewTransitionPause();

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

  const handleFileRemove = useCallback((fileToRemove: File) => {
    console.log("[AnimatedInput] handleFileRemove called with file:", fileToRemove.name);
    setFiles((prev) => {
      const newFiles = prev.filter((file) => file.name !== fileToRemove.name || file.size !== fileToRemove.size);
      console.log(
        "[AnimatedInput] Files state updated after remove, count:",
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
    setShouldAnimatePills(true);
    startAnimation(setIsAnimating, resetSegments);
  }, [startAnimation, resetSegments]);

  const startGlowAnimation = useCallback(() => {
    if (!pathRef.current || glowAnimationIdRef.current !== null) return;

    const pathLength = pathRef.current.getTotalLength();
    const numSegments = COLORS.length;
    const segmentLength = (pathLength / numSegments) * 1.5;
    const spacing = segmentLength;

    // Initialize glow segments with fade-in animation
    glowSegmentsRef.current.forEach((segment, index) => {
      if (segment) {
        const offset = spacing * index;
        gsap.set(segment, {
          strokeDasharray: `${segmentLength} ${pathLength}`,
          strokeDashoffset: -offset,
          opacity: 0,
        });
        // Fade in smoothly
        gsap.to(segment, {
          opacity: 0.8,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    let startTime: number | null = null;
    const animationSpeed = 5; // seconds per full rotation

    function animateGlow(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const movement = (elapsed / animationSpeed) * pathLength;
      const wrappedMovement = movement - Math.floor(movement / pathLength) * pathLength;

      glowSegmentsRef.current.forEach((segment, index) => {
        if (segment) {
          const offset = spacing * index;
          const segmentOffset = -offset - wrappedMovement;
          segment.style.strokeDashoffset = `${segmentOffset}px`;
        }
      });

      if (glowAnimationIdRef.current !== null) {
        glowAnimationIdRef.current = requestAnimationFrame(animateGlow);
      }
    }

    glowAnimationIdRef.current = requestAnimationFrame(animateGlow);
  }, []);

  const stopGlowAnimation = useCallback(() => {
    if (glowAnimationIdRef.current !== null) {
      cancelAnimationFrame(glowAnimationIdRef.current);
      glowAnimationIdRef.current = null;
    }

    // Fade out glow segments
    glowSegmentsRef.current.forEach((segment) => {
      if (segment) {
        gsap.to(segment, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }, []);

  const handleFocus = useCallback(() => {
    startGlowAnimation();
  }, [startGlowAnimation]);

  const handleBlur = useCallback(() => {
    stopGlowAnimation();
  }, [stopGlowAnimation]);

  // Set initial state immediately to prevent flash
  useLayoutEffect(() => {
    if (containerRef.current) {
      const finalHeight = INPUT_DIMENSIONS.height;
      const initialHeight = finalHeight * 0.6;

      gsap.set(containerRef.current, {
        width: "100%",
        height: initialHeight,
        opacity: 0,
        y: 60,
      });
    }
  }, []);

  // Start animation when shouldStartAnimation becomes true (only once)
  useEffect(() => {
    if (hasStartedRef.current || !shouldStartAnimation) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      hasStartedRef.current = true;
      setShouldAnimatePills(true);
      startAnimation(setIsAnimating, resetSegments);
    }, 50);

    return () => clearTimeout(timer);
  }, [shouldStartAnimation, startAnimation, resetSegments, setIsAnimating]);

  useEffect(() => {
    onReady?.({ startAnimation: handleStartAnimation, isAnimating });
  }, [handleStartAnimation, isAnimating, onReady]);

  // Cleanup glow animation on unmount
  useEffect(() => {
    return () => {
      if (glowAnimationIdRef.current !== null) {
        cancelAnimationFrame(glowAnimationIdRef.current);
      }
    };
  }, []);

  const finalHeight = INPUT_DIMENSIONS.height;
  const initialHeight = finalHeight * 0.6;

  return (
    <div className="flex flex-col animated-input-container w-full">
      <div
        ref={containerRef}
        className="relative glass rounded-2xl overflow-hidden bg-black/20 w-full"
        style={{
          height: initialHeight,
          opacity: 0,
          transform: "translateY(60px)",
        }}
      >
        <BorderAnimation pathRef={pathRef} segmentsRef={segmentsRef} glowSegmentsRef={glowSegmentsRef} containerRef={containerRef} />
        <div className="relative flex items-center h-full w-full">
          <AttachButton onFileUpload={handleFileUpload} />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 px-4 py-5 rounded-2xl text-white placeholder:text-gray-400 outline-none bg-transparent"
            placeholder="Ask anything..."
          />
          <SendButton inputValue={inputValue} />
        </div>
      </div>
      <SuggestionPills shouldAnimate={shouldAnimatePills} />
      <FilePills files={files} onRemove={handleFileRemove} />
    </div>
  );
}
