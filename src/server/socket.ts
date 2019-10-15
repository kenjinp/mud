import { createServer, Server } from "http";
import express from "express";
import socketIo from "socket.io";

const DEFAULT_PORT = 8080;

export default () => {
  const app = express();
  const server = createServer(app);
  const port = process.env.SOCKET_PORT || DEFAULT_PORT;
  server.listen(port, () => {
    console.log("Running sockets server on port %s", port);
  });
  const io = socketIo(server);
  return io;
};
