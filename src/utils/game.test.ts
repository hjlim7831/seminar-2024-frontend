import { describe, expect, it } from 'vitest';

import { type Map2048, moveMapIn2048Rule } from './game';

describe('moveMapIn2048Rule', () => {
  const createEmptyGrid = (): Map2048 =>
    Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => null));

  it('map이 N X M 형태가 아닐 때 에러 발생', () => {
    const invalidMap = [[null], [2, 4]];
    expect(() =>
      moveMapIn2048Rule(invalidMap as unknown as Map2048, 'left'),
    ).toThrowError('Map is not N by M');
  });

  it('타일이 왼쪽으로 이동했을 때 잘 합쳐지는지', () => {
    const map: Map2048 = createEmptyGrid();
    if (map[0] !== undefined && map[0][0] !== undefined) map[0][0] = 2;
    if (map[0] !== undefined && map[0][1] !== undefined) map[0][1] = 2;

    const { result, isMoved, score } = moveMapIn2048Rule(map, 'left');
    expect(result[0]?.[0]).toBe(4);
    expect(result[0]?.[1]).toBeNull();
    expect(isMoved).toBe(true);
    expect(score).toBe(2);
  });
});
