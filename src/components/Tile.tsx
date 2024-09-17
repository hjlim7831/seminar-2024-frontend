// src/components/Tile.tsx
import '../styles/Tile.scss';

import type { Cell } from '../utils/game';

type TileProps = {
  value: Cell;
};

export const Tile = ({ value }: TileProps) => {
  const tileClass = value === null ? 'empty' : `tile-${value}`;
  return <div className={`tile ${tileClass}`}>{value !== 0 ? value : ''}</div>;
};
