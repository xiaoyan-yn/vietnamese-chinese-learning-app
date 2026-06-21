"use client";

import { useState } from "react";
import type { LessonQuestion } from "@/types";

type QuestionCardProps = {
  question: LessonQuestion;
  onAnswered: (questionId: string, isCorrect: boolean) => void;
};

export function QuestionCard({ question, onAnswered }: QuestionCardProps) {
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  function normalize(value: string) {
    return value.trim().toLowerCase();
  }

  function submitAnswer(value: string) {
    if (feedback) return;
    const isCorrect = normalize(value) === normalize(question.answer);
    setSelected(value);
    setFeedback(isCorrect ? "correct" : "wrong");
    onAnswered(question.id, isCorrect);
  }

  return (
    <article className="rounded-lg bg-white p-4 shadow-soft">
      <p className="text-sm font-semibold text-leaf">
        {question.type === "choice" ? "Chon dap an dung" : "Dien vao cho trong"}
      </p>
      <h3 className="mt-2 font-bold leading-6 text-ink">{question.promptVi}</h3>
      {question.chinese ? <p className="mt-2 text-lg font-bold text-ink">{question.chinese}</p> : null}
      {question.pinyin ? <p className="text-sm text-slate-500">{question.pinyin}</p> : null}

      {question.type === "choice" ? (
        <div className="mt-4 grid gap-2">
          {question.options?.map((option) => (
            <button
              key={option}
              className={`rounded-md border px-3 py-3 text-left text-sm font-semibold ${
                selected === option
                  ? feedback === "correct"
                    ? "border-leaf bg-mint text-leaf"
                    : "border-coral bg-rose-50 text-coral"
                  : "border-slate-200 bg-white text-ink"
              }`}
              onClick={() => submitAnswer(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            submitAnswer(selected);
          }}
        >
          <input
            className="min-w-0 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-leaf focus:bg-white"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
            placeholder="Nhap dap an"
            disabled={Boolean(feedback)}
          />
          <button className="rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white" type="submit">
            Kiem tra
          </button>
        </form>
      )}

      {feedback ? (
        <div
          className={`mt-4 rounded-md p-3 text-sm ${
            feedback === "correct" ? "bg-mint text-leaf" : "bg-rose-50 text-coral"
          }`}
        >
          <p className="font-bold">{feedback === "correct" ? "Dung roi" : "Chua dung"}</p>
          <p className="mt-1 text-slate-700">{question.explanationVi}</p>
        </div>
      ) : null}
    </article>
  );
}
