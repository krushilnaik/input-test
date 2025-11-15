import { useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";
import { flushSync } from "react-dom";

import { BottomIcon } from "@/atoms/icons/BottomIcon";
import { CenterIcon } from "@/atoms/icons/CenterIcon";
import { EmptyIcon } from "@/atoms/icons/EmptyIcon";
import { OverviewIcon } from "@/atoms/icons/OverviewIcon";
import { TransitionLink } from "@/components/TransitionLink";
import { useOverview } from "@/contexts/OverviewContext";
import { HEADER_HEIGHT, PAGE_PADDING_X, PAGE_PADDING_Y } from "@/constants/sizes";
import { useStore } from "@/stores/sidebar";

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
  const { count, setCount } = useStore((state) => state);

  const handleClearTracking = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  const toggleActionPanel = useCallback(() => {
    setCount(count === "0rem" ? "24rem" : "0rem");
  }, [setCount, count]);

  return (
    <div className="w-full fixed z-60" style={{ padding: `${PAGE_PADDING_Y} ${PAGE_PADDING_X}` }}>
      <header
        style={{ height: HEADER_HEIGHT }}
        className="glass rounded-full p-2 flex gap-2 items-center justify-between w-full"
      >
        <nav className="flex gap-2">
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
              isOverviewOpen ? "bg-green-600 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
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
        </nav>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleActionPanel}
            className="h-full aspect-square rounded-full bg-white/20 p-3 grid place-content-center"
          >
            a
          </button>
          <button
            onClick={handleClearTracking}
            className="px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors text-sm whitespace-nowrap"
            title="Clear session storage to simulate login"
          >
            Simulate Login
          </button>
        </div>
      </header>
    </div>
  );
}
