import { useState } from 'react';
import Square from './components/Square';
import './styles/App.css';

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

  function changeBoard(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn =
      turn === TURNS.FIRST_PLAYER ? TURNS.SECOND_PLAYER : TURNS.FIRST_PLAYER;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) setWinner(newWinner);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.FIRST_PLAYER);
    setWinner(null);
  }

  return (
    <main className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <div className="board">
        {board.map((square, index) => (
          <Square key={index} index={index} changeBoard={changeBoard}>
            {square}
          </Square>
        ))}
      </div>
      <div className="turn">
        <Square isSelected={turn === TURNS.FIRST_PLAYER}>
          {TURNS.FIRST_PLAYER}
        </Square>
        <Square isSelected={turn === TURNS.SECOND_PLAYER}>
          {TURNS.SECOND_PLAYER}
        </Square>
      </div>
    </main>
  );
}
