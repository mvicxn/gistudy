import { Feedback } from "@/components/ds/Feedback";
import { Professor } from "@/components/ds/Professor";

export function VoiceCard({
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return <Professor tone="explanation">{children}</Professor>;
}

export function FeedbackBanner({
  kind,
  text,
}: {
  kind: "acerto" | "quase";
  text: string;
}) {
  return (
    <Feedback kind={kind === "acerto" ? "success" : "almost"} title={kind === "acerto" ? "Isso mesmo." : "Quase. Vamos lembrar juntas."}>
      {text}
    </Feedback>
  );
}
