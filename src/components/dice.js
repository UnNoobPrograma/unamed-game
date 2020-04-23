import React, { useState } from "react";

import { getDiceNumber } from "../utils/game";

function Dice({ onGet, disabled }) {
  const [number, setNumber] = useState(1);

  const onClick = event => {
    const newNumber = getDiceNumber();

    setNumber(() => newNumber);
    onGet(newNumber);
  };

  return (
    <button disabled={disabled} onClick={onClick} className="dice">
      {number}
    </button>
  );
}

export default Dice;
