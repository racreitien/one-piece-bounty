import React from "react";
import { useViewContext } from "../context/view-context";
import { View } from "../types/types";

export const CustomizeCharacterView: React.FC = () => {
  const { setView } = useViewContext();

  return (
    <>
      <h2>Customize your character</h2>
      <div className="card">
        <button onClick={() => setView(View.CreateCharacter)}>Back</button>
      </div>
      <div className="card">
        <button onClick={() => setView(View.CreateCharacter)}>
          Generate bounty poster
        </button>
      </div>
    </>
  );
};
