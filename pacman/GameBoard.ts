import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup';

class GameBoard {
  DOMGrid: any;
  grid: HTMLDivElement[] = [];
  dotCount: number = 0;

  constructor(DOMGrid) {
    this.DOMGrid = DOMGrid;
  }

  showGameStatus(isGameWin: boolean) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${isGameWin ? 'WIN!' : 'GAME OVER'}`
    this.DOMGrid.appendChild(div);
  }

  createGrid(level: number[]) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = '';
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px )`;

    level.forEach((square) => {
      const div = document.createElement('div');
      div.classList.add('square', CLASS_LIST[square]);
      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
      this.DOMGrid.appendChild(div);
      this.grid.push(div);

      if(CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
    });
  }

  addObject(position: number, classes: string[]): void {
    this.grid[position].classList.add(...classes);
  }

  removeObject(position: number, classes: string[]): void {
    this.grid[position].classList.remove(...classes);
  }

  // Setting to arrow function to fix the 'this' binding
  objectExists = (position: number, object: string): boolean => {
    return this.grid[position].classList.contains(object);
  }

  rotateDiv(position: number, degrees: number): void {
    this.grid[position].style.transform = `rotate${degrees}deg`;
  }

  static createGameBoard(DOMGrid, level: number[]): GameBoard {
    const board = new this(DOMGrid);
    board.createGrid(level);
    return board;
  }


}

export default GameBoard;