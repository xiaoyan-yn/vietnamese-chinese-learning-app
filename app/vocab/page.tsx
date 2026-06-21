"use client";

import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "@/lib/localStore";
import type { FavoriteItem } from "@/types";

const sourceLabel = {
  lesson: "Khoa hoc",
  scenario: "Tinh huong",
  translation: "Dich",
};

export default function VocabPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFavorites(getFavorites());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function handleRemove(id: string) {
    setFavorites(removeFavorite(id));
  }

  return (
    <main className="page-wrap">
      <header>
        <p className="text-sm font-semibold text-leaf">On tap</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">Tu da luu</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Xem lai tu va cau ban da luu tu bai hoc, tinh huong hoac trang dich.
        </p>
      </header>

      {favorites.length === 0 ? (
        <section className="mt-6 rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center">
          <p className="text-lg font-bold text-ink">Chua co tu nao</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Hay hoc mot bai hoac luu cau trong trang tinh huong de on tap sau.
          </p>
        </section>
      ) : (
        <section className="mt-5 space-y-3">
          {favorites.map((favorite) => (
            <article key={favorite.id} className="rounded-lg bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold text-leaf">
                    {sourceLabel[favorite.sourceType]} - {favorite.sourceTitle}
                  </span>
                  <p className="mt-3 text-xl font-bold text-ink">{favorite.chinese}</p>
                  <p className="text-sm text-slate-500">{favorite.pinyin}</p>
                </div>
                <button
                  className="shrink-0 rounded-md bg-rose-50 px-3 py-2 text-xs font-semibold text-coral"
                  onClick={() => handleRemove(favorite.id)}
                  type="button"
                >
                  Xoa
                </button>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">{favorite.vietnamese}</p>
              {favorite.noteVi ? <p className="mt-2 text-sm text-slate-600">{favorite.noteVi}</p> : null}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
