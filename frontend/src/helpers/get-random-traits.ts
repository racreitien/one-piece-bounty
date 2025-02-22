import { CharacterState } from "../context/character-context";
import {
  EyeColor,
  Gender,
  Group,
  HairColor,
  SkinColor,
} from "../types/character-types";

export type RandomTraits = Omit<CharacterState, "name">;

/*
 * Helper method to get a random number between min and max, inclusive
 */
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/*
 * Helper method to get a random value of an enum
 */
function getRandomEnumValue<T extends { [key: string]: string }>(
  enumObj: T
): T[keyof T] {
  let enumValues = Object.values(enumObj) as T[keyof T][];

  enumValues = enumValues.filter((value) => value !== "");

  const randomIndex = getRandomNumber(0, enumValues.length - 1);
  return enumValues[randomIndex];
}

/*
 * Helper function to choose random values for any subset of character traits,
 * excluding the name which will be generated on the backend
 */
export const getRandomTraits = (traits: RandomTraits): RandomTraits => {
  const randomTraits = traits;

  if (!randomTraits.age) {
    randomTraits.age = getRandomNumber(6, 141);
  }
  if (randomTraits.bounty === 0) {
    randomTraits.bounty = getRandomNumber(100, 500000000);
  }
  if (randomTraits.eyeColor === EyeColor.Random) {
    randomTraits.eyeColor = getRandomEnumValue(EyeColor);
  }
  if (randomTraits.gender === Gender.Random) {
    randomTraits.gender = getRandomEnumValue(Gender);
  }
  if (randomTraits.group === Group.Random) {
    randomTraits.group = getRandomEnumValue(Group);
  }
  if (randomTraits.hairColor === HairColor.Random) {
    randomTraits.hairColor = getRandomEnumValue(HairColor);
  }
  if (randomTraits.skinColor === SkinColor.Random) {
    randomTraits.skinColor = getRandomEnumValue(SkinColor);
  }

  return randomTraits;
};
