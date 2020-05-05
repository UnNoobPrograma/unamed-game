import { connectPlayer, playerTurn } from "../utils/socket";

const initialTokens = 10;

export const initialState = {
  socket: null,
  players: [],
  rows: [
    { max: 1, tokens: 0 },
    { max: 2, tokens: 0 },
    { max: 3, tokens: 0 },
    { max: 4, tokens: 0 },
    { max: 5, tokens: 0 },
  ],
  gameState: "playing",
  currentPlayer: 0,
  log: [{ type: "green", text: "Ready to play!" }],
};

function updateLog(state, message) {
  state.log = [message, ...state.log];
}

export function reducer(state, { type, payload }) {
  console.info(type, payload);
  switch (type) {
    case "CONNECTED": {
      return {
        ...state,
        socket: payload,
      };
    }
    case "START": {
      const player = {
        name: payload.name,
        tokens: initialTokens,
        id: state.socket,
      };
      const newState = {
        ...state,
        players: [...state.players, player],
      };

      connectPlayer(player);

      return {
        ...newState,
      };
    }
    case "NEW_PLAYER": {
      return {
        ...state,
        players: [...state.players, { ...payload, tokens: initialTokens }],
      };
    }
    case "PLAY": {
      const newState = { ...state, gameState: "playing" };
      const { players, currentPlayer, rows } = newState;
      const { name, row } = payload;

      updateLog(newState, { type: "green", text: `${name} played ${row}!` });

      let newTurn = currentPlayer + 1;

      if (newTurn > players.length - 1) {
        newTurn = 0;
      }

      const newRows = [...rows];
      const changeRow = newRows[row - 1];

      changeRow.tokens += 1;

      const whoPlayed = players.find(
        ({ name: playerName }) => name === playerName
      );

      if (changeRow.tokens > changeRow.max) {
        whoPlayed.tokens += changeRow.max;

        updateLog(newState, {
          type: "red",
          text: `${name} took ${changeRow.max} tokens`,
        });

        changeRow.tokens = 0;
      } else {
        whoPlayed.tokens -= 1;

        if (whoPlayed.tokens === 0) {
          newState.gameState = "end";

          updateLog(newState, {
            type: "yellow",
            text: `${name} won!`,
          });
        }
      }

      whoPlayed.lastRow = row;

      const result = {
        ...newState,
        rows: newRows,
        currentPlayer: newTurn,
      };

      playerTurn({
        rows: result.rows,
        gameState: result.gameState,
        log: result.log,
        players: result.players,
        currentPlayer: result.currentPlayer,
      });

      return result;
    }
    case "SYNC": {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
}
