import {  createContext, useCallback, useContext, useState } from "react";
import type {ReactNode} from "react";

const SESSION_STORAGE_KEY = "text-animation-played";

interface AnimationContextType {
  textAnimationComplete: boolean;
  setTextAnimationComplete: (value: boolean) => void;
  onTextAnimationComplete: () => void;
  clearAnimationTracking: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  // Check session storage on mount to see if animation has already played
  const [textAnimationComplete, setTextAnimationComplete] = useState(() => {
    return typeof window !== "undefined" && sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
  });

  const onTextAnimationComplete = useCallback(() => {
    setTextAnimationComplete(true);
  }, []);

  const clearAnimationTracking = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      setTextAnimationComplete(false);
    }
  }, []);

  return (
    <AnimationContext.Provider
      value={{ textAnimationComplete, setTextAnimationComplete, onTextAnimationComplete, clearAnimationTracking }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimationContext must be used within an AnimationProvider");
  }
  return context;
}

// Safe version that returns undefined if context is not available
export function useAnimationContextSafe() {
  return useContext(AnimationContext);
}
