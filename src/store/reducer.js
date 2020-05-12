import { connectPlayer, playerTurn } from "../utils/socket";

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
        id: state.socket,
      };

      connectPlayer(player);

      return {
        ...state,
      };
    }
    case "PLAY": {
      playerTurn({
        id: state.socket,
        row: payload.row,
      });

      return state;
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
