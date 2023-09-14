import Board from "./Board.js";
import Score from "./Score.js";
import Playground from "./playground.js";

const canvas: HTMLCanvasElement = document.querySelector("canvas")!;

canvas.width = 400;
canvas.height = 700;

const ctx = canvas.getContext("2d")!;

const score = new Score();
const board: Board = new Board(score);

const playground = new Playground(ctx, 30, board);

playground.init();
playground.play();