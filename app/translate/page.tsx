"use client";

import { useState } from "react";
import { TranslationResult } from "@/components/TranslationResult";
import type {
  TranslationInputDirection,
  TranslationResult as TranslationResultType,
} from "@/types";

const directionOptions: Array<{ value: TranslationInputDirection; label: string; hint: string }> = [
  {
    value: "auto",
    label: "Tự nhận biết",
    hint: "Nhập tiếng Việt hoặc tiếng Trung, hệ thống tự chọn hướng dịch.",
  },
  {
    value: "vi-to-zh",
    label: "Việt → Trung",
    hint: "Nhập tiếng Việt để nhận câu tiếng Trung, pinyin và cách dùng.",
  },
  {
    value: "zh-to-vi",
    label: "Trung → Việt",
    hint: "Nhập tiếng Trung để xem nghĩa tiếng Việt, pinyin và tách từ.",
  },
];

export default function TranslatePage() {
  const [text, setText] = useState("Anh nhớ em");
  const [direction, setDirection] = useState<TranslationInputDirection>("auto");
  const [result, setResult] = useState<TranslationResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTranslate() {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError("Vui lòng nhập câu cần dịch.");
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
        throw new Error(payload.error || "Không thể dịch câu này.");
      }

      setResult(payload as TranslationResultType);
    } catch (translationError) {
      setResult(null);
      setError(
        translationError instanceof Error
          ? translationError.message
          : "Đã có lỗi khi dịch. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <header>
        <p className="text-sm font-semibold text-leaf">Công cụ chính</p>
        <h1 className="mt-1 text-2xl font-bold text-ink">Dịch Việt - Trung</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Nhập câu bất kỳ để nhận bản dịch, pinyin, giải thích tiếng Việt, tách từ,
          câu trả lời thường dùng và phát âm tiếng Trung.
        </p>
      </header>

      <section className="mt-5 rounded-lg bg-white p-4 shadow-soft">
        <div className="grid grid-cols-3 gap-2">
          {directionOptions.map((option) => (
            <button
              key={option.value}
              className={`min-h-12 rounded-md px-2 py-3 text-sm font-semibold ${
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
          Nhập câu cần dịch
        </label>
        <textarea
          id="translate-input"
          className="mt-3 min-h-36 w-full resize-none rounded-md border border-slate-200 bg-slate-50 p-3 text-base outline-none focus:border-leaf focus:bg-white"
          onChange={(event) => setText(event.target.value)}
          placeholder={
            direction === "zh-to-vi"
              ? "例如：你今天吃饭了吗？"
              : "Ví dụ: Anh nhớ em / Cái này bao nhiêu tiền?"
          }
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
          {loading ? "Đang dịch..." : "Dịch ngay"}
        </button>
      </section>

      <section className="mt-4">
        {result ? (
          <TranslationResult result={result} />
        ) : (
          <div className="rounded-lg border border-dashed border-emerald-200 bg-mint p-4">
            <p className="text-sm font-semibold text-leaf">Gợi ý thử nhanh</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Thử nhập: Xin chào, Cảm ơn, Anh nhớ em, Tôi muốn ăn cơm, hoặc 这个多少钱？
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
