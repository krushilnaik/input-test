import { CloseIcon } from "@/atoms/icons/CloseIcon";
import { GripIcon } from "@/atoms/icons/GripIcon";
import { HEADER_HEIGHT, PAGE_PADDING_X, PAGE_PADDING_Y } from "@/constants/sizes";
import { useStore } from "@/stores/sidebarStore";
import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import "@/animations/drawer.css";

interface DrawerProps {
  initialWidth: string;
  isResizable?: boolean;
  initialState?: "open" | "closed";
  isOpen?: boolean;
  header?: React.ReactNode;
  id: string;
}

export default function Drawer({
  initialWidth,
  isResizable = false,
  children,
  header,
  initialState,
  isOpen,
  id,
}: PropsWithChildren<DrawerProps>) {
  const [width, setWidth] = useState(initialWidth);
  const right = PAGE_PADDING_X;
  const setCount = useStore((state) => state.setCount);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

  useEffect(() => {
    if (initialState === "open") {
      document.getElementById(id)?.classList.add("open");
      setCount(width);
    }
  }, [initialState]);

  useEffect(() => {
    if (isOpen === undefined) return;

    const drawer = document.getElementById(id);
    if (isOpen) {
      drawer?.classList.add("open");
      setCount(width);
    } else {
      drawer?.classList.remove("open");
      setCount("0rem");
    }
  }, [isOpen, width, setCount, id]);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isResizable) return;

    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (!isResizable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current || !drawerRef.current) return;

      const drawerRect = drawerRef.current.getBoundingClientRect();
      const newWidth = drawerRect.right - e.clientX;

      // Set min and max width constraints
      const minWidth = 300;
      const maxWidth = window.innerWidth * 0.8;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        const newWidthRem = `${newWidth / 16}rem`;
        setWidth(newWidthRem);
        setCount(newWidthRem);
      }
    };

    const handleMouseUp = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizable, setCount]);

  return (
    <div
      id={id}
      ref={drawerRef}
      data-width={width}
      style={{ width, height, top, right }}
      className="glass drawer h-full absolute rounded-xl duration-500 ease-overshoot"
    >
      {isResizable && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute left-0 top-0 h-full w-3 flex items-center justify-center cursor-ew-resize hover:bg-white/10 transition-colors group"
        >
          <div className="opacity-40 group-hover:opacity-100 transition-opacity">
            <GripIcon size={16} />
          </div>
        </div>
      )}
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
