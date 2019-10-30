import * as React from "react";
import TextInput from "react-autocomplete-input";

import "react-autocomplete-input/dist/bundle.css";
import "./ChatBox.css";
import { ChatLog, ChatMessageType } from "../../model";

const scrollToBottom = (element: HTMLDivElement) => {
  element.scrollTop = element.scrollHeight;
};

const ChatBox: React.FunctionComponent<{
  chatLog: ChatLog;
  emoteOptions: string[];
  onMessageInput: (messageInput: string) => void;
  onChange?: (value: string) => void;
}> = ({ chatLog, onMessageInput, onChange, emoteOptions }) => {
  const chatWindowRef = React.useRef(null);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    scrollToBottom(chatWindowRef.current);
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    onMessageInput(value);
    setValue("");
  };

  const handleInputChange = (inputValue: string) => {
    onChange && onChange(inputValue);
    setValue(inputValue);
  };

  return (
    <div className="chat-box">
      <ul
        className="chat-window"
        ref={chatWindowRef}
        onScroll={() => {
          console.log("hello friends");
        }}
      >
        {chatLog.map(({ type, user, contents, timestamp }) => {
          if (type === ChatMessageType.EMOTE) {
            return (
              <li className="chat-message -emote" key={timestamp}>
                <span className="contents">
                  {contents.replace("#User", user)}
                </span>
              </li>
            );
          }
          return (
            <li className="chat-message">
              <span className="user">{user}:</span>{" "}
              <span className="contents">{contents}</span>
            </li>
          );
        })}
      </ul>
      <form className="text-form" onSubmit={handleSubmit}>
        <TextInput
          Component={"input"}
          trigger={"/"}
          options={emoteOptions}
          value={value}
          className="input"
          onChange={handleInputChange}
        ></TextInput>
      </form>
    </div>
  );
};

export default ChatBox;
