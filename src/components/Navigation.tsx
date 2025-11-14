import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useRouterState } from "@tanstack/react-router";
import { useOverview } from "../contexts/OverviewContext";
import { CenterIcon } from "../atoms/CenterIcon";
import { BottomIcon } from "../atoms/BottomIcon";
import { OverviewIcon } from "../atoms/OverviewIcon";
import { EmptyIcon } from "../atoms/EmptyIcon";
import { TransitionLink } from "./TransitionLink";

const SESSION_STORAGE_KEY = "text-shimmer-animated";

function OverviewToggleButton({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  const { toggleOverview } = useOverview();

  const handleClick = useCallback(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // Use flushSync to force synchronous React state update
        flushSync(() => {
          toggleOverview();
        });
      });
    } else {
      toggleOverview();
    }
  }, [toggleOverview]);

  return (
    <button onClick={handleClick} className={className} title={title}>
      {children}
    </button>
  );
}

export function Navigation() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const { isOverviewOpen } = useOverview();

  const handleClearTracking = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  return (
    <header className="w-full px-16 py-4 fixed z-60">
      <nav className="glass rounded-full px-2 py-2 flex gap-2 items-center justify-between w-full">
        <div className="flex gap-2">
          <TransitionLink
            to="/"
            className={`p-3 rounded-full transition-colors ${
              pathname === "/" ? "bg-blue-600 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
            title="Center Page"
          >
            <CenterIcon />
          </TransitionLink>
          <TransitionLink
            to="/bottom"
            className={`p-3 rounded-full transition-colors ${
              pathname === "/bottom" ? "bg-blue-600 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
            title="Bottom Page"
          >
            <BottomIcon />
          </TransitionLink>
          <OverviewToggleButton
            className={`p-3 rounded-full transition-colors ${
              isOverviewOpen ? "bg-blue-600 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
            title="Overview"
          >
            <OverviewIcon />
          </OverviewToggleButton>
          <TransitionLink
            to="/empty"
            className={`p-3 rounded-full transition-colors ${
              pathname === "/empty" ? "bg-blue-600 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
            title="Empty Page"
          >
            <EmptyIcon />
          </TransitionLink>
        </div>
        <div className="w-px h-8 bg-gray-700 mx-1" />
        <button
          onClick={handleClearTracking}
          className="px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors text-sm whitespace-nowrap"
          title="Clear session storage to simulate login"
        >
          Simulate Login
        </button>
      </nav>
    </header>
  );
}
