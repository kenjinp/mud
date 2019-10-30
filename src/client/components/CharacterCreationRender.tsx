import * as React from "react";
import useRaf from "@rooks/use-raf";
import World from "../Render/CharacterSelect";

import "./CharacterCreationRender.css";

const WorldComponent: React.FunctionComponent<{
  color: number;
  name: string;
}> = ({ color, name }) => {
  const canvasRef = React.useRef();
  const [world, setWorld] = React.useState<World | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const newWorld = new World(canvasRef.current);
      newWorld.avatar.setColor(color);
      newWorld.avatar.setName(name);
      setWorld(newWorld);
    }
  }, [canvasRef && canvasRef.current]);

  React.useEffect(() => {
    if (world) {
      world.avatar.setColor(color);
      world.avatar.setName(name);
    }
  }, [color, name]);

  useRaf(() => {
    if (world && canvasRef && canvasRef.current) {
      world.update();
    }
  }, !!canvasRef && !!canvasRef.current);
  return <canvas className="character-viewer" ref={canvasRef} />;
};

export default WorldComponent;
