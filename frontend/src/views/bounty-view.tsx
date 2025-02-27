import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../context/character-context";
import { useViewContext } from "../context/view-context";
import { useStartOverHandler } from "./bounty-view-hooks";

export const BountyView: React.FC = () => {
  const {
    state: { name, group, bounty },
  } = useCharacterContext();
  const {
    state: { description },
  } = useViewContext();

  const onStartOver = useStartOverHandler();

  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/poster")
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Failed to fetch poster image");
        }
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPosterUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1 className="view-title">{name}</h1>
      <h2>{group}</h2>
      {!posterUrl && (
        <>
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
        </>
      )}
      {posterUrl && (
        <>
          <div className="poster-container">
            <img
              src={posterUrl}
              alt="Bounty Poster"
              className="bounty-poster"
            />
          </div>
          <div className="desc">{description}</div>
        </>
      )}
      <div className="card">
        <button onClick={onStartOver}>Start over</button>
      </div>
    </>
  );
};
