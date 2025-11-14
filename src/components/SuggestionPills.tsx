import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SparkleIcon } from "../atoms/SparkleIcon";
import { InfoIcon } from "../atoms/InfoIcon";
import { ChecklistIcon } from "../atoms/ChecklistIcon";
import { LightbulbIcon } from "../atoms/LightbulbIcon";
import { SuggestionPillItem } from "./SuggestionPill";
import type { SuggestionPill } from "./SuggestionPill";

const SUGGESTION_PILLS: Array<SuggestionPill & { accentColor: string }> = [
  {
    id: "suggested",
    label: "Suggested",
    icon: <SparkleIcon className="w-3.5 h-3.5" />,
    accentColor: "#FB923C", // orange-400
  },
  {
    id: "needs-attention",
    label: "Needs Attention",
    icon: <InfoIcon className="w-3.5 h-3.5" />,
    accentColor: "#FACC15", // yellow-400
  },
  {
    id: "deliverables",
    label: "Deliverables",
    icon: <ChecklistIcon className="w-3.5 h-3.5" />,
    accentColor: "#22D3EE", // cyan-400
  },
  {
    id: "opportunities",
    label: "Opportunities",
    icon: <LightbulbIcon className="w-3.5 h-3.5" />,
    accentColor: "#4ADE80", // green-400
  },
];

interface SuggestionPillsProps {
  shouldAnimate: boolean;
}

export function SuggestionPills({ shouldAnimate }: SuggestionPillsProps) {
  const router = useRouterState();
  const isBottomPage = router.location.pathname === "/bottom";
  const [selectedPillId, setSelectedPillId] = useState<string | null>(null);
  const [expandedPillId, setExpandedPillId] = useState<string | null>(null);

  const handlePillClick = (pillId: string) => {
    // Toggle behavior: clicking a pill sets it as active (unchecking any previously active pill)
    // On bottom page: also expands/collapses the pill
    // On home page: pills are always expanded, clicking just sets active state
    // If clicking the already active pill, deactivate it
    if (selectedPillId === pillId) {
      setSelectedPillId(null);
      setExpandedPillId(null);
    } else {
      setSelectedPillId(pillId);
      setExpandedPillId(pillId);
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      {SUGGESTION_PILLS.map((pill, index) => {
        const isExpanded = !isBottomPage || expandedPillId === pill.id;
        const isChecked = selectedPillId === pill.id;

        return (
          <SuggestionPillItem
            key={pill.id}
            pill={pill}
            index={index}
            isExpanded={isExpanded}
            accentColor={pill.accentColor}
            isChecked={isChecked}
            shouldAnimate={shouldAnimate}
            animationDelay={index * 0.1}
            onClick={() => handlePillClick(pill.id)}
          />
        );
      })}
    </div>
  );
}
