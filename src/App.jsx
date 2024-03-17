import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGrid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(gameTurns, gameBoard, players) {
  let winner;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameBoard[row][column] = player;
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquare = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquare = gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameturns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  //const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = [...initialGrid.map((innerArray) => [...innerArray])];
  const winner = deriveWinner(gameTurns, gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  function handlePlayer(symbol, name) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  }

  function handleRestart() {
    setGameturns([]);
  }

  function onSelection(rowIndex, columnIndex) {
    //setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameturns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <menu>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            name={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayer}
          ></Player>
          <Player
            isActive={activePlayer === "O"}
            name={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayer}
          ></Player>
        </ol>
        {/* {winner ? <p>You Won {winner}</p> : undefined} */}
        {winner || draw ? (
          <GameOver winner={winner} onRestart={handleRestart}></GameOver>
        ) : undefined}
        <GameBoard onSelectSquare={onSelection} board={gameBoard} />
      </div>
      <Log turns={gameTurns} winner={winner} />
    </menu>
  );
}

export default App;
