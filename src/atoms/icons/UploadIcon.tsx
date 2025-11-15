interface UploadIconProps {
  size?: number;
  color?: string;
}

export function UploadIcon({ size = 16, color = "currentColor" }: UploadIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 3V11M8 3L5 6M8 3L11 6M3 11H13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
