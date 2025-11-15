import { useState } from "react";
import Drawer from "./Drawer";

function Canvas() {
  const [width, setWidth] = useState("24rem");

  return (
    <Drawer id="canvas" initialWidth={width} isResizable={true}>
      Enter
    </Drawer>
  );
}

export default Canvas;
