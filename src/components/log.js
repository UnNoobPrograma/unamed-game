import React from "react";

export default function Log({ log }) {
  return (
    <div>
      {log.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}
