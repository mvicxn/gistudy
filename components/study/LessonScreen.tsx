"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Feedback } from "@/components/ds/Feedback";
import { TextArea } from "@/components/ds/Input";
import { Professor } from "@/components/ds/Professor";
import { LockedState } from "@/components/ds/States";
import { PilotLessonScreen } from "@/components/study/PilotLessonScreen";
import { useStudyView } from "@/components/study/StudyProvider";
import { XP_RULES } from "@/config/xp-rules";
import { getChapters, getLessonBody } from "@/content/catalog";
import { nextAvailableChapter } from "@/engine/progression";
import { STEP_LABEL } from "@/engine/lesson-flow";
import { useEffect, useState } from "react";

export function LessonScreen({ lessonId }: { lessonId: string }) {
  const { catalog, snapshot, dispatch, states, ready } = useStudyView();
  const lesson = catalog.pedagogy.lessons.find((item) => item.id === lessonId);
  const chapter = catalog.pedagogy.chapters.find((item) => item.id === lesson?.chapterId);
  const challenge = catalog.pedagogy.challenges.find((item) => item.id === chapter?.challengeId);
  const teachBack = catalog.pedagogy.teachBacks.find((item) => item.id === chapter?.teachBackId);
  const boss = catalog.pedagogy.bosses.find((item) => item.id === chapter?.bossId);
  const body = getLessonBody(lessonId);
  const step = chapter ? snapshot.chapters[chapter.id]?.currentStep ?? (lesson?.mold === "full" ? "objective" : "lesson") : "lesson";
  const [choice, setChoice] = useState<string>("");
  const [bossChoice, setBossChoice] = useState<string>("");
  const [teachText, setTeachText] = useState("");
  const [feedback, setFeedback] = useState<"success" | "almost" | null>(null);

  useEffect(() => {
    if (!ready || !lesson || !chapter) return;
    if (states[chapter.id] === "LOCKED") return;
    const current = snapshot.chapters[chapter.id];
    if (current?.currentStep) return;
    dispatch({ type: "START_LESSON", lessonId: lesson.id });
  }, [ready, lessonId]);

  if (!lesson || !chapter || !challenge || !teachBack || !boss) {
    return (
      <AppShell>
        <LockedState title="Essa aula não existe neste recorte" />
      </AppShell>
    );
  }

  if (states[chapter.id] === "LOCKED") {
    return (
      <AppShell>
        <LockedState />
      </AppShell>
    );
  }

  if (body) {
    return (
      <PilotLessonScreen
        lesson={lesson}
        chapter={chapter}
        body={body}
        challenge={challenge}
        teachBack={teachBack}
        boss={boss}
      />
    );
  }

  const next = nextAvailableChapter(getChapters(), snapshot);

  return (
    <AppShell
      trail={[
        { href: "/biblioteca", label: "Biblioteca" },
        { href: "/mapa", label: "Mapa" },
        { href: `/capitulo/${chapter.id}`, label: chapter.title },
        { label: lesson.title },
      ]}
    >
      <BackLink href={`/capitulo/${chapter.id}`}>Voltar ao capítulo</BackLink>
      <PageIntro kicker={`Passo · ${STEP_LABEL[step]}`} title={lesson.title} />

      {step === "lesson" ? (
        <>
          <Professor tone="explanation">{lesson.content}</Professor>
          <div className="mt-6">
            <Button variant="cta" onClick={() => dispatch({ type: "COMPLETE_LESSON", lessonId: lesson.id })}>
              Entendi · ir ao desafio
            </Button>
          </div>
        </>
      ) : null}

      {step === "challenge" ? (
        <>
          <Professor tone="hint">{challenge.prompt}</Professor>
          <div className="mt-4 space-y-2">
            {challenge.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setChoice(option.id)}
                className={`flex min-h-11 w-full items-center rounded-[var(--radius-lg)] border px-4 text-left ${
                  choice === option.id
                    ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                    : "border-[var(--border)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {feedback === "almost" ? (
            <div className="mt-4">
              <Feedback kind="almost">Quase. Olhe de novo o que recebe o peso.</Feedback>
            </div>
          ) : null}
          <div className="mt-6">
            <Button
              variant="cta"
              disabled={!choice}
              onClick={() => {
                const result = choice === challenge.answerId ? "success" : "almost";
                setFeedback(result);
                dispatch({ type: "ANSWER_CHALLENGE", challengeId: challenge.id, result });
              }}
            >
              Conferir
            </Button>
          </div>
        </>
      ) : null}

      {step === "teachback" ? (
        <>
          <Professor tone="explanation">{teachBack.prompt}</Professor>
          <div className="mt-4">
            <TextArea
              value={teachText}
              onChange={(event) => setTeachText(event.target.value)}
              placeholder="Escreva com as suas palavras. Sem IA nesta fase."
            />
          </div>
          <div className="mt-6">
            <Button
              variant="cta"
              disabled={teachText.trim().length < 12}
              onClick={() =>
                dispatch({
                  type: "COMPLETE_TEACH_BACK",
                  teachBackId: teachBack.id,
                  result: "success",
                })
              }
            >
              Entregar explicação
            </Button>
          </div>
        </>
      ) : null}

      {step === "boss" ? (
        <>
          <Professor tone="introduction">{boss.title}</Professor>
          <Card variant="elevated" className="mt-4 space-y-3">
            <p>{boss.items[0].prompt}</p>
            {boss.items[0].options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setBossChoice(option.id)}
                className={`flex min-h-11 w-full items-center rounded-[var(--radius-lg)] border px-4 text-left ${
                  bossChoice === option.id
                    ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                    : "border-[var(--border)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </Card>
          <div className="mt-6">
            <Button
              variant="cta"
              disabled={!bossChoice}
              onClick={() =>
                dispatch({
                  type: "COMPLETE_BOSS",
                  bossId: boss.id,
                  result: bossChoice === boss.items[0].answerId ? "success" : "almost",
                })
              }
            >
              Fechar o capítulo
            </Button>
          </div>
        </>
      ) : null}

      {step === "reward" ? (
        <>
          <Professor tone="celebration">O capítulo fechou. A flor nasceu. XP não é domínio.</Professor>
          <Feedback kind="xp">+{XP_RULES.chapterComplete} XP de capítulo · regra central.</Feedback>
          <div className="mt-4">
            <Feedback kind="flower">O canteiro de {chapter.title} respondeu.</Feedback>
          </div>
          <div className="mt-6 space-y-3">
            {next ? (
              <Button href={`/capitulo/${next.id}`} variant="cta">
                Ir ao próximo capítulo
              </Button>
            ) : (
              <Button href="/jardim" variant="cta">
                Ver o jardim
              </Button>
            )}
            <Button href="/mapa" variant="ghost" className="w-full">
              Voltar ao mapa
            </Button>
          </div>
        </>
      ) : null}
    </AppShell>
  );
}
