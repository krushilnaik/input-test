import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/empty")({
  component: EmptyPage,
});

function EmptyPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Empty Page</h1>
        <p className="text-gray-400 text-lg">
          This page doesn't show the input component.
        </p>
      </div>
    </div>
  );
}
