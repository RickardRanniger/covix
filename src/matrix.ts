import { Block, Orientation, TBlockType } from './blockTypes'

export enum TileType {
  ACTIVE = 'active',
  STATIC = 'static',
}
export class Tile {
  color: string;

  type: TileType;

  constructor (type: TileType, color: string) {
    this.type = type
    this.color = color
  }
}
export class Matrix {
  readonly tileSize: number;
  readonly width: number;
  readonly height: number;
  readonly tiles: Tile[][];

  constructor (tileSize: number, width: number, height: number) {
    this.tileSize = tileSize
    this.width = width
    this.height = height
    this.tiles = []
    this.clear()
  }

  processMatrix = (
    xHandler: (x: number, y: number) => void,
    yHandler: (y: number) => void
  ) => {
    for (let y = 0; y < this.height; y++) {
      yHandler && yHandler(y)
      for (let x = 0; x < this.width; x++) {
        xHandler && xHandler(x, y)
      }
    }
  };

  clear () {
    this.processMatrix(
      (x, y) => (this.tiles[y][x] = null),
      (y) => (this.tiles[y] = [])
    )
  }

  isCollision (block: Block, destX: number, destY: number, destO: Orientation) {
    for (let y = 0; y < block.blockType[destO].length; y++) {
      for (let x = 0; x < block.blockType[destO][y].length; x++) {
        console.log(
          block.blockType[destO][y][x],
          this.tiles[destY + y][destX + x]
        )
        if (
          block.blockType[destO][y][x] === 1 &&
          this.tiles[destY + y][destX + x] instanceof Tile
        ) {
          return true
        }
      }
    }
    return false
  }

  addBlock = (block: Block, tileType: TileType) => {
    for (let y = 0; y < block.blockType[block.rotation].length; y++) {
      for (let x = 0; x < block.blockType[block.rotation][y].length; x++) {
        if (block.blockType[block.rotation][y][x] === 1) {
          this.setTile(
            new Tile(tileType, block.blockType.color),
            x + block.position.x,
            y + block.position.y
          )
        }
      }
    }
  };

  setTile = (tile: Tile, x: number, y: number): void => {
    this.tiles[y][x] = tile
  };

  getTile (x: number, y: number) {
    return this.tiles[y][x]
  }

  getTiles () {
    return this.tiles
  }
}
