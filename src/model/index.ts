// Socket.io events
export enum SocketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect"
}

export enum MessageType {
  ACTION = "ACTION",
  CHAT_MESSAGE = "CHAT_MESSAGE",
  HANDSHAKE = "HANDSHAKE",
  HEARTBEAT = "HEARTBEAT"
}
