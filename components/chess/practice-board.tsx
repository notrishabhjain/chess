"use client";

import { Chess } from "chess.js";
import { useState } from "react";
import { pick } from "@/lib/i18n";
import { practicePositions } from "@/lib/chess/practice-positions";
import { Chessboard } from "./chessboard";

type Locale = "en" | "hi";

export function PracticeBoard({ locale }: { locale: Locale }) {
  const [positionId, setPositionId] = useState(practicePositions[0].id);
  const [baseFen, setBaseFen] = useState(practicePositions[0].fen);
  const [fen, setFen] = useState(practicePositions[0].fen);
  const [moves, setMoves] = useState<string[]>([]);
  const [orientation, setOrientation] = useState<"w" | "b">("w");
  const [pgn, setPgn] = useState("");
  const [message, setMessage] = useState("");
  const current = practicePositions.find((position) => position.id === positionId) ?? practicePositions[0];

  function loadPosition(id: string) {
    const position = practicePositions.find((item) => item.id === id) ?? practicePositions[0];
    setPositionId(position.id);
    setBaseFen(position.fen);
    setFen(position.fen);
    setMoves([]);
    setMessage("");
  }

  function restart() {
    setBaseFen(current.fen);
    setFen(current.fen);
    setMoves([]);
    setMessage("");
  }

  function undo() {
    if (moves.length === 0) return;
    const game = new Chess(baseFen);
    try {
      moves.slice(0, -1).forEach((san) => game.move(san));
      setMoves((history) => history.slice(0, -1));
      setFen(game.fen());
      setMessage("");
    } catch {
      restart();
    }
  }

  function importPgn() {
    const game = new Chess();
    try {
      game.loadPgn(pgn);
      setBaseFen(new Chess().fen());
      setFen(game.fen());
      setMoves(game.history());
      setMessage(locale === "en" ? "PGN loaded successfully." : "PGN सफलतापूर्वक लोड हो गया।");
    } catch {
      setMessage(locale === "en" ? "That PGN could not be read. Check its notation and try again." : "यह PGN पढ़ा नहीं जा सका। नोटेशन जाँचकर फिर कोशिश करें।");
    }
  }

  return (
    <section className="practice-layout">
      <div>
        <Chessboard
          fen={fen}
          key={fen}
          onPositionChange={(nextFen, san) => {
            setFen(nextFen);
            setMoves((history) => [...history, san]);
          }}
          orientation={orientation}
        />
        <div className="board-controls" aria-label={locale === "en" ? "Board controls" : "बोर्ड नियंत्रण"}>
          <button className="button secondary" onClick={undo} type="button">↶ {locale === "en" ? "Undo" : "वापस"}</button>
          <button className="button secondary" onClick={restart} type="button">↻ {locale === "en" ? "Restart" : "फिर शुरू करें"}</button>
          <button className="button secondary" onClick={() => setOrientation((side) => side === "w" ? "b" : "w")} type="button">⇅ {locale === "en" ? "Flip board" : "बोर्ड पलटें"}</button>
        </div>
      </div>
      <aside className="card panel">
        <span className="tag">{locale === "en" ? "Chess practice" : "शतरंज अभ्यास"}</span>
        <h1>{pick(current.name, locale)}</h1>
        <p>{pick(current.description, locale)}</p>
        <label className="field-label">
          {locale === "en" ? "Practice position" : "अभ्यास की स्थिति"}
          <select value={positionId} onChange={(event) => loadPosition(event.target.value)}>
            {practicePositions.map((position) => <option key={position.id} value={position.id}>{pick(position.name, locale)}</option>)}
          </select>
        </label>
        <h3>{locale === "en" ? "Move history" : "चालों का इतिहास"}</h3>
        <ol className="move-history" aria-live="polite">
          {moves.length ? moves.map((move, index) => <li key={`${move}-${index}`}>{Math.floor(index / 2) + 1}{index % 2 === 0 ? "." : "…"} {move}</li>) : <li>{locale === "en" ? "Your moves will appear here." : "आपकी चालें यहाँ दिखेंगी।"}</li>}
        </ol>
        <details className="pgn-import">
          <summary>{locale === "en" ? "Import a PGN" : "PGN इंपोर्ट करें"}</summary>
          <label className="field-label">
            {locale === "en" ? "Paste PGN" : "PGN चिपकाएँ"}
            <textarea value={pgn} onChange={(event) => setPgn(event.target.value)} placeholder="1. e4 e5 2. Nf3 Nc6" rows={5} />
          </label>
          <button className="button" onClick={importPgn} type="button">{locale === "en" ? "Load game" : "गेम लोड करें"}</button>
        </details>
        {message && <p className="feedback" role="status">{message}</p>}
      </aside>
    </section>
  );
}
