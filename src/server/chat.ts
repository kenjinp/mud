import socketIo from "socket.io";
import Gun from "gun";

export default (socketIoServer, socketConnection: socketIo.socket, db: Gun) => {
  const messages = db.get("messages");
  messages.map().on((message, id) => {
    console.log({ message, id });
    socketIoServer.emit("message", {
      ...message,
      user: "blah"
    });
    socketConnection;
  });
  socketConnection.on("message", (message: any) => {
    console.log("[server](message): %s", JSON.stringify(message));
    messages.set(message);

    // TODO:
    // validate messages
    // process messages
    // send to correct parties (ie whisper)
    // socketIoServer.emit("message", {
    //   ...message,
    //   user: user.name
    // });
  });
};
