import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AnimationProvider } from "./contexts/AnimationContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return (
    <AnimationProvider>
      <RouterProvider router={router} />
    </AnimationProvider>
  );
}

