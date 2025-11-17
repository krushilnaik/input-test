import { useMemo, useRef, useEffect } from "react";
import Drawer from "./Drawer";
import { OverviewButton } from "../action-panel/OverviewButton";
import { useActionPanelStore } from "../../stores/actionPanelStore";

type ActionTab = "overview" | "projects" | "deliverables";

function ActionPanel() {
  const width = "25rem";
  const { activeTab, setActiveTab } = useActionPanelStore();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<ActionTab, HTMLButtonElement | null>>({
    overview: null,
    projects: null,
    deliverables: null,
  });

  useEffect(() => {
    const activeButton = buttonRefs.current[activeTab];
    const background = backgroundRef.current;

    if (activeButton && background) {
      const { offsetLeft, offsetWidth } = activeButton;
      background.style.transform = `translateX(${offsetLeft}px)`;
      background.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  const header = useMemo(() => {
    const tabs: { id: ActionTab; label: string }[] = [
      { id: "overview", label: "Overview" },
      { id: "projects", label: "Projects" },
      { id: "deliverables", label: "Deliverables" },
    ];

    return (
      <div className="relative flex gap-1 p-1 rounded-lg">
        <div
          ref={backgroundRef}
          className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
          style={{ left: 0, width: 0 }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              buttonRefs.current[tab.id] = el;
            }}
            onClick={() => setActiveTab(tab.id)}
            className={`relative z-10 px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
              activeTab === tab.id ? "text-gray-900" : "text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }, [activeTab, setActiveTab]);

  return (
    <Drawer header={header} id="actionPanel" initialWidth={width} isResizable={false} initialState="open">
      {activeTab === "overview" && <OverviewButton />}
      {activeTab === "projects" && <div className="p-4">Projects content coming soon...</div>}
      {activeTab === "deliverables" && <div className="p-4">Deliverables content coming soon...</div>}
    </Drawer>
  );
}

export default ActionPanel;
