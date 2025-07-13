import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { myResume } from "./myResume";

function App() {
  const [chatHistory, setChatHistory] = useState([
    //adding custom info as bot's initial message so it can respond to later message accordingly
    {
      hideInChat: true,
      role: "model",
      text: myResume,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  console.log("running v.7");
  const chatBodyRef = useRef();

  //Help function to update chat history
  const updateHistory = (text, isError) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text, isError },
    ]);
  };

  const generateBotResponse = async (history) => {
    const messages = history.map(({ role, text }) => ({
      role: role === "model" ? "assistant" : "user",
      content: text,
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: messages,
      }),
    };

    try {
      const response = await fetch(
        "https://ai-chat-server-215w.onrender.com/chat",
        requestOptions
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data?.error?.message || "Something went wrong");

      const botReply = data.choices?.[0]?.message?.content
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        ?.trim();

      updateHistory(botReply);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Safa AI Chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            keyboard_arrow_down
          </button>
        </div>
        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">Hello, how can I help you today?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* chatbot footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
