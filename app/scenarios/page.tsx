"use client";

import { useState } from "react";
import { ScenarioPhraseCard } from "@/components/ScenarioPhraseCard";
import { scenarios } from "@/data/scenarios";
import { addFavorite } from "@/lib/localStore";
import type { FavoriteItem } from "@/types";

export default function ScenariosPage() {
  const [savedMessage, setSavedMessage] = useState("");

  function handleFavorite(item: Omit<FavoriteItem, "id" | "createdAt">) {
    addFavorite(item);
    setSavedMessage(`Da luu: ${item.chinese}`);
  }

  return (
    <main className="page-wrap">
      <header>
        <p className="text-sm font-semibold text-leaf">Thuc hanh</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">Tinh huong giao tiep</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Hoc cau tieng Trung theo tung tinh huong that trong doi song.
        </p>
      </header>

      {savedMessage ? (
        <div className="mt-4 rounded-md bg-mint p-3 text-sm font-semibold text-leaf">
          {savedMessage}
        </div>
      ) : null}

      <section className="mt-5 space-y-6">
        {scenarios.map((scenario) => (
          <article key={scenario.id}>
            <div className="mb-3">
              <p className="text-sm font-semibold text-leaf">{scenario.titleZh}</p>
              <h2 className="text-xl font-bold text-ink">{scenario.titleVi}</h2>
              <p className="mt-1 text-sm text-slate-600">{scenario.descriptionVi}</p>
            </div>
            <div className="space-y-3">
              {scenario.phrases.map((phrase) => (
                <ScenarioPhraseCard
                  key={phrase.id}
                  phrase={phrase}
                  sourceTitle={scenario.titleVi}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
