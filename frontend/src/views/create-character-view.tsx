import React from "react";
import { View } from "../types/types";
import { useViewContext } from "../context/view-context";

const onSubmit = () => {};

export const CreateCharacterView: React.FC = () => {
  const { setView } = useViewContext();

  return (
    <>
      <h2>Create your character</h2>
      <div className="card">
        <button onClick={() => setView(View.CustomizeCharacter)}>Next</button>
      </div>
      <div className="card">
        <button onClick={() => onSubmit()}>
          Generate random bounty poster
        </button>
      </div>
    </>
  );
};
