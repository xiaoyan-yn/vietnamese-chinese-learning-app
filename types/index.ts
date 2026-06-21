export type LessonLevel = "beginner" | "elementary" | "intermediate";

export type LessonItem = {
  id: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  noteVi?: string;
};

export type DialogueLine = LessonItem & {
  speakerVi: string;
};

export type LessonQuestion = {
  id: string;
  type: "choice" | "blank";
  promptVi: string;
  chinese?: string;
  pinyin?: string;
  options?: string[];
  answer: string;
  explanationVi: string;
};

export type Lesson = {
  id: string;
  titleVi: string;
  titleZh: string;
  level: LessonLevel;
  descriptionVi: string;
  vocabulary: LessonItem[];
  sentences: LessonItem[];
  dialogue: DialogueLine[];
  questions: LessonQuestion[];
};

export type ScenarioPhrase = {
  id: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  usageVi: string;
  replacements: string[];
};

export type Scenario = {
  id: string;
  titleVi: string;
  titleZh: string;
  descriptionVi: string;
  phrases: ScenarioPhrase[];
};

export type FavoriteItem = {
  id: string;
  sourceType: "lesson" | "scenario" | "translation";
  sourceTitle: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  noteVi?: string;
  createdAt: string;
};

export type LessonProgress = {
  lessonId: string;
  completed: boolean;
  correctCount: number;
  totalCount: number;
  accuracy: number;
  updatedAt: string;
};

export type TranslationDirection = "vi-to-zh" | "zh-to-vi";
export type TranslationInputDirection = TranslationDirection | "auto";

export type WordBreakdownItem = {
  word: string;
  pinyin?: string;
  meaningVi: string;
};

export type TranslationResult = {
  sourceText: string;
  direction: TranslationDirection;
  translatedText: string;
  pinyin: string;
  vietnameseExplanation: string;
  wordBreakdown: WordBreakdownItem[];
  commonReplies: LessonItem[];
  source: "fallback" | "ai";
};
