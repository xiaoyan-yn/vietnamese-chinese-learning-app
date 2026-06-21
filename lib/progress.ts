import { getAllLessonProgress, getCheckins, saveCheckin } from "@/lib/localStore";

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function markTodayCheckin() {
  return saveCheckin(toDateKey(new Date()));
}

export function getStreakDays(checkins = getCheckins()) {
  const checkinSet = new Set(checkins);
  let streak = 0;
  const cursor = new Date();

  while (checkinSet.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getCompletedLessonCount() {
  return Object.values(getAllLessonProgress()).filter((progress) => progress.completed).length;
}
