import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { MemoryRouter as Router } from "react-router";

import SocketContext from "./SocketContext";
import SocketService from "./chatClient";
import HomeView from "./views/Home";
import GameView from "./views/Game";
import World from "./components/World";

const socketService = new SocketService();

const App = () => {
  return (
    <SocketContext.Provider value={socketService}>
      <World />
      <Router>
        <Route path={"/"} exact={true} component={HomeView} />
        <Route path={"/game"} component={GameView} />
      </Router>
    </SocketContext.Provider>
  );
};

export default (div: HTMLElement) => {
  ReactDOM.render(<App />, div);
};
