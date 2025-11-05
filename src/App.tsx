import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const colors = ["#ea4335", "#ea4335", "#fbbc04", "#34a853", "#4285f4", "#4285f4", "#9334e6"];

function App() {
  const pathRef = useRef<SVGPathElement>(null);
  const segmentsRef = useRef<(SVGPathElement | null)[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (!pathRef.current || isAnimating) return;
    
    setIsAnimating(true);
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
        setIsAnimating(false);
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
          
          // Add staggered fade-in effect
          const staggerDelay = index * 0.1; // 0.1s delay between each color
          const fadeInProgress = Math.max(0, Math.min(1, (elapsed - staggerDelay) / 0.3)); // 0.3s fade-in duration
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
  });

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
        </div>
      </div>
      <button
        onClick={startAnimation}
        disabled={isAnimating}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isAnimating ? 'Animating...' : 'Animate'}
      </button>
    </main>
  );
}

export default App;
