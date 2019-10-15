import { createServer, Server } from "http";
import express from "express";
import socketIo from "socket.io";

import { Message, ChatMessageType } from "../model";
import { selectRandomElement } from "../utils";

const chatMessages = [
  {
    type: ChatMessageType.MESSAGE,
    user: "coolman69",
    contents: "Wow what a cool thing!"
  },
  {
    type: ChatMessageType.MESSAGE,
    user: "xxXEliteBroXxx",
    contents: "Yeah I know rite? :D"
  },
  {
    type: ChatMessageType.MESSAGE,
    user: "coolman69",
    contents: "Hey, what a great job you're doing!"
  },
  {
    type: ChatMessageType.EMOTE,
    user: "xxXEliteBroXxx",
    contents: "#User does a silly dance to pass the time"
  },
  {
    type: ChatMessageType.MESSAGE,
    user: "xxXEliteBroXxx",
    contents:
      "God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Hey, you know how I'm, like, always trying to save the planet? Here's my chance."
  }
];

export default (socketIoServer: socketIo.Server) => {
  socketIoServer.on("connect", (socket: socketIo.socket) => {
    console.log(socket.id);
    socket.on("message", (message: any) => {
      console.log("[server](message): %s", JSON.stringify(message));

      // TODO:
      // validate messages
      // process messages
      // send to correct parties

      socketIoServer.emit("message", {
        ...message,
        user: socket.id
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
