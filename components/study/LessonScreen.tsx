"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Feedback } from "@/components/ds/Feedback";
import { TextArea } from "@/components/ds/Input";
import { Professor } from "@/components/ds/Professor";
import { LockedState } from "@/components/ds/States";
import { Text } from "@/components/ds/Text";
import { PilotLessonScreen } from "@/components/study/PilotLessonScreen";
import { useStudyView } from "@/components/study/StudyProvider";
import { STUDENT_STEP_LABEL } from "@/components/study/labels";
import { XP_RULES } from "@/config/xp-rules";
import { getChapters, getLessonBody } from "@/content/catalog";
import { nextAvailableChapter } from "@/engine/progression";
import { useEffect, useState } from "react";

export function LessonScreen({ lessonId }: { lessonId: string }) {
  const { catalog, snapshot, dispatch, states, ready } = useStudyView();
  const lesson = catalog.pedagogy.lessons.find((item) => item.id === lessonId);
  const chapter = catalog.pedagogy.chapters.find((item) => item.id === lesson?.chapterId);
  const challenge = catalog.pedagogy.challenges.find((item) => item.id === chapter?.challengeId);
  const teachBack = catalog.pedagogy.teachBacks.find((item) => item.id === chapter?.teachBackId);
  const boss = catalog.pedagogy.bosses.find((item) => item.id === chapter?.bossId);
  const body = getLessonBody(lessonId);
  const step = chapter
    ? snapshot.chapters[chapter.id]?.currentStep ?? (lesson?.mold === "full" ? "objective" : "lesson")
    : "lesson";
  const [choice, setChoice] = useState("");
  const [bossIndex, setBossIndex] = useState(0);
  const [bossAnswers, setBossAnswers] = useState<Record<string, string>>({});
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
        <LockedState
          title="Esta aula não está na jornada"
          action={{ href: "/mapa", label: "Ver os capítulos" }}
        >
          Volte à jornada e escolha uma aula disponível.
        </LockedState>
      </AppShell>
    );
  }

  if (states[chapter.id] === "LOCKED") {
    return (
      <AppShell>
        <BackLink href="/mapa">Voltar aos capítulos</BackLink>
        <LockedState
          title="Ainda não deu para abrir"
          action={{ href: "/mapa", label: "Voltar à jornada" }}
        >
          Termine o capítulo anterior para começar esta aula.
        </LockedState>
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
  const currentBoss = boss.items[bossIndex];

  return (
    <AppShell
      trail={[
        { href: "/mapa", label: "Estudo" },
        { href: `/capitulo/${chapter.id}`, label: chapter.title },
        { label: STUDENT_STEP_LABEL[step] },
      ]}
    >
      <BackLink href={`/capitulo/${chapter.id}`}>Voltar ao capítulo</BackLink>
      <PageIntro kicker={STUDENT_STEP_LABEL[step]} title={lesson.title} />

      {step === "lesson" ? (
        <>
          <Professor tone="explanation">{lesson.content}</Professor>
          <div className="mt-8">
            <Button variant="cta" onClick={() => dispatch({ type: "COMPLETE_LESSON", lessonId: lesson.id })}>
              Continuar
            </Button>
          </div>
        </>
      ) : null}

      {step === "challenge" ? (
        <>
          <Professor tone="hint">{challenge.prompt}</Professor>
          <div className="mt-6 space-y-3">
            {challenge.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setChoice(option.id)}
                className={`flex min-h-12 w-full items-center rounded-[var(--radius-lg)] border px-4 py-4 text-left text-[16px] ${
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
            <div className="mt-5">
              <Feedback kind="almost">Quase. Olhe de novo a pergunta e as alternativas.</Feedback>
            </div>
          ) : null}
          <div className="mt-8">
            <Button
              variant="cta"
              disabled={!choice}
              onClick={() => {
                const result = choice === challenge.answerId ? "success" : "almost";
                setFeedback(result);
                dispatch({ type: "ANSWER_CHALLENGE", challengeId: challenge.id, result });
              }}
            >
              Responder
            </Button>
          </div>
        </>
      ) : null}

      {step === "teachback" ? (
        <>
          <Professor tone="explanation">Agora me explique com suas palavras.</Professor>
          <Text variant="bodyLarge" className="mt-4">
            {teachBack.prompt}
          </Text>
          <div className="mt-5">
            <TextArea
              value={teachText}
              onChange={(event) => setTeachText(event.target.value)}
              placeholder="Escreva como se estivesse explicando para a professora."
            />
          </div>
          <div className="mt-8">
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
              Conferir
            </Button>
          </div>
        </>
      ) : null}

      {step === "boss" && currentBoss ? (
        <>
          <Professor tone="introduction">Você chegou ao desafio final.</Professor>
          <Text variant="caption" className="mt-4">
            Pergunta {bossIndex + 1} de {boss.items.length}
          </Text>
          <Card variant="elevated" className="mt-4 space-y-3 p-6">
            <p className="text-[18px] leading-relaxed">{currentBoss.prompt}</p>
            {currentBoss.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  setBossAnswers((current) => ({ ...current, [currentBoss.id]: option.id }))
                }
                className={`flex min-h-12 w-full items-center rounded-[var(--radius-lg)] border px-4 py-4 text-left text-[16px] ${
                  bossAnswers[currentBoss.id] === option.id
                    ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                    : "border-[var(--border)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </Card>
          <div className="mt-8">
            {bossIndex < boss.items.length - 1 ? (
              <Button
                variant="cta"
                disabled={!bossAnswers[currentBoss.id]}
                onClick={() => setBossIndex((index) => index + 1)}
              >
                Continuar
              </Button>
            ) : (
              <Button
                variant="cta"
                disabled={boss.items.some((item) => !bossAnswers[item.id])}
                onClick={() =>
                  dispatch({
                    type: "COMPLETE_BOSS",
                    bossId: boss.id,
                    result: boss.items.every((item) => bossAnswers[item.id] === item.answerId)
                      ? "success"
                      : "almost",
                  })
                }
              >
                Concluir capítulo
              </Button>
            )}
          </div>
        </>
      ) : null}

      {step === "reward" ? (
        <div className="motion-grow space-y-6 py-6 text-center">
          <Professor tone="celebration">Capítulo concluído!</Professor>
          <Text variant="bodyLarge">Você terminou {chapter.title}.</Text>
          <Feedback kind="xp">+{XP_RULES.chapterComplete} XP</Feedback>
          <div className="space-y-3">
            {next ? (
              <Button href={`/capitulo/${next.id}`} variant="cta">
                Continuar jornada
              </Button>
            ) : (
              <Button href="/jardim" variant="cta">
                Ver o jardim
              </Button>
            )}
            <Button href="/mapa" variant="ghost" className="w-full">
              Ver todos os capítulos
            </Button>
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
