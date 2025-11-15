import { HEADER_HEIGHT, PAGE_PADDING_X, PAGE_PADDING_Y } from "@/constants/sizes";
import { useStore } from "@/stores/sidebar";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

interface DrawerProps {
  initialWidth: string;
  isResizable?: boolean;
  initialState?: "open" | "closed";
  header?: React.ReactNode;
  id: string;
}

function Drawer({
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
  const [isOpen, setIsOpen] = useState(initialState === "open");

  useEffect(() => {
    setCount(isOpen ? width : "0rem");
  }, [isOpen]);

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
    setIsOpen(false);
  };

  return (
    <div
      id={id}
      style={{ width, height, top, right }}
      className={`glass h-full absolute rounded-xl duration-500 ease-overshoot ${isOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"}`}
    >
      {isResizable && <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">|</div>}
      <div className="flex justify-between p-4">
        {header ?? <span>Drawer</span>}
        <button onClick={closeDrawer} className="w-7 h-7 bg-transparent hover:bg-white/10 rounded-md">
          x
        </button>
      </div>
      {children}
    </div>
  );
}

export default Drawer;
