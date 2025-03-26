import "./App.css";
import { CreateCharacterView } from "./views/create-character-view";
import { CustomizeCharacterView } from "./views/customize-character-view";
import { BountyView } from "./views/bounty-view";
import { View } from "./types/types";
import CharacterProvider from "./context/character-provider";
import React, { useEffect } from "react";
import { useViewContext } from "./context/view-context";
import anchorIcon from "./images/anchor.svg";
import { host } from "./constants/endpoints";

const App: React.FC = () => {
  const {
    state: { currentView, serverWarmupDone },
  } = useViewContext();

  useEffect(() => {
    if (!serverWarmupDone) {
      fetch(host).catch((error) => {
        console.error(error);
      });
    }
  }, []);

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

  return (
    <CharacterProvider>
      <header className="app-header">
        One Piece Bounty <img src={anchorIcon} width="15px"></img>
      </header>
      <div className="main-content">{renderView()}</div>
    </CharacterProvider>
  );
};

export default App;
