import makeChat from "./chat";
import makeServer from "./client";
import socketIo from "socket.io";
import { SocketEvent, MessageType } from "../model";
import Engine from "../ecs/engine";
import makeEntity, { Sphere, Ground } from "./objects";

const DEFAULT_PORT = 3000;
console.log(`hello from the server, ${process.env.PORT || DEFAULT_PORT}`);

const server = makeServer({ port: process.env.PORT || DEFAULT_PORT });
const socketIoServer = socketIo(server);
const sphere = { ...Sphere, id: "sphere" };
const ground = { ...Ground, id: "ground" };

// JSON SCHEMA
// ID for frame
// ID referenced from another

try {
  const engine = Engine([
    {
      update(delta: number) {
        // process.stdout.clearLine();
        // process.stdout.cursorTo(0);
      }
    }
  ]);
  engine.run();
} catch (error) {
  console.log(error);
}

// ON INIT, WHAT DO WE DO?
// GET OBJECTS FROM DB
// INITIALIZE THEM AS PHYISCAL OBJECTS
// IF ANYONE IS CONNECTED, START SIMULATION

socketIoServer.on(SocketEvent.CONNECT, async (socket: socketIo.Socket) => {
  console.log("client connected");

  socket.send(MessageType.HANDSHAKE, {
    entities: [sphere, ground]
  });
  // makeChat(socketIoServer, socket, db);
  socket.on(SocketEvent.DISCONNECT, () => {
    console.log("client disconencted");
  });
});
