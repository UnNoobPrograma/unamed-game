import React, { useState } from "react";

import Dice from "./dice";

function Player({ name, canPlay, onPlay }) {
  let [tokens, setTokens] = useState(3);

  function PlayTurn(number) {
    // console.log("new Number", number);
    setTokens(prevValue => prevValue - 1);
    onPlay(name, number);
  }

  return (
    <div className="player">
      <em>{name}</em>
      <div>Remaining tokens: {tokens}</div>
      <Dice disabled={!canPlay} onGet={PlayTurn} />
    </div>
  );
}

export default Player;
