import { ReactNode, useReducer } from "react";
import viewContext, {
  defaultViewState,
  UpdateViewStateAction,
  ViewState,
  ViewStateActionType,
} from "./view-context";

function reducer(state: ViewState, action: UpdateViewStateAction): ViewState {
  switch (action.type) {
    case ViewStateActionType.SetView:
      return { ...state, currentView: action.currentView };
    case ViewStateActionType.SetBountyImage:
      return { ...state, bountyImage: action.bountyImage };
    case ViewStateActionType.SetDescription:
      return { ...state, description: action.description };
    default:
      return state;
  }
}

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultViewState);

  const ViewContextProvider = viewContext.Provider;

  return (
    <ViewContextProvider value={{ state, dispatch }}>
      {children}
    </ViewContextProvider>
  );
};

export default ViewProvider;
