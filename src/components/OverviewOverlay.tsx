import ReactMarkdown from "react-markdown";

import { Greeting } from "@/components/Greeting";
import { useOverviewStore } from "@/stores/overview";
import { CloseIcon } from "@/atoms/icons/CloseIcon";
import { InfoIcon } from "@/atoms/icons/InfoIcon";
import "@/animations/header.css";

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
  const { isOverviewOpen, closeOverview } = useOverviewStore();

  return (
    <div
      id="overviewOverlay"
      data-state={isOverviewOpen ? "open" : "closed"}
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        opacity: isOverviewOpen ? 1 : 0,
        pointerEvents: isOverviewOpen ? "auto" : "none",
      }}
    >
      <div className="flex-1 flex items-start justify-center pt-32 p-8 overflow-auto">
        <div className="max-w-5xl w-full relative">
          {isOverviewOpen && <Greeting greetingText="Your briefing" hasAnimated setHasAnimated={() => {}} />}
          <div className="inline-flex items-center gap-4 right-0 top-4 absolute">
            <button>
              <InfoIcon size={20} />
            </button>
            <button onClick={closeOverview}>
              <CloseIcon size={20} />
            </button>
          </div>

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
