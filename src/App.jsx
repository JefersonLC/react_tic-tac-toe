import { useState } from 'react';
import './styles/App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  return (
    <main className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {board.map((square, index) => (
          <div key={index} className="square">
            XD
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
