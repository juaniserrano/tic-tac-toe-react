import { Square } from './Square.jsx';

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? 'Empate' : 'Gano el jugador: '}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={resetGame}>Jugar de nuevo 🔁</button>
        </footer>
      </div>
    </section>
  );
}
