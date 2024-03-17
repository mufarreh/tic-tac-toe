export default function Log({ turns, winner }) {
  return (
    <ol id="log">
      <li>{winner ? <p>{winner} won</p> : undefined}</li>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.column}`}>
          {turn.player} selected {turn.square.row},{turn.square.column}
        </li>
      ))}
    </ol>
  );
}
