import { useState } from 'react';
import Square from './components/Square';
import './styles/App.css';
import Modal from './components/Modal';

const TURNS = {
  FIRST_PLAYER: 'x',
  SECOND_PLAYER: 'o',
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.FIRST_PLAYER);
  const [winner, setWinner] = useState(null);

  /**
   * Verifica si hay un ganador.Si hay ganador lo retorna
   * y si no retorna null
   * @param {[]} boardToCheck Tablero
   * @returns {string | null}
   */
  function checkWinner(boardToCheck) {
    for (let combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
        return boardToCheck[a];
    }
    return null;
  }

  /**
   * Cambia el estado de la tabla cada vez que se
   * marca una casilla
   * @param {number} index Índice de la casilla marcada
   * @returns {void}
   */
  function changeBoard(index) {
    // Si ya hay un elemento en la casilla o si ya hay
    // un ganador no se hace nada
    if (board[index] || winner) return;

    // No mutar el arreglo original
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Se cambia al turno del siguiente jugador
    const newTurn =
      turn === TURNS.FIRST_PLAYER ? TURNS.SECOND_PLAYER : TURNS.FIRST_PLAYER;
    setTurn(newTurn);

    // Se verifica si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) setWinner(newWinner);
    else if (checkEndGame(newBoard)) setWinner(false);
  }

  /**
   * Verifica si hay un empate
   * @param {[]} boardToCheck
   * @returns {boolean}
   */
  function checkEndGame(boardToCheck) {
    return boardToCheck.every((square) => square !== null);
  }

  /**
   * Resetea el juego
   */
  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.FIRST_PLAYER);
    setWinner(null);
  }

  return (
    <main className='app'>
      <h1 className='title'>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <div className='board'>
        {board.map((square, index) => (
          <Square key={index} index={index} changeBoard={changeBoard}>
            {square}
          </Square>
        ))}
      </div>
      <div className='turn'>
        <Square isSelected={turn === TURNS.FIRST_PLAYER}>
          {TURNS.FIRST_PLAYER}
        </Square>
        <Square isSelected={turn === TURNS.SECOND_PLAYER}>
          {TURNS.SECOND_PLAYER}
        </Square>
      </div>

      <Modal winner={winner} reset={resetGame} />
    </main>
  );
}
