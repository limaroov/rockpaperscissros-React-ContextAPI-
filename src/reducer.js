// Initializing a staring state of which the game will start with.
export const initialState = {
  userplay: null,
  computerplay: null,
  winner: null,
  game: { user: null, computer: null },
};

// This is the logic of the rock-paper-scissors game, and how to decide the winner.
const decideWinner = {
  rock: {
    rock: 0.5,
    paper: 0,
    scissors: 1,
  },
  paper: {
    rock: 1,
    paper: 0.5,
    scissors: 0,
  },
  scissors: {
    rock: 0,
    paper: 1,
    scissors: 0.5,
  },
};

// This is the reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_PLAY":
      return {
        ...state,
        userplay: action.payload.play,
        game: { ...state.game, user: action.payload.play },
      };
    case "COMPUTER_PLAY":
      return {
        ...state,
        computerplay: action.payload.play,
        game: { ...state.game, computer: action.payload.play },
      };

    case "GET_RESULT":
      let winner = decideWinner[state.userplay][state.computerplay];
      if (winner === 1) {
        return { ...state, winner: "YOU" };
      }
      if (winner === 0) {
        return { ...state, winner: "COMPUTER" };
      }
      if (winner === 0.5) {
        return { ...state, winner: "DRAW" };
      }
      return { ...state, winner: null };
    case "RESET_GAME":
      return {
        userplay: null,
        computerplay: null,
        winner: null,
        game: { user: null, computer: null },
      };
    default:
      return state;
  }
};

export default reducer;
