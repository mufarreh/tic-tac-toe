export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGrid);

  // function handleSelectSquare(rowIndex, columnIndex) {
  //   setGameBoard((prevGrid) => {
  //     const updatedBoard = [...prevGrid].map((innerArray) => [...innerArray]);
  //     console.log(updatedBoard);
  //     updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
  //     onSelectSquare();
  //     return updatedBoard;
  //   });
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li key={columnIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, columnIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
