interface GripIconProps {
  size?: number;
  color?: string;
}

export function GripIcon({ size = 16, color = "currentColor" }: GripIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="4" r="1" fill={color} />
      <circle cx="6" cy="8" r="1" fill={color} />
      <circle cx="6" cy="12" r="1" fill={color} />
      <circle cx="10" cy="4" r="1" fill={color} />
      <circle cx="10" cy="8" r="1" fill={color} />
      <circle cx="10" cy="12" r="1" fill={color} />
    </svg>
  );
}
