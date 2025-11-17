interface OverviewIconProps {
  size?: number;
  color?: string;
}

export function OverviewIcon({ size = 20, color = "currentColor" }: OverviewIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3C7.5 3 5.5 4.5 5.5 6.5V10C5.5 11 5 11.5 4 12.5C3.5 13 3.5 13.5 4 14H16C16.5 14 16.5 13 16 12.5C15 11.5 14.5 11 14.5 10V6.5C14.5 4.5 12.5 3 10 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14V14.5C8.5 15.33 9.17 16 10 16C10.83 16 11.5 15.33 11.5 14.5V14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
