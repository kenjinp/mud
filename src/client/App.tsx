import * as React from "react";
import * as ReactDOM from "react-dom";

import ChatContainer from "./containers/ChatContainer";
import SocketContext from "./SocketContext";
import SocketService from "./chatClient";

const socketService = new SocketService();

class App extends React.Component {
  render() {
    return (
      <SocketContext.Provider value={socketService}>
        <ChatContainer />
      </SocketContext.Provider>
    );
  }
}

export default (div: HTMLElement) => {
  ReactDOM.render(<App />, div);
};
