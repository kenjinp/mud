import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import { MemoryRouter as Router } from "react-router";

import SocketContext from "./SocketContext";
import SocketService from "./socketClient";
import HomeView from "./views/Home";
import GameView from "./views/Game";
import World from "./components/World";
import Footer from "./components/Footer";

const socketService = new SocketService();

const App = () => {
  return (
    <SocketContext.Provider value={socketService}>
      <World />
      <Router>
        <Route path={"/home"} exact={true} component={HomeView} />
        <Route path={"/"} component={GameView} />
      </Router>
      <Footer />
    </SocketContext.Provider>
  );
};

export default (div: HTMLElement) => {
  ReactDOM.render(<App />, div);
};
