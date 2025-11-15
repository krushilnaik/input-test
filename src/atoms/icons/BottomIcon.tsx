interface BottomIconProps {
  size?: number;
  color?: string;
}

export function BottomIcon({ size = 20, color = "currentColor" }: BottomIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 4L10 14M10 14L6 10M10 14L14 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 16H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
