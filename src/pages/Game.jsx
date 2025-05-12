import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import MoveHistory from "../components/MoveHistory";
import Buttons from "../components/Buttons";
import SoundEffects from "../components/SoundEffects";
import Chat from "../components/Chat";
import "../styles/chessboard.css";

const Game = () => {
  const [game] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState(game.history({ verbose: true }));
  const [status, setStatus] = useState("In Progress");
  const [lastMove, setLastMove] = useState(null);
  const [illegalMove, setIllegalMove] = useState(false);
  const [suggestedMove, setSuggestedMove] = useState(null);
  const [evalScore, setEvalScore] = useState(null);
  const [searchDepth, setSearchDepth] = useState(18);
  const engineRef = useRef(null);

  const selectedTimeControl = "5+0";
  const [initialMinutes, incrementSeconds] = selectedTimeControl
    .split("+")
    .map(Number);
  const initialTime = initialMinutes * 60;
  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [blackTime, setBlackTime] = useState(initialTime);

  // Timer effect
  useEffect(() => {
    if (status !== "In Progress") return;
    const timerId = setInterval(() => {
      if (game.turn() === "w") setWhiteTime((prev) => Math.max(prev - 1, 0));
      else setBlackTime((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [status, game]);

  // End game on timeout
  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      setStatus("Time Over");
    }
  }, [whiteTime, blackTime]);

  // Initialize engine
  useEffect(() => {
    const engine = new Worker("/stockfish.js");
    engineRef.current = engine;

    engine.onmessage = ({ data }) => {
      const parts = data.split(" ");

      if (data.startsWith("uciok")) {
        engine.postMessage("isready");
        return;
      }
      if (data.startsWith("readyok")) {
        postPositionAndGo();
        return;
      }

      if (data.startsWith("info")) {
        const dIdx = parts.indexOf("depth");
        const depth = dIdx > -1 ? parseInt(parts[dIdx + 1], 10) : null;
        if (depth !== searchDepth) return;

        const sIdx = parts.indexOf("score");
        if (sIdx > -1 && parts.length > sIdx + 2) {
          const type = parts[sIdx + 1];
          const value = parseInt(parts[sIdx + 2], 10);
          if (type === "cp") setEvalScore((value / 100).toFixed(2));
          else if (type === "mate") setEvalScore("#" + value);
        }
        return;
      }

      if (data.startsWith("bestmove")) {
        const move = data.split(" ")[1];
        if (move && move !== "(none)")
          setSuggestedMove(formatSuggestedMove(move));
      }
    };

    engine.postMessage("uci");
    return () => engine.terminate();
  }, [searchDepth]);

  // Send position & go command
  const postPositionAndGo = () => {
    const engine = engineRef.current;
    if (!engine) return;
    setEvalScore(null);
    setSuggestedMove(null);
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage(`go depth ${searchDepth}`);
  };

  // Re-query engine on FEN change
  useEffect(postPositionAndGo, [fen]);

  const formatSuggestedMove = (move) => {
    const from = move.slice(0, 2);
    const to = move.slice(2, 4);
    const promotion = move.length > 4 ? move[4] : null;
    const piece = game.get(from);
    const type = piece ? piece.type.toUpperCase() : "P";
    const names = {
      P: "Pawn",
      N: "Knight",
      B: "Bishop",
      R: "Rook",
      Q: "Queen",
      K: "King",
    };
    let text = `${names[type]} from ${from} to ${to}`;
    if (promotion) text += ` promoting to ${names[promotion.toUpperCase()]}`;
    return text;
  };

  const handleMove = (source, target) => {
    if (status !== "In Progress") return false;
    const moves = game.moves({ square: source, verbose: true });
    const legal = moves.some((m) => m.to === target);
    if (!legal) {
      setIllegalMove(true);
      setTimeout(() => setIllegalMove(false), 300);
      return false;
    }
    const move = game.move({ from: source, to: target, promotion: "q" });
    if (move) {
      setFen(game.fen());
      setHistory(game.history({ verbose: true }));
      setLastMove(move);
      if (game.isGameOver()) setStatus("Game Over");
      return true;
    }
    return false;
  };

  const handleResign = () => status === "In Progress" && setStatus("Resigned");
  const handleDraw = () =>
    status === "In Progress" && setStatus("Draw Offered");

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="game-container">
      <div className="left-column">
        <div className="timer black-timer">{formatTime(blackTime)}</div>
        <Chessboard
          position={fen}
          boardWidth={400}
          onPieceDrop={handleMove}
          boardOrientation="white"
          customDarkSquareStyle={{ backgroundColor: "#769656" }}
          customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
          animationDuration={300}
          customDropSquareStyle={{ backgroundColor: "rgba(255, 170, 0, 0.75)" }}
        />
        <div className="timer white-timer">{formatTime(whiteTime)}</div>
      </div>

      <div className="right-column">
        <MoveHistory moves={history} />
        <Buttons
          onResign={handleResign}
          onDraw={handleDraw}
          disabled={status !== "In Progress"}
        />
        <Chat activePlayer={game.turn() === "w" ? "white" : "black"} />
        <div className="status">Status: {status}</div>
        <div className="evaluation">
          {evalScore !== null ? `Eval: ${evalScore}` : <em>Evaluating…</em>}
        </div>
        <div className="suggestion">
          {suggestedMove === null ? (
            <em>Thinking…</em>
          ) : (
            <span>Suggestion: {suggestedMove}</span>
          )}
        </div>
      </div>

      <SoundEffects move={lastMove} game={game} illegalMove={illegalMove} />
    </div>
  );
};

export default Game;
