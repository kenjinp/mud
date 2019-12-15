import Actions from "./stateTools";
import useSocketService from "./useSocketService";

export default function useGameStateService() {
  const socketService = useSocketService();
  const { createUser } = Actions(socketService);
  return {
    createUser
  };
}
