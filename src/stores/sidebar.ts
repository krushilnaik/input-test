import { create } from "zustand";

interface State {
  count: string;
  active: boolean;
  increment: () => void;
  toggle: () => void;
  setCount: (value: string) => void;
}

export const useStore = create<State>((set) => ({
  count: "0rem",
  active: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  toggle: () => set((state) => ({ active: !state.active })),
  setCount: (value: string) => set({ count: value }),
}));
