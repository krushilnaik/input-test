interface EmptyIconProps {
  size?: number;
  color?: string;
}

export function EmptyIcon({ size = 20, color = "currentColor" }: EmptyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="12" height="14" stroke={color} strokeWidth="1.5" rx="1" />
    </svg>
  );
}
