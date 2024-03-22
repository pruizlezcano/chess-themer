import Site from './Site';
import { getBoardURL, getPieceURL } from '../utils';

/** Class for chess.com */
class ChessCom extends Site {
  constructor() {
    super();
  }

  changeBoard(theme: string): void {
    this.boardTheme = theme;
    const board: HTMLElement | null = document.querySelector('wc-chess-board');
    if (board != null)
      board.style.backgroundImage = `url('${getBoardURL(theme)}')`;
    const root: HTMLElement = document.querySelector(':root')!;
    root.style.setProperty(
      '--theme-board-style-image',
      `url('${getBoardURL(theme)}')`,
    );
  }

  changePieces(theme: string): void {
    this.piecesTheme = theme;
    const pieces: NodeListOf<HTMLElement> = document.querySelectorAll('.piece');
    const pieceNames = [
      'wp',
      'wr',
      'wn',
      'wb',
      'wq',
      'wk',
      'bp',
      'br',
      'bn',
      'bb',
      'bq',
      'bk',
    ];
    const root: HTMLElement = document.querySelector(':root')!;
    for (const piece of pieceNames) {
      root.style.setProperty(
        `--theme-piece-set-${piece}`,
        `url('${getPieceURL(theme, piece)}')`,
      );
    }
    for (const piece of pieces) {
      const classList = piece.classList;
      const name = pieceNames.find((name) => classList.contains(name));
      if (name != null) {
        piece.style.backgroundImage = `var(--theme-piece-set-${name})`;
      }
    }
  }
}

export default ChessCom;
