import React, { useState } from "react";

import { getDiceNumber } from "../utils/game";

function Dice({ onGet, disabled }) {
  const [number, setNumber] = useState(1);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        const newNumber = getDiceNumber();
        onGet(newNumber);

        setNumber(newNumber);
      }}
      className="dice"
    >
      {number}
    </button>
  );
}

export default Dice;
