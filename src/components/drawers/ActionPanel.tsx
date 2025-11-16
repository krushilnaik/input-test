import { useMemo } from "react";
import Drawer from "./Drawer";
import { OverviewButton } from "../action-panel/OverviewButton";

function ActionPanel() {
  const width = "24rem";

  const header = useMemo(() => {
    return (
      <div className="">
        <h2 className="text-lg font-semibold">Action Panel</h2>
      </div>
    );
  }, []);

  return (
    <Drawer header={header} id="actionPanel" initialWidth={width} isResizable={false} initialState="open">
      <OverviewButton />
    </Drawer>
  );
}

export default ActionPanel;
