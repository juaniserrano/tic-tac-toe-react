import './App.css';
import { useState } from 'react';
import conffeti from 'canvas-confetti';

import { Square } from './components/Square.jsx';
import { Turns } from './constants.js';
import { checkWinner, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board');
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn');
    return turnFromStorage ? turnFromStorage : Turns.X;
  });
  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es que hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    setWinner(null);

    //Limpiamos el local storage
    localStorage.removeItem('board');
    localStorage.removeItem('turn');
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);
    //Guardado de partida en el local storage:
    localStorage.setItem('board', JSON.stringify(newBoard));
    localStorage.setItem('turn', newTurn);
    //Revisamos si tenemos un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner); //La actualizacion del estado es asincrona, para solucionar esto se puede usar un callback en caso de querer mostrar un mensaje de felicitaciones al ganador mediante un alert
      conffeti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar el juego 🔁</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === Turns.X}>{Turns.X}</Square>
        <Square isSelected={turn === Turns.O}>{Turns.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
