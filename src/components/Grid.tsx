import styled from '@emotion/styled';

import type { Map2048 } from '../utils/game';
import { Tile } from './Tile.tsx';

type GridProps = {
  grid: Map2048;
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  gap: 10px;
  background-color: #bbada0;
  padding: 10px;
  border-radius: 10px;
`;

export const Grid = ({ grid }: GridProps) => {
  return (
    <GridWrapper>
      {grid.flat().map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </GridWrapper>
  );
};
