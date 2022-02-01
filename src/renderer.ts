import { Matrix } from "./matrix";

export class Renderer {
  readonly canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  readonly matrix: Matrix;

  constructor(matrix: Matrix) {
    this.matrix = matrix;
    this.canvas = document.createElement("canvas");
    this.canvas.width = matrix.width * 32;
    this.canvas.height = matrix.height * 32;
    this.canvas.style.backgroundColor = "black";
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
  }

  drawCurrent = () => {
    this.matrix.processMatrix((x, y) => {
      const tile = this.matrix.getTile(x, y);
      if (tile !== null) {
        this.context.fillStyle = tile.color;
        this.context.strokeStyle = "#333333";
        this.context.strokeRect(x * 32, y * 32, 32, 32);
        this.context.fillRect(x * 32, y * 32, 32, 32);
      }
    }, null);
  };

  clear = () => {
    this.context.clearRect(
      0,
      0,
      this.matrix.width * 32,
      this.matrix.height * 32
    );
  };
}
