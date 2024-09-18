// src/components/Game.tsx
import '../styles/Game.scss';

import { useCallback, useEffect, useState } from 'react';

import {
  addRandomTile,
  type Direction,
  initializeHistory,
  keyToDirection,
  type Map2048,
  moveMapIn2048Rule,
} from '../utils/game.ts';
import { type History } from '../utils/game.ts';
import { GameOver } from './GameOver.tsx';
import { GameWin } from './GameWin.tsx';
import { Grid } from './Grid.tsx';
import { Score } from './Score.tsx';

export const Game = () => {
  const [history, setHistory] = useState<History[]>([initializeHistory()]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWin, setGameWin] = useState<boolean>(false);
  const currentState = history[history.length - 1];
  const { grid, score } = currentState ?? initializeHistory();

  const resetGame = useCallback(() => {
    setHistory([initializeHistory()]);
    setGameOver(false);
    setGameWin(false);
    setHistory([]);
  }, []);

  const handleMove = useCallback(
    (prevGrid: Map2048, direction: Direction): void => {
      const {
        result,
        isMoved,
        score: newScore,
      } = moveMapIn2048Rule(prevGrid, direction);

      // 이동이 발생하지 않은 경우, prevGrid를 그대로 반환
      if (!isMoved) return;

      // 이동이 발생하면
      // 1. 랜덤타일 추가
      const newGrid = addRandomTile(result);

      // 2. 현 상태를 history에 저장
      setHistory((prevHistory) => [
        ...prevHistory,
        { grid: newGrid, score: score + newScore },
      ]);

      // 3. 승리조건 체크
      if (newGrid.some((row) => row.includes(128))) {
        setGameWin(true);
        return;
      }

      // 4. 실패조건 체크
      const allDirection: Direction[] = ['up', 'down', 'left', 'right'];

      const canMoveInAnyDirection = allDirection.some((dir) => {
        const { isMoved: canMove } = moveMapIn2048Rule(newGrid, dir);
        return canMove;
      });
      console.debug('canMoveInAnyDirection: ', canMoveInAnyDirection);
      if (!canMoveInAnyDirection) {
        setGameOver(true);
        return;
      }

      return;
    },
    [score],
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
    if (history.length > 1) {
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
    <div className="game">
      <div className="game-header">
        <Score score={score} />
        <div className="button-container">
          <button className="button undo" onClick={handleUndo}>
            Undo
          </button>
          <button className="button restart" onClick={resetGame}>
            Restart
          </button>
        </div>
      </div>
      <div className="grid-container">
        <Grid grid={grid} />
        {gameOver && <GameOver show={gameOver} onRestart={resetGame} />}
        {gameWin && <GameWin show={gameWin} onRestart={resetGame} />}
      </div>
    </div>
  );
};
