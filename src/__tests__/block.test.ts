import { Block } from "../block";

it("Test can create block", () => {
    const block = new Block(10,5,20,50);
    expect(Object.values(block)).toEqual([10,5,20,50]);
});
