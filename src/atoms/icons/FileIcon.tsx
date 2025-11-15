interface FileIconProps {
  size?: number;
  color?: string;
}

export function FileIcon({ size = 14, color = "currentColor" }: FileIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.5 2.33333C3.5 1.8731 3.8731 1.5 4.33333 1.5H7.58333C7.81333 1.5 8.03333 1.59167 8.19167 1.75L10.25 3.80833C10.4083 3.96667 10.5 4.18667 10.5 4.41667V11.6667C10.5 12.1269 10.1269 12.5 9.66667 12.5H4.33333C3.8731 12.5 3.5 12.1269 3.5 11.6667V2.33333Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
