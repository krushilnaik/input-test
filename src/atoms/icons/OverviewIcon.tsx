interface OverviewIconProps {
  size?: number;
  color?: string;
}

export function OverviewIcon({ size = 20, color = "currentColor" }: OverviewIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="6" height="6" stroke={color} strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" stroke={color} strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" stroke={color} strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
