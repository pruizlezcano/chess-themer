export const getBoardURL = (theme: string): string => {
  return `https://pruizlezcano.github.io/chess-themer/boards/${theme}/200.png`;
};

export const getPieceURL = (theme: string, piece: string): string => {
  return `https://pruizlezcano.github.io/chess-themer/pieces/${theme}/${piece}.png`;
};
