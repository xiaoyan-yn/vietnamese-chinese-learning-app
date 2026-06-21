import { fallbackTranslations } from "@/data/translations";
import type { TranslationDirection, TranslationResult } from "@/types";

export function normalizeText(text: string) {
  return text
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[。.!！?？]+$/g, "");
}

function reverseTranslation(result: TranslationResult, sourceText: string): TranslationResult {
  return {
    sourceText,
    direction: "zh-to-vi",
    translatedText: result.vietnameseExplanation,
    pinyin: result.pinyin,
    vietnameseExplanation: result.vietnameseExplanation,
    wordBreakdown: result.wordBreakdown,
    source: "fallback",
  };
}

export function findFallbackTranslation(
  text: string,
  direction: TranslationDirection,
): TranslationResult | undefined {
  const normalizedInput = normalizeText(text);

  if (direction === "vi-to-zh") {
    return fallbackTranslations.find(
      (item) => normalizeText(item.sourceText) === normalizedInput,
    );
  }

  const directMatch = fallbackTranslations.find(
    (item) => normalizeText(item.translatedText) === normalizedInput,
  );

  return directMatch ? reverseTranslation(directMatch, text.trim()) : undefined;
}

export function translateWithFallback(
  text: string,
  direction: TranslationDirection,
): TranslationResult {
  const fallback = findFallbackTranslation(text, direction);
  if (fallback) {
    return {
      ...fallback,
      sourceText: text.trim() || fallback.sourceText,
      source: "fallback",
    };
  }

  if (direction === "vi-to-zh") {
    return {
      sourceText: text.trim(),
      direction,
      translatedText: "Chua co ban dich mau",
      pinyin: "",
      vietnameseExplanation:
        "Cau nay chua co trong du lieu fallback. Hay cau hinh OPENAI_API_KEY de dich bang AI.",
      wordBreakdown: [],
      source: "fallback",
    };
  }

  return {
    sourceText: text.trim(),
    direction,
    translatedText: "Chua co giai thich mau",
    pinyin: "",
    vietnameseExplanation:
      "Cau tieng Trung nay chua co trong du lieu fallback. Hay cau hinh OPENAI_API_KEY de dich bang AI.",
    wordBreakdown: [],
    source: "fallback",
  };
}
