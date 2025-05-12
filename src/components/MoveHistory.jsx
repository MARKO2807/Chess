import React from "react";

const MoveHistory = ({ moves }) => {
  // Each pair contains a white move and a black move
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      moveNumber: i / 2 + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }

  return (
    <div className="move-history">
      <table className="move-history-table">
        <thead>
          <tr>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {movePairs.map((pair) => (
            <tr key={pair.moveNumber}>
              <td>{pair.moveNumber}.</td>
              <td>{pair.white ? pair.white.san : ""}</td>
              <td>{pair.black ? pair.black.san : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoveHistory;
