"use client";

import { Check, Copy, Star } from "lucide-react";
import { useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { addFavorite } from "@/lib/localStore";
import type { TranslationResult as TranslationResultType } from "@/types";

type TranslationResultProps = {
  result: TranslationResultType;
};

function hasChinese(text: string) {
  return /[\u3400-\u9fff]/.test(text);
}

export function TranslationResult({ result }: TranslationResultProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const chineseForSpeech =
    result.direction === "vi-to-zh" ? result.translatedText : result.sourceText;
  const canSpeakResult = hasChinese(chineseForSpeech);
  const chineseForFavorite = canSpeakResult ? chineseForSpeech : result.translatedText;

  async function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(result.translatedText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function handleSave() {
    addFavorite({
      sourceType: "translation",
      sourceTitle: "Dịch nhanh",
      chinese: chineseForFavorite,
      pinyin: result.pinyin,
      vietnamese: result.vietnameseExplanation || result.translatedText,
      noteVi: `Kết quả từ ${result.source === "ai" ? "AI" : "dữ liệu mẫu"}.`,
    });
    setSaved(true);
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-leaf">
            Kết quả {result.source === "ai" ? "AI" : "mẫu có sẵn"}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink">{result.translatedText}</h2>
          {result.pinyin ? <p className="mt-1 text-sm text-slate-500">{result.pinyin}</p> : null}
        </div>
        {canSpeakResult ? <SpeakButton text={chineseForSpeech} /> : null}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">Giải thích tiếng Việt</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{result.vietnameseExplanation}</p>

      <div className="mt-4">
        <p className="text-sm font-semibold text-slate-700">Tách từ</p>
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
          <p className="mt-2 text-sm text-slate-500">Chưa có dữ liệu tách từ cho câu này.</p>
        )}
      </div>

      {result.commonReplies.length > 0 ? (
        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-700">Câu trả lời thường dùng</p>
          <div className="mt-2 grid gap-2">
            {result.commonReplies.map((reply) => (
              <div
                key={reply.id}
                className="flex items-start justify-between gap-3 rounded-md bg-emerald-50 p-3"
              >
                <div>
                  <p className="font-bold text-ink">{reply.chinese}</p>
                  <p className="text-xs text-slate-500">{reply.pinyin}</p>
                  <p className="mt-1 text-sm text-slate-600">{reply.vietnamese}</p>
                </div>
                <SpeakButton text={reply.chinese} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-100 px-3 py-3 text-sm font-semibold text-ink"
          onClick={handleCopy}
          type="button"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Đã sao chép" : "Sao chép"}
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-mint px-3 py-3 text-sm font-semibold text-leaf"
          onClick={handleSave}
          type="button"
        >
          <Star size={16} />
          {saved ? "Đã lưu" : "Lưu câu"}
        </button>
      </div>
    </section>
  );
}
