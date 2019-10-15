import { Vector3 } from "three";

export enum ChatMessageType {
  EMOTE = "EMOTE",
  MESSAGE = "MESSAGE",
  ERROR = "ERROR"
}

export type ChatMessage = {
  type: ChatMessageType;
  user: string;
  contents: string;
  timestamp: string;
};
export type ChatLog = ChatMessage[];

export interface Camera {
  uuid: string;
  userId: string;
  position: number[];
  rotation: number[];
  color: string;
}

export interface User {
  name: string;
  uuid: string;
}

export interface Message {
  payload: any;
}

export interface ActionMessage {
  type: string;
  payload?: any;
}

// Socket.io events
export enum SocketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect"
}

export enum MessageType {
  ACTION = "action",
  HANDSHAKE = "handshake"
}
