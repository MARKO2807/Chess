import React, { useEffect } from "react";
import { Howl } from "howler";
import moveSoundFile from "../assets/audio/move.mp3";
import captureSoundFile from "../assets/audio/capture.mp3";
import castleSoundFile from "../assets/audio/castle.mp3";
import gameOverSoundFile from "../assets/audio/game-end.mp3";
import checkSoundFile from "../assets/audio/check.mp3";
import promoteSoundFile from "../assets/audio/promote.mp3";
import illegalMoveSoundFile from "../assets/audio/illegal.mp3";
import gameStartSoundFile from "../assets/audio/game-start.mp3";

const SoundEffects = ({ move, game, illegalMove }) => {
  // Play the game start sound when the component mounts.
  useEffect(() => {
    const gameStartSound = new Howl({ src: [gameStartSoundFile] });
    gameStartSound.play();
  }, []);

  // Separate effect to play the illegal move sound.
  useEffect(() => {
    if (illegalMove) {
      const illegalMoveSound = new Howl({ src: [illegalMoveSoundFile] });
      illegalMoveSound.play();
    }
  }, [illegalMove]);

  // Effect for handling legal move sound effects.
  useEffect(() => {
    // If there is no move (i.e. move is null), don't play any sound.
    if (!move) return;

    // Initialize sound objects.
    const moveSound = new Howl({ src: [moveSoundFile] });
    const captureSound = new Howl({ src: [captureSoundFile] });
    const castleSound = new Howl({ src: [castleSoundFile] });
    const checkSound = new Howl({ src: [checkSoundFile] });
    const promoteSound = new Howl({ src: [promoteSoundFile] });
    const gameOverSound = new Howl({ src: [gameOverSoundFile] });
    // If you plan on using these sounds later, initialize them here as needed.
    // const notificationSound = new Howl({ src: [notificationSoundFile] });
    // const tenSecondWarningSound = new Howl({ src: [tenSecondWarningSoundFile] });

    // Play sounds based on move flags:
    if (game.isGameOver()) {
      gameOverSound.play();
    }
    if (game.inCheck()) {
      checkSound.play();
    } else if (move.flags.includes("c")) {
      captureSound.play();
    } else if (move.flags.includes("k") || move.flags.includes("q")) {
      castleSound.play();
    } else if (move.flags.includes("p")) {
      promoteSound.play();
    } else if (move.flags.includes("n") || move.flags.includes("b")) {
      moveSound.play();
    }
  }, [move, game]);

  return null;
};

export default SoundEffects;
