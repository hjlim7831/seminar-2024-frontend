// src/components/GameOver.tsx
import '../styles/GameOver.scss';

import { useEffect, useState } from 'react';

type GameOverProps = {
  gameOver: boolean;
  onRestart: () => void;
};

export const GameOver = ({ gameOver, onRestart }: GameOverProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (gameOver) {
      setTimeout(() => {
        setShowOverlay(true);
      }, 100);
    }
  }, [gameOver]);

  if (!gameOver) return null;

  return (
    <div className={`game-over ${showOverlay ? 'show' : ''}`}>
      <div className="game-over-message">Game Over!</div>
      <button className="game-over-button" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};
