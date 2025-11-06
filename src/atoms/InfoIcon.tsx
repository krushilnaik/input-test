interface InfoIconProps {
  className?: string;
}

export function InfoIcon({ className }: InfoIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <text x="7" y="9.5" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="Arial, sans-serif" fontWeight="bold">i</text>
    </svg>
  );
}

