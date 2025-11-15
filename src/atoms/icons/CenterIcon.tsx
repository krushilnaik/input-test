interface CenterIconProps {
  size?: number;
  color?: string;
}

export function CenterIcon({ size = 20, color = "currentColor" }: CenterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3" fill={color} />
      <circle cx="10" cy="10" r="7.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
