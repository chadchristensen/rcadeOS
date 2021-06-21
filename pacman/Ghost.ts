import { DIRECTIONS_MAP, OBJECT_TYPE, Character } from './setup';

class Ghost implements Character {
  name: 'string';
  movement: any; // TODO: Change from any
  startPosition: number;
  position: number;
  direction: any; // TODO: Change from any
  speed: number;
  timer = 0; // TODO: Change from any
  isScared = false;
  rotation: boolean;


  constructor(speed = 5, startPosition, movement, name) {
    this.name = name;
    this.movement = movement;
    this.startPosition = startPosition;
    this.position = startPosition;
    this.direction = DIRECTIONS_MAP.ArrowRight;
    this.speed = speed;
  }

  shouldMove() {
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }

    this.timer++;
    return false;
  }

  getNextMove(objectExists) {
    const { nextMovePosition, direction } = this.movement(
      this.position,
      this.direction,
      objectExists
    );

    return { nextMovePosition, direction }
  }

  makeMove() {
    const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name];
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name];

    if (this.isScared) {
      classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED];
    }

    return {
      classesToRemove,
      classesToAdd
    }
  }

  setNewPosition(nextMovePosition, direction) {
    this.position = nextMovePosition;
    this.direction = direction;
  }

}

export default Ghost;