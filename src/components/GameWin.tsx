import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Button } from './Button';

type GameWinProps = {
  show: boolean;
  onRestart: () => void;
};

const popIn = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const GameWinWrapper = styled.div<{ showOverlay: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: ${({ showOverlay }) => (showOverlay ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 10;
`;

const Message = styled.div`
  font-size: 2.5em;
  color: gold;
  animation: ${popIn} 0.5s ease-in-out;
`;

const RestartButton = styled(Button)`
  margin-top: 20px;
  opacity: 0;
  transition: opacity 1s ease 0.5s;
  font-size: 1.2em;

  ${({ showOverlay }: { showOverlay: boolean }) =>
    showOverlay &&
    css`
      opacity: 1;
    `}
`;

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
    <GameWinWrapper showOverlay={showOverlay}>
      <Message>You Win!</Message>
      <RestartButton
        showOverlay={showOverlay}
        color="yellow"
        onClick={onRestart}
        name="Restart"
      />
    </GameWinWrapper>
  );
};
