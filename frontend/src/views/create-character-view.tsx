import React, { useState } from "react";
import {
  useGenerateRandomHandler,
  useSubmitHandler,
} from "./create-character-view-hooks";

export const CreateCharacterView: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useSubmitHandler();
  const onGenerateRandom = useGenerateRandomHandler(setErrorMessage);

  return (
    <>
      <h2>Create your character</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="card">
        <button onClick={onSubmit}>Next</button>
      </div>
      <div className="card">
        <button onClick={onGenerateRandom}>
          Generate random bounty poster
        </button>
      </div>
    </>
  );
};
