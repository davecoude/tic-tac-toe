import { WINNER_COMBOS } from "../board";

// funcion para saber el ganador
export const checkWinner = (boardToChek) => {
  for (const combo of WINNER_COMBOS) {
    // desestructuracion de combos en a,b,c
    const [a, b, c] = combo;
    // comparacion
    if (
      boardToChek[a] &&
      boardToChek[a] === boardToChek[b] &&
      boardToChek[a] === boardToChek[c]
    ) {
      return boardToChek[a];
    }
  }
  return null;
};

// checar el empate del juego
export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };
