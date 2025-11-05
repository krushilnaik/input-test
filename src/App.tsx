import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const colors = ["#ea4335", "#fbbc04", "#34a853", "#4285f4", "#9334e6"];

function App() {
  const pathRef = useRef<SVGPathElement>(null);
  const segmentsRef = useRef<(SVGPathElement | null)[]>([]);
  const [inputValue, setInputValue] = useState("");
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const numSegments = colors.length;

      // Each segment takes up 1/5 of the border, with small gaps between
      const segmentLength = (pathLength / numSegments) * 1.5; // Slightly overlapping`;
      const spacing = segmentLength;

      // Animate each segment - use shared time for synchronization
      let sharedStartTime: number | null = null;
      let animationId: number;

      function animate(currentTime: number) {
        if (sharedStartTime === null) sharedStartTime = currentTime;

        const elapsed = (currentTime - sharedStartTime) / 1000;
        // Move by pathLength for seamless visual wrap
        const movement = (elapsed / 4) * pathLength;
        const wrappedMovement = movement - Math.floor(movement / pathLength) * pathLength;

        segmentsRef.current.forEach((segment, index) => {
          if (segment) {
            const offset = spacing * index;
            const segmentOffset = -offset - wrappedMovement;
            segment.style.strokeDashoffset = `${segmentOffset}px`;

            // Calculate smooth incremental fade for each segment
            // Normalize the offset to get position (0 to pathLength)
            const normalizedOffset = ((segmentOffset % pathLength) + pathLength) % pathLength;

            // Calculate the center position of the visible segment
            const segmentCenter = (normalizedOffset + segmentLength / 2) % pathLength;

            // Each segment has a phase offset for incremental fading
            // This creates a staggered fade where each segment fades at different positions
            const phaseIncrement = pathLength / numSegments;
            const segmentPhase = index * phaseIncrement;

            // Combine segment center with phase to get fade position
            // This ensures each segment fades at a different point in the cycle
            const fadePosition = (segmentCenter + segmentPhase) % pathLength;

            // Create a perfectly smooth, continuous fade function
            // Normalize position to 0-1 range for easier calculation
            const normalizedPos = fadePosition / pathLength;

            // Speed up fade: fade completes in first 40% of path, then stay transparent briefly, then fade back in
            // This ensures the fade animation completes well before the border loops
            const fadeEnd = 0.25; // Fade out completes at 25% of path
            const transitionStart = 0.45; // Start transitioning back to opaque at 45%

            // Calculate fade progress ensuring perfect continuity
            let fadeProgress = 0;

            if (normalizedPos <= fadeEnd) {
              // Fade zone: smoothly fade from opaque (0) to transparent (1)
              fadeProgress = normalizedPos / fadeEnd;
            } else if (normalizedPos >= transitionStart) {
              // Transition zone: smoothly fade back from transparent to opaque
              const transitionProgress = (normalizedPos - transitionStart) / (1 - transitionStart);
              // Use smoothstep for ultra-smooth transition
              const smoothTransition = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
              fadeProgress = 1 - smoothTransition;
            } else {
              // Middle zone: fully transparent
              fadeProgress = 1;
            }

            // Apply smoothstep easing for ultra-smooth fade curve
            // This ensures C1 continuity (smooth function and derivative)
            const easedProgress = fadeProgress * fadeProgress * (3 - 2 * fadeProgress);

            // Calculate final opacity: 1 = opaque, 0 = transparent
            const opacity = 1 - easedProgress;

            // Set opacity - browser will interpolate smoothly between animation frames
            segment.style.opacity = opacity.toString();
          }
        });

        animationId = requestAnimationFrame(animate);
      }

      // Set initial dash arrays and opacity
      segmentsRef.current.forEach((segment, index) => {
        if (segment) {
          const offset = spacing * index;
          gsap.set(segment, {
            strokeDasharray: `${segmentLength} ${pathLength}`,
            strokeDashoffset: -offset,
            opacity: 1,
          });
        }
      });

      // Start animation
      animationId = requestAnimationFrame(animate);

      // Cleanup function
      return () => {
        cancelAnimationFrame(animationId);
      };
    }
  }, []);

  // Initialize send button as hidden
  useEffect(() => {
    if (sendButtonRef.current) {
      gsap.set(sendButtonRef.current, {
        opacity: 0,
        scale: 0.8,
        x: 10,
        y: "-50%",
        transformOrigin: "center center",
      });
    }
  }, []);

  // Animate send button in/out based on input content
  useEffect(() => {
    if (sendButtonRef.current) {
      if (inputValue.trim().length > 0) {
        gsap.to(sendButtonRef.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          y: "-50%",
          duration: 0.3,
          ease: "back.out(1.2)",
        });
      } else {
        gsap.to(sendButtonRef.current, {
          opacity: 0,
          scale: 0.8,
          x: 10,
          y: "-50%",
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [inputValue]);

  // Calculate dimensions based on input field
  // Input width: w-72 = 288px (18rem)
  // SVG extends 4px on each side for border effect
  const inputWidth = 288; // w-72 in pixels
  const inputHeight = 48; // py-3 (12px top + 24px line-height + 12px bottom)
  const borderOffset = 4; // SVG extends 4px beyond input
  const svgWidth = inputWidth + borderOffset * 2; // 296px
  const svgHeight = inputHeight + borderOffset * 2; // 56px

  // Path coordinates: start 4px in from SVG edge, account for rounded corners
  // Path should match input dimensions: 288px wide, 48px tall
  const cornerRadius = 8; // Rounded corner radius
  const pathXStart = borderOffset + cornerRadius; // 12px from SVG left (4px border + 8px corner radius)
  const pathXEnd = inputWidth + borderOffset - cornerRadius; // 284px from SVG left (288 + 4 - 8 = 284)
  const pathYTop = borderOffset + cornerRadius; // 12px from SVG top
  const pathYBottom = inputHeight + borderOffset - cornerRadius; // 44px from SVG top (48 + 4 - 8 = 44)

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
    <main className="grid place-content-center min-h-screen w-full bg-gray-900 gap-4">
      <h1>Hi</h1>
      <div className="relative">
        <svg
          className="absolute inset-0 pointer-events-none"
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
              key={color}
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
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-4 py-3 pr-12 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 outline-none w-72 relative"
            placeholder="Ask anything..."
          />
          <button
            ref={sendButtonRef}
            className="absolute right-2 top-1/2 w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={!inputValue.trim()}
            aria-label="Send"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
