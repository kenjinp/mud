import * as React from "react";
import useRaf from "@rooks/use-raf";

import World from "../Render/World";
import { Entity } from "../../ecs/engine";

const WorldComponent: React.FunctionComponent<{ entities?: Entity[] }> = ({
  entities
}) => {
  const shouldRender = true;
  const canvasRef = React.useRef();
  const worldRef = React.useRef<World>();

  React.useEffect(() => {
    if (worldRef.current) {
      worldRef.current.updateEntities(entities);
    }
  }, [worldRef.current, entities]);

  React.useEffect(() => {
    if (canvasRef.current) {
      worldRef.current = new World(canvasRef.current);
    }
  }, [canvasRef && canvasRef.current]);

  useRaf(() => {
    worldRef && worldRef.current && worldRef.current.update();
  }, shouldRender);
  return <canvas className="whole-canvas" ref={canvasRef} />;
};

export default WorldComponent;
