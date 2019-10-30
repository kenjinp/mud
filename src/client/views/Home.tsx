import * as React from "react";
import CharacterCreationContainer from "../containers/CharacterCreationContainer";

const HomeView: React.FunctionComponent = () => (
  <div className="home-view view">
    <h1>KingDOM</h1>
    <p>
      A <b>multi-user dungeon</b> that runs on the web, with javascript.
    </p>
    <CharacterCreationContainer />
  </div>
);

export default HomeView;
