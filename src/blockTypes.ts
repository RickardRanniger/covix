export enum Orientation {
  UP = 0,
  RIGHT = 90,
  DOWN = 180,
  LEFT = 270,
}

export interface BlockType {
  color: colorMap;
  code: string;
  0: number[][];
  90: number[][];
  180: number[][];
  270: number[][];
}

export interface Block {
  position: {
    x: number;
    y: number;
  };

  rotation: Orientation;

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
  0: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  90: [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  180: [
    [1, 1, 1],
    [0, 1, 0],
  ],
  270: [
    [0, 1],
    [1, 1],
    [0, 1],
  ],
};

export const IBlockType: BlockType = {
  color: colorMap.I,
  code: "I",
  0: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  90: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  180: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  270: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
};

export const OBlockType: BlockType = {
  color: colorMap.O,
  code: "O",
  0: [
    [1, 1],
    [1, 1],
  ],
  90: [
    [1, 1],
    [1, 1],
  ],
  180: [
    [1, 1],
    [1, 1],
  ],
  270: [
    [1, 1],
    [1, 1],
  ],
};

export const SBlockType: BlockType = {
  color: colorMap.S,
  code: "S",
  0: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  90: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  180: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  270: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
};

export const ZBlockType: BlockType = {
  color: colorMap.Z,
  code: "Z",
  0: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  90: [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  180: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  270: [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
};

export const JBlockType: BlockType = {
  color: colorMap.J,
  code: "J",
  0: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  90: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  180: [
    [1, 1, 1],
    [0, 0, 1],
  ],
  270: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
};

export const LBlockType: BlockType = {
  color: colorMap.L,
  code: "L",
  0: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  90: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  180: [
    [1, 1, 1],
    [1, 0, 0],
  ],
  270: [
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
