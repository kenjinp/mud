import SocketService from "./socketClient";

const Actions = socketService => ({
  createUser(userName: string, color: number) {
    socketService.send("NEW_USER", { userName, color });
  }
});

export default Actions;
