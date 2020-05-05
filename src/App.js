import React, { useReducer, useEffect } from "react";
import { initialState, reducer } from "./store/reducer";
import "./styles.css";

import { onNewPlayer, onConnect, onPlayerTurn } from "./utils/socket";

import Table from "./components/table";
import Player from "./components/player";
import Log from "./components/log";
import Login from "./components/login";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { players, rows, currentPlayer, gameState, log, socket } = state;

  useEffect(() => {
    onConnect((payload) => dispatch({ type: "CONNECTED", payload }));
    onNewPlayer((payload) => dispatch({ type: "NEW_PLAYER", payload }));
    onPlayerTurn((payload) => dispatch({ type: "SYNC", payload }));
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="App">
      <Login state={state} dispatch={dispatch} />
      <div className="table-container">
        <Table rows={rows} />
        <Log log={log} />
      </div>

      {players.map((player, index) => (
        <Player
          onPlay={(name, row) => {
            dispatch({ type: "PLAY", payload: { row, name } });
          }}
          key={player.name}
          canPlay={
            gameState === "playing" &&
            index === currentPlayer &&
            player.id === socket
          }
          {...player}
        />
      ))}
    </div>
  );
}
