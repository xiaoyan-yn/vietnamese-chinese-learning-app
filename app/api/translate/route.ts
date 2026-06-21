import { NextResponse } from "next/server";
import { resolveTranslationDirection, translateWithFallback } from "@/lib/translate";
import type {
  LessonItem,
  TranslationDirection,
  TranslationInputDirection,
  TranslationResult,
  WordBreakdownItem,
} from "@/types";

type TranslateRequest = {
  text?: string;
  direction?: TranslationInputDirection;
};

type OpenAiChatResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

function isTranslationInputDirection(value: unknown): value is TranslationInputDirection {
  return value === "auto" || value === "vi-to-zh" || value === "zh-to-vi";
}

function asWordBreakdown(items: unknown): WordBreakdownItem[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object" && "word" in item)
    .map((item) => {
      const typedItem = item as Partial<WordBreakdownItem>;
      return {
        word: String(typedItem.word || ""),
        pinyin: typedItem.pinyin ? String(typedItem.pinyin) : undefined,
        meaningVi: String(typedItem.meaningVi || ""),
      };
    })
    .filter((item) => item.word && item.meaningVi);
}

function asCommonReplies(items: unknown): LessonItem[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item && typeof item === "object" && "chinese" in item)
    .map((item, index) => {
      const typedItem = item as Partial<LessonItem>;
      return {
        id: String(typedItem.id || `reply-${index + 1}`),
        chinese: String(typedItem.chinese || ""),
        pinyin: String(typedItem.pinyin || ""),
        vietnamese: String(typedItem.vietnamese || ""),
        noteVi: typedItem.noteVi ? String(typedItem.noteVi) : undefined,
      };
    })
    .filter((item) => item.chinese && item.vietnamese);
}

function sanitizeAiResult(
  payload: Partial<TranslationResult>,
  text: string,
  direction: TranslationDirection,
): TranslationResult {
  return {
    sourceText: text,
    direction,
    translatedText: String(payload.translatedText || ""),
    pinyin: String(payload.pinyin || ""),
    vietnameseExplanation: String(payload.vietnameseExplanation || ""),
    wordBreakdown: asWordBreakdown(payload.wordBreakdown),
    commonReplies: asCommonReplies(payload.commonReplies),
    source: "ai",
  };
}

async function translateWithOpenAi(text: string, direction: TranslationDirection) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return undefined;

  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are the core translation engine for a Vietnamese-first Chinese learning app. The user may enter Vietnamese or Simplified Chinese. Return strict JSON only with these keys: translatedText, pinyin, vietnameseExplanation, wordBreakdown, commonReplies. wordBreakdown must be an array of { word, pinyin, meaningVi }. commonReplies must be 2 to 4 natural Simplified Chinese replies, each as { id, chinese, pinyin, vietnamese }. Keep Chinese beginner-friendly, natural for daily life and romantic chat, and explain in Vietnamese.",
        },
        {
          role: "user",
          content: JSON.stringify({
            text,
            direction,
            outputRules:
              direction === "vi-to-zh"
                ? "Translate Vietnamese to natural Simplified Chinese. pinyin is for the Chinese translation. vietnameseExplanation explains nuance and usage in Vietnamese."
                : "Translate or explain the Chinese text in Vietnamese. pinyin is for the source Chinese text. commonReplies should be natural Chinese replies to this message.",
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OpenAiChatResponse;
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI response was empty");

  return sanitizeAiResult(JSON.parse(content), text, direction);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateRequest;
    const text = body.text?.trim() || "";

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const inputDirection = body.direction || "auto";
    if (!isTranslationInputDirection(inputDirection)) {
      return NextResponse.json({ error: "Invalid direction" }, { status: 400 });
    }

    const direction = resolveTranslationDirection(text, inputDirection);

    try {
      const aiResult = await translateWithOpenAi(text, direction);
      if (aiResult?.translatedText) {
        return NextResponse.json(aiResult);
      }
    } catch {
      // Keep translation usable when credentials, network, or model JSON fails.
    }

    return NextResponse.json(translateWithFallback(text, direction));
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
