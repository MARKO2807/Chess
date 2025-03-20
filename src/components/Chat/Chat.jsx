import React, { useState } from "react";

const Chat = () => {
  // Sample messages for layout demonstration.
  const [messages, setMessages] = useState([
    { id: 1, sender: "White", text: "Hey!" },
    { id: 2, sender: "Black", text: "Good luck!" },
  ]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.sender.toLowerCase()}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Chat;
