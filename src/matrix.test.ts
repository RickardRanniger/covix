import { Matrix, Tile, TileType } from "./matrix";
import { Block, Orientation, TBlockType } from "./blockTypes";

it("Can add block with rotation", () => {
  const matrix = new Matrix(32, 10, 20);

  const block: Block = {
    blockType: TBlockType,
    position: {
      x: 0,
      y: 0,
    },
    rotation: 0,
  };

  matrix.addBlock(block, TileType.ACTIVE);

  const tiles = matrix.getTiles();
  expect(matrix.getTile(0, 0)).toBeNull();
  expect(matrix.getTile(1, 0)).toBeInstanceOf(Tile);
  expect(matrix.getTile(2, 0)).toBeNull();
  expect(matrix.getTile(0, 1)).toBeInstanceOf(Tile);
  expect(matrix.getTile(1, 1)).toBeInstanceOf(Tile);
  expect(matrix.getTile(2, 1)).toBeInstanceOf(Tile);

  matrix.clear();

  block.rotation = 180;
  matrix.addBlock(block, TileType.ACTIVE);
  expect(matrix.getTile(0, 0)).toBeInstanceOf(Tile);
  expect(matrix.getTile(1, 0)).toBeInstanceOf(Tile);
  expect(matrix.getTile(2, 0)).toBeInstanceOf(Tile);
  expect(matrix.getTile(0, 1)).toBeNull();
  expect(matrix.getTile(1, 1)).toBeInstanceOf(Tile);
  expect(matrix.getTile(2, 1)).toBeNull();

  matrix.clear();

  block.rotation = 180;
  block.position.x = 5;
  block.position.y = 5;
  matrix.addBlock(block, TileType.ACTIVE);
  expect(matrix.getTile(5, 5)).toBeInstanceOf(Tile);
  expect(matrix.getTile(6, 5)).toBeInstanceOf(Tile);
  expect(matrix.getTile(7, 5)).toBeInstanceOf(Tile);
  expect(matrix.getTile(5, 6)).toBeNull();
  expect(matrix.getTile(6, 6)).toBeInstanceOf(Tile);
  expect(matrix.getTile(7, 6)).toBeNull();
});

it("Test collision", () => {
  const matrix = new Matrix(32, 10, 20);

  const block: Block = {
    blockType: TBlockType,
    position: {
      x: 0,
      y: 0,
    },
    rotation: Orientation.UP,
  };

  matrix.setTile(new Tile(TileType.STATIC, ""), 1, 0);
  expect(matrix.isCollision(block, 0, 0, Orientation.UP)).toBeTruthy();
  expect(matrix.isCollision(block, 1, 0, Orientation.UP)).toBeFalsy();
  expect(matrix.isCollision(block, 0, 0, Orientation.RIGHT)).toBeFalsy();
  expect(matrix.isCollision(block, 1, 0, Orientation.RIGHT)).toBeTruthy();
});
