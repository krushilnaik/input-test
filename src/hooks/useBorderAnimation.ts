import { COLORS } from "../constants";
import gsap from "gsap";

interface UseBorderAnimationParams {
  pathRef: React.RefObject<SVGPathElement | null>;
  segmentsRef: React.RefObject<(SVGPathElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  borderAnimationStartedRef: React.RefObject<boolean>;
}

export function useBorderAnimation({
  pathRef,
  segmentsRef,
  containerRef,
  borderAnimationStartedRef,
}: UseBorderAnimationParams) {
  const startIntroBorderAnimation = () => {
    if (!pathRef.current) return;

    const pathLength = pathRef.current.getTotalLength();
    const numSegments = COLORS.length;
    const segmentLength = (pathLength / numSegments) * 1.5;
    const spacing = segmentLength;

    let sharedStartTime: number | null = null;
    let animationId: number;

    function animate(currentTime: number) {
      if (sharedStartTime === null) sharedStartTime = currentTime;

      const elapsed = (currentTime - sharedStartTime) / 1000;
      const movement = (elapsed / 3) * pathLength;

      if (elapsed >= 1.5) {
        segmentsRef.current.forEach((segment) => {
          if (segment) segment.style.opacity = "0";
        });
        cancelAnimationFrame(animationId);
        return;
      }
      const wrappedMovement = movement - Math.floor(movement / pathLength) * pathLength;

      segmentsRef.current.forEach((segment, index) => {
        if (segment) {
          const offset = spacing * index;
          const segmentOffset = -offset - wrappedMovement;
          segment.style.strokeDashoffset = `${segmentOffset}px`;

          const normalizedOffset = ((segmentOffset % pathLength) + pathLength) % pathLength;
          const segmentCenter = (normalizedOffset + segmentLength / 2) % pathLength;
          const phaseIncrement = pathLength / numSegments;
          const segmentPhase = index * phaseIncrement;
          const fadePosition = (segmentCenter + segmentPhase) % pathLength;
          const normalizedPos = fadePosition / pathLength;
          const fadeEnd = 0.25;
          const transitionStart = 0.45;

          let fadeProgress = 0;
          if (normalizedPos <= fadeEnd) {
            fadeProgress = normalizedPos / fadeEnd;
          } else if (normalizedPos >= transitionStart) {
            const transitionProgress = (normalizedPos - transitionStart) / (1 - transitionStart);
            const smoothTransition = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
            fadeProgress = 1 - smoothTransition;
          } else {
            fadeProgress = 1;
          }

          const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);
          const baseOpacity = 1 - easedProgress;

          const staggerDelay = index * 0.1;
          const fadeInProgress = Math.max(0, Math.min(1, (elapsed - staggerDelay) / 0.3));
          const finalOpacity = baseOpacity * fadeInProgress;

          segment.style.opacity = finalOpacity.toString();
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    segmentsRef.current.forEach((segment, index) => {
      if (segment) {
        const offset = spacing * index;
        gsap.set(segment, {
          strokeDasharray: `${segmentLength} ${pathLength}`,
          strokeDashoffset: -offset,
          opacity: 0,
        });
      }
    });

    animationId = requestAnimationFrame(animate);
  };

  const startAnimation = (setIsAnimating: (value: boolean) => void, resetSegments: () => void) => {
    if (!pathRef.current || !containerRef.current) return;

    setIsAnimating(true);
    borderAnimationStartedRef.current = false;

    // Reset to initial state
    const finalWidth = Math.round(384 * 1.3) + 20;
    const finalHeight = Math.round(56 * 1.3) - 10;
    const initialHeight = finalHeight * 0.6;

    gsap.set(containerRef.current, {
      width: finalWidth,
      height: initialHeight,
      opacity: 0,
      y: 60,
    });

    // Reset border segments
    resetSegments();

    // Create intro animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        if (containerRef.current) {
          gsap.set(containerRef.current, { width: finalWidth, height: finalHeight, opacity: 1, y: 0 });
        }
      },
    });

    timeline.to(containerRef.current, {
      height: finalHeight,
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      onUpdate: function () {
        // Start border animation at 20% progress
        if (this.progress() >= 0.2 && !borderAnimationStartedRef.current) {
          borderAnimationStartedRef.current = true;
          startIntroBorderAnimation();
        }
      },
    });
  };

  return { startAnimation };
}
