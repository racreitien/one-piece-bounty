import { createContext, useContext } from "react";
import {
  EyeColor,
  Gender,
  Group,
  HairColor,
  SkinColor,
} from "../types/character-types";
import { UpdateCharacterAction } from "./character-provider";

export type CharacterState = {
  name: string;
  group: Group;
  bounty: number;
  gender: Gender;
  age: number;
  eyeColor: EyeColor;
  hairColor: HairColor;
  skinColor: SkinColor;
};

export const defaultCharacterState: CharacterState = {
  name: "",
  group: Group.Random,
  bounty: 0,
  gender: Gender.Random,
  age: 0,
  eyeColor: EyeColor.Random,
  hairColor: HairColor.Random,
  skinColor: SkinColor.Random,
};

type CharacterContext = {
  state: CharacterState;
  dispatch: React.Dispatch<UpdateCharacterAction>;
};

export const characterContext = createContext<CharacterContext>({
  state: defaultCharacterState,
  dispatch: () => {
    throw new Error(
      "useCharacterContext must be called within a CharacterProvider"
    );
  },
});

export const useCharacterContext = () => useContext(characterContext);
