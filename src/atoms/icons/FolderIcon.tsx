interface FolderIconProps {
  size?: number;
  color?: string;
}

export function FolderIcon({ size = 16, color = "currentColor" }: FolderIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 2L3 5V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V5L8 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
