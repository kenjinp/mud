import * as React from "react";
import CharacterCreationRender from "./CharacterCreationRender";

import { selectRandomElementIndex } from "../../utils";

const CharacterCreationComponent: React.FunctionComponent<{
  onChange(key: string, value: string): void;
  userName: string;
  onSubmit(): void;
}> = ({ onChange, userName, onSubmit }) => {
  const colors = [
    0xf44336,
    0xe91e63,
    0x9c27b0,
    0x673ab7,
    0x3f51b5,
    0x2196f3,
    0x03a9f4,
    0x009688,
    0x4caf50,
    0x8bc34a,
    0xcddc39,
    0xffeb3b,
    0xffc107,
    0xff9800,
    0xff5722
  ];

  const [selectedColorIndex, setSelectedColorIndex] = React.useState(
    selectRandomElementIndex(colors)
  );

  const back = e => {
    e.preventDefault();
    const newColorIndex =
      selectedColorIndex === 0 ? colors.length - 1 : selectedColorIndex - 1;
    onChange("color", newColorIndex);
    setSelectedColorIndex(newColorIndex);
  };

  const forward = e => {
    e.preventDefault();
    const newColorIndex =
      selectedColorIndex >= colors.length - 1 ? 0 : selectedColorIndex + 1;
    onChange("color", newColorIndex);
    setSelectedColorIndex(newColorIndex);
  };

  return (
    <form
      className="character-creation"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <p>create your character!</p>
      <div>
        <button onClick={back}>{"<"}</button>
        <CharacterCreationRender
          color={colors[selectedColorIndex]}
          name={userName}
        />
        <button onClick={forward}>{">"}</button>
      </div>
      <input
        onChange={e => {
          onChange("name", e.target.value);
        }}
        value={userName}
      />
      <button type="submit">play</button>
    </form>
  );
};

export default CharacterCreationComponent;
