import { LEVEL, OBJECT_TYPE } from './setup';

// DOM Elements
const gameGrid: HTMLDivElement = document.querySelector('#game');
const scoreTable: HTMLDivElement = document.querySelector('#score');
const startButton: HTMLButtonElement = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME: number = 10000; // ms
const GLOBAL_SPEED: number = 80; // ms

// Initial Setup
const score: number = 0;
const timer = null;
const isGameWin: boolean = false;
const isPowerPillActive: boolean = false;
const powerPillTimer = null;

function gameOver(pacman, grid): void {

}

function checkCollision(pacman, ghosts) {

}

function gameLoop(pacman, ghosts): void {

}

function startGame(): void {

}
