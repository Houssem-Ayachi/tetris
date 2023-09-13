import Board from "./Board.js";
import Playground from "./playground.js";
const canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 700;
const ctx = canvas.getContext("2d");
const board = new Board();
const playground = new Playground(ctx, 30, board);
playground.init();
playground.play();
