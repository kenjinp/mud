import * as React from "react";
import { nameByRace } from "fantasy-name-generator";
import { useHistory } from "react-router-dom";

import { playSound } from "../soundManager";
import CharacterCreationComponent from "../components/CharacterCreation";
import useGameStateService from "../useGameStateService";

const CharacterCreationContainer: React.FunctionComponent = () => {
  const defaultName = nameByRace("human", { allowMultipleNames: true });
  const history = useHistory();
  const [userName, setUserName] = React.useState(defaultName);
  const { createUser } = useGameStateService();

  const handleChange = (key: string, value: string) => {
    if (key === "name") {
      playSound("text");
      return setUserName(value);
    }
    if (key === "color") {
      setUserName(nameByRace("human", { allowMultipleNames: true }));
    }
    playSound("select");
  };

  const handleSubmit = ({ name, color }) => {
    playSound("confirm");
    history.push("/game");
    createUser(name, color);
  };

  return (
    <CharacterCreationComponent
      onChange={handleChange}
      onSubmit={handleSubmit}
      userName={userName}
    />
  );
};

export default CharacterCreationContainer;
