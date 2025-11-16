import { useMemo } from "react";
import Drawer from "./Drawer";
import { OverviewButton } from "../action-panel/OverviewButton";

function ActionPanel() {
  const width = "24rem";

  const header = useMemo(() => {
    return <h2 className="font-semibold">Action Panel</h2>;
  }, []);

  return (
    <Drawer header={header} id="actionPanel" initialWidth={width} isResizable={false} initialState="open">
      <OverviewButton />
    </Drawer>
  );
}

export default ActionPanel;
