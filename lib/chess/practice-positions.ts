export type PracticePosition = {
  id: string;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  fen: string;
};

export const practicePositions: PracticePosition[] = [
  {
    id: "starting-position",
    name: { en: "Starting position", hi: "शुरुआती स्थिति" },
    description: { en: "Play a legal move from the standard setup.", hi: "सामान्य शुरुआती स्थिति से सही चाल चलें।" },
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  },
  {
    id: "knight-training",
    name: { en: "Knight training", hi: "घोड़े का अभ्यास" },
    description: { en: "Explore the knight's legal jumps from d4.", hi: "d4 से घोड़े की सही छलांगें देखें।" },
    fen: "4k3/8/8/8/3N4/8/8/4K3 w - - 0 1",
  },
  {
    id: "mate-in-one",
    name: { en: "Mate in one", hi: "एक चाल में मात" },
    description: { en: "Find the queen move that checkmates the king.", hi: "रानी की वह चाल खोजें जो राजा को शहमात करे।" },
    fen: "7k/5Q2/7K/8/8/8/8/8 w - - 0 1",
  },
];
