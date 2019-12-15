import * as React from "react";
import CharacterCreationContainer from "../containers/CharacterCreationContainer";

const HomeView: React.FunctionComponent = () => (
  <div className="home-view view">
    <h1>KingDOM</h1>
    <CharacterCreationContainer />
  </div>
);

export default HomeView;
