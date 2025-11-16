import { useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useDataAttributeObserver } from "@/hooks/useDataAttributeObserver";
import "@/animations/header.css";

import { BottomIcon } from "@/atoms/icons/BottomIcon";
import { CenterIcon } from "@/atoms/icons/CenterIcon";
import { EmptyIcon } from "@/atoms/icons/EmptyIcon";
import { TransitionLink } from "@/components/TransitionLink";
import { HEADER_HEIGHT, PAGE_PADDING_X, PAGE_PADDING_Y } from "@/constants/sizes";
import { useStore } from "@/stores/sidebar";

const SESSION_STORAGE_KEY = "text-shimmer-animated";

export function Navigation() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const { count, setCount } = useStore((state) => state);
  const overlayState = useDataAttributeObserver("overviewOverlay", "state");

  useEffect(() => {
    const header = document.getElementById("pageHeader");
    if (!header) return;

    if (overlayState === "open") {
      header.classList.add("open");
    } else {
      header.classList.remove("open");
    }
  }, [overlayState]);

  const handleClearTracking = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  const toggleActionPanel = useCallback(() => {
    const actionPanel = document.getElementById("actionPanel");
    actionPanel?.classList.toggle("open");
    setCount(actionPanel?.classList.contains("open") ? "24rem" : "0rem");
  }, [setCount, count]);

  return (
    <div className="w-full fixed z-60" style={{ padding: `${PAGE_PADDING_Y} ${PAGE_PADDING_X}` }}>
      <header
        id="pageHeader"
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
