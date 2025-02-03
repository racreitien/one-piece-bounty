import { createContext, useContext } from "react";
import { Gender, Group } from "../types/character-types";
import { UpdateCharacterAction } from "./character-provider";

export type CharacterState = {
  name: string;
  group: Group;
  bounty: number;
  gender: Gender;
  age: number;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
};

export const defaultCharacterState: CharacterState = {
  name: "",
  group: Group.Unaffiliated,
  bounty: 0,
  gender: Gender.Any,
  age: 0,
  eyeColor: "",
  hairColor: "",
  skinColor: "",
};

type CharacterContext = {
  state: CharacterState;
  dispatch: React.Dispatch<UpdateCharacterAction>;
};

const characterContext = createContext<CharacterContext>({
  state: defaultCharacterState,
  dispatch: () => {
    throw new Error(
      "useCharacterContext must be called within a CharacterProvider"
    );
  },
});

export const useCharacterContext = () => useContext(characterContext);

export default characterContext;
