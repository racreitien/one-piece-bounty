import "./App.css";
import { CreateCharacterView } from "./views/create-character-view";
import { CustomizeCharacterView } from "./views/customize-character-view";
import { BountyView } from "./views/bounty-view";
import { View } from "./types/types";
import CharacterProvider from "./context/character-provider";
import React from "react";
import { useViewContext } from "./context/view-context";

const App: React.FC = () => {
  const { currentView } = useViewContext();

  const renderView = () => {
    switch (currentView) {
      case View.CreateCharacter:
        return <CreateCharacterView />;
      case View.CustomizeCharacter:
        return <CustomizeCharacterView />;
      case View.Bounty:
        return <BountyView />;
      default:
        return <CreateCharacterView />;
    }
  };

  return <CharacterProvider>{renderView()}</CharacterProvider>;
};

export default App;
