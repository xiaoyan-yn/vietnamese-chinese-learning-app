"use client";

import { useState } from "react";
import { TranslationResult } from "@/components/TranslationResult";
import type {
  TranslationDirection,
  TranslationResult as TranslationResultType,
} from "@/types";

const directionOptions: Array<{ value: TranslationDirection; label: string; hint: string }> = [
  { value: "vi-to-zh", label: "Viet -> Trung", hint: "Nhap tieng Viet de nhan tieng Trung va pinyin." },
  { value: "zh-to-vi", label: "Trung -> Viet", hint: "Nhap tieng Trung de xem giai thich tieng Viet." },
];

export default function TranslatePage() {
  const [text, setText] = useState("Xin chào");
  const [direction, setDirection] = useState<TranslationDirection>("vi-to-zh");
  const [result, setResult] = useState<TranslationResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTranslate() {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError("Vui long nhap cau can dich.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmedText, direction }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Khong the dich cau nay.");
      }

      setResult(payload as TranslationResultType);
    } catch (translationError) {
      setResult(null);
      setError(
        translationError instanceof Error
          ? translationError.message
          : "Da co loi khi dich. Vui long thu lai.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <header>
        <p className="text-sm font-semibold text-leaf">Cong cu</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">Dich Viet - Trung</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Dich cau thuong dung, xem pinyin, giai thich tieng Viet, tach tu va nghe
          phat am tieng Trung.
        </p>
      </header>

      <section className="mt-5 rounded-lg bg-white p-4 shadow-soft">
        <div className="grid grid-cols-2 gap-2">
          {directionOptions.map((option) => (
            <button
              key={option.value}
              className={`rounded-md px-3 py-3 text-sm font-semibold ${
                direction === option.value ? "bg-leaf text-white" : "bg-slate-100 text-slate-600"
              }`}
              onClick={() => {
                setDirection(option.value);
                setResult(null);
                setError("");
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className="mt-3 text-xs text-slate-500">
          {directionOptions.find((option) => option.value === direction)?.hint}
        </p>

        <label htmlFor="translate-input" className="mt-4 block text-sm font-semibold text-ink">
          Nhap cau can dich
        </label>
        <textarea
          id="translate-input"
          className="mt-3 min-h-32 w-full resize-none rounded-md border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-leaf focus:bg-white"
          onChange={(event) => setText(event.target.value)}
          placeholder={direction === "vi-to-zh" ? "Vi du: Xin chào" : "例如：你好"}
          value={text}
        />

        {error ? (
          <p className="mt-3 rounded-md bg-rose-50 p-3 text-sm font-semibold text-coral">{error}</p>
        ) : null}

        <button
          className="mt-3 w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={loading}
          onClick={handleTranslate}
          type="button"
        >
          {loading ? "Dang dich..." : "Dich ngay"}
        </button>
      </section>

      <section className="mt-4">
        {result ? (
          <TranslationResult result={result} />
        ) : (
          <div className="rounded-lg border border-dashed border-emerald-200 bg-mint p-4">
            <p className="text-sm font-semibold text-leaf">Goi y thu nhanh</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Thu nhap: Xin chào, Cảm ơn, Anh nhớ em, Tôi muốn ăn cơm, hoặc 这个多少钱？
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
