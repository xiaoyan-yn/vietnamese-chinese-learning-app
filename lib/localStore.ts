import type { FavoriteItem, LessonProgress } from "@/types";

const FAVORITES_KEY = "vcla:favorites";
const PROGRESS_KEY = "vcla:lesson-progress";
const CHECKIN_KEY = "vcla:daily-checkins";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFavorites() {
  return readJson<FavoriteItem[]>(FAVORITES_KEY, []);
}

export function addFavorite(item: Omit<FavoriteItem, "id" | "createdAt">) {
  const favorites = getFavorites();
  const exists = favorites.some(
    (favorite) =>
      favorite.chinese === item.chinese &&
      favorite.sourceType === item.sourceType &&
      favorite.sourceTitle === item.sourceTitle,
  );

  if (exists) return favorites;

  const next = [
    {
      ...item,
      id: `${item.sourceType}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
    },
    ...favorites,
  ];
  writeJson(FAVORITES_KEY, next);
  return next;
}

export function removeFavorite(id: string) {
  const next = getFavorites().filter((favorite) => favorite.id !== id);
  writeJson(FAVORITES_KEY, next);
  return next;
}

export function getAllLessonProgress() {
  return readJson<Record<string, LessonProgress>>(PROGRESS_KEY, {});
}

export function getLessonProgress(lessonId: string) {
  return getAllLessonProgress()[lessonId];
}

export function saveLessonProgress(progress: Omit<LessonProgress, "accuracy" | "updatedAt">) {
  const allProgress = getAllLessonProgress();
  const accuracy =
    progress.totalCount > 0 ? Math.round((progress.correctCount / progress.totalCount) * 100) : 0;
  const nextProgress: LessonProgress = {
    ...progress,
    accuracy,
    updatedAt: new Date().toISOString(),
  };

  writeJson(PROGRESS_KEY, {
    ...allProgress,
    [progress.lessonId]: nextProgress,
  });

  return nextProgress;
}

export function getCheckins() {
  return readJson<string[]>(CHECKIN_KEY, []);
}

export function saveCheckin(dateKey: string) {
  const checkins = getCheckins();
  if (checkins.includes(dateKey)) return checkins;
  const next = [...checkins, dateKey].sort();
  writeJson(CHECKIN_KEY, next);
  return next;
}
