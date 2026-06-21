import { NextResponse } from "next/server";
import { translateWithFallback } from "@/lib/translate";
import type { TranslationDirection, TranslationResult } from "@/types";

type TranslateRequest = {
  text?: string;
  direction?: TranslationDirection;
};

function isTranslationDirection(value: unknown): value is TranslationDirection {
  return value === "vi-to-zh" || value === "zh-to-vi";
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
    wordBreakdown: Array.isArray(payload.wordBreakdown)
      ? payload.wordBreakdown
          .filter((item) => item && typeof item.word === "string")
          .map((item) => ({
            word: String(item.word),
            pinyin: item.pinyin ? String(item.pinyin) : undefined,
            meaningVi: String(item.meaningVi || ""),
          }))
      : [],
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
            "You are a Vietnamese-first Chinese learning translator. Return strict JSON with translatedText, pinyin, vietnameseExplanation, wordBreakdown. wordBreakdown must be an array of { word, pinyin, meaningVi }. Use simple beginner-friendly Chinese and Vietnamese explanations.",
        },
        {
          role: "user",
          content: JSON.stringify({
            text,
            direction,
            rules:
              direction === "vi-to-zh"
                ? "Translate Vietnamese to Chinese. Include pinyin for the Chinese result."
                : "Explain Chinese in Vietnamese. Include pinyin for the Chinese source text.",
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI response was empty");

  return sanitizeAiResult(JSON.parse(content), text, direction);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateRequest;
    const text = body.text?.trim() || "";
    const direction = body.direction;

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!isTranslationDirection(direction)) {
      return NextResponse.json({ error: "Invalid direction" }, { status: 400 });
    }

    try {
      const aiResult = await translateWithOpenAi(text, direction);
      if (aiResult?.translatedText) {
        return NextResponse.json(aiResult);
      }
    } catch {
      // Keep the MVP useful even when AI credentials, network, or parsing fails.
    }

    return NextResponse.json(translateWithFallback(text, direction));
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
