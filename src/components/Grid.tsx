// src/components/Grid.tsx
import '../styles/Grid.scss';

import type { Map2048 } from '../utils/game';
import { Tile } from './Tile.tsx';

type GridProps = {
  grid: Map2048;
};

export const Grid = ({ grid }: GridProps) => {
  return (
    <div className="grid">
      {grid.flat().map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </div>
  );
};
