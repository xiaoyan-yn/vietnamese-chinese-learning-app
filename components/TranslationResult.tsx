"use client";

import { Check, Copy, Star } from "lucide-react";
import { useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { addFavorite } from "@/lib/localStore";
import type { TranslationResult as TranslationResultType } from "@/types";

type TranslationResultProps = {
  result: TranslationResultType;
};

export function TranslationResult({ result }: TranslationResultProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const canSpeakResult = result.direction === "vi-to-zh";

  async function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(result.translatedText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function handleSave() {
    addFavorite({
      sourceType: "translation",
      sourceTitle: "Dich nhanh",
      chinese: canSpeakResult ? result.translatedText : result.sourceText,
      pinyin: result.pinyin,
      vietnamese: result.vietnameseExplanation || result.translatedText,
      noteVi: `Ket qua tu ${result.source === "ai" ? "AI" : "fallback"}.`,
    });
    setSaved(true);
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-leaf">
            Ket qua {result.source === "ai" ? "AI" : "mau co san"}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink">{result.translatedText}</h2>
          {result.pinyin ? <p className="mt-1 text-sm text-slate-500">{result.pinyin}</p> : null}
        </div>
        {canSpeakResult ? <SpeakButton text={result.translatedText} /> : null}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">Giai thich tieng Viet</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{result.vietnameseExplanation}</p>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-700">Tach tu</p>
        {result.wordBreakdown.length > 0 ? (
          <div className="mt-2 grid gap-2">
            {result.wordBreakdown.map((item) => (
              <div key={`${item.word}-${item.meaningVi}`} className="rounded-md bg-slate-50 p-3">
                <p className="font-bold text-ink">{item.word}</p>
                {item.pinyin ? <p className="text-xs text-slate-500">{item.pinyin}</p> : null}
                <p className="mt-1 text-sm text-slate-600">{item.meaningVi}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-500">Chua co du lieu tach tu cho cau nay.</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-100 px-3 py-3 text-sm font-semibold text-ink"
          onClick={handleCopy}
          type="button"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Da sao chep" : "Sao chep"}
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-mint px-3 py-3 text-sm font-semibold text-leaf"
          onClick={handleSave}
          type="button"
        >
          <Star size={16} />
          {saved ? "Da luu" : "Luu cau"}
        </button>
      </div>
    </section>
  );
}
