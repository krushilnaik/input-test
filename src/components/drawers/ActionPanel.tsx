import Drawer from "./Drawer";

function ActionPanel() {
  const width = "24rem";

  return (
    <Drawer id="actionPanel" initialWidth={width} isResizable={false} initialState="open">
      hi
    </Drawer>
  );
}

export default ActionPanel;
