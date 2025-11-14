import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bottom")({
  component: BottomPage,
});

function BottomPage() {
  // AnimatedInput is rendered in the root route to prevent remounting
  return null;
}

