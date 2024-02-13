import browser from 'webextension-polyfill';
import { getBoardURL, getPieceURL } from './utils';

/**
 * Change the board in Lichess.
 * @param theme Theme name
 */
const lichessBoard = (theme: string): void => {
  const boards: NodeListOf<HTMLElement> = document.querySelectorAll('cg-board');
  for (const board of boards) {
    board.style.backgroundImage = `url('${getBoardURL(theme)}')`;
  }
};

/**
 * Change the pieces in Lichess.
 * @param theme Theme name
 */
const lichessPieces = (theme: string): void => {
  const pieces: NodeListOf<HTMLElement> = document.querySelectorAll('piece');
  for (const piece of pieces) {
    const classList = piece.classList;
    if (
      !classList.contains('ghost') &&
      (classList.contains('white') || classList.contains('black'))
    ) {
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
  // TODO: change ghost pieces
};

/**
 * Change the board in Chess.com.
 * @param theme Theme name
 */
const chessComBoard = (theme: string): void => {
  const board: HTMLElement | null = document.querySelector('wc-chess-board');
  if (board != null)
    board.style.backgroundImage = `url('${getBoardURL(theme)}')`;
  const root: HTMLElement = document.querySelector(':root')!;
  root.style.setProperty(
    '--theme-board-style-image',
    `url('${getBoardURL(theme)}')`,
  );
};

/**
 * Change the pieces in Chess.com.
 * @param theme Theme name
 */
const chessComPieces = (theme: string): void => {
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
  for (const piece of pieces) {
    const classList = piece.classList;
    const name = pieceNames.find((name) => classList.contains(name));
    if (name != null) {
      piece.style.backgroundImage = `url('${getPieceURL(theme, name)}')`;
    }
  }
  const root: HTMLElement = document.querySelector(':root')!;
  for (const piece of pieceNames) {
    root.style.setProperty(
      `--theme-piece-set-${piece}`,
      `url('${getPieceURL(theme, piece)}')`,
    );
  }
};

const changeTheme = (board: string, pieces: string, site: string) => {
  if (site === 'lichess.org') {
    lichessBoard(board);
    lichessPieces(pieces);
  } else if (site === 'www.chess.com') {
    chessComBoard(board);
    chessComPieces(pieces);
  }
};

/**
 * Listen for messages from the background script.
 */
browser.runtime.onMessage.addListener(
  (message: {
    command: string;
    board: string;
    pieces: string;
    site: string;
  }) => {
    if (message.command === 'change-theme') {
      changeTheme(message.board, message.pieces, message.site);
    }
  },
);

/**
 * Load the extension.
 */
(async () => {
  console.info('Chess Themer v', chrome.runtime.getManifest().version);
  const { pieces, board } = await chrome.storage.sync.get({
    pieces: 'neo',
    board: 'green',
  });
  const site = window.location.hostname;
  changeTheme(board, pieces, site);
})();
