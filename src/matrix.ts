import { Block, Rotation } from "./blockTypes";

export enum TileType {
  ACTIVE = "active",
  STATIC = "static",
}
export class Tile {
  color: string;

  type: TileType;

  constructor(type: TileType, color: string) {
    this.type = type;
    this.color = color;
  }
}
export class Matrix {
  readonly width: number;
  readonly height: number;
  readonly tiles: Tile[][];
  activeBlock: Block;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.clear();
  }

  setActiveBlock = (block: Block) => {
    this.activeBlock = block;
    this.addBlock(TileType.ACTIVE);
  };

  moveDY = (steps: number): boolean => {
    if (
      !this.isCollision(
        this.activeBlock,
        this.activeBlock.position.x,
        this.activeBlock.position.y + steps,
        this.activeBlock.rotation
      )
    ) {
      this.removeBlock();
      this.activeBlock.position.y += steps;
      this.addBlock(TileType.ACTIVE);
      return true;
    }
    return false;
  };

  moveDX = (steps: number) => {
    if (
      !this.isCollision(
        this.activeBlock,
        this.activeBlock.position.x + steps,
        this.activeBlock.position.y,
        this.activeBlock.rotation
      )
    ) {
      this.removeBlock();
      this.activeBlock.position.x += steps;
      this.addBlock(TileType.ACTIVE);
    }
  };

  getNextBlockRotation = (current: Rotation) => {
    switch (current) {
      case Rotation.UP:
        return Rotation.RIGHT;
      case Rotation.RIGHT:
        return Rotation.DOWN;
      case Rotation.DOWN:
        return Rotation.LEFT;
      case Rotation.LEFT:
        return Rotation.UP;
    }
  };

  lockDown = () => {
    this.processMatrix((x, y) => {
      if (this.tiles[y][x]?.type === TileType.ACTIVE) {
        this.tiles[y][x].type = TileType.STATIC;
      }
    }, null);
  };

  rotate = () => {
    if (
      !this.isCollision(
        this.activeBlock,
        this.activeBlock.position.x,
        this.activeBlock.position.y,
        this.getNextBlockRotation(this.activeBlock.rotation)
      )
    ) {
      this.removeBlock();
      this.activeBlock.rotation = this.getNextBlockRotation(
        this.activeBlock.rotation
      );
      this.addBlock(TileType.ACTIVE);
    }
  };

  processMatrix = (
    xyHandler: (x: number, y: number) => void,
    yHandler: (y: number) => void
  ) => {
    for (let y = 0; y < this.height; y++) {
      yHandler && yHandler(y);
      for (let x = 0; x < this.width; x++) {
        xyHandler && xyHandler(x, y);
      }
    }
  };

  clear() {
    this.processMatrix(
      (x, y) => (this.tiles[y][x] = null),
      (y) => (this.tiles[y] = [])
    );
  }

  isCollision(block: Block, destX: number, destY: number, destO: Rotation) {
    for (let y = 0; y < block.blockType[destO].length; y++) {
      for (let x = 0; x < block.blockType[destO][y].length; x++) {
        if (
          block.blockType[destO][y][x] === 1 &&
          (destY + y >= this.height ||
            destX + x >= this.width ||
            destX + x < 0 ||
            (this.tiles[destY + y][destX + x] instanceof Tile &&
              this.tiles[destY + y][destX + x].type === TileType.STATIC))
        ) {
          return true;
        }
      }
    }
    return false;
  }

  addBlock = (tileType: TileType) => {
    const block = this.activeBlock;
    for (let y = 0; y < block.blockType[block.rotation].length; y++) {
      for (let x = 0; x < block.blockType[block.rotation][y].length; x++) {
        if (block.blockType[block.rotation][y][x] === 1) {
          this.setTile(
            new Tile(tileType, block.blockType.color),
            x + block.position.x,
            y + block.position.y
          );
        }
      }
    }
  };

  handleRows = (): boolean => {
    let returnValue = false;
    this.processMatrix(null, (y) => {
      if (this.tiles[y].every((tile) => tile?.type === TileType.STATIC)) {
        this.tiles.splice(y, 1);
        this.tiles.unshift(new Array(this.width).fill(null));
        returnValue = true;
      }
    });
    return returnValue;
  };

  removeBlock = () => {
    const block = this.activeBlock;
    for (let y = 0; y < block.blockType[block.rotation].length; y++) {
      for (let x = 0; x < block.blockType[block.rotation][y].length; x++) {
        if (block.blockType[block.rotation][y][x] === 1) {
          this.setTile(null, block.position.x + x, block.position.y + y);
        }
      }
    }
  };

  setTile = (tile: Tile, x: number, y: number): void => {
    this.tiles[y][x] = tile;
  };

  getTile(x: number, y: number) {
    return this.tiles[y][x];
  }

  getTiles() {
    return this.tiles;
  }
}
