import { OBJECT_TYPE, DIRECTIONS_MAP, Direction, Keys, getStandardizedKey } from './setup';

class Pacman {
  position: number;
  speed: number;
  direction: Direction;
  timer: 0;
  isPowerPillActive = false;
  rotation = true;

  constructor(speed, startPosition) {
    this.position = startPosition;
    this.speed = speed;
  }

  shouldMove(): boolean {
    if (!this.direction) return false;

    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExists: (number, string) => boolean): {nextMovePosition: number, direction: Direction } {
    let nextMovePosition = this.position + this.direction.movement;

    if (
      objectExists(nextMovePosition, OBJECT_TYPE.WALL) ||
      objectExists(nextMovePosition, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePosition = this.position;

      return {
        nextMovePosition,
        direction: this.direction
      }
    }
  }

  makeMove(): {
    classesToRemove: string[],
    classesToAdd: string[]
  } {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd }
  }

  setNewPosition(nextMovePosition: number): void {
    this.position = nextMovePosition
  }

  handleKeyInput(evt: KeyboardEvent, objectExists: (number, string) => boolean) {
    let direction: Direction;
    let keys = Object.values(Keys);

    if(keys.includes(evt.key)) {
      direction = DIRECTIONS_MAP[getStandardizedKey(evt.key)]
    } else {
      return;
    }

    const nextMovePosition = this.position + direction.movement;
    if(objectExists(nextMovePosition, OBJECT_TYPE.WALL)) return;

    this.direction = direction;
  }
}

export default Pacman;