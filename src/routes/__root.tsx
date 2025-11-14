import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Navigation } from "../components/Navigation";
import { AnimatedInput } from "../components/AnimatedInput";
import { useAnimationContext } from "../contexts/AnimationContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const isBottomPage = pathname === "/bottom";
  const showInput = pathname === "/" || pathname === "/bottom";
  const { textAnimationComplete } = useAnimationContext();

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
      <Navigation />
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
    </main>
  );
}
