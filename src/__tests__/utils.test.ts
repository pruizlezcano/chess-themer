import { describe, expect, it } from 'vitest';
import { getBoardURL, getPieceURL } from '../utils';

const HOST = 'https://pruizlezcano.github.io/chess-themer';

describe('Get urls', () => {
  it('should return the correct board url', () => {
    expect(getBoardURL('green')).toBe(`${HOST}/boards/green/200.png`);
  });

  it('should return the correct piece url', () => {
    expect(getPieceURL('neo', 'bk')).toBe(`${HOST}/pieces/neo/bk.png`);
  });
});
