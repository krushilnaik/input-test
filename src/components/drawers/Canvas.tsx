import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useCanvasModalStore } from "@/stores/canvasModalStore";
import Drawer from "./Drawer";

function Canvas() {
  const [width] = useState("50rem");
  const { isOpen, htmlContent } = useCanvasModalStore();

  return (
    <Drawer id="canvas" initialWidth={width} isResizable={true} isOpen={isOpen}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{htmlContent}</ReactMarkdown>
    </Drawer>
  );
}

export default Canvas;
