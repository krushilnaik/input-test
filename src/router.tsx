import { RouterProvider, createRouter } from "@tanstack/react-router";

import { AnimationProvider } from "@/contexts/AnimationContext";

import { routeTree } from "./routeTree.gen";

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
