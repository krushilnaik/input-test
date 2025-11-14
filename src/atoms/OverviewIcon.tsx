interface OverviewIconProps {
  className?: string;
}

export function OverviewIcon({ className }: OverviewIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="3" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

