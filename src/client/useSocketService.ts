import * as React from "react";
import SocketContext from "./SocketContext";
import SocketService from "./chatClient";

export default function useSocketService(): SocketService {
  const socket = React.useContext<SocketService>(SocketContext);
  return socket;
}
