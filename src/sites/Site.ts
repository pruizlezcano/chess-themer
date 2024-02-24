/** Abstract class for chess sites */
abstract class Site {
  // Properties for the theme of the board and pieces
  boardTheme: string;
  piecesTheme: string;
  constructor() {
    this.boardTheme = '';
    this.piecesTheme = '';
  }

  /** Abstract method to change the board theme, to be implemented by subclasses
   * @param board - The theme of the board
   */
  abstract changeBoard(board: string): void;

  /** Abstract method to change the pieces theme, to be implemented by subclasses
   * @param pieces - The theme of the pieces
   */
  abstract changePieces(pieces: string): void;

  /** Method to start observing changes in the DOM */
  startObserver(): void {
    const observer = new MutationObserver((mutations) => {
      if (this.boardTheme === '' || this.piecesTheme === '') {
        return;
      }
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.changeBoard(this.boardTheme);
          this.changePieces(this.piecesTheme);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

export default Site;
