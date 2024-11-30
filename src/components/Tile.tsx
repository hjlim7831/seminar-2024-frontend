import styled from '@emotion/styled';

import type { Cell } from '../utils/game';

type TileProps = {
  value: Cell;
};

export const Tile = ({ value }: TileProps) => {
  return <StyledTile value={value}>{value !== null ? value : ''}</StyledTile>;
};

const StyledTile = styled.div<{ value: Cell }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  font-weight: bold;
  border-radius: 5px;
  color: ${(props) => getTextColor(props.value)};
  background-color: ${(props) => getBackgroundColor(props.value)};
`;

const getBackgroundColor = (value: Cell) => {
  if (value === null || value === 0) return '#cdc1b4';
  switch (value) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 10684:
    case 32768:
    case 65536:
      return '#edcf72';
    default:
      return '#cdc1b4';
  }
};

const getTextColor = (value: Cell) => {
  if (value === null || value <= 4) return '#776e65';
  return '#f9f6f2';
};
