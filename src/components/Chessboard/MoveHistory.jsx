import React from "react";

const MoveHistory = ({ moveHistory, pieceSymbols }) => {
  return (
    <div className="move-history">
      <table>
        <thead>
          <tr>
            <th>Move</th>
            <th>White</th>
            <th>Black</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map(
            (_, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>
                  {moveHistory[index * 2]
                    ? `${pieceSymbols[moveHistory[index * 2].piece]} ${
                        moveHistory[index * 2].san
                      }`
                    : ""}
                </td>
                <td>
                  {moveHistory[index * 2 + 1]
                    ? `${pieceSymbols[moveHistory[index * 2 + 1].piece]} ${
                        moveHistory[index * 2 + 1].san
                      }`
                    : ""}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MoveHistory;
