import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Greeting } from "@/components/Greeting";
import { useAnimationContext } from "@/contexts/AnimationContext";
import { useOverviewStore } from "@/stores/overview";

export const Route = createFileRoute("/")({
  component: CenterPage,
});

function CenterPage() {
  const { onTextAnimationComplete } = useAnimationContext();
  const { isOverviewOpen } = useOverviewStore();
  const [hasAnimated, setHasAnimated] = useState(() => {
    // Check sessionStorage to persist across remounts in StrictMode
    return sessionStorage.getItem("text-shimmer-animated") === "true";
  });

  const subtextText =
    "Your FDD Phase 0 analysis for the logistics acquisition is ready for review. I've identified 3 potential red flags in their revenue recognition practices that need your attention before the client meeting.";

  useEffect(() => {
    // Call onComplete immediately since there's no animation
    onTextAnimationComplete();
  }, [onTextAnimationComplete]);

  // AnimatedInput is rendered in the root route to prevent remounting
  return (
    <div className="w-full mb-8">
      {/* Stars Graphic */}

      {/* Text Content - conditionally render to avoid duplicate view-transition-names */}
      {!isOverviewOpen && (
        <Greeting greetingText="Good evening, Krushil." hasAnimated={hasAnimated} setHasAnimated={setHasAnimated} />
      )}
      <p className={`text-white text-2xl leading-relaxed ${hasAnimated ? "" : "animate-shimmer-in-text"}`}>
        {subtextText}
      </p>
    </div>
  );
}
