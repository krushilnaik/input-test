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
      className="p-3 rounded-full transition-colors bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
    >
      <OverviewIcon />
    </button>
  );
}
