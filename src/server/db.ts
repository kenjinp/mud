import Gun from "gun";

interface State {
  entities: {
    [Username: string]: { age: number };
  };
}

// @ts-ignore
const gun = Gun<State>({ radisk: false });

export default gun;
