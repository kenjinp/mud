import makeChat from "./chat";
import makeServer from "./client";
import socket from "./socket";
import socketIo from "socket.io";
import { Message, SocketEvent, MessageType } from "../model";
import {
  createStore,
  createUserAction,
  deleteUserAction,
  createCameraAction,
  deleteCamearAction
} from "./store";

console.log("hello from the server");

const clientServer = makeServer();
const socketIoServer = socket();
const store = createStore();

socketIoServer.on(SocketEvent.CONNECT, (socket: socketIo.socket) => {
  const userAction = createUserAction();
  const {
    payload: { uuid }
  } = userAction;
  const cameraAction = createCameraAction(userAction.payload);
  store.dispatch(userAction);
  store.dispatch(cameraAction);

  socket.emit(MessageType.HANDSHAKE, {
    payload: {
      you: userAction.payload,
      everything: store.getState()
    }
  });

  socket.on(MessageType.ACTION, (m: Message) => {
    console.log("[server](message): %s", JSON.parse(m.payload));
  });

  socket.on(SocketEvent.DISCONNECT, () => {
    store.dispatch(deleteUserAction(uuid));
    store.dispatch(deleteCamearAction(cameraAction.payload.uuid));
  });
});

makeChat(socketIoServer);

export { socketIoServer, clientServer };
