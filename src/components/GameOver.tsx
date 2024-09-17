import '../styles/GameOver.scss';

import { useEffect, useState } from 'react';

import { Button } from './Button';

type GameOverProps = {
  show: boolean;
  onRestart: () => void;
};

export const GameOver = ({ show, onRestart }: GameOverProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShowOverlay(true);
      }, 100);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className={`game-over ${showOverlay ? 'show' : ''}`}>
      <div className="game-over-message">Game Over!</div>
      <Button
        className="game-over-button"
        color="brown"
        onClick={onRestart}
        name="Restart"
      />
    </div>
  );
};
