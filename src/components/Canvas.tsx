import { HEADER_HEIGHT, PAGE_PADDING_X, PAGE_PADDING_Y } from "@/constants/sizes";
import { useStore } from "@/stores/sidebar";
import { useMemo } from "react";

function ActionPanel() {
  const width = "24rem";
  const setCount = useStore((state) => state.setCount);

  useMemo(() => {
    setCount(width);
  }, [setCount, width]);

  const height = useMemo(() => {
    return `calc(100vh - ${HEADER_HEIGHT} - 2 * ${PAGE_PADDING_Y} - 8px)`;
  }, [HEADER_HEIGHT, PAGE_PADDING_Y]);

  const top = useMemo(() => {
    return `calc(${HEADER_HEIGHT} + ${PAGE_PADDING_Y} + 8px)`;
  }, [HEADER_HEIGHT, PAGE_PADDING_Y]);

  return (
    <div style={{ width, height, top, right: PAGE_PADDING_X }} className="glass h-full absolute rounded-xl">
      Enter
    </div>
  );
}

export default ActionPanel;
