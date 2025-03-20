import React from "react";

const Timer = ({ whiteTime, blackTime, currentTurn }) => {
  // Helper to format seconds into mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      {/* Black's timer above the board */}
      <div className="timer black-timer">Black: {formatTime(blackTime)}</div>
      {/* White's timer below the board */}
      <div className="timer white-timer">White: {formatTime(whiteTime)}</div>
    </>
  );
};

export default Timer;
