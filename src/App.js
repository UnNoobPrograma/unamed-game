import React, { useState } from "react";
import "./styles.css";

import Table from "./components/table";
import Player from "./components/player";

export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [rows, setRows] = useState([
    { max: 1, tokens: 0 },
    { max: 2, tokens: 0 },
    { max: 3, tokens: 0 },
    { max: 4, tokens: 0 },
    { max: 5, tokens: 0 },
  ]);
  const players = [
    {
      name: "Link",
      tokens: 3,
    },
    {
      name: "Aram",
      tokens: 3,
    },
  ];

  return (
    <div className="App">
      <Table rows={rows} />

      {players.map((player, index) => (
        <Player
          onPlay={(name, row) => {
            setCurrentPlayer((prevTurn) => {
              let newTurn = prevTurn + 1;

              if (newTurn > players.length - 1) {
                newTurn = 0;
              }

              return newTurn;
            });

            setRows((prevRows) => {
              const newRows = [...prevRows];
              newRows[row - 1].tokens += 1;

              return newRows;
            });
          }}
          key={player.name}
          name={player.name}
          canPlay={index === currentPlayer}
        />
      ))}
    </div>
  );
}
