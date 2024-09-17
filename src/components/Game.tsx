// src/components/Game.tsx
import '../styles/Game.scss';

import { useCallback, useEffect, useState } from 'react';

import {
  addRandomTile,
  type Direction,
  initializeGrid,
  keyToDirection,
  type Map2048,
  moveMapIn2048Rule,
} from '../utils/game.ts';
import { GameOver } from './GameOver.tsx';
import { Grid } from './Grid.tsx';
import { Score } from './Score.tsx';

export const Game = () => {
  const [grid, setGrid] = useState<Map2048>(initializeGrid());
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const resetGame = useCallback(() => {
    setGrid(initializeGrid());
    setScore(0);
    setGameOver(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver) return;
      const direction = keyToDirection[event.key];
      if (direction === undefined) return;

      setGrid((prevGrid) => {
        const {
          result,
          isMoved,
          score: newScore,
        } = moveMapIn2048Rule(prevGrid, direction as Direction);
        // 이동이 발생하면 점수 업데이트
        if (isMoved) {
          setScore((prevScore) => prevScore + newScore);
        }

        const canMoveInAnyDirection = ['up', 'down', 'left', 'right'].some(
          (dir) => {
            const { isMoved: canMove } = moveMapIn2048Rule(
              prevGrid,
              dir as Direction,
            );
            return canMove;
          },
        );

        if (!canMoveInAnyDirection) {
          console.debug('게임 오버!');
          setGameOver(true);
        }
        return isMoved ? addRandomTile(result) : prevGrid;
      });
    },
    [gameOver],
  );

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
        <button className="restart-button" onClick={resetGame}>
          Restart
        </button>
      </div>
      <div className="game-container">
        <Grid grid={grid} />
        {gameOver && <GameOver gameOver={gameOver} onRestart={resetGame} />}
      </div>
    </div>
  );
};
