"use client";

import type { FavoriteItem, ScenarioPhrase } from "@/types";

type ScenarioPhraseCardProps = {
  phrase: ScenarioPhrase;
  sourceTitle: string;
  onFavorite: (item: Omit<FavoriteItem, "id" | "createdAt">) => void;
};

export function ScenarioPhraseCard({ phrase, sourceTitle, onFavorite }: ScenarioPhraseCardProps) {
  return (
    <article className="rounded-lg bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-bold text-ink">{phrase.chinese}</p>
          <p className="mt-1 text-sm text-slate-500">{phrase.pinyin}</p>
        </div>
        <button
          className="shrink-0 rounded-md bg-mint px-3 py-2 text-xs font-semibold text-leaf"
          onClick={() =>
            onFavorite({
              sourceType: "scenario",
              sourceTitle,
              chinese: phrase.chinese,
              pinyin: phrase.pinyin,
              vietnamese: phrase.vietnamese,
              noteVi: phrase.usageVi,
            })
          }
          type="button"
        >
          Luu
        </button>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-700">{phrase.vietnamese}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{phrase.usageVi}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {phrase.replacements.map((replacement) => (
          <span key={replacement} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {replacement}
          </span>
        ))}
      </div>
    </article>
  );
}
