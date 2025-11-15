interface InfoIconProps {
  size?: number;
  color?: string;
}

export function InfoIcon({ size = 14, color = "currentColor" }: InfoIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.2" fill="none" />
      <text
        x="7"
        y="9.5"
        textAnchor="middle"
        fontSize="8"
        fill={color}
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        i
      </text>
    </svg>
  );
}
