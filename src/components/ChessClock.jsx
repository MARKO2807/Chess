import React, { useState, useEffect, useRef } from "react";

// Custom hook to track the previous value of a prop or state
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const ChessClock = ({ timeControl, activePlayer, onTimeUp }) => {
  // Parse timeControl string: e.g., "10+5" gives initialMinutes = 10, incrementSeconds = 5
  const [initialMinutes, incrementSeconds] = timeControl.split("+").map(Number);
  const initialTime = initialMinutes * 60; // Convert minutes to seconds

  // State for each player's remaining time
  const [whiteTime, setWhiteTime] = useState(initialTime);
  const [blackTime, setBlackTime] = useState(initialTime);

  // Track previous active player so we know who just finished their move
  const prevActivePlayer = usePrevious(activePlayer);

  // When the activePlayer changes, add the increment to the player who just moved
  useEffect(() => {
    if (prevActivePlayer) {
      if (prevActivePlayer === "white") {
        setWhiteTime((prev) => prev + incrementSeconds);
      } else if (prevActivePlayer === "black") {
        setBlackTime((prev) => prev + incrementSeconds);
      }
    }
    // We intentionally want to run this effect whenever activePlayer changes.
  }, [activePlayer, incrementSeconds, prevActivePlayer]);

  // Timer effect: run only for the active player's clock
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

  // Helper to format time (mm:ss)
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
