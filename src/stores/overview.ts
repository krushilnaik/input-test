import { flushSync } from "react-dom";
import { create } from "zustand";

interface OverviewStore {
  isOverviewOpen: boolean;
  openOverview: () => void;
  closeOverview: () => void;
  toggleOverview: () => void;
}

export const useOverviewStore = create<OverviewStore>((set) => ({
  isOverviewOpen: false,
  openOverview: () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          document.getElementById("actionPanel")?.classList.remove("open");
          set({ isOverviewOpen: true });
        });
      });
    } else {
      document.getElementById("actionPanel")?.classList.remove("open");
      set({ isOverviewOpen: true });
    }
  },
  closeOverview: () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          document.getElementById("actionPanel")?.classList.add("open");
          set({ isOverviewOpen: false });
        });
      });
    } else {
      document.getElementById("actionPanel")?.classList.add("open");
      set({ isOverviewOpen: false });
    }
  },
  toggleOverview: () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          document.getElementById("actionPanel")?.classList.toggle("open");
          set((state) => ({ isOverviewOpen: !state.isOverviewOpen }));
        });
      });
    } else {
      document.getElementById("actionPanel")?.classList.toggle("open");
      set((state) => ({ isOverviewOpen: !state.isOverviewOpen }));
    }
  },
}));
