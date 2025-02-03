import { ReactNode, useState } from "react";
import viewContext from "./view-context";
import { View } from "../types/types";

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentView] = useState<View>(View.CreateCharacter);

  const setView = (view: View) => {
    console.log("Calling setView with ", view);
    setCurrentView(view);
  };

  const ViewContextProvider = viewContext.Provider;

  return (
    <ViewContextProvider value={{ currentView, setView }}>
      {children}
    </ViewContextProvider>
  );
};

export default ViewProvider;
