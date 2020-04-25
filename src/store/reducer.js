const initialTokens = 2;

export const initialState = {
  players: [
    {
      name: "Link",
      tokens: initialTokens,
    },
    {
      name: "Aram",
      tokens: initialTokens,
    },
    {
      name: "Zeldo",
      tokens: initialTokens,
    },
    {
      name: "Sumoners Rift",
      tokens: initialTokens,
    },
  ],
  rows: [
    { max: 1, tokens: 0 },
    { max: 2, tokens: 0 },
    { max: 3, tokens: 0 },
    { max: 4, tokens: 0 },
    { max: 5, tokens: 0 },
  ],
  gameState: "playing",
  currentPlayer: 0,
  log: ["Ready to play!"],
};

function updateLog(state, message) {
  state.log = [message, ...state.log];
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case "PLAY": {
      const newState = { ...state, gameState: "playing" };
      const { players, currentPlayer, rows } = newState;
      const { name, row } = payload;

      updateLog(newState, `${name} played ${row}!`);

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

        updateLog(newState, `${name} took ${changeRow.max} tokens`);

        changeRow.tokens = 0;
      } else {
        whoPlayed.tokens -= 1;

        if (whoPlayed.tokens === 0) {
          newState.gameState = "end";

          updateLog(newState, `${name} won!`);
        }
      }

      return {
        ...newState,
        rows: newRows,
        currentPlayer: newTurn,
      };
    }
    default:
      return state;
  }
}
