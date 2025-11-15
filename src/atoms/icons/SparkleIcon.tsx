interface SparkleIconProps {
  size?: number;
  color?: string;
}

export function SparkleIcon({ size = 14, color = "currentColor" }: SparkleIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0L8.5 5L14 6.5L8.5 8L7 14L5.5 8L0 6.5L5.5 5L7 0Z" fill={color} />
    </svg>
  );
}
