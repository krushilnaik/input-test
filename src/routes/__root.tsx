import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Navigation } from "../components/Navigation";
import { AnimatedInput } from "../components/AnimatedInput";
import { OverviewOverlay } from "../components/OverviewOverlay";
import { useAnimationContext } from "../contexts/AnimationContext";
import { useOverview } from "../contexts/OverviewContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const isBottomPage = pathname === "/bottom";
  const showInput = pathname === "/" || pathname === "/bottom";
  const { textAnimationComplete } = useAnimationContext();
  const { isOverviewOpen } = useOverview();

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
      <Navigation />
      <div
        className="h-screen pt-20 flex"
        style={{ opacity: isOverviewOpen ? 0 : 1, pointerEvents: isOverviewOpen ? "none" : "auto" }}
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
            <AnimatedInput shouldStartAnimation={textAnimationComplete} />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <OverviewOverlay />
    </main>
  );
}
