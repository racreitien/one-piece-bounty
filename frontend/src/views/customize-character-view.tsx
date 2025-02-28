import React, { useState } from "react";
import { useViewContext, ViewStateActionType } from "../context/view-context";
import { View } from "../types/types";
import {
  EyeColor,
  Gender,
  HairColor,
  SkinColor,
} from "../types/character-types";
import { capitalize } from "../helpers/string-helpers";
import { useGenerateBountyHandler } from "./customize-character-view-hooks";
import { CharacterState } from "../context/character-context";

const useBack = () => {
  const { dispatch } = useViewContext();

  return () => {
    dispatch({
      type: ViewStateActionType.SetView,
      currentView: View.CreateCharacter,
    });
  };
};

export const CustomizeCharacterView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [gender, setGender] = useState(Gender.Random);
  const [age, setAge] = useState<number | "">("");
  const [eyeColor, setEyeColor] = useState(EyeColor.Random);
  const [hairColor, setHairColor] = useState(HairColor.Random);
  const [skinColor, setSkinColor] = useState(SkinColor.Random);

  const characterTraits: Partial<CharacterState> = {
    gender,
    age: age === "" ? undefined : age,
    eyeColor,
    hairColor,
    skinColor,
  };

  const onBack = useBack();
  const generateBountyHandler = useGenerateBountyHandler(
    setLoading,
    setErrorMessage,
    characterTraits
  );

  return (
    <div className="top-padding">
      <h2 className="view-title">Customize your character</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            {Object.values(Gender).map((value) => (
              <option key={value} value={value}>
                {capitalize(value)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            value={age}
            min={6}
            max={141}
            onChange={(e) => setAge(Number(e.target.value))}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="eyeColor">Eye Color</label>
          <select
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value as EyeColor)}
          >
            {Object.values(EyeColor).map((value) => (
              <option key={value} value={value}>
                {capitalize(value)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hairColor">Hair Color</label>
          <select
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value as HairColor)}
          >
            {Object.values(HairColor).map((value) => (
              <option key={value} value={value}>
                {capitalize(value)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="skinColor">Skin Color</label>
          <select
            value={skinColor}
            onChange={(e) => setSkinColor(e.target.value as SkinColor)}
          >
            {Object.values(SkinColor).map((value) => (
              <option key={value} value={value}>
                {capitalize(value)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button-container">
        <button onClick={generateBountyHandler}>
          {loading ? (
            <span className="loading">Generating...</span>
          ) : (
            "Generate bounty poster"
          )}
        </button>
      </div>
      <div className="button-container">
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};
