import '../styles/GameWin.scss';

import { useEffect, useState } from 'react';

import { Button } from './Button';

type GameWinProps = {
  show: boolean;
  onRestart: () => void;
};

export const GameWin = ({ show, onRestart }: GameWinProps) => {
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
    <div className={`game-win ${showOverlay ? 'show' : ''}`}>
      <div className="game-win-message">You Win!</div>
      <Button
        className="game-win-button"
        color="yellow"
        onClick={onRestart}
        name="Restart"
      />
    </div>
  );
};
