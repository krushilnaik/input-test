import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface ShimmerProps {
  width?: string;
  height?: string;
}

export function Shimmer({ width = "100%", height = "1rem" }: ShimmerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !shineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(shineRef.current, { xPercent: -100 });
      gsap.to(shineRef.current, {
        xPercent: 100,
        duration: 1.5,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-shimmer relative overflow-hidden rounded-lg" style={{ width, height }}>
      <div ref={shineRef} className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
