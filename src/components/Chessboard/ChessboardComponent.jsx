import React, { useState, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const boardRef = useRef();

  const onDrop = (sourceSquare, targetSquare) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
    });

    if (move === null) return false; // Illegal move
    setGame(new Chess(game.fen())); // Update game state
    return true;
  };

  return (
    <div>
      <Chessboard
        id="CustomChessboard"
        boardWidth={500}
        position={game.fen()}
        arePremovesAllowed={true}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "5px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#769656" }}
        customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
        customDropSquareStyle={{
          boxShadow: "inset 0 0 1px 4px rgba(255, 170, 0, 0.5)",
        }}
        ref={boardRef}
      />
    </div>
  );
};

export default ChessboardComponent;
