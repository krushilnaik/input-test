import { ArrowIcon } from "@/atoms/icons/ArrowIcon";
import { OverviewIcon } from "@/atoms/icons/OverviewIcon";
import { useOverviewStore } from "@/stores/overviewStore";
import { useCallback } from "react";
import { flushSync } from "react-dom";

export function OverviewButton() {
  const { toggleOverview } = useOverviewStore();

  const handleClick = useCallback(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // Use flushSync to force synchronous React state update
        flushSync(() => {
          toggleOverview();
        });
      });
    } else {
      toggleOverview();
    }
  }, [toggleOverview]);

  return (
    <button
      onClick={handleClick}
      className="p-3 rounded-full w-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 flex justify-between items-center px-4"
    >
      <div className="flex items-center gap-1">
        <OverviewIcon size={16} />
        <span>Your briefing</span>
      </div>
      <div className="flex items-center text-sm justify-self-end gap-0.5">
        <span>View</span>
        <ArrowIcon />
      </div>
    </button>
  );
}
