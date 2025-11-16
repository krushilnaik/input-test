import { CloseIcon } from "@/atoms/icons/CloseIcon";
import { HEADER_HEIGHT, PAGE_PADDING_X, PAGE_PADDING_Y } from "@/constants/sizes";
import { useStore } from "@/stores/sidebar";
import { useEffect, useMemo, type PropsWithChildren } from "react";
import "@/animations/drawer.css";

interface DrawerProps {
  initialWidth: string;
  isResizable?: boolean;
  initialState?: "open" | "closed";
  header?: React.ReactNode;
  id: string;
}

export default function Drawer({
  initialWidth,
  isResizable = false,
  children,
  header,
  initialState,
  id,
}: PropsWithChildren<DrawerProps>) {
  const width = initialWidth;
  const right = PAGE_PADDING_X;
  const setCount = useStore((state) => state.setCount);

  useEffect(() => {
    if (initialState === "open") {
      document.getElementById(id)?.classList.add("open");
      setCount(width);
    }
  }, [initialState]);

  useMemo(() => {
    setCount(width);
  }, [setCount, width]);

  const height = useMemo(() => {
    return `calc(100vh - ${HEADER_HEIGHT} - 2 * ${PAGE_PADDING_Y} - 8px)`;
  }, [HEADER_HEIGHT, PAGE_PADDING_Y]);

  const top = useMemo(() => {
    return `calc(${HEADER_HEIGHT} + ${PAGE_PADDING_Y} + 8px)`;
  }, [HEADER_HEIGHT, PAGE_PADDING_Y]);

  const closeDrawer = () => {
    document.getElementById(id)?.classList.remove("open");
    setCount("0rem");
  };

  return (
    <div
      id={id}
      data-width={width}
      style={{ width, height, top, right }}
      className="glass drawer h-full absolute rounded-xl duration-500 ease-overshoot"
    >
      {isResizable && <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">|</div>}
      <div className="flex justify-between items-center p-4">
        {header ?? <span>Drawer</span>}
        <button
          onClick={closeDrawer}
          className="p-2 bg-white/0 hover:bg-white/10 rounded-md transition-colors duration-200"
        >
          <CloseIcon size={16} />
        </button>
      </div>
      <div className="px-4">{children}</div>
    </div>
  );
}
