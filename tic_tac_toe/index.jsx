const { useState } = React;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(squares) {
  for (let i = 0; i < winPattern.length; i++) {
    const [a, b, c] = winPattern[i];

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  function handleClick(index) {
    // Don't change an already used square
    if (squares[index] !== null) {
      return;
    }

    // Don't change anything after winner
    if (winner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[index] = turn;

    setSquares(nextSquares);

    // Change X -> O or O -> X
    setTurn(turn === "X" ? "O" : "X");
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setTurn("X");
  }

  const gameWinner = winner(squares);

  const isDraw =
    !gameWinner && squares.every((square) => square !== null);

  return (
    <div>
      <h1>Tic Tac Toe</h1>

      {gameWinner && <h2>Winner: {gameWinner}</h2>}

      {isDraw && <h2>Draw</h2>}

      <div className="board">
        {squares.map((value, index) => (
          <button
            className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button id="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}