import React, { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const ChessClock = ({ timeControl, activePlayer, onTimeUp }) => {
  const [initialMinutes, incrementSeconds] = timeControl.split("+").map(Number);
  const initialTime = initialMinutes * 60;

  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [blackTime, setBlackTime] = useState(initialTime);

  const prevActivePlayer = usePrevious(activePlayer);

  useEffect(() => {
    if (prevActivePlayer) {
      if (prevActivePlayer === "white") {
        setWhiteTime((prev) => prev + incrementSeconds);
      } else if (prevActivePlayer === "black") {
        setBlackTime((prev) => prev + incrementSeconds);
      }
    }
  }, [activePlayer, incrementSeconds, prevActivePlayer]);

  useEffect(() => {
    let timerId;
    if (activePlayer === "white") {
      timerId = setInterval(() => {
        setWhiteTime((time) => {
          if (time <= 1) {
            clearInterval(timerId);
            if (onTimeUp) onTimeUp("white");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (activePlayer === "black") {
      timerId = setInterval(() => {
        setBlackTime((time) => {
          if (time <= 1) {
            clearInterval(timerId);
            if (onTimeUp) onTimeUp("black");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [activePlayer, onTimeUp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="chess-clock">
      <div
        className={`clock white ${activePlayer === "white" ? "active" : ""}`}>
        <h3>White</h3>
        <p>{formatTime(whiteTime)}</p>
      </div>
      <div
        className={`clock black ${activePlayer === "black" ? "active" : ""}`}>
        <h3>Black</h3>
        <p>{formatTime(blackTime)}</p>
      </div>
    </div>
  );
};

export default ChessClock;
