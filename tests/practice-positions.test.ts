import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { practicePositions } from "../lib/chess/practice-positions";

describe("practice positions", () => {
  it("contains valid chess positions in both languages", () => {
    for (const position of practicePositions) {
      expect(() => new Chess(position.fen)).not.toThrow();
      expect(position.name.en).not.toEqual("");
      expect(position.name.hi).not.toEqual("");
    }
  });
});

it("allows a legal knight jump in the dedicated training position", () => {
  const game = new Chess(practicePositions[1].fen);
  expect(game.move({ from: "d4", to: "f5" })?.san).toBe("Nf5");
});
