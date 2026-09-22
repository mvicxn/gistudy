import { ChapterScreen } from "@/components/study/ChapterScreen";
import { chapterParams } from "@/content/catalog";

export function generateStaticParams() {
  return chapterParams();
}

export default async function CapituloPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChapterScreen chapterId={id} />;
}
