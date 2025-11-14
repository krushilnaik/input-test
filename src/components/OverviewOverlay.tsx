import { useOverview } from "../contexts/OverviewContext";
import { Greeting } from "./Greeting";

export function OverviewOverlay() {
  const { isOverviewOpen } = useOverview();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-gray-900"
      style={{
        opacity: isOverviewOpen ? 1 : 0,
        pointerEvents: isOverviewOpen ? "auto" : "none",
      }}
    >
      <div className="flex-1 flex items-start justify-center pt-32 p-8 overflow-auto">
        <div className="max-w-5xl w-full">
          {/* Greeting with view transition name for slide effect */}
          {isOverviewOpen && <Greeting hasAnimated setHasAnimated={() => {}} />}

          {/* Overview content */}
          <div className="space-y-6 text-white mt-8">
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
    </div>
  );
}

