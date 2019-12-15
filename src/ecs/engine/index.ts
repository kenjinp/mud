import { System } from "./system";

export type Entity = {
  id: string;
  type: string;
  [componentName: string]: any;
};

const Engine = (systems: System[]) => {
  let time = Date.now();
  let clock;
  let started = false;
  return {
    run() {
      console.log("running engine");
      started = true;
    },
    tick() {
      if (!started) {
        return;
      }
      systems.forEach(system => {
        const delta = Date.now() - time;
        system.update(delta);
        time = Date.now();
      });
    },
    stop() {
      started = false;
      clock && clearInterval(clock);
    }
  };
};

export default Engine;
