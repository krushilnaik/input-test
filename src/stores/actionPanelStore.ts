import { create } from "zustand";

type ActionTab = "overview" | "deliverables" | "projects";

interface ActionPanelState {
  activeTab: ActionTab;
  showAllOverview: boolean;
  showAllTodos: boolean;
  showAllDeliverables: boolean;
  showAllOpportunities: boolean;
  projectSearchQuery: string;
  isSearchExpanded: boolean;
  setActiveTab: (tab: ActionTab) => void;
  setShowAllOverview: (show: boolean) => void;
  setShowAllTodos: (show: boolean) => void;
  setShowAllDeliverables: (show: boolean) => void;
  setShowAllOpportunities: (show: boolean) => void;
  setProjectSearchQuery: (query: string) => void;
  setIsSearchExpanded: (expanded: boolean) => void;
}

export const useActionPanelStore = create<ActionPanelState>((set) => ({
  activeTab: "overview",
  showAllOverview: true,
  showAllTodos: true,
  showAllDeliverables: true,
  showAllOpportunities: true,
  projectSearchQuery: "",
  isSearchExpanded: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowAllOverview: (show) => set({ showAllOverview: show }),
  setShowAllTodos: (show) => set({ showAllTodos: show }),
  setShowAllDeliverables: (show) => set({ showAllDeliverables: show }),
  setShowAllOpportunities: (show) => set({ showAllOpportunities: show }),
  setProjectSearchQuery: (query) => set({ projectSearchQuery: query }),
  setIsSearchExpanded: (expanded) => set({ isSearchExpanded: expanded }),
}));
