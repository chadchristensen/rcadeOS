export interface Direction {
  movement: number,
  rotation: number
}

export interface Character {
  position: number,
  startPosition?: number,
  speed: number,
  direction: Direction,
  timer: number,
  isPowerPillActive?: boolean,
  rotation: boolean,
  name?: string,
  shouldMove(): boolean,
  getNextMove(objectExists: (number, string) => boolean): {nextMovePosition: number, direction: Direction },
  makeMove(): { classesToRemove: string[], classesToAdd: string[] },
  handleKeyInput?(evt: KeyboardEvent, objectExists: (number, string) => boolean): void,
  setNewPosition(nextMovePosition: number, direction?: Direction): void 
}

export const Keys = {
  ArrowLeft: 'ArrowLeft',
  Left: 'Left',
  ArrowUp: 'ArrowUp',
  Up: 'Up',
  ArrowRight: 'ArrowRight',
  Right: 'Right',
  ArrowDown: 'ArrowDown',
  Down: 'Down'
}

export function getStandardizedKey(key: string): string {
  switch(key) {
    case Keys.ArrowLeft:
    case Keys.Left:
      return Keys.ArrowLeft;
    case Keys.ArrowUp:
    case Keys.Up:
      return Keys.ArrowUp;
    case Keys.ArrowRight:
    case Keys.Right:
      return Keys.ArrowRight;
    case Keys.ArrowDown:
    case Keys.Down:
      return Keys.ArrowDown;
    default:
      return 'UNKNOWN';
  }
}

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const DIRECTIONS_MAP: {[key: string]: Direction} = {
  [Keys.ArrowLeft]: {
    movement: -1,
    rotation: 180,
  },
  [Keys.ArrowUp]: {
    movement: -GRID_SIZE,
    rotation: 270,
  },
  [Keys.ArrowRight]: {
    movement: 1,
    rotation: 0,
  },
  [Keys.ArrowDown]: {
    movement: GRID_SIZE,
    rotation: 90,
  },
};

export const OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'wall',
  DOT: 'dot',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  PILL: 'pill',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
  GHOSTLAIR: 'lair',
};

// Lookup array for classes
export const CLASS_LIST = [
  OBJECT_TYPE.BLANK, // 0
  OBJECT_TYPE.WALL, // 1
  OBJECT_TYPE.DOT, // 2
  OBJECT_TYPE.BLINKY, // 3
  OBJECT_TYPE.PINKY, // 4
  OBJECT_TYPE.INKY, // 5
  OBJECT_TYPE.CLYDE, // 6
  OBJECT_TYPE.PILL, // 7
  OBJECT_TYPE.PACMAN, // 8
  OBJECT_TYPE.GHOSTLAIR, // 9
];

// prettier-ignore
export const LEVEL = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
  1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1,
  0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0,
  1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 
  1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 1, 
  1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 
  0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0,
  0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0,
  1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
  1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
