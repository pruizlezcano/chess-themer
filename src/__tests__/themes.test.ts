import { themes } from '../themes';
import { describe, expect, it } from 'vitest';
import fs from 'fs';

const THEMES_PATH = './public/chess-themer';

describe('Print directory', () => {
  it('Print directory', () => {
    const pieces = fs.readdirSync(`${THEMES_PATH}/pieces/`, {
      withFileTypes: true,
    });
    console.log(pieces);
    const tree = fs.readdirSync(`${THEMES_PATH}/pieces/neo`, {
      withFileTypes: true,
    });
    console.log(tree);
  });
});

describe('Board themes', () => {
  for (const boardTheme of themes.boards) {
    it(`Board theme '${boardTheme.name}' should exists in folder`, () => {
      const file = fs.existsSync(
        `${THEMES_PATH}/boards/${boardTheme.name}/200.png`,
      );
      expect(file).toBeTruthy();
    });
  }
});

describe('Piece themes', () => {
  for (const pieceTheme of themes.pieces) {
    describe(`Theme: ${pieceTheme.name}`, () => {
      const pieces = [
        'bb',
        'bk',
        'bn',
        'bp',
        'bq',
        'br',
        'wb',
        'wk',
        'wn',
        'wp',
        'wq',
        'wr',
      ];
      for (const piece of pieces) {
        it(`Piece '${piece}' should exist in the folder for theme '${pieceTheme.name}'`, () => {
          const file = fs.existsSync(
            `${THEMES_PATH}/pieces/${pieceTheme.name}/${piece}.png`,
          );
          expect(file).toBeTruthy();
        });
      }
    });
  }
});
