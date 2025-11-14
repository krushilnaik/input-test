import { useCallback } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";

const SESSION_STORAGE_KEY = "text-shimmer-animated";

function TransitionLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
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
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export function Navigation() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  const handleClearTracking = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  return (
    <header className="w-full px-6 py-4 border-b border-gray-800">
      <nav className="flex gap-4 items-center justify-between">
        <div className="flex gap-4">
          <TransitionLink
            to="/"
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === "/" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Center Page
          </TransitionLink>
          <TransitionLink
            to="/bottom"
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === "/bottom" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Bottom Page
          </TransitionLink>
          <TransitionLink
            to="/overview"
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === "/overview" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Overview
          </TransitionLink>
          <TransitionLink
            to="/empty"
            className={`px-4 py-2 rounded-lg transition-colors ${
              pathname === "/empty" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Empty Page
          </TransitionLink>
        </div>
        <button
          onClick={handleClearTracking}
          className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors text-sm"
          title="Clear session storage to simulate login"
        >
          Simulate Login
        </button>
      </nav>
    </header>
  );
}
