import browser from 'webextension-polyfill';
import { themes } from './themes';
import { getBoardURL, getPieceURL } from './utils';

/**
 * Change the preview image.
 * @param pieces Pieces theme name
 * @param board Board theme name
 */
export const changePreview = (pieces: string, board: string): void => {
  document.getElementById('preview')!.style.background = `url('${getPieceURL(
    pieces,
    'bn',
  )}') 0% 0% / 12.5% no-repeat, url('${getPieceURL(
    pieces,
    'wn',
  )}') 14.285714285714286% 0% / 12.5% no-repeat, url('${getPieceURL(
    pieces,
    'bp',
  )}') 0% 14.285714285714286% / 12.5% no-repeat, url('${getPieceURL(
    pieces,
    'wp',
  )}') 14.285714285714286% 14.285714285714286% / 12.5% no-repeat, url('${getBoardURL(
    board,
  )}') 0 0 / cover no-repeat`;
};

/**
 * Add an option to a selector.
 * @param selector HTMLSelectElement
 * @param value Value of the option
 * @param text Text of the option
 */
export const addOption = (
  selector: HTMLSelectElement,
  value: string,
  text: string,
): void => {
  const option = document.createElement('option');
  option.value = value;
  option.innerText = text;
  selector.appendChild(option);
};

const pieceSelector = document.getElementById(
  'pieceSelector',
) as HTMLSelectElement;
const boardSelector = document.getElementById(
  'boardSelector',
) as HTMLSelectElement;

for (const theme of themes.pieces.sort((a, b) =>
  a.name.localeCompare(b.name),
)) {
  addOption(
    pieceSelector,
    theme.name,
    `${theme.displayName} (${theme.creator})`,
  );
}

for (const theme of themes.boards.sort((a, b) =>
  a.name.localeCompare(b.name),
)) {
  addOption(
    boardSelector,
    theme.name,
    `${theme.displayName} (${theme.creator})`,
  );
}

/**
 * Change the theme.
 * @param pieces Pieces theme name
 * @param board Board theme name
 */
export const changeTheme = async (
  pieces: string,
  board: string,
): Promise<void> => {
  await browser.storage.sync.set({
    pieces,
    board,
  });
  const tabs = await browser.tabs.query({
    url: ['*://lichess.org/*', '*://www.chess.com/*'],
  });
  for (const tab of tabs) {
    await browser.tabs.sendMessage(tab.id!, {
      command: 'change-theme',
      pieces,
      board,
      site: new URL(tab.url ?? '').hostname,
    });
  }
};

/**
 * Restore theme from storage.
 */
export const restoreOptions = async (): Promise<void> => {
  const { pieces, board } = (await browser.storage.sync.get({
    pieces: 'neo',
    board: 'green',
  })) as { pieces: string; board: string };

  pieceSelector.value = pieces;
  boardSelector.value = board;
  changePreview(pieces, board);
  await changeTheme(pieces, board);
};

document.addEventListener('DOMContentLoaded', restoreOptions);

pieceSelector.addEventListener('change', async function (e) {
  e.preventDefault();
  changePreview(pieceSelector.value, boardSelector.value);
});

boardSelector.addEventListener('change', async function (e) {
  e.preventDefault();
  changePreview(pieceSelector.value, boardSelector.value);
});

const saveButton = document.getElementById('saveButton')!;

saveButton.addEventListener('click', async function (e) {
  e.preventDefault();
  await changeTheme(pieceSelector.value, boardSelector.value);
  saveButton.innerHTML =
    '<span class="emoji">🎉</span>Saved!<span class="emoji">🎉</span>';
  setTimeout(() => {
    saveButton.innerText = 'Save';
  }, 1000);
});
