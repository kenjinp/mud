import * as React from "react";
import ChatBox from "../components/ChatBox";
import { playSound } from "../soundManager";
import useSocketService from "../useSocketService";
import { ChatLog, ChatMessageType } from "../../model";

// 5 mins
const CLEAR_TIME_IN_MS = 5 * 60 * 1000;

const ChatContainer: React.FunctionComponent<{}> = props => {
  const [chatLog, setChatLog] = React.useState<ChatLog>([]);
  const socketService = useSocketService();
  const emoteOptions = ["dance", "bow", "laugh", "sigh", "whisper", "shout"];

  // Remove old messages
  // So they don't clutter and
  // take up a bunch of memory
  React.useEffect(() => {
    const interval = setInterval(() => {
      // filter chat queue for messages more than x long in the past
      const filterTime = new Date().getTime() - CLEAR_TIME_IN_MS;
      setChatLog(
        chatLog.filter(
          ({ timestamp }) => new Date(timestamp).getTime() >= filterTime
        )
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [chatLog]);

  // Listen to messages
  // This is probably very stupid, because it unsubscribes and changes on each message
  React.useEffect(() => {
    const subscription = socketService
      .onMessage("message")
      .subscribe(message => {
        console.log(message);
        setChatLog([...chatLog, message]);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [chatLog, socketService]);

  // Send Messages!
  const handleMessageInput = (messageInput: string) => {
    playSound("confirm");
    socketService &&
      socketService.send("message", {
        type: ChatMessageType.MESSAGE,
        contents: messageInput,
        timestamp: Date.now()
      });
  };

  return (
    <ChatBox
      emoteOptions={emoteOptions}
      chatLog={chatLog}
      onMessageInput={handleMessageInput}
      onChange={() => {
        playSound("text");
      }}
    />
  );
};

export default ChatContainer;
