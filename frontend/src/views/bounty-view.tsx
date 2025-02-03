import React from "react";
import { useCharacterContext } from "../context/character-context";

export const BountyView: React.FC = () => {
  const {
    state: { name },
  } = useCharacterContext();

  return <h2>{name}'s Bounty</h2>;
};
