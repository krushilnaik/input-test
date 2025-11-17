import { create } from "zustand";

type ActionTab = "overview" | "projects" | "deliverables";

interface ActionPanelState {
  activeTab: ActionTab;
  setActiveTab: (tab: ActionTab) => void;
}

export const useActionPanelStore = create<ActionPanelState>((set) => ({
  activeTab: "overview",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
