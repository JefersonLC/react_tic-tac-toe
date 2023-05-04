import '../styles/Modal.css'

export default function Modal({ winner, reset }) {
  if (winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó:';

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
            {winner && <span>{winner}</span>}
        </header>

        <footer>
          <button onClick={reset}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
