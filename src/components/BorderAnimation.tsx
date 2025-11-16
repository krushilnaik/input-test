import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

import { BORDER_CONFIG, COLORS, INPUT_DIMENSIONS } from "@/constants/borderAnimation";

interface BorderAnimationProps {
  pathRef: React.RefObject<SVGPathElement | null>;
  segmentsRef: React.RefObject<(SVGPathElement | null)[]>;
  glowSegmentsRef: React.RefObject<(SVGPathElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function createRoundedRectanglePath(containerWidth: number) {
  const inputWidth = containerWidth;
  const inputHeight = INPUT_DIMENSIONS.height;
  const borderOffset = BORDER_CONFIG.offset;
  const cornerRadius = BORDER_CONFIG.cornerRadius;
  const svgWidth = inputWidth + borderOffset * 2;
  const svgHeight = inputHeight + borderOffset * 2;

  const pathXStart = borderOffset + cornerRadius;
  const pathXEnd = inputWidth + borderOffset - cornerRadius;
  const pathYTop = borderOffset + cornerRadius;
  const pathYBottom = inputHeight + borderOffset - cornerRadius;

  const pathD = `M ${pathXStart} ${borderOffset} L ${pathXEnd} ${borderOffset} Q ${
    svgWidth - borderOffset
  } ${borderOffset} ${svgWidth - borderOffset} ${pathYTop} L ${svgWidth - borderOffset} ${pathYBottom} Q ${
    svgWidth - borderOffset
  } ${svgHeight - borderOffset} ${pathXEnd} ${svgHeight - borderOffset} L ${pathXStart} ${
    svgHeight - borderOffset
  } Q ${borderOffset} ${
    svgHeight - borderOffset
  } ${borderOffset} ${pathYBottom} L ${borderOffset} ${pathYTop} Q ${borderOffset} ${borderOffset} ${pathXStart} ${borderOffset}`;

  return {
    pathD,
    svgWidth,
    svgHeight,
    inputWidth,
    inputHeight,
    borderOffset,
  };
}

export function BorderAnimation({ pathRef, segmentsRef, glowSegmentsRef, containerRef }: BorderAnimationProps) {
  const [pathData, setPathData] = useState(() => {
    // Initial width fallback
    const initialWidth = containerRef.current?.offsetWidth || INPUT_DIMENSIONS.width;
    return createRoundedRectanglePath(initialWidth);
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updatePath = () => {
      const width = containerRef.current?.offsetWidth || INPUT_DIMENSIONS.width;
      if (width > 0) {
        setPathData(createRoundedRectanglePath(width));
      }
    };

    // Initial update
    updatePath();

    // Use ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(updatePath);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  const { pathD, svgWidth, svgHeight, borderOffset } = pathData;

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
  }, [pathD]);

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
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
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

      {/* Render glow segments for focus animation */}
      {COLORS.map((color, index) => (
        <path
          key={`glow-${color}-${index}`}
          ref={(el) => {
            glowSegmentsRef.current[index] = el;
          }}
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow-strong)"
          opacity="0"
        />
      ))}
    </svg>
  );
}
