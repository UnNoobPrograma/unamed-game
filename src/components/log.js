import React from "react";

export default function Log({ log }) {
  const messages = [...log];
  messages.length = 10;

  return (
    <div className="log">
      {messages.map((message, index) => (
        <div className={`${message.type} message`} key={index}>
          {message.text}
        </div>
      ))}
    </div>
  );
}
