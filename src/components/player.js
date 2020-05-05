import React, { useState } from "react";

import Dice from "./dice";

function Player({ name, tokens, canPlay, onPlay, lastRow }) {
  const [showRowSelector, setShowRowSelector] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  function Play(number) {
    onPlay(name, number);
  }

  return (
    <div className="player">
      <em className="player-name">{name}</em>
      <div className="player-tokens">Remaining tokens: {tokens}</div>
      <div className="player-controls">
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
            value={selectedNumber || lastRow}
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
    </div>
  );
}

export default Player;
