import { createFileRoute } from "@tanstack/react-router";
import { Greeting } from "../components/Greeting";

export const Route = createFileRoute("/overview")({
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Greeting with view transition name for slide effect */}
        <Greeting hasAnimated setHasAnimated={() => {}} />

        {/* Overview content */}
        <div className="space-y-6 text-white">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              Welcome to your dashboard overview. Here you can see a summary of your recent activities and important
              updates.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">Recent Activity</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300">FDD Phase 0 analysis completed for logistics acquisition</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
