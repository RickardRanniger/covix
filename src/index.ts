/* istanbul ignore file */
import { Block, blockTypes, Rotation, IBlockType } from "./blockTypes";
import { Matrix } from "./matrix";
import { Renderer } from "./renderer";
import SoundManager from "./soundManager";

async function init() {
  const sm = new SoundManager();
  sm.init();

  const matrix = new Matrix(10, 20);

  const block: Block = {
    blockType: IBlockType,
    position: {
      x: 0,
      y: 0,
    },
    rotation: Rotation.UP,
  };

  const startButtonHandler = async () => {
    sm.play("music", true);
    gameLoop(window.performance.now());
  };

  const button = document.createElement("button");
  button.textContent = "Start game";
  button.style.display = "block ";
  button.onclick = startButtonHandler;

  document.body.appendChild(button);

  matrix.setActiveBlock(block);

  const renderer = new Renderer(matrix);

  let lastTs = 0;
  let speedY = 1;
  let moveRight = false;
  let moveLeft = false;

  let breakLoop = false;
  window.addEventListener("keydown", (ev: KeyboardEvent) => {
    ev.preventDefault();
    switch (ev.key) {
      case "ArrowRight":
        moveRight = true;
        break;
      case "ArrowLeft":
        moveLeft = true;
        break;
      case "ArrowUp":
        sm.play("rotate");
        matrix.rotate();
        break;
      case "ArrowDown":
        speedY = 0.0333333;
        break;
      case " ":
        breakLoop = true;
        break;
    }
  });

  window.addEventListener("keyup", (ev: KeyboardEvent) => {
    ev.preventDefault();
    switch (ev.key) {
      case "ArrowDown":
        speedY = 1;
        break;
      case "ArrowRight":
        moveRight = false;
        break;
      case "ArrowLeft":
        moveLeft = false;
        break;
    }
  });

  let moveYTimer = 0;
  let moveXTimer = 0;

  const gameLoop = (ts: DOMHighResTimeStamp = 0) => {
    if (!breakLoop) window.requestAnimationFrame(gameLoop);

    const delta = (ts - lastTs) / 1000;
    lastTs = ts;

    if (moveYTimer >= speedY) {
      if (!matrix.moveDY(1)) {
        sm.play("drop");
        matrix.lockDown();
        if (matrix.handleRows()) {
          sm.play("clearRows");
        }
        block.position.x = 0;
        block.position.y = 0;
        block.rotation = Rotation.UP;
        block.blockType =
          blockTypes[Math.floor(Math.random() * blockTypes.length)];

        if (matrix.isCollision(block, 0, 0, Rotation.UP)) {
          breakLoop = true;
        } else {
          matrix.setActiveBlock(block);
        }
      }
      moveYTimer = 0;
    } else {
      moveYTimer += delta;
    }

    if ((moveLeft || moveRight) && moveXTimer >= 0.1) {
      matrix.moveDX(moveLeft ? -1 : 1);
      moveXTimer = 0;
    } else {
      moveXTimer += delta;
    }

    renderer.clear();
    renderer.drawCurrent();
  };

  //gameLoop(window.performance.now());

  renderer.drawCurrent();
}

init();
