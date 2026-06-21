"use client";

import Link from "next/link";
import type { Lesson, LessonProgress } from "@/types";

type LessonCardProps = {
  lesson: Lesson;
  progress?: LessonProgress;
};

const levelLabel = {
  beginner: "Nhap mon",
  elementary: "So cap",
  intermediate: "Trung cap",
};

export function LessonCard({ lesson, progress }: LessonCardProps) {
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="block rounded-lg bg-white p-4 shadow-soft transition hover:translate-y-[-1px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-leaf">{levelLabel[lesson.level]}</p>
          <h2 className="mt-1 text-lg font-bold text-ink">{lesson.titleVi}</h2>
          <p className="mt-1 text-base font-semibold text-slate-700">{lesson.titleZh}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            progress?.completed ? "bg-mint text-leaf" : "bg-slate-100 text-slate-600"
          }`}
        >
          {progress?.completed ? "Da xong" : "Chua hoc"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{lesson.descriptionVi}</p>
      <p className="mt-3 text-sm font-semibold text-slate-700">
        Do chinh xac: {progress ? `${progress.accuracy}%` : "0%"}
      </p>
    </Link>
  );
}
