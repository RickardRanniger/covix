import { Block, Rotation, TBlockType } from "../blockTypes";
import { Matrix, Tile, TileType } from "../matrix";

describe("Test matrix", () => {
  it("Can add block with rotation", () => {
    const matrix = new Matrix(10, 20);

    const block: Block = {
      blockType: TBlockType,
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
    };

    matrix.setActiveBlock(block);

    expect(matrix.getTile(0, 0)).toBeNull();
    expect(matrix.getTile(1, 0)).toBeInstanceOf(Tile);
    expect(matrix.getTile(2, 0)).toBeNull();
    expect(matrix.getTile(0, 1)).toBeInstanceOf(Tile);
    expect(matrix.getTile(1, 1)).toBeInstanceOf(Tile);
    expect(matrix.getTile(2, 1)).toBeInstanceOf(Tile);

    matrix.clear();

    block.rotation = 180;
    matrix.setActiveBlock(block);
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
    matrix.setActiveBlock(block);
    expect(matrix.getTile(5, 5)).toBeInstanceOf(Tile);
    expect(matrix.getTile(6, 5)).toBeInstanceOf(Tile);
    expect(matrix.getTile(7, 5)).toBeInstanceOf(Tile);
    expect(matrix.getTile(5, 6)).toBeNull();
    expect(matrix.getTile(6, 6)).toBeInstanceOf(Tile);
    expect(matrix.getTile(7, 6)).toBeNull();
    expect(matrix.getTiles().length).toBe(20);
  });

  it("Test collision", () => {
    const matrix = new Matrix(10, 20);

    const block: Block = {
      blockType: TBlockType,
      position: {
        x: 0,
        y: 0,
      },
      rotation: Rotation.UP,
    };

    matrix.setTile(new Tile(TileType.STATIC, ""), 1, 0);
    expect(matrix.isCollision(block, 0, 0, Rotation.UP)).toBeTruthy();
    expect(matrix.isCollision(block, 1, 0, Rotation.UP)).toBeFalsy();
    expect(matrix.isCollision(block, 0, 0, Rotation.RIGHT)).toBeFalsy();
    expect(matrix.isCollision(block, 1, 0, Rotation.RIGHT)).toBeTruthy();
  });

  it("Test movement", () => {
    const matrix = new Matrix(10, 20);

    const block: Block = {
      blockType: TBlockType,
      position: {
        x: 0,
        y: 0,
      },
      rotation: Rotation.UP,
    };

    matrix.setActiveBlock(block);
    matrix.moveDY(1);
    matrix.moveDY(1);
    matrix.moveDY(1);
    matrix.moveDY(1);
  });

  it("Test handle rows", () => {
    const matrix = new Matrix(5, 5);

    const testTile = new Tile(TileType.STATIC, "");

    matrix.setTile(testTile, 2, 3);

    matrix.setTile(testTile, 0, 4);
    matrix.setTile(testTile, 1, 4);
    matrix.setTile(testTile, 2, 4);
    matrix.setTile(testTile, 3, 4);
    matrix.setTile(testTile, 4, 4);
    matrix.handleRows();

    expect(matrix.getTiles()).toEqual([
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, testTile, null, null],
    ]);
  });
});
