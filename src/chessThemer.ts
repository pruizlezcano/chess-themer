import browser from 'webextension-polyfill';
import Lichessorg from './sites/Lichessorg';
import ChessCom from './sites/Chesscom';

const lichess = new Lichessorg();
const chessCom = new ChessCom();

const changeTheme = (board: string, pieces: string, site: string) => {
  if (site === 'lichess.org') {
    console.log('Changing theme for lichess.org');

    lichess.changeBoard(board);
    lichess.changePieces(pieces);
    lichess.startObserver();
  } else if (site === 'www.chess.com') {
    console.log('Changing theme for chess.com');
    // FIXME: not working in https://www.chess.com/analysis?tab=analysis
    chessCom.changeBoard(board);
    chessCom.changePieces(pieces);
    chessCom.startObserver();
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
  console.info('Chess Themer v', browser.runtime.getManifest().version);
  const { pieces, board } = await browser.storage.sync.get({
    pieces: 'neo',
    board: 'green',
  });
  const site = window.location.hostname;
  changeTheme(board, pieces, site);
})();
