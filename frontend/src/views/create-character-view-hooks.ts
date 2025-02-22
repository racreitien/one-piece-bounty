import { generateDescription, generateName } from "../constants/endpoints";
import { useCharacterContext } from "../context/character-context";
import { useViewContext, ViewStateActionType } from "../context/view-context";
import { getRandomTraits } from "../helpers/get-random-traits";
import { postRequest } from "../helpers/post-request";
import {
  EyeColor,
  Gender,
  Group,
  HairColor,
  SkinColor,
} from "../types/character-types";
import { View } from "../types/types";

export const useGenerateRandomHandler = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const {
    state: {},
    dispatch,
  } = useViewContext();
  const { dispatch: dispatchCharacterChange } = useCharacterContext();

  return async () => {
    setErrorMessage("");
    const traits = getRandomTraits({
      group: Group.Random,
      bounty: 0,
      gender: Gender.Random,
      age: 0,
      eyeColor: EyeColor.Random,
      hairColor: HairColor.Random,
      skinColor: SkinColor.Random,
    });

    try {
      const characterName = await postRequest(generateName, {
        ...traits,
        name: "",
      });

      const characterDesc = await postRequest(generateDescription, {
        ...traits,
        name: characterName,
      });

      /*dispatch({
        type: ViewStateActionType.SetBountyImage,
        bountyImage: response.url,
      });*/
      dispatchCharacterChange({
        data: {
          name: characterName,
          ...traits,
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
    }
  };
};

export const useSubmitHandler = () => {
  const { dispatch: dispatchViewChange } = useViewContext();
  const { dispatch: dispatchCharacterChange } = useCharacterContext();

  return () => {
    dispatchCharacterChange({
      data: {
        name: "Pudding",
        group: Group.BigMomPirates,
        bounty: 20000000,
      },
    });

    dispatchViewChange({
      type: ViewStateActionType.SetView,
      currentView: View.CustomizeCharacter,
    });
  };
};
