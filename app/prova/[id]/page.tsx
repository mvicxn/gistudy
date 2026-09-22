import { ExamScreen } from "@/components/study/ExamScreen";
import { assessmentParams } from "@/content/catalog";

export function generateStaticParams() {
  const params = assessmentParams();
  return params.length ? params : [{ id: "prova" }];
}

export default async function ProvaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExamScreen assessmentId={id} />;
}
