import { create } from "zustand";

interface CanvasModalState {
  isOpen: boolean;
  htmlContent: string;
  title: string;
  canvasWidth: number;
  openModal: (html: string, title: string) => void;
  closeModal: () => void;
  setCanvasWidth: (width: number) => void;
}

const DEFAULT_CANVAS_WIDTH = 60; // rem

export const useCanvasModalStore = create<CanvasModalState>((set) => ({
  isOpen: false,
  htmlContent: "",
  title: "",
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  openModal: (html, _title) => set({ isOpen: true, htmlContent: html }),
  closeModal: () => set({ isOpen: false }),
  setCanvasWidth: (width) => set({ canvasWidth: width }),
}));
