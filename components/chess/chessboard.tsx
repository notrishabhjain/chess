"use client";

import { Chess, type Color, type Square } from "chess.js";
import { useEffect, useMemo, useState } from "react";

const PIECES: Record<string, string> = {
  wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
  bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟",
};

type ChessboardProps = {
  fen: string;
  orientation?: Color;
  interactive?: boolean;
  target?: string;
  onSquare?: (square: string) => void;
  onMove?: (move: string, legal: boolean) => void;
  onPositionChange?: (fen: string, san: string) => void;
};

const WHITE_FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const WHITE_RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

export function Chessboard({
  fen,
  orientation = "w",
  interactive = true,
  target,
  onSquare,
  onMove,
  onPositionChange,
}: ChessboardProps) {
  const [position, setPosition] = useState(fen);
  const [selected, setSelected] = useState<Square>();
  const [draggedSquare, setDraggedSquare] = useState<Square>();

  useEffect(() => {
    setPosition(fen);
    setSelected(undefined);
  }, [fen]);

  const game = useMemo(() => new Chess(position), [position]);
  const files = orientation === "w" ? WHITE_FILES : [...WHITE_FILES].reverse();
  const ranks = orientation === "w" ? WHITE_RANKS : [...WHITE_RANKS].reverse();
  const legalSquares = selected
    ? game.moves({ square: selected, verbose: true }).map((move) => move.to)
    : [];

  function attemptMove(from: Square, to: Square) {
    const notation = `${from}-${to}`;

    try {
      const move = game.move({ from, to, promotion: "q" });
      if (!move) {
        onMove?.(notation, false);
        return;
      }
      setPosition(game.fen());
      onMove?.(notation, true);
      onPositionChange?.(game.fen(), move.san);
    } catch {
      onMove?.(notation, false);
    } finally {
      setSelected(undefined);
      setDraggedSquare(undefined);
    }
  }

  function handleSquare(square: Square) {
    onSquare?.(square);
    if (!interactive) return;

    if (!selected) {
      if (game.get(square)?.color === game.turn()) setSelected(square);
      return;
    }

    if (selected === square) {
      setSelected(undefined);
      return;
    }

    attemptMove(selected, square);
  }

  return (
    <div className="board" role="grid" aria-label="Interactive chess board">
      {ranks.flatMap((rank, rowIndex) =>
        files.map((file, columnIndex) => {
          const square = `${file}${rank}` as Square;
          const currentPiece = game.get(square);
          const isLight = (rowIndex + columnIndex) % 2 === 0;
          const showsRank = columnIndex === 0;
          const showsFile = rowIndex === 7;

          return (
            <button
              aria-label={`${square}${currentPiece ? ` ${currentPiece.color === "w" ? "white" : "black"} ${currentPiece.type}` : ""}`}
              className={`square ${isLight ? "light" : "dark"} ${selected === square ? "selected" : ""} ${legalSquares.includes(square) ? "legal" : ""} ${target === square ? "target" : ""}`}
              draggable={interactive && Boolean(currentPiece && currentPiece.color === game.turn())}
              key={square}
              onClick={() => handleSquare(square)}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={() => setDraggedSquare(square)}
              onDrop={() => draggedSquare && attemptMove(draggedSquare, square)}
              role="gridcell"
              type="button"
            >
              {currentPiece && PIECES[`${currentPiece.color}${currentPiece.type}`]}
              {(showsRank || showsFile) && (
                <span className="coord">
                  {showsRank ? rank : ""}
                  {showsFile ? file : ""}
                </span>
              )}
            </button>
          );
        }),
      )}
    </div>
  );
}
