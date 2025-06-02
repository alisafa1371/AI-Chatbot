import React, { useRef } from "react";

function ChatForm({ setChatHistory, generateBotResponse, chatHistory }) {
  const inputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value?.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    //adding thinking from bot
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above ,please address this  query: ${userMessage}`,
        }, //here we add a prefix to each users's question so chat bot can respond only based on the provided data
      ]);
    }, 600);
  };
  return (
    <form action="#" className="chat-form" onSubmit={submitFormHandler}>
      <input
        type="text"
        placeholder="Type your message here..."
        className="message-input"
        required
        ref={inputRef}
        dir="auto"
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
}

export default ChatForm;
