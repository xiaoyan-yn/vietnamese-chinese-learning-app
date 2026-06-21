import { fallbackTranslations } from "@/data/translations";
import type {
  TranslationDirection,
  TranslationInputDirection,
  TranslationResult,
} from "@/types";

export function normalizeText(text: string) {
  return text
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[。.!！?？]+$/g, "");
}

export function detectTranslationDirection(text: string): TranslationDirection {
  return /[\u3400-\u9fff]/.test(text) ? "zh-to-vi" : "vi-to-zh";
}

export function resolveTranslationDirection(
  text: string,
  direction: TranslationInputDirection = "auto",
): TranslationDirection {
  return direction === "auto" ? detectTranslationDirection(text) : direction;
}

function reverseTranslation(result: TranslationResult, sourceText: string): TranslationResult {
  return {
    sourceText,
    direction: "zh-to-vi",
    translatedText: result.vietnameseExplanation,
    pinyin: result.pinyin,
    vietnameseExplanation: result.vietnameseExplanation,
    wordBreakdown: result.wordBreakdown,
    commonReplies: result.commonReplies,
    source: "fallback",
  };
}

export function findFallbackTranslation(
  text: string,
  inputDirection: TranslationInputDirection = "auto",
): TranslationResult | undefined {
  const direction = resolveTranslationDirection(text, inputDirection);
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
  inputDirection: TranslationInputDirection = "auto",
): TranslationResult {
  const direction = resolveTranslationDirection(text, inputDirection);
  const fallback = findFallbackTranslation(text, direction);

  if (fallback) {
    return {
      ...fallback,
      sourceText: text.trim() || fallback.sourceText,
      direction,
      source: "fallback",
    };
  }

  if (direction === "vi-to-zh") {
    return {
      sourceText: text.trim(),
      direction,
      translatedText: "Chưa có bản dịch mẫu",
      pinyin: "",
      vietnameseExplanation:
        "Câu này chưa có trong dữ liệu mẫu. Nếu cấu hình OPENAI_API_KEY, hệ thống sẽ dịch bằng AI.",
      wordBreakdown: [],
      commonReplies: [],
      source: "fallback",
    };
  }

  return {
    sourceText: text.trim(),
    direction,
    translatedText: "Chưa có giải thích mẫu",
    pinyin: "",
    vietnameseExplanation:
      "Câu tiếng Trung này chưa có trong dữ liệu mẫu. Nếu cấu hình OPENAI_API_KEY, hệ thống sẽ giải thích bằng AI.",
    wordBreakdown: [],
    commonReplies: [],
    source: "fallback",
  };
}
