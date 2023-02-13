import { WINNER_COMBOS } from '../constants.js';

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // x u o
    }
  }
  return null;
};

export const checkEndGame = (boardToCheck) => {
  boardToCheck.every((square) => square !== null);
};
