import React, { useState } from "react";
import {
  useGenerateRandomHandler,
  useSubmitHandler,
} from "./create-character-view-hooks";
import { Group } from "../types/character-types";

export const CreateCharacterView: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [group, setGroup] = useState(Group.Random);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useSubmitHandler(name, group);
  const onGenerateRandom = useGenerateRandomHandler(
    setLoading,
    setErrorMessage
  );

  return (
    <div className="top-padding">
      <h2 className="view-title">Create your character</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="group">Group</label>
          <select
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value as Group)}
          >
            {Object.values(Group).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button-container">
        <button onClick={onSubmit}>Next</button>
      </div>
      <div className="button-container">
        <button onClick={onGenerateRandom} disabled={loading}>
          {loading ? (
            <span className="loading">Generating...</span>
          ) : (
            "Generate random bounty poster"
          )}
        </button>
      </div>
    </div>
  );
};
