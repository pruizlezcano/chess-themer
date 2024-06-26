import Site from './Site';
import { getBoardURL, getPieceURL } from '../utils';

/** Class for lichess.org */
class Lichessorg extends Site {
  constructor() {
    super();
  }

  changeBoard(theme: string): void {
    this.boardTheme = theme;
    const boards: NodeListOf<HTMLElement> =
      document.querySelectorAll('cg-board');
    for (const board of boards) {
      board.style.backgroundImage = `url('${getBoardURL(theme)}')`;
      board.style.top = '0';
      board.style.left = '0';
      board.style.width = '100%';
      board.style.height = '100%';
      board.style.position = 'absolute';
      board.style.backgroundSize = 'cover';
      board.style.borderRadius = 'inherit';
      board.style.boxShadow = 'inherit';
    }
    const body = document.querySelector('body');
    body?.setAttribute('data-board', 'chess-themer');
    this.boardTheme = theme;
  }

  changePieces(theme: string): void {
    this.piecesTheme = theme;
    const pieces: NodeListOf<HTMLElement> = document.querySelectorAll('piece');
    for (const piece of pieces) {
      const classList = piece.classList;
      if (classList.contains('white') || classList.contains('black')) {
        const nameRelation: { [key: string]: string } = {
          black: 'b',
          white: 'w',
          pawn: 'p',
          knight: 'n',
          bishop: 'b',
          rook: 'r',
          queen: 'q',
          king: 'k',
        };
        const pieceName = [...classList]
          .sort(
            (a, b) =>
              Object.keys(nameRelation).indexOf(a) -
              Object.keys(nameRelation).indexOf(b),
          )
          .map((c: string) => nameRelation[c])
          .join('');
        piece.style.backgroundImage = `url('${getPieceURL(theme, pieceName)}')`;
      }
    }
    this.piecesTheme = theme;
  }
}

export default Lichessorg;
