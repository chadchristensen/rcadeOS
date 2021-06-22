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
let powerPillTimer = null;

function gameOver(pacman, grid): void {
  document.removeEventListener('keydown', evt => pacman.handleKeyInput(evt, gameBoard.objectExists));

  gameBoard.showGameStatus(isGameWin);

  clearInterval(timer);

  startButton.classList.remove('hide');
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

  // Check if Pacman eats dots
  if (gameBoard.objectExists(pacman.position, OBJECT_TYPE.DOT)) {
    gameBoard.removeObject(pacman.position, [OBJECT_TYPE.DOT]);

    gameBoard.dotCount--;
    score += 10;
  }

  // Check if Pacman eats power pill
  if (gameBoard.objectExists(pacman.position, OBJECT_TYPE.PILL)) {
    gameBoard.removeObject(pacman.position, [OBJECT_TYPE.PILL]);

    pacman.isPowerPillActive = true;
    score += 50;

    clearTimeout(powerPillTimer);
    powerPillTimer = setTimeout(() => pacman.isPowerPillActive = false, POWER_PILL_TIME);

  }

  if (pacman.isPowerPillActive !== isPowerPillActive) {
    isPowerPillActive = pacman.isPowerPillActive;
    ghosts.forEach(ghost => ghost.isScared = isPowerPillActive)
  }

  if (gameBoard.dotCount === 0) {
    isGameWin = true;
    gameOver(pacman, ghosts);
  }

  // Show the score
  scoreTable.innerHTML = `${score}`;
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
