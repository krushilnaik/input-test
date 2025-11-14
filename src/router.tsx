import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AnimationProvider } from "./contexts/AnimationContext";
import { OverviewProvider } from "./contexts/OverviewContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return (
    <AnimationProvider>
      <OverviewProvider>
        <RouterProvider router={router} />
      </OverviewProvider>
    </AnimationProvider>
  );
}
