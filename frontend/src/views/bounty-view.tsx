import React from "react";
import {
  defaultCharacterState,
  useCharacterContext,
} from "../context/character-context";
import { useViewContext, ViewStateActionType } from "../context/view-context";
import { View } from "../types/types";

const useStartOverHandler = () => {
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

export const BountyView: React.FC = () => {
  const {
    state: { name, group, bounty },
  } = useCharacterContext();
  const {
    state: { description },
  } = useViewContext();

  const onStartOver = useStartOverHandler();

  return (
    <>
      <h1 className="view-title">{name}</h1>
      <h2>{group}</h2>
      <h3>
        {"Bounty: "}
        <img
          src="/src/images/berry.svg"
          alt="berry currency symbol"
          className="berry-icon"
        />
        {` ${bounty.toLocaleString()}`}
      </h3>
      <div className="form-container">
        <div className="desc">{description}</div>
      </div>
      <div className="card">
        <button onClick={onStartOver}>Start over</button>
      </div>
    </>
  );
};
