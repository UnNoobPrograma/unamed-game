import React, { useReducer } from "react";
import { initialState, reducer } from "./store/reducer";
import "./styles.css";

import Table from "./components/table";
import Player from "./components/player";
import Log from "./components/log";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { players, rows, currentPlayer, gameState, log } = state;

  return (
    <div className="App">
      <Table rows={rows} />

      {players.map((player, index) => (
        <Player
          onPlay={(name, row) => {
            dispatch({ type: "PLAY", payload: { row, name } });
          }}
          key={player.name}
          canPlay={gameState === "playing" && index === currentPlayer}
          {...player}
        />
      ))}

      <Log log={log} />
    </div>
  );
}
