"use client";

import Link from "next/link";
import { useState } from "react";
import { Chessboard } from "@/components/chess/chessboard";
import type { Lesson } from "@/lib/curriculum/types";
import { pick, t } from "@/lib/i18n";
import { useApp } from "@/components/layout/app-provider";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const { progress, update } = useApp();
  const locale = progress.locale;
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [attemptVersion, setAttemptVersion] = useState(0);
  const completed = progress.lessons[lesson.id]?.status === "completed";

  function complete() {
    update((current) => ({
      ...current,
      lessons: {
        ...current.lessons,
        [lesson.id]: {
          status: "completed",
          mastery: 100,
          attempts: (current.lessons[lesson.id]?.attempts ?? 0) + 1,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  }

  function answer(value: string) {
    const correct = value === lesson.exercise.answer;
    setFeedback(correct ? "success" : "error");
    if (correct) complete();
    else setAttemptVersion((version) => version + 1);
  }

  return (
    <section className="lesson">
      <Chessboard
        fen={lesson.exercise.fen}
        key={attemptVersion}
        onMove={(move) => answer(move)}
        onSquare={lesson.exercise.type === "square" ? answer : undefined}
        target={feedback === "success" ? lesson.exercise.answer.split("-").at(-1) : undefined}
      />
      <div className="card panel">
        <span className="tag">{lesson.topic}</span>
        <h1>{pick(lesson.title, locale)}</h1>
        <p>{pick(lesson.intro, locale)}</p>
        <h3>{pick(lesson.exercise.instruction, locale)}</h3>
        {feedback && (
          <div className={`feedback ${feedback === "error" ? "error" : ""}`}>
            {pick(feedback === "success" ? lesson.exercise.success : lesson.exercise.error, locale)}
            <br />
            <small>{pick(lesson.exercise.explanation, locale)}</small>
          </div>
        )}
        {hintVisible && <p className="hint">💡 {pick(lesson.exercise.hint, locale)}</p>}
        {!feedback && <button className="button secondary" onClick={() => setHintVisible(true)} type="button">{t("hint", locale)}</button>}
        {feedback === "error" && <button className="button secondary" onClick={() => setFeedback(null)} type="button">{locale === "en" ? "Try again" : "फिर कोशिश करें"}</button>}
        {completed && (
          <div className="buttons">
            <Link className="button" href="/progress">{locale === "en" ? "See progress" : "प्रगति देखें"}</Link>
            <Link className="button secondary" href="/learn">{locale === "en" ? "All lessons" : "सभी पाठ"}</Link>
          </div>
        )}
      </div>
    </section>
  );
}
