import { ExamScreen } from "@/components/study/ExamScreen";
import { assessmentParams } from "@/content/catalog";

export function generateStaticParams() {
  return assessmentParams();
}

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExamScreen assessmentId={id} />;
}
