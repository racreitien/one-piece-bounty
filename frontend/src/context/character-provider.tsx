import { ReactNode, useReducer } from "react";
import {
  characterContext,
  defaultCharacterState,
  type CharacterState,
} from "./character-context";

export type UpdateCharacterAction = {
  data: Partial<CharacterState>;
};

function reducer(
  state: CharacterState,
  action: UpdateCharacterAction
): CharacterState {
  return { ...state, ...action.data };
}

function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultCharacterState);

  const CharacterContextProvider = characterContext.Provider;

  return (
    <CharacterContextProvider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CharacterContextProvider>
  );
}

export default CharacterProvider;
