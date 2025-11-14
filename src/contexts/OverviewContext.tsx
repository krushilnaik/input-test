import {  createContext, useCallback, useContext, useState } from "react";
import type {ReactNode} from "react";

interface OverviewContextType {
  isOverviewOpen: boolean;
  openOverview: () => void;
  closeOverview: () => void;
  toggleOverview: () => void;
}

const OverviewContext = createContext<OverviewContextType | undefined>(undefined);

export function OverviewProvider({ children }: { children: ReactNode }) {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const openOverview = useCallback(() => {
    setIsOverviewOpen(true);
  }, []);

  const closeOverview = useCallback(() => {
    setIsOverviewOpen(false);
  }, []);

  const toggleOverview = useCallback(() => {
    setIsOverviewOpen((prev) => !prev);
  }, []);

  return (
    <OverviewContext.Provider value={{ isOverviewOpen, openOverview, closeOverview, toggleOverview }}>
      {children}
    </OverviewContext.Provider>
  );
}

export function useOverview() {
  const context = useContext(OverviewContext);
  if (context === undefined) {
    throw new Error("useOverview must be used within an OverviewProvider");
  }
  return context;
}
