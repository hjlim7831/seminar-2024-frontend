import '../styles/GameWin.scss';

import { useEffect, useState } from 'react';

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
      <button className="game-win-button" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};
