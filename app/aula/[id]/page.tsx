import { LessonScreen } from "@/components/study/LessonScreen";
import { lessonParams } from "@/content/catalog";

export function generateStaticParams() {
  return lessonParams();
}

export default async function AulaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LessonScreen lessonId={id} />;
}
