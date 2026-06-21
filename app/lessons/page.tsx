"use client";

import { useEffect, useState } from "react";
import { LessonCard } from "@/components/LessonCard";
import { lessons } from "@/data/lessons";
import { getAllLessonProgress } from "@/lib/localStore";
import type { LessonProgress } from "@/types";

export default function LessonsPage() {
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProgress(getAllLessonProgress());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="page-wrap">
      <header>
        <p className="text-sm font-semibold text-leaf">Lo trinh</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">Danh sach bai hoc</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Hoc theo tung bai ngan. Moi bai co tu vung, cau mau, hoi thoai va bai tap.
        </p>
      </header>

      <section className="mt-5 space-y-3">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} progress={progress[lesson.id]} />
        ))}
      </section>
    </main>
  );
}
