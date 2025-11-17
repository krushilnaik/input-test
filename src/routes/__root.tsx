import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";

import { AnimatedInput } from "@/components/AnimatedInput";
import { Navigation } from "@/components/Navigation";
import { OverviewOverlay } from "@/components/OverviewOverlay";
import { useOverviewStore } from "@/stores/overviewStore";
import ActionPanel from "@/components/drawers/ActionPanel";
import { useStore } from "@/stores/sidebarStore";
import Canvas from "@/components/drawers/Canvas";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const isBottomPage = pathname === "/bottom";
  const showInput = pathname === "/" || pathname === "/bottom";
  const { isOverviewOpen } = useOverviewStore();
  const count = useStore((state) => state.count);

  return (
    <main className="relative flex flex-col min-h-screen w-full bg-gray-900 text-white overflow-x-hidden">
      <Navigation />
      <div
        className="h-screen pt-20 flex px-4 transition-[width] duration-300 ease-in-out"
        style={{
          opacity: isOverviewOpen ? 0 : 1,
          pointerEvents: isOverviewOpen ? "none" : "auto",
          width: `calc(100vw - ${count})`,
        }}
      >
        {showInput ? (
          <div
            className="flex-1 flex flex-col gap-2 w-full max-w-5xl mx-auto"
            style={{
              alignItems: "center",
              justifyContent: isBottomPage ? "flex-end" : "center",
              paddingBottom: isBottomPage ? "2rem" : "0",
            }}
          >
            <Outlet />
            <AnimatedInput />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <OverviewOverlay />
      <Canvas />
      <ActionPanel />
    </main>
  );
}
