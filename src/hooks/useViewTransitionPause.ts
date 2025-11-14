import { useEffect, useRef } from "react";

/**
 * Hook to preserve GSAP animation state during View Transitions
 * The View Transition API can reset animations, so we ensure they continue smoothly
 */
export function useViewTransitionPause() {
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    if (typeof document === "undefined" || !document.startViewTransition) {
      return;
    }

    // Store the original function
    const originalStartViewTransition = document.startViewTransition.bind(document);

    // Wrap startViewTransition to track transitions
    document.startViewTransition = function (callback) {
      isTransitioningRef.current = true;

      const transition = originalStartViewTransition(callback);

      // Reset flag when transition completes
      transition.finished.finally(() => {
        isTransitioningRef.current = false;
      });

      return transition;
    };

    return () => {
      // Restore original on unmount
      if (document.startViewTransition !== originalStartViewTransition) {
        document.startViewTransition = originalStartViewTransition;
      }
    };
  }, []);

  return isTransitioningRef;
}
