import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const colors = ["#ea4335", "#fbbc04", "#34a853", "#4285f4", "#9334e6"];

function App() {
  const pathRef = useRef<SVGPathElement>(null);
  const segmentsRef = useRef<(SVGPathElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const borderAnimationStartedRef = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (!pathRef.current || !containerRef.current || isAnimating) return;

    setIsAnimating(true);
    borderAnimationStartedRef.current = false;

    // Reset to initial state
    const finalWidth = Math.round(384 * 1.3) + 20; // 30% larger + 20px: 519px
    const finalHeight = Math.round(56 * 1.3) - 10; // 30% larger - 10px: 63px
    const initialHeight = finalHeight * 0.6; // 60% of final height

    gsap.set(containerRef.current, {
      width: finalWidth, // Keep width at full size
      height: initialHeight,
      opacity: 0,
      y: 20,
    });

    // Reset border segments
    const pathLength = pathRef.current.getTotalLength();
    const numSegments = colors.length;
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
        // Start border animation at 50% progress
        if (this.progress() >= 0.5 && !borderAnimationStartedRef.current) {
          borderAnimationStartedRef.current = true;
          startIntroBorderAnimation();
        }
      },
    });
  };

  const startIntroBorderAnimation = () => {
    if (!pathRef.current) return;

    const pathLength = pathRef.current.getTotalLength();
    const numSegments = colors.length;
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

  useGSAP(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const numSegments = colors.length;
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
    }

    // Set initial visible state for container
    if (containerRef.current) {
      const finalWidth = Math.round(384 * 1.3) + 20; // 519px
      const finalHeight = Math.round(56 * 1.3) - 10; // 63px
      gsap.set(containerRef.current, {
        width: finalWidth,
        height: finalHeight,
        opacity: 1,
        y: 0,
      });
    }
  }, []);

  // Calculate dimensions based on input field
  // Input width: 30% larger than w-96 (384px) + 20px wider
  // SVG extends 4px on each side for border effect
  const inputWidth = Math.round(384 * 1.3) + 20; // 519px (30% larger + 20px)
  const inputHeight = Math.round(56 * 1.3) - 10; // 63px (30% larger - 10px)
  const borderOffset = 4; // SVG extends 4px beyond input
  const svgWidth = inputWidth + borderOffset * 2; // 527px
  const svgHeight = inputHeight + borderOffset * 2; // 71px

  // Path coordinates: start 4px in from SVG edge, account for rounded corners
  // Path should match input dimensions: 519px wide, 63px tall
  const cornerRadius = Math.round(12 * 1.3); // Rounded corner radius scaled 30%: 16px
  const pathXStart = borderOffset + cornerRadius; // 20px from SVG left (4px border + 16px corner radius)
  const pathXEnd = inputWidth + borderOffset - cornerRadius; // 507px from SVG left (519 + 4 - 16 = 507)
  const pathYTop = borderOffset + cornerRadius; // 20px from SVG top
  const pathYBottom = inputHeight + borderOffset - cornerRadius; // 51px from SVG top (63 + 4 - 16 = 51)

  // Create rounded rectangle path matching input dimensions
  const pathD = `M ${pathXStart} ${borderOffset} L ${pathXEnd} ${borderOffset} Q ${
    svgWidth - borderOffset
  } ${borderOffset} ${svgWidth - borderOffset} ${pathYTop} L ${svgWidth - borderOffset} ${pathYBottom} Q ${
    svgWidth - borderOffset
  } ${svgHeight - borderOffset} ${pathXEnd} ${svgHeight - borderOffset} L ${pathXStart} ${
    svgHeight - borderOffset
  } Q ${borderOffset} ${
    svgHeight - borderOffset
  } ${borderOffset} ${pathYBottom} L ${borderOffset} ${pathYTop} Q ${borderOffset} ${borderOffset} ${pathXStart} ${borderOffset}`;

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <div ref={containerRef} className="relative glass rounded-2xl overflow-hidden">
          <svg
            className="absolute inset-0 pointer-events-none z-20"
            width={svgWidth}
            height={svgHeight}
            style={{
              left: `-${borderOffset}px`,
              top: `-${borderOffset}px`,
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Hidden reference path to get length */}
            <path ref={pathRef} d={pathD} fill="none" stroke="none" />

            {/* Render a path for each color */}
            {colors.map((color, index) => (
              <path
                key={`${color}-${index}`}
                ref={(el) => {
                  segmentsRef.current[index] = el;
                }}
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            ))}
          </svg>
          <div className="relative flex items-center justify-center h-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-5 py-5 rounded-2xl text-white placeholder:text-gray-400 outline-none w-[519px] relative bg-transparent"
              placeholder="Ask anything..."
            />
          </div>
        </div>
      </div>
      <div className="pb-8 flex justify-center">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isAnimating ? "Animating..." : "Animate"}
        </button>
      </div>
    </main>
  );
}

export default App;
