interface CenterIconProps {
  className?: string;
}

export function CenterIcon({ className }: CenterIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="10" cy="10" r="3" fill="currentColor" />
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

