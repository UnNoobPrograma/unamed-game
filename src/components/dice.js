import React from "react";

import { getDiceNumber } from "../utils/game";

function Dice({ onGet, disabled, value }) {
  return (
    <button
      disabled={disabled}
      onClick={() => onGet(getDiceNumber())}
      className="dice"
    >
      {value}
    </button>
  );
}

export default Dice;
