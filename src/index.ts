import { Block, blockTypes, TBlockType } from "./blockTypes";
import { Tile } from "./matrix";

const canvas = document.createElement("canvas");

const degrees: number[] = [0, 90, 180, 270];

const block: Block = {
  position: {
    x: 0,
    y: 0,
  },
  rotation: 0,
  blockType: TBlockType,
};

const gridSize = 24;
const boardWidth = 10;
const boardHeight = 20;

type Board = Tile[][];

const board: Board = [];
initializeboard(board);

const drawBlock = (block: Block, fixed = false) => {
  for (let yy = 0; yy < block.blockType[block.rotation].length; yy++) {
    for (let xx = 0; xx < block.blockType[block.rotation][yy].length; xx++) {
      if (block.blockType[block.rotation][yy][xx] === 1) {
        // board[yy + block.position.y][xx + block.position.x] =
        // block.blockType[block.rotation][yy][xx] === 1
        //   ? new Tile(
        //       xx,
        //       yy,
        //       fixed ? "static" : "active",
        //       block.blockType.color
        //     )
        // : null;
      }
    }
  }
};

const clearBoard = () => {
  for (let yy = 0; yy < board.length; yy++) {
    for (let xx = 0; xx < board[yy].length; xx++) {
      if (board[yy][xx] && board[yy][xx].type === "active") {
        board[yy][xx] = null;
      }
    }
  }
};

const processBoard = (board: Tile[][] = []) => {
  for (let yy = 0; yy < board.length; yy++) {
    for (let xx = 0; xx < board[yy].length; xx++) {}
  }
};

canvas.width = gridSize * boardWidth;
canvas.height = gridSize * boardHeight;
canvas.style.backgroundColor = "black";

const output = document.createElement("div");
output.style.color = "white";
document.body.appendChild(output);
document.body.appendChild(canvas);
document.body.style.backgroundColor = "gray";

const context = canvas?.getContext("2d");

let frame = 0;
const x = 0;
const y = 0;
const s = gridSize;
let id = 0;
const endLoop = false;
let speed = 500;

console.log("sdfsd");

const drawBoard = () => {
  for (let yy = 0; yy < board.length; yy++) {
    for (let xx = 0; xx < board[yy].length; xx++) {
      if (board[yy][xx] !== null) {
        context.fillStyle = board[yy][xx].color;
        context.fillRect(xx * gridSize, yy * gridSize, gridSize, gridSize);
      }
    }
  }
};

const detectFullRows = () => {
  const rows = [];
  for (let yy = 0; yy < board.length; yy++) {
    if (!board[yy].some((r) => !r)) {
      rows.push(yy);
    }
  }
  return rows;
};

addEventListener("keypress", (e) => {
  window.cancelAnimationFrame(id);
});

let lastTs = 0;

const lastBlock: Block = null;

const doesBlockFit = (
  block: Block,
  newX: number,
  newY: number,
  newRotation: 0 | 90 | 180 | 270
): boolean => {
  if (newY + block.blockType[block.rotation].length > boardHeight) return false;
  for (let yy = 0; yy < block.blockType[newRotation].length; yy++) {
    for (let xx = 0; xx < block.blockType[newRotation][yy].length; xx++) {
      if (
        board[yy + newY][xx + newX] &&
        board[yy + newY][xx + newX].type === "static" &&
        block.blockType[newRotation][yy][xx] === 1
      ) {
        return false;
      }
    }
  }
  return true;
};

const eventLoop = (ts: any | null) => {
  setTimeout(() => {
    clearBoard();
    context!.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock(block);
    drawBoard();
    output.textContent = "Frame: " + frame.toString();
    frame++;
    if (ts - lastTs > speed) {
      lastTs = ts;
      if (
        doesBlockFit(
          block,
          block.position.x,
          block.position.y + 1,
          block.rotation
        )
      ) {
        block.position.y++;
      } else {
        drawBlock(block, true);
        detectFullRows().forEach((r) => {
          board.splice(r, 1);
          board.unshift([
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        });
        block.blockType =
          blockTypes[Math.floor(Math.random() * blockTypes.length)];
        block.position.y = 0;
        block.position.x = 0;
      }
    }
    //    drawRect(x, y);
    id = window.requestAnimationFrame(eventLoop);
    if (endLoop) window.cancelAnimationFrame(id);
  }, 1000 / 30);
};

document.onkeyup = (e: KeyboardEvent) => {
  switch (e.code) {
    case "ArrowDown":
      speed = 500;
      break;
  }
};

document.onkeydown = (e: KeyboardEvent) => {
  switch (e.code) {
    case "ArrowRight":
      if (
        doesBlockFit(
          block,
          block.position.x + 1,
          block.position.y,
          block.rotation
        )
      ) {
        block.position.x += 1;
      }
      break;
    case "ArrowLeft":
      block.position.x -= 1;
      break;
    case "ArrowDown":
      speed = 1;
      // if (
      //   doesBlockFit(
      //     block,
      //     block.position.x,
      //     block.position.y + 1,
      //     block.rotation
      //   )
      // ) {
      //   block.position.y += 1;
      // }
      break;
    case "ArrowUp":
      const newRotation = (block.rotation === 270 ? 0 : block.rotation + 90) as
        | 0
        | 90
        | 180
        | 270;
      if (
        doesBlockFit(block, block.position.x, block.position.y, newRotation)
      ) {
        block.rotation = newRotation;
      }
      break;

    case "Space":
      console.log(board);
      break;
  }
  // console.log(x, y);
};

eventLoop(null);
function initializeboard(board: Board) {
  for (let by = 0; by < boardHeight; by++) {
    board[by] = [];
    for (let bx = 0; bx < boardWidth; bx++) {
      board[by][bx] = null;
    }
  }
}
