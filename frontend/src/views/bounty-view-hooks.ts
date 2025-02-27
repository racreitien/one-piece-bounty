import {
  defaultCharacterState,
  useCharacterContext,
} from "../context/character-context";
import { useViewContext, ViewStateActionType } from "../context/view-context";
import { View } from "../types/types";

export const useStartOverHandler = () => {
  const { dispatch } = useViewContext();
  const { dispatch: dispatchCharacterChange } = useCharacterContext();

  return () => {
    dispatchCharacterChange({
      data: defaultCharacterState,
    });
    dispatch({
      type: ViewStateActionType.SetView,
      currentView: View.CreateCharacter,
    });
  };
};
