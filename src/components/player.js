import React, { useState } from "react";

import Dice from "./dice";

function Player({ name, tokens, canPlay, onPlay }) {
  const [showRowSelector, setShowRowSelector] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  function Play(number) {
    onPlay(name, number);
  }

  return (
    <div className="player">
      <em>{name}</em>
      <div>Remaining tokens: {tokens}</div>
      {!showRowSelector && (
        <Dice
          disabled={!canPlay}
          onGet={(number) => {
            if (number === 6) {
              setShowRowSelector(true);
            } else {
              Play(number);
              setSelectedNumber(number);
            }
          }}
          value={selectedNumber}
        />
      )}
      {showRowSelector &&
        [1, 2, 3, 4, 5].map((number) => (
          <button
            onClick={() => {
              Play(number);
              setSelectedNumber(number);
              setShowRowSelector(false);
            }}
            className="dice"
            key={number}
          >
            {number}
          </button>
        ))}
    </div>
  );
}

export default Player;
