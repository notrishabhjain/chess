export type Locale = "en" | "hi";
export type Localized<T = string> = Record<Locale, T>;
export const copy: Record<string, Localized> = {
  home:{en:"Home",hi:"होम"}, learn:{en:"Learn",hi:"सीखें"}, practice:{en:"Practice",hi:"अभ्यास"}, puzzles:{en:"Puzzles",hi:"पहेलियाँ"}, play:{en:"Play",hi:"खेलें"}, progress:{en:"Progress",hi:"प्रगति"}, profile:{en:"Profile",hi:"प्रोफ़ाइल"},
  start:{en:"Start learning",hi:"सीखना शुरू करें"}, continue:{en:"Continue lesson",hi:"पाठ जारी रखें"}, next:{en:"Continue",hi:"आगे बढ़ें"}, hint:{en:"Show hint",hi:"संकेत देखें"}, reveal:{en:"Reveal answer",hi:"उत्तर दिखाएँ"},
  level:{en:"Level 1 — Absolute Beginner",hi:"स्तर 1 — बिल्कुल शुरुआती"}, dashboard:{en:"Your progress",hi:"आपकी प्रगति"}, lessons:{en:"Lessons completed",hi:"पूरे किए गए पाठ"}
};
export const t=(key:string,locale:Locale)=>copy[key]?.[locale] ?? key;
export const pick=<T,>(value:Localized<T>,locale:Locale)=>value[locale];
