/* istanbul ignore file */
import { Block, blockTypes, Rotation, IBlockType } from "./blockTypes";
import { Matrix } from "./matrix";
import { Renderer } from "./renderer";
import SoundManager from "./soundManager";
import "./style.css";
async function init() {
  const sm = new SoundManager();
  sm.init();

  const matrix = new Matrix(10, 20);

  let block: Block = {
    blockType: blockTypes[Math.floor(Math.random() * blockTypes.length)],
    position: {
      x: matrix.width / 2 - 1,
      y: 0,
    },
    rotation: Rotation.UP,
  };

  const pauseGameHandler = () => {
    button.textContent = "Resume";
    button.onclick = resumeGameHandler;
    breakLoop = true;
    sm.pause();
  };

  const resumeGameHandler = () => {
    button.textContent = "Pause";
    button.onclick = pauseGameHandler;
    breakLoop = false;
    gameLoop(window.performance.now());
    sm.resume();
  };

  const gameOverHandler = () => {
    sm.stop();
    sm.play("gameOver");
    button.textContent = "Start Game";
    button.onclick = startButtonHandler;
    breakLoop = true;
  };

  const startButtonHandler = async () => {
    renderer.clear();
    matrix.clear();
    resetScore();
    block = {
      blockType: blockTypes[Math.floor(Math.random() * blockTypes.length)],
      position: {
        x: matrix.width / 2 - 1,
        y: 0,
      },
      rotation: Rotation.UP,
    };
    matrix.setActiveBlock(block);
    renderer.drawCurrent();
    button.textContent = "Pause";
    button.onclick = pauseGameHandler;
    sm.init();
    sm.playMusic("music");
    breakLoop = false;
    setTimeout(() => {
      gameLoop(window.performance.now());
    }, 1000);
  };

  const button = document.getElementById("startButton") as HTMLButtonElement;
  button.onclick = startButtonHandler;
  matrix.setActiveBlock(block);

  const renderer = new Renderer(matrix);

  let lastTs = 0;
  let speedY = 1;
  let moveRight = false;
  let moveLeft = false;
  let score = 0;
  let level = 1;

  const getSpeed = () => speedY - (0.1 * level - 1);

  const addScore = (value: number) => {
    score = score + value;
    document.getElementById("scoreValue").innerHTML = score.toString();
  };

  const increaseLevel = () => {
    level++;
    document.getElementById("levelValue").innerHTML = level.toString();
  };

  const resetScore = () => {
    score = 0;
    document.getElementById("scoreValue").innerHTML = score.toString();
  };

  let breakLoop = false;
  window.addEventListener("keydown", (ev: KeyboardEvent) => {
    //ev.preventDefault();
    switch (ev.key) {
      case "ArrowRight":
        moveRight = true;
        break;
      case "ArrowLeft":
        moveLeft = true;
        break;
      case "ArrowUp":
      case " ":
        sm.play("rotate");
        matrix.rotate();
        break;
      case "ArrowDown":
        speedY = 0.0333333;
        break;
    }
  });

  window.addEventListener("keyup", (ev: KeyboardEvent) => {
    ev.preventDefault();
    switch (ev.key) {
      case "ArrowDown":
        speedY = getSpeed();
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
      if (speedY === 0.0333333) {
        addScore(1);
      }
      if (!matrix.moveDY(1)) {
        sm.play("drop");
        matrix.lockDown();
        const clearedRows = matrix.handleRows();
        switch (clearedRows) {
          case 1:
            addScore(100);
            sm.play("clearRows");
            break;
          case 2:
            addScore(400);
            sm.play("clearRows");
            break;
          case 3:
            addScore(900);
            sm.play("clearRows");
            break;
          case 4:
            addScore(2000);
            sm.play("clearRows");
            sm.play("fourLines");
            break;
        }

        if (score > level * 1000) {
          increaseLevel();
          sm.play("levelUp");
        }

        block.position.x = 0;
        block.position.y = 0;
        block.rotation = Rotation.UP;
        block.blockType =
          blockTypes[Math.floor(Math.random() * blockTypes.length)];

        if (matrix.isCollision(block, 0, 0, Rotation.UP)) {
          gameOverHandler();
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
}

init();
