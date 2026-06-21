"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { addFavorite, saveLessonProgress } from "@/lib/localStore";
import { markTodayCheckin } from "@/lib/progress";
import type { Lesson, LessonItem } from "@/types";

type LessonDetailClientProps = {
  lesson?: Lesson;
};

function StudyItemCard({
  item,
  sourceTitle,
  label,
}: {
  item: LessonItem;
  sourceTitle: string;
  label: string;
}) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    addFavorite({
      sourceType: "lesson",
      sourceTitle,
      chinese: item.chinese,
      pinyin: item.pinyin,
      vietnamese: item.vietnamese,
      noteVi: item.noteVi,
    });
    setSaved(true);
  }

  return (
    <article className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-leaf">{label}</p>
          <p className="mt-2 text-xl font-bold text-ink">{item.chinese}</p>
          <p className="text-sm text-slate-500">{item.pinyin}</p>
        </div>
        <button
          className="shrink-0 rounded-md bg-mint px-3 py-2 text-xs font-semibold text-leaf"
          onClick={handleSave}
          type="button"
        >
          {saved ? "Da luu" : "Luu"}
        </button>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700">{item.vietnamese}</p>
      {item.noteVi ? <p className="mt-2 text-sm text-slate-600">{item.noteVi}</p> : null}
    </article>
  );
}

export function LessonDetailClient({ lesson }: LessonDetailClientProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const correctCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers],
  );
  const answeredCount = Object.keys(answers).length;
  const totalCount = lesson?.questions.length ?? 0;

  function handleAnswered(questionId: string, isCorrect: boolean) {
    if (!lesson || answers[questionId] !== undefined) return;

    const nextAnswers = {
      ...answers,
      [questionId]: isCorrect,
    };
    setAnswers(nextAnswers);

    if (Object.keys(nextAnswers).length === lesson.questions.length) {
      const finalCorrectCount = Object.values(nextAnswers).filter(Boolean).length;
      saveLessonProgress({
        lessonId: lesson.id,
        completed: true,
        correctCount: finalCorrectCount,
        totalCount: lesson.questions.length,
      });
      markTodayCheckin();
      setCompleted(true);
    }
  }

  if (!lesson) {
    return (
      <main className="page-wrap">
        <Link href="/lessons" className="text-sm font-semibold text-leaf">
          Quay lai danh sach
        </Link>
        <section className="mt-4 rounded-lg bg-white p-6 text-center shadow-soft">
          <h1 className="text-xl font-bold text-ink">Khong tim thay bai hoc</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Bai hoc nay chua co trong du lieu noi bo. Hay quay lai danh sach bai hoc.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <Link href="/lessons" className="text-sm font-semibold text-leaf">
        Quay lai danh sach
      </Link>

      <section className="mt-4 rounded-lg bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-leaf">Bai hoc</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">{lesson.titleVi}</h1>
        <p className="mt-1 text-lg font-semibold text-slate-700">{lesson.titleZh}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{lesson.descriptionVi}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-ink">Tu vung</h2>
        <div className="mt-3 space-y-3">
          {lesson.vocabulary.map((item) => (
            <StudyItemCard key={item.id} item={item} sourceTitle={lesson.titleVi} label="Tu moi" />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-ink">Cau mau</h2>
        <div className="mt-3 space-y-3">
          {lesson.sentences.map((item) => (
            <StudyItemCard key={item.id} item={item} sourceTitle={lesson.titleVi} label="Cau" />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-ink">Hoi thoai</h2>
        <div className="mt-3 space-y-3">
          {lesson.dialogue.map((line) => (
            <article key={line.id} className="rounded-lg bg-mint p-4">
              <p className="text-xs font-semibold uppercase text-leaf">{line.speakerVi}</p>
              <p className="mt-2 text-xl font-bold text-ink">{line.chinese}</p>
              <p className="text-sm text-slate-500">{line.pinyin}</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{line.vietnamese}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-ink">Bai tap</h2>
            <p className="mt-1 text-sm text-slate-600">
              Da tra loi {answeredCount}/{totalCount} cau
            </p>
          </div>
          <p className="text-sm font-semibold text-leaf">
            Dung: {correctCount}/{totalCount}
          </p>
        </div>
        <div className="mt-3 space-y-3">
          {lesson.questions.map((question) => (
            <QuestionCard key={question.id} question={question} onAnswered={handleAnswered} />
          ))}
        </div>
      </section>

      {completed ? (
        <section className="mt-5 rounded-lg bg-leaf p-4 text-white">
          <p className="font-bold">Hoan thanh bai hoc</p>
          <p className="mt-1 text-sm">
            Ket qua cua ban da duoc luu. Do chinh xac:{" "}
            {Math.round((correctCount / Math.max(totalCount, 1)) * 100)}%.
          </p>
        </section>
      ) : null}
    </main>
  );
}
