import { LEVEL, OBJECT_TYPE, Character } from './setup';
import { randomMovement } from './ghostMoves';

// Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';

// DOM Elements
const gameGrid: HTMLDivElement = document.querySelector('#game');
const scoreTable: HTMLDivElement = document.querySelector('#score');
const startButton: HTMLButtonElement = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME: number = 10000; // ms
const GLOBAL_SPEED: number = 80; // ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial Setup
let score: number = 0;
let timer = null;
let isGameWin: boolean = false;
let isPowerPillActive: boolean = false;
const powerPillTimer = null;

function gameOver(pacman, grid): void {

}

function checkCollision(pacman: Character, ghosts: Character[]) {
  const collidedGhost = ghosts.find( ghost => pacman.position === ghost.position);

  if (collidedGhost) {
    if (pacman.isPowerPillActive) {
      gameBoard.removeObject(collidedGhost.position, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhost.name
      ]);

      collidedGhost.position = collidedGhost.startPosition;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.position, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.position, 0);
      gameOver(pacman, gameGrid);
    }
  }
}

function gameLoop(pacman, ghosts): void {
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts);

  ghosts.forEach(ghost => gameBoard.moveCharacter(ghost));
  checkCollision(pacman, ghosts);
}

function startGame(): void {
  isGameWin = false;
  isPowerPillActive = false;
  score = 0;

  startButton.classList.add('hide');

  gameBoard.createGrid(LEVEL);

  const pacman: Character = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', (evt) => {
    pacman.handleKeyInput(evt, gameBoard.objectExists);
  });

  const ghosts = [
    new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
  ]

  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED)
}

// Initialize game
startButton.addEventListener('click', startGame);
