import React from "react";
import { useViewContext, ViewStateActionType } from "../context/view-context";
import { View } from "../types/types";

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
  const onBack = useBack();

  return (
    <>
      <h2>Customize your character</h2>
      <div className="card">
        <button onClick={onBack}>Back</button>
      </div>
      <div className="card">
        <button onClick={() => {}}>Generate bounty poster</button>
      </div>
    </>
  );
};
