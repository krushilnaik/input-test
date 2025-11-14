export interface SuggestionPill {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SuggestionPillItemProps {
  pill: SuggestionPill;
  index: number;
  isExpanded: boolean;
  accentColor: string; // Hex color value (e.g., "#FF6B35")
  isChecked: boolean;
  shouldAnimate: boolean;
  animationDelay: number;
  onClick: () => void;
}

export function SuggestionPillItem({
  pill,
  isExpanded,
  accentColor,
  isChecked,
  shouldAnimate,
  animationDelay,
  onClick,
}: SuggestionPillItemProps) {
  // Use consistent height (h-10) for both states
  // Collapsed: perfect circle (w-10 h-10), Expanded: same height with horizontal padding
  const containerClass = isExpanded
    ? "rounded-full px-4 h-10 flex items-center"
    : "rounded-full w-10 h-10 flex items-center justify-center p-0";

  const baseStyle = {
    "--accent-color": accentColor,
    "--accent-bg": `color-mix(in srgb, ${accentColor} 60%, white)`,
  };

  // Always start hidden, only show when animation runs
  const animationStyle = {
    ...baseStyle,
    opacity: 0, // Always hidden initially
    transform: "translateY(30px)",
    ...(shouldAnimate && {
      animationDelay: `${500 + animationDelay * 1000}ms`,
    }),
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={
        {
          ...animationStyle,
          borderColor: `color-mix(in srgb, ${accentColor} 80%, black)`,
          backgroundColor: isChecked ? `var(--accent-bg)` : "rgba(0, 0, 0, 0.2)",
        } as React.CSSProperties & { "--accent-color": string; "--accent-bg": string }
      }
      className={`${containerClass} border-2 glass cursor-pointer hover:scale-105 transition-all duration-200 ${
        shouldAnimate ? "animate-pill-entrance" : ""
      }`}
    >
      <div
        className={`flex items-center ${isExpanded ? "gap-2" : ""} text-(--accent-color) ${isChecked ? "text-black" : ""}`}
      >
        {pill.icon}
        {isExpanded && <span className="text-sm font-medium">{pill.label}</span>}
      </div>
    </button>
  );
}
