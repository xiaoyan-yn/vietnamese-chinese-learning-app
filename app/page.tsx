"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { lessons } from "@/data/lessons";
import { scenarios } from "@/data/scenarios";
import { getCompletedLessonCount, getStreakDays, markTodayCheckin } from "@/lib/progress";

export default function HomePage() {
  const [streakDays, setStreakDays] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const recommendedLesson = lessons[0];
  const recommendedScenario = scenarios[1];

  useEffect(() => {
    markTodayCheckin();
    setStreakDays(getStreakDays());
    setCompletedLessons(getCompletedLessonCount());
  }, []);

  return (
    <main className="page-wrap">
      <section className="rounded-lg bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-leaf">Xin chao</p>
        <h1 className="mt-2 text-2xl font-bold tracking-normal text-ink">
          Hoc tieng Trung moi ngay
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Luyen tu vung, cau giao tiep va tinh huong that bang tieng Trung co pinyin
          va giai thich tieng Viet.
        </p>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <StatCard label="Ngay hoc lien tiep" value={streakDays} />
        <StatCard label="Bai da hoan thanh" value={`${completedLessons}/${lessons.length}`} tone="yellow" />
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-ink">Bai hoc goi y hom nay</h2>
        <Link
          href={`/lessons/${recommendedLesson.id}`}
          className="mt-3 block rounded-lg bg-white p-4 shadow-soft"
        >
          <p className="text-sm font-semibold text-leaf">{recommendedLesson.titleZh}</p>
          <h3 className="mt-1 text-xl font-bold text-ink">{recommendedLesson.titleVi}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{recommendedLesson.descriptionVi}</p>
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold text-ink">Tinh huong goi y</h2>
        <Link href="/scenarios" className="mt-3 block rounded-lg bg-mint p-4">
          <p className="text-sm font-semibold text-leaf">{recommendedScenario.titleZh}</p>
          <h3 className="mt-1 text-xl font-bold text-ink">{recommendedScenario.titleVi}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {recommendedScenario.descriptionVi}
          </p>
        </Link>
      </section>

      <section className="mt-6 grid gap-3">
        <Link className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm" href="/translate">
          <p className="font-semibold text-ink">Dich nhanh</p>
          <p className="mt-1 text-sm text-slate-600">Nhap tieng Viet hoac tieng Trung.</p>
        </Link>
        <Link className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm" href="/vocab">
          <p className="font-semibold text-ink">On lai tu da luu</p>
          <p className="mt-1 text-sm text-slate-600">Xem lai cac cau huu ich ban da luu.</p>
        </Link>
      </section>
    </main>
  );
}
