import React, { useState } from "react";
import "./styles.css";

import Table from "./components/table";
import Player from "./components/player";

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [rows, setRows] = useState({
    1: { max: 1, tokens: 0 },
    2: { max: 2, tokens: 0 },
    3: { max: 3, tokens: 0 },
    4: { max: 4, tokens: 0 },
    5: { max: 5, tokens: 0 }
  });
  const players = [
    {
      name: "Link",
      tokens: 3
    },
    {
      name: "Aram",
      tokens: 3
    }
  ];

  function Play(name, row) {
    console.log(`${name} played in ${row}!`);
    setCurrentPlayer(prevTurn => {
      let newTurn = prevTurn + 1;

      if (newTurn > players.length - 1) {
        newTurn = 0;
      }

      return newTurn;
    });

    setRows(prevRows => ({
      ...prevRows,
      [row]: {
        ...prevRows[row],
        tokens: prevRows[row].tokens + 1
      }
    }));
  }

  return (
    <div className="App">
      <Table rows={rows} />

      {players.map((player, index) => (
        <Player
          onPlay={Play}
          key={player.name}
          name={player.name}
          canPlay={index === currentPlayer}
        />
      ))}
    </div>
  );
}
