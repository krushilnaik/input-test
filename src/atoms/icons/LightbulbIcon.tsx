interface LightbulbIconProps {
  className?: string;
}

export function LightbulbIcon({ className }: LightbulbIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 0C5.5 0 4.2 0.6 3.2 1.6C2.2 2.6 1.6 3.9 1.6 5.4C1.6 6.5 2 7.5 2.6 8.3L3.2 9.1V11.2C3.2 11.5 3.4 11.7 3.7 11.7H5.1V13.3H8.9V11.7H10.3C10.6 11.7 10.8 11.5 10.8 11.2V9.1L11.4 8.3C12 7.5 12.4 6.5 12.4 5.4C12.4 3.9 11.8 2.6 10.8 1.6C9.8 0.6 8.5 0 7 0Z"
        fill="currentColor"
      />
      <path
        d="M5.1 11.7H8.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

