import React, { useEffect, useRef } from "react";
import gamestartSound from "../../assets/audio/game-start.mp3";
import gameendSound from "../../assets/audio/game-end.mp3";
import captureSound from "../../assets/audio/capture.mp3";
import castlingSound from "../../assets/audio/castle.mp3";
import illegalSound from "../../assets/audio/illegal.mp3";
import checkSound from "../../assets/audio/move-check.mp3";
import normalSound from "../../assets/audio/move-self.mp3";
import promoteSound from "../../assets/audio/promote.mp3";
import tenSecondsWarningSound from "../../assets/audio/tenseconds.mp3";

// Helper: Create and preload an Audio object.
const createAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.load();
  return audio;
};

// Helper: Play a sound immediately (resetting its currentTime).
const playSound = (audio) => {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch((err) => console.error("Sound play failed:", err));
};

const SoundManager = ({ lastMove, whiteTime, blackTime, gameOver }) => {
  // Create audio objects once.
  const audioFilesRef = useRef({
    gamestart: createAudio(gamestartSound),
    gameend: createAudio(gameendSound),
    capture: createAudio(captureSound),
    castling: createAudio(castlingSound),
    illegal: createAudio(illegalSound),
    check: createAudio(checkSound),
    normal: createAudio(normalSound),
    promote: createAudio(promoteSound),
    tenSecondsWarning: createAudio(tenSecondsWarningSound),
  });
  const audioFiles = audioFilesRef.current;

  // Play the game start sound when the component mounts.
  useEffect(() => {
    playSound(audioFiles.gamestart);
  }, []);

  // When the game is over, play the game-end sound.
  useEffect(() => {
    if (gameOver) {
      playSound(audioFiles.gameend);
    }
  }, [gameOver]);

  // Ten-second warning: play the warning sound when either timer reaches 10 seconds.
  const warningPlayed = useRef({ white: false, black: false });
  useEffect(() => {
    if (whiteTime === 10 && !warningPlayed.current.white) {
      playSound(audioFiles.tenSecondsWarning);
      warningPlayed.current.white = true;
    }
    if (blackTime === 10 && !warningPlayed.current.black) {
      playSound(audioFiles.tenSecondsWarning);
      warningPlayed.current.black = true;
    }
    // Reset flags when time goes above 10 seconds.
    if (whiteTime > 10) warningPlayed.current.white = false;
    if (blackTime > 10) warningPlayed.current.black = false;
  }, [whiteTime, blackTime]);

  // Play a sound based on the type of move.
  // We use chess.js's move object flags to decide which sound to play.
  useEffect(() => {
    if (lastMove) {
      const { flags, check } = lastMove;
      if (flags.includes("p")) {
        // Promotion move.
        playSound(audioFiles.promote);
      } else if (flags.includes("k") || flags.includes("q")) {
        // Castling move.
        playSound(audioFiles.castling);
      } else if (flags.includes("c") || flags.includes("e")) {
        // Capture or en passant.
        playSound(audioFiles.capture);
      } else if (check) {
        playSound(audioFiles.check);
      } else {
        // Normal move.
        playSound(audioFiles.normal);
      }
    }
  }, [lastMove]);

  return null;
};

export default SoundManager;
