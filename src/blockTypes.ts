export enum Rotation {
  UP = 0,
  RIGHT = 90,
  DOWN = 180,
  LEFT = 270,
}

export interface BlockType {
  color: colorMap;
  code: string;
  [Rotation.UP]: number[][];
  [Rotation.RIGHT]: number[][];
  [Rotation.DOWN]: number[][];
  [Rotation.LEFT]: number[][];
}

export interface Block {
  position: {
    x: number;
    y: number;
  };

  rotation: Rotation;

  blockType: BlockType;
}

export enum colorMap {
  T = "#800080",
  I = "#00ffff",
  O = "#ffff00",
  S = "#00ff00",
  L = "#ff7f00",
  J = "#0000ff",
  Z = "#ff0000",
}

export const TBlockType: BlockType = {
  color: colorMap.T,
  code: "T",
  [Rotation.UP]: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [Rotation.RIGHT]: [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  [Rotation.DOWN]: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [Rotation.LEFT]: [
    [0, 1],
    [1, 1],
    [0, 1],
  ],
};

export const IBlockType: BlockType = {
  color: colorMap.I,
  code: "I",
  [Rotation.UP]: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [Rotation.RIGHT]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  [Rotation.DOWN]: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [Rotation.LEFT]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
};

export const OBlockType: BlockType = {
  color: colorMap.O,
  code: "O",
  [Rotation.UP]: [
    [1, 1],
    [1, 1],
  ],
  [Rotation.RIGHT]: [
    [1, 1],
    [1, 1],
  ],
  [Rotation.DOWN]: [
    [1, 1],
    [1, 1],
  ],
  [Rotation.LEFT]: [
    [1, 1],
    [1, 1],
  ],
};

export const SBlockType: BlockType = {
  color: colorMap.S,
  code: "S",
  [Rotation.UP]: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [Rotation.RIGHT]: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [Rotation.DOWN]: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [Rotation.LEFT]: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
};

export const ZBlockType: BlockType = {
  color: colorMap.Z,
  code: "Z",
  [Rotation.UP]: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [Rotation.RIGHT]: [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  [Rotation.DOWN]: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [Rotation.LEFT]: [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
};

export const JBlockType: BlockType = {
  color: colorMap.J,
  code: "J",
  [Rotation.UP]: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [Rotation.RIGHT]: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [Rotation.DOWN]: [
    [1, 1, 1],
    [0, 0, 1],
  ],
  [Rotation.LEFT]: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
};

export const LBlockType: BlockType = {
  color: colorMap.L,
  code: "L",
  [Rotation.UP]: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [Rotation.RIGHT]: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [Rotation.DOWN]: [
    [1, 1, 1],
    [1, 0, 0],
  ],
  [Rotation.LEFT]: [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
};

export const blockTypes = [
  TBlockType,
  IBlockType,
  OBlockType,
  SBlockType,
  ZBlockType,
  JBlockType,
  LBlockType,
];
