import React, { useState } from "react";
import notificationSoundFile from "../assets/audio/notification.mp3";

const Chat = ({ activePlayer = "white" }) => {
  // State to store chat messages and the input value
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Handle sending a chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create a new message with sender, text, and timestamp
    const newMessage = {
      sender: activePlayer,
      text: input,
    };
    // Update state with new message
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    new Audio(notificationSoundFile).play();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "white"
                ? "chat-message-white"
                : "chat-message-black"
            }`}>
            <div className="chat-message-info">
              <span className="chat-sender">{msg.sender}</span>
            </div>
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
