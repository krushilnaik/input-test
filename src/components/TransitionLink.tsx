import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

export function TransitionLink({
  to,
  children,
  className,
  title,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate({ to });
        });
      } else {
        navigate({ to });
      }
    },
    [navigate, to]
  );

  return (
    <a href={to} onClick={handleClick} className={className} title={title}>
      {children}
    </a>
  );
}

