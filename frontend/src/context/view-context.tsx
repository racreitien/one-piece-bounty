import { createContext, useContext } from "react";
import { View } from "../types/types";

type ViewContext = {
  currentView: View;
  setView: (view: View) => void;
};

const viewContext = createContext<ViewContext>({
  currentView: View.CreateCharacter,
  setView: () => {
    throw new Error(
      "useViewContext must be called within a ViewContextProvider"
    );
  },
});

export const useViewContext = () => useContext(viewContext);

export default viewContext;
