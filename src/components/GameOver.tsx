import styled from '@emotion/styled';
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
    <GameOverContainer showOverlay={showOverlay}>
      <GameOverMessage>Game Over!</GameOverMessage>
      <StyledButton
        showOverlay={showOverlay}
        color="brown"
        onClick={onRestart}
        name="Restart"
      />
    </GameOverContainer>
  );
};

// Styled Components
const GameOverContainer = styled.div<{ showOverlay: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(238, 228, 218, 0.73);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  text-align: center;

  opacity: ${({ showOverlay }) => (showOverlay ? 1 : 0)};
  transition: opacity 0.5s ease;

  div,
  button {
    opacity: ${({ showOverlay }) => (showOverlay ? 1 : 0)};
  }
`;

const GameOverMessage = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  color: #776e65;
  opacity: 0;
  transition: opacity 0.7s ease 0.3s;
`;

const StyledButton = styled(Button)<{ showOverlay: boolean }>`
  opacity: ${({ showOverlay }) => (showOverlay ? 1 : 0)};
  transition: opacity 0.7s ease 0.5s;

  &:hover {
    background-color: #776e65;
  }
`;
