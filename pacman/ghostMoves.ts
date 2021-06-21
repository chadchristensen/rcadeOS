import { Direction, DIRECTIONS_MAP, OBJECT_TYPE } from './setup';

// Primitive random movement

export function randomMovement(position: number, direction: Direction, objectExists) {
  let currentDirection = direction;
  let nextMovePosition = position + direction.movement;

  // Create an array from the directions object keys
  const keys = Object.keys(DIRECTIONS_MAP);
  
  while(
    objectExists(nextMovePosition, OBJECT_TYPE.WALL) ||
    objectExists(nextMovePosition, OBJECT_TYPE.GHOST)
  ) {
    // Get a random key from the keys array
    const key = keys[Math.floor(Math.random() * keys.length)];
    // Set the next move
    currentDirection = DIRECTIONS_MAP[key];
    // Set the next move
    nextMovePosition = position + currentDirection.movement;

  }
  return { nextMovePosition, direction: currentDirection}
}