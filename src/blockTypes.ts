export enum Orientation {
  UP = 0,
  RIGHT = 90,
  DOWN = 180,
  LEFT = 270,
}

export interface BlockType {
  color: colorMap;
  code: string;
  [Orientation.UP]: number[][];
  [Orientation.RIGHT]: number[][];
  [Orientation.DOWN]: number[][];
  [Orientation.LEFT]: number[][];
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
  T = '#800080',
  I = '#00ffff',
  O = '#ffff00',
  S = '#00ff00',
  L = '#ff7f00',
  J = '#0000ff',
  Z = '#ff0000',
}

export const TBlockType: BlockType = {
  color: colorMap.T,
  code: 'T',
  [Orientation.UP]: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [Orientation.RIGHT]: [
    [1, 0],
    [1, 1],
    [1, 0]
  ],
  [Orientation.DOWN]: [
    [1, 1, 1],
    [0, 1, 0]
  ],
  [Orientation.LEFT]: [
    [0, 1],
    [1, 1],
    [0, 1]
  ]
}

export const IBlockType: BlockType = {
  color: colorMap.I,
  code: 'I',
  [Orientation.UP]: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [Orientation.RIGHT]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1]
  ],
  [Orientation.DOWN]: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [Orientation.LEFT]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1]
  ]
}

export const OBlockType: BlockType = {
  color: colorMap.O,
  code: 'O',
  [Orientation.UP]: [
    [1, 1],
    [1, 1]
  ],
  [Orientation.RIGHT]: [
    [1, 1],
    [1, 1]
  ],
  [Orientation.DOWN]: [
    [1, 1],
    [1, 1]
  ],
  [Orientation.LEFT]: [
    [1, 1],
    [1, 1]
  ]
}

export const SBlockType: BlockType = {
  color: colorMap.S,
  code: 'S',
  [Orientation.UP]: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [Orientation.RIGHT]: [
    [1, 0],
    [1, 1],
    [0, 1]
  ],
  [Orientation.DOWN]: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  [Orientation.LEFT]: [
    [1, 0],
    [1, 1],
    [0, 1]
  ]
}

export const ZBlockType: BlockType = {
  color: colorMap.Z,
  code: 'Z',
  [Orientation.UP]: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [Orientation.RIGHT]: [
    [0, 1],
    [1, 1],
    [1, 0]
  ],
  [Orientation.DOWN]: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [Orientation.LEFT]: [
    [0, 1],
    [1, 1],
    [1, 0]
  ]
}

export const JBlockType: BlockType = {
  color: colorMap.J,
  code: 'J',
  [Orientation.UP]: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  [Orientation.RIGHT]: [
    [1, 1],
    [1, 0],
    [1, 0]
  ],
  [Orientation.DOWN]: [
    [1, 1, 1],
    [0, 0, 1]
  ],
  [Orientation.LEFT]: [
    [0, 1],
    [0, 1],
    [1, 1]
  ]
}

export const LBlockType: BlockType = {
  color: colorMap.L,
  code: 'L',
  [Orientation.UP]: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  [Orientation.RIGHT]: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  [Orientation.DOWN]: [
    [1, 1, 1],
    [1, 0, 0]
  ],
  [Orientation.LEFT]: [
    [1, 1],
    [0, 1],
    [0, 1]
  ]
}

export const blockTypes = [
  TBlockType,
  IBlockType,
  OBlockType,
  SBlockType,
  ZBlockType,
  JBlockType,
  LBlockType
]
