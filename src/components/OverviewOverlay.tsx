import ReactMarkdown from "react-markdown";

import { Greeting } from "@/components/Greeting";
import { useOverview } from "@/contexts/OverviewContext";

const content = `
# Overview
This document provides a concise summary of the current dashboard state, recent activity,
and recommended next steps.
Use this as a quick reference to understand what's most important right now.

---

# Recent Activity
- FDD Phase 0 analysis completed for logistics acquisition.
- User onboarding flow A/B test started (variant B showing +12% conversion).
- Background job processing queue stabilized after retry policy update.

---

# Next Steps
1. Review FDD Phase 0 findings and assign action items.
2. Monitor A/B test for a minimum of 14 days and evaluate significance.
3. Schedule a runbook review for background job retries and alerting.
`;

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
          {isOverviewOpen && <Greeting greetingText="Your briefing" hasAnimated setHasAnimated={() => {}} />}

          {/* Overview content */}
          <section className="space-y-6 text-white mt-8">
            {content.split("---").map((section, i) => (
              <article key={`overview-${i}`}>
                <ReactMarkdown>{section + "\n---\n"}</ReactMarkdown>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
