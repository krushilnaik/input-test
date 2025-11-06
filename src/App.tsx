import { useState, useRef, useCallback } from "react";
import { AnimatedInput } from "./components/AnimatedInput";

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const startAnimationRef = useRef<(() => void) | null>(null);

  const handleReady = useCallback((controls: { startAnimation: () => void; isAnimating: boolean }) => {
    startAnimationRef.current = controls.startAnimation;
    setIsAnimating(controls.isAnimating);
  }, []);

  const handleStartAnimation = () => {
    startAnimationRef.current?.();
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900">
      <div className="flex-1 flex items-center justify-center">
        <AnimatedInput onReady={handleReady} />
      </div>
      <div className="pb-8 flex justify-center">
        <button
          onClick={handleStartAnimation}
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
