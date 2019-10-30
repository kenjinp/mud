import * as React from "react";
import useRaf from "@rooks/use-raf";
import World from "../Render/World";

const WorldComponent: React.FunctionComponent = () => {
  const canvasRef = React.useRef();
  const [world, setWorld] = React.useState<World | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      setWorld(new World(canvasRef.current));
    }
  }, [canvasRef && canvasRef.current]);

  useRaf(() => {
    if (world && canvasRef && canvasRef.current) {
      world.update();
    }
  }, !!canvasRef && !!canvasRef.current);
  return <canvas className="whole-canvas" ref={canvasRef} />;
};

export default WorldComponent;
