import { createContext, useContext } from "react";
import { View } from "../types/types";

export enum ViewStateActionType {
  SetBountyImage,
  SetDescription,
  SetView,
}

type SetBountyImageAction = {
  type: ViewStateActionType.SetBountyImage;
  bountyImage: string;
};

type SetDescriptionAction = {
  type: ViewStateActionType.SetDescription;
  description: string;
};

type SetViewAction = {
  type: ViewStateActionType.SetView;
  currentView: View;
};

export type UpdateViewStateAction =
  | SetBountyImageAction
  | SetViewAction
  | SetDescriptionAction;

export type ViewState = {
  bountyImage: string;
  description: string;
  currentView: View;
};

export const defaultViewState: ViewState = {
  bountyImage: "",
  description: "",
  currentView: View.CreateCharacter,
};

type ViewContext = {
  state: ViewState;
  dispatch: React.Dispatch<UpdateViewStateAction>;
};

const viewContext = createContext<ViewContext>({
  state: defaultViewState,
  dispatch: () => {
    throw new Error(
      "useViewContext must be called within a ViewContextProvider"
    );
  },
});

export const useViewContext = () => useContext(viewContext);

export default viewContext;
