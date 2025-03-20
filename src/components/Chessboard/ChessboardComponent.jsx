import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Timer from "./Timer";
import MoveHistory from "./MoveHistory";
import Chat from "../Chat/Chat";
import SoundManager from "./SoundManager";
import "../../styles/chessboard.css";

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("w");

  // Timer state (each player starts with 10 minutes = 600 seconds)
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);

  // Unicode symbols for pieces
  const pieceSymbols = {
    p: "♟",
    n: "♞",
    b: "♝",
    r: "♜",
    q: "♛",
    k: "♚",
    P: "♙",
    N: "♘",
    B: "♗",
    R: "♖",
    Q: "♕",
    K: "♔",
  };

  // Safely update the game state
  const safeGameMutate = (modifier) => {
    const newGame = new Chess(game.fen());
    modifier(newGame);
    setGame(newGame);
  };

  // onDrop handler for piece moves
  const onDrop = (sourceSquare, targetSquare) => {
    let move = null;
    safeGameMutate((newGame) => {
      move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // auto-promote to queen??
      });
      if (move) {
        setCurrentTurn(newGame.turn());
      }
    });
    if (move) {
      setMoveHistory((prev) => [...prev, { ...move }]);
      setLastMove(move);
    }
    return move !== null;
  };

  // Timer logic: decrement active player's time every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (game.isGameOver()) {
        clearInterval(timer);
        return;
      }
      if (currentTurn === "w") {
        setWhiteTime((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setBlackTime((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentTurn, game]);

  return (
    <div className="container">
      {/* Left Column: Chessboard and Timers */}
      <div className="chessboard-section">
        <Timer
          whiteTime={whiteTime}
          blackTime={blackTime}
          currentTurn={currentTurn}
        />
        <Chessboard
          id="CustomChessboard"
          boardWidth={600}
          position={game.fen()}
          arePremovesAllowed={true}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "5px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
            margin: "0 auto",
          }}
          customDarkSquareStyle={{ backgroundColor: "#769656" }}
          customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
          customDropSquareStyle={{
            boxShadow: "inset 0 0 1px 4px rgba(255, 170, 0, 0.5)",
          }}
        />
      </div>

      {/* Right Column: Move History and Chat */}
      <div className="move-history-section">
        <MoveHistory moveHistory={moveHistory} pieceSymbols={pieceSymbols} />
        <Chat />
      </div>

      {/* Sound Manager */}
      <SoundManager
        lastMove={lastMove}
        whiteTime={whiteTime}
        blackTime={blackTime}
        gameOver={game.isGameOver()}
      />
    </div>
  );
};

export default ChessboardComponent;
