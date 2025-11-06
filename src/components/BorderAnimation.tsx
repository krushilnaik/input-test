import { COLORS } from "../constants";
import { createRoundedRectanglePath } from "../utils/pathUtils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BorderAnimationProps {
  pathRef: React.RefObject<SVGPathElement | null>;
  segmentsRef: React.RefObject<(SVGPathElement | null)[]>;
}

export function BorderAnimation({ pathRef, segmentsRef }: BorderAnimationProps) {
  const { pathD, svgWidth, svgHeight, borderOffset } = createRoundedRectanglePath();

  useGSAP(() => {
    if (pathRef.current) {
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
    }
  }, []);

  return (
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
      {COLORS.map((color, index) => (
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
  );
}
