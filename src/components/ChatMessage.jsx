import React from "react";
import ChatbotIcon from "./ChatbotIcon";

function ChatMessage({ chat }) {
  return (
    !chat.hideInChat && (
      <div
        className={`message ${chat.role === "model" ? "bot" : "user"}-message ${
          chat.isError ? "error" : ""
        }`}
      >
        {chat.role === "model" && <ChatbotIcon />}
        <div className="message-text">{chat.text}</div>
      </div>
    )
  );
}

export default ChatMessage;
