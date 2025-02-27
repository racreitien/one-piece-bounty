import {
  generate,
  generateDescription,
  generateName,
} from "../constants/endpoints";
import {
  CharacterState,
  useCharacterContext,
} from "../context/character-context";
import { useViewContext, ViewStateActionType } from "../context/view-context";
import { getRandomTraits } from "../helpers/get-random-traits";
import { postRequest } from "../helpers/post-request";
import { View } from "../types/types";

export const useGenerateBountyHandler = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  characterTraits: Partial<CharacterState>
) => {
  const { dispatch } = useViewContext();
  const { state, dispatch: dispatchCharacterChange } = useCharacterContext();

  return async () => {
    setErrorMessage("");
    setLoading(true);
    const traits = getRandomTraits({ ...state, ...characterTraits });

    try {
      let characterName = state.name;

      if (!characterName) {
        characterName = await postRequest(generateName, {
          ...traits,
          name: "",
        });
      }

      const characterDesc = await postRequest(generateDescription, {
        ...traits,
        name: characterName,
      });

      await postRequest(generate, {
        ...traits,
        name: characterName,
      });

      dispatchCharacterChange({
        data: {
          ...traits,
          name: characterName,
        },
      });
      dispatch({
        type: ViewStateActionType.SetDescription,
        description: characterDesc,
      });
      dispatch({
        type: ViewStateActionType.SetView,
        currentView: View.Bounty,
      });
    } catch (err) {
      setErrorMessage(String(err));
    } finally {
      setLoading(false);
    }
  };
};
