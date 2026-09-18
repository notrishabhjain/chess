"use client";

import { PracticeBoard } from "@/components/chess/practice-board";
import { useApp } from "@/components/layout/app-provider";

export default function PracticePage() {
  const { progress } = useApp();
  const locale = progress.locale;

  return (
    <main className="shell page">
      <div className="eyebrow">{locale === "en" ? "Chess core" : "शतरंज की बुनियाद"}</div>
      <h1 className="section-title practice-title">{locale === "en" ? "Practice every move with confidence" : "हर चाल का आत्मविश्वास से अभ्यास करें"}</h1>
      <p className="lead">{locale === "en" ? "Use click-to-move or drag and drop. Every move is checked by the chess rules engine, so you can safely experiment." : "क्लिक करके या खींचकर चाल चलें। हर चाल को शतरंज के नियमों वाला इंजन जाँचता है, इसलिए आप निश्चिंत होकर प्रयोग कर सकते हैं।"}</p>
      <div className="practice-spacer"><PracticeBoard locale={locale} /></div>
    </main>
  );
}
