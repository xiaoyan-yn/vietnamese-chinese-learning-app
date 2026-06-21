import { LessonDetailClient } from "@/components/LessonDetailClient";
import { getLessonById } from "@/data/lessons";

type LessonDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { id } = await params;
  return <LessonDetailClient lesson={getLessonById(id)} />;
}
