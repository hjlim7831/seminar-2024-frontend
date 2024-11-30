import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import useSessionStorage from '../hooks/useSessionStorage.ts';
import {
  addRandomTile,
  type Direction,
  initializeHistory,
  keyToDirection,
  type Map2048,
  moveMapIn2048Rule,
} from '../utils/game.ts';
import { type History } from '../utils/game.ts';
import { Button } from './Button.tsx';
import { GameOver } from './GameOver.tsx';
import { GameWin } from './GameWin.tsx';
import { Grid } from './Grid.tsx';
import { Score } from './Score.tsx';

const HISTOY_KEY = 'gameHistory';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #faf8ef;
  min-height: 100vh;
`;

const GridContainer = styled.div`
  position: relative;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 450px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Game = () => {
  const [history, setHistory] = useSessionStorage<History[]>(HISTOY_KEY, [
    initializeHistory(),
  ]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWin, setGameWin] = useState<boolean>(false);
  const currentState = history[history.length - 1];
  const { grid, score } = currentState ?? initializeHistory();

  const resetGame = useCallback(() => {
    setHistory([initializeHistory()]);
    setGameOver(false);
    setGameWin(false);
    setHistory([]);
  }, [setHistory]);

  const handleMove = useCallback(
    (prevGrid: Map2048, direction: Direction): void => {
      const {
        result,
        isMoved,
        score: newScore,
      } = moveMapIn2048Rule(prevGrid, direction);

      if (!isMoved) return;

      const newGrid = addRandomTile(result);

      setHistory((prevHistory) => [
        ...prevHistory,
        { grid: newGrid, score: score + newScore },
      ]);

      if (newGrid.some((row) => row.includes(128))) {
        setGameWin(true);
        return;
      }

      const allDirection: Direction[] = ['up', 'down', 'left', 'right'];

      const canMoveInAnyDirection = allDirection.some((dir) => {
        const { isMoved: canMove } = moveMapIn2048Rule(newGrid, dir);
        return canMove;
      });
      if (!canMoveInAnyDirection) {
        setGameOver(true);
        return;
      }
    },
    [score, setHistory],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameWin || gameOver) return;
      const direction = keyToDirection[event.key];
      if (direction === undefined) return;

      handleMove(grid, direction);
    },
    [gameOver, gameWin, grid, handleMove],
  );

  const handleUndo = () => {
    if (history.length >= 1) {
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <GameContainer>
      <GameHeader>
        <Score score={score} />
        <ButtonContainer>
          <Button color="brown" name="Undo" onClick={handleUndo} />
          <Button color="orange" name="Restart" onClick={resetGame} />
        </ButtonContainer>
      </GameHeader>
      <GridContainer>
        <Grid grid={grid} />
        {gameOver && <GameOver show={gameOver} onRestart={resetGame} />}
        {gameWin && <GameWin show={gameWin} onRestart={resetGame} />}
      </GridContainer>
    </GameContainer>
  );
};
