"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Feedback } from "@/components/ds/Feedback";
import { TextArea } from "@/components/ds/Input";
import { Professor } from "@/components/ds/Professor";
import { MasteryMeter, ProgressBar } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { FlowerSlot } from "@/components/ds/World";
import { GuideTarget } from "@/components/study/GuideChrome";
import { HelpTip } from "@/components/study/HelpTip";
import { useGuide } from "@/components/study/GuideProvider";
import { MistakeCard, SourcedCard } from "@/components/study/SourcedBlocks";
import { useStudyView } from "@/components/study/StudyProvider";
import {
  STUDENT_STEP_LABEL,
  chapterOrdinal,
  continueLabel,
  lessonProgress,
} from "@/components/study/labels";
import { XP_RULES } from "@/config/xp-rules";
import { AULA_01, PHASES_SLIDE_2 } from "@/content/pilot/relogio-da-ferida";
import type { LessonBody } from "@/domain/epistemic";
import type { LessonStep } from "@/domain/experience";
import type { Chapter, Lesson, MicroChallenge, TeachBack, ChapterBoss } from "@/domain/pedagogy";
import { computeMastery, MASTERY_THRESHOLD } from "@/engine/mastery";
import { nextStep } from "@/engine/lesson-flow";
import { nextAvailableChapter } from "@/engine/progression";
import { scoreTeachBack } from "@/engine/teachback";
import { useEffect, useState } from "react";

function guideStepFor(step: LessonStep) {
  if (step === "challenge") return "challenge" as const;
  if (step === "teachback") return "teachback" as const;
  if (step === "boss") return "boss" as const;
  if (step === "reward") return "reward" as const;
  return "lesson" as const;
}

function PrimaryContinue({
  lesson,
  step,
  onContinue,
}: {
  lesson: Lesson;
  step: LessonStep;
  onContinue: () => void;
}) {
  return (
    <GuideTarget
      step={guideStepFor(step)}
      className="sticky bottom-24 z-[25] mt-12 mb-8 bg-[rgba(11,11,16,0.92)] py-2 backdrop-blur md:static md:bg-transparent md:py-0"
    >
      <Button variant="cta" onClick={onContinue}>
        {continueLabel(step, nextStep(lesson, step))}
      </Button>
    </GuideTarget>
  );
}

function ChoiceButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-12 w-full items-center rounded-[var(--radius-lg)] border px-4 py-4 text-left text-[16px] leading-relaxed ${
        selected
          ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
          : "border-[var(--border)]"
      }`}
    >
      {children}
    </button>
  );
}

export function PilotLessonScreen({
  lesson,
  chapter,
  body,
  challenge,
  teachBack,
  boss,
}: {
  lesson: Lesson;
  chapter: Chapter;
  body: LessonBody;
  challenge: MicroChallenge;
  teachBack: TeachBack;
  boss: ChapterBoss;
}) {
  const { catalog, snapshot, dispatch, states } = useStudyView();
  const { active, reach, complete } = useGuide();
  const step = snapshot.chapters[chapter.id]?.currentStep ?? "objective";
  const [choice, setChoice] = useState("");
  const [feedback, setFeedback] = useState<"success" | "almost" | null>(null);
  const [teachMode, setTeachMode] = useState<"livre" | "guiado" | "rapido">(teachBack.mode);
  const [teachText, setTeachText] = useState("");
  const [guided, setGuided] = useState({ what: "", why: "", importance: "" });
  const [chips, setChips] = useState<string[]>([]);
  const [bossIndex, setBossIndex] = useState(0);
  const [bossAnswers, setBossAnswers] = useState<Record<string, string>>({});
  const [bossFeedback, setBossFeedback] = useState<"success" | "almost" | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFeedback(null);
    setBossFeedback(null);
    if (step === "challenge") reach("challenge");
    else if (step === "teachback") reach("teachback");
    else if (step === "boss") reach("boss");
    else if (step === "reward") reach("reward");
    else reach("lesson");
  }, [step]);

  function advance() {
    dispatch({ type: "COMPLETE_SEGMENT", lessonId: lesson.id, step });
  }

  const assembledTeach =
    teachMode === "guiado"
      ? `${guided.what} ${guided.why} ${guided.importance}`
      : teachMode === "rapido"
        ? chips.join(" ")
        : teachText;

  const nextChapter = nextAvailableChapter(catalog.pedagogy.chapters, snapshot);
  const parts = lessonProgress(lesson, step);
  const currentBoss = boss.items[bossIndex];
  const mission = catalog.pedagogy.missions.find((item) => item.id === chapter.missionId);
  const missingIdeas = teachBack.rubric
    .filter((item) => item.required)
    .filter(
      (item) =>
        !item.keys.some((key) =>
          assembledTeach.toLocaleLowerCase("pt-BR").includes(key.toLocaleLowerCase("pt-BR")),
        ),
    )
    .map((item) => item.label);

  return (
    <AppShell
      trail={[
        { href: "/mapa", label: "Estudo" },
        { href: `/capitulo/${chapter.id}`, label: chapter.title },
        { label: STUDENT_STEP_LABEL[step] },
      ]}
    >
      <BackLink href={`/capitulo/${chapter.id}`}>Voltar ao capítulo</BackLink>
      <PageIntro kicker={chapterOrdinal(chapter.order)} title={chapter.title} />
      <div className="mb-6 flex items-start gap-1">
        <div className="min-w-0 flex-1">
          <ProgressBar value={parts.percent} label={`Trecho ${parts.current} de ${parts.total}`} tone="chapter" />
        </div>
        <HelpTip label="Como ler o progresso">
          O capítulo só fica concluído depois do desafio final.
        </HelpTip>
      </div>
      <Text variant="label" className="mb-4">
        {STUDENT_STEP_LABEL[step]}
      </Text>

      {step === "objective" ? (
        <>
          <Professor tone="introduction">{mission?.content}</Professor>
          <div className="mt-8 space-y-8">
            {body.objective.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "what" ? (
        <>
          <Professor tone="explanation">O que isso é.</Professor>
          <div className="mt-8 space-y-8">
            {body.what.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "whyExists" ? (
        <>
          <Professor tone="explanation">Por que isso entra agora.</Professor>
          <div className="mt-8 space-y-8">
            {body.whyExists.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "how" ? (
        <>
          <Professor tone="explanation">Como isso acontece.</Professor>
          <div className="mt-8 space-y-8">
            {body.how.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "figure" ? (
        <>
          <Professor tone="hint">{body.figure.observe}</Professor>
          <Card variant="elevated" className="mt-6 space-y-4 p-6">
            {body.figure.uri ? (
              <img
                src={body.figure.uri}
                alt={body.figure.captionFromSource ?? "Figura da aula"}
                className="w-full rounded-[var(--radius-lg)]"
              />
            ) : null}
            {body.figure.captionFromSource ? (
              <Text variant="body">{body.figure.captionFromSource}</Text>
            ) : null}
            {body.figure.hotspots?.length ? (
              <div className="space-y-2">
                {body.figure.hotspots.map((spot) => (
                  <Text key={spot.id} variant="body">
                    {spot.label}
                    {spot.note ? ` — ${spot.note}` : ""}
                  </Text>
                ))}
              </div>
            ) : null}
            {body.figure.lacuna ? (
              <Text variant="body" className="text-[var(--pink)]">
                {body.figure.lacuna}
              </Text>
            ) : null}
          </Card>
          {lesson.id === AULA_01 ? (
            <Card variant="elevated" className="mt-5 space-y-3 p-6">
              <Text variant="label">As fases, em ordem</Text>
              <ol className="space-y-2">
                {PHASES_SLIDE_2.map((phase, index) => (
                  <li
                    key={phase}
                    className="flex min-h-11 items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] px-4 py-3"
                  >
                    <span className="text-[var(--lilac)]">{index + 1}</span>
                    <span className="text-[16px]">{phase}</span>
                  </li>
                ))}
              </ol>
            </Card>
          ) : null}
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "analogy" ? (
        <>
          <Professor tone="explanation">Uma imagem para guardar o conceito.</Professor>
          <div className="mt-8 space-y-8">
            {body.analogy.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "whyMatters" ? (
        <>
          <Professor tone="explanation">Por que isso muda o que você vê.</Professor>
          <div className="mt-8 space-y-8">
            {body.whyMatters.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "application" ? (
        <>
          <Professor tone="hint">O que isso muda na prática — só o que a aula já mostrou.</Professor>
          <div className="mt-8 space-y-8">
            {body.application.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "mistakes" ? (
        <>
          <Professor tone="hint">Três confusões que parecem certas.</Professor>
          <div className="mt-8 space-y-8">
            {body.mistakes.map((block) => (
              <MistakeCard key={block.id} block={block} />
            ))}
          </div>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "challenge" ? (
        <>
          <Professor tone="hint">{challenge.prompt}</Professor>
          <Text variant="body" className="mt-3">
            Toque uma alternativa. Depois confira. Se não for essa, você tenta de novo.
          </Text>
          <div className="mt-6 space-y-3">
            {challenge.options.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={choice === option.id}
                onClick={() => setChoice(option.id)}
              >
                {option.label}
              </ChoiceButton>
            ))}
          </div>
          {feedback === "almost" ? (
            <div className="mt-5">
              <Feedback kind="almost">Quase. Olhe de novo a pergunta e as alternativas.</Feedback>
            </div>
          ) : null}
          {feedback === "success" ? (
            <div className="mt-5">
              <Feedback kind="success">Certo. Vamos seguir.</Feedback>
            </div>
          ) : null}
          <GuideTarget step="challenge" className="mt-8">
            <Button
              variant="cta"
              disabled={!choice}
              onClick={() => {
                const result = choice === challenge.answerId ? "success" : "almost";
                setFeedback(result);
                dispatch({ type: "ANSWER_CHALLENGE", challengeId: challenge.id, result });
              }}
            >
              Conferir resposta
            </Button>
          </GuideTarget>
        </>
      ) : null}

      {step === "teachback" ? (
        <>
          <Professor tone="explanation">Agora me explique com suas palavras.</Professor>
          <div className="mt-2 flex items-center">
            <HelpTip label="Por que ensinar de volta">
              Explicar com as suas palavras é o que faz a aula ficar. Não precisa escrever bonito.
            </HelpTip>
          </div>
          <Text variant="bodyLarge" className="mt-4">
            {teachBack.prompt}
          </Text>
          <div className="mt-5 flex flex-wrap gap-2">
            {(["livre", "guiado", "rapido"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTeachMode(mode)}
                className={`min-h-11 rounded-[var(--radius-pill)] border px-4 text-[14px] ${
                  teachMode === mode
                    ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                    : "border-[var(--border)]"
                }`}
              >
                {mode === "livre" ? "Escrever" : mode === "guiado" ? "Com ajuda" : "Escolher ideias"}
              </button>
            ))}
          </div>
          {teachMode === "livre" ? (
            <div className="mt-5">
              <TextArea
                value={teachText}
                onChange={(event) => setTeachText(event.target.value)}
                placeholder="Escreva como se estivesse explicando para a professora."
              />
            </div>
          ) : null}
          {teachMode === "guiado" ? (
            <div className="mt-5 space-y-4">
              <TextArea
                value={guided.what}
                onChange={(event) => setGuided({ ...guided, what: event.target.value })}
                placeholder="O que é?"
              />
              <TextArea
                value={guided.why}
                onChange={(event) => setGuided({ ...guided, why: event.target.value })}
                placeholder="Por que acontece?"
              />
              <TextArea
                value={guided.importance}
                onChange={(event) => setGuided({ ...guided, importance: event.target.value })}
                placeholder="Por que isso importa?"
              />
            </div>
          ) : null}
          {teachMode === "rapido" ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {teachBack.keyIdeas.map((idea) => {
                const on = chips.includes(idea);
                return (
                  <button
                    key={idea}
                    type="button"
                    onClick={() =>
                      setChips((current) =>
                        current.includes(idea) ? current.filter((item) => item !== idea) : [...current, idea],
                      )
                    }
                    className={`min-h-11 rounded-[var(--radius-pill)] border px-4 ${
                      on
                        ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {idea}
                  </button>
                );
              })}
            </div>
          ) : null}
          {feedback === "almost" ? (
            <div className="mt-5">
              <Feedback kind="almost">
                Quase. Revise e tente novamente
                {missingIdeas.length ? ` — ainda falta: ${missingIdeas.join(", ")}.` : "."}
              </Feedback>
            </div>
          ) : null}
          <GuideTarget step="teachback" className="mt-8">
            <Button
              variant="cta"
              disabled={assembledTeach.trim().length < 8}
              onClick={() => {
                const result = scoreTeachBack(assembledTeach, teachBack);
                setFeedback(result === "fail" ? "almost" : result);
                dispatch({
                  type: "COMPLETE_TEACH_BACK",
                  teachBackId: teachBack.id,
                  result,
                });
              }}
            >
              Conferir minha explicação
            </Button>
          </GuideTarget>
        </>
      ) : null}

      {step === "mastery" ? (
        <>
          <Professor tone="explanation">Antes de fechar, veja o que já ficou firme.</Professor>
          <Text variant="body" className="mt-3">
            Conceitos em construção têm um caminho: você pode revisá-los agora ou voltar depois pela Revisão.
          </Text>
          <div className="mt-6 space-y-5">
            {chapter.conceptIds.map((id) => {
              const concept = catalog.normalized.concepts.find((item) => item.id === id);
              const value = computeMastery(snapshot.masteryEvents, id);
              return (
                <Card key={id} variant="progress" className="p-6">
                  <Text variant="h3">{concept?.title ?? "Conceito da aula"}</Text>
                  <div className="mt-4">
                    <MasteryMeter
                      value={value}
                      label={value >= MASTERY_THRESHOLD ? "Já ficou firme" : "Ainda em construção"}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
          <Button href="/revisao" variant="ghost" className="mt-5 w-full">
            Abrir revisão dos conceitos
          </Button>
          <PrimaryContinue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "boss" && currentBoss ? (
        <>
          <Professor tone="introduction">Você chegou ao desafio final.</Professor>
          <Text variant="bodyLarge" className="mt-3">
            {boss.title}
          </Text>
          <Text variant="caption" className="mt-4">
            Pergunta {bossIndex + 1} de {boss.items.length}
          </Text>
          <Card variant="elevated" className="mt-4 space-y-3 p-6">
            <Text variant="bodyLarge" className="text-[var(--text-primary)]">
              {currentBoss.prompt}
            </Text>
            {currentBoss.options.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={bossAnswers[currentBoss.id] === option.id}
                onClick={() =>
                  setBossAnswers((current) => ({ ...current, [currentBoss.id]: option.id }))
                }
              >
                {option.label}
              </ChoiceButton>
            ))}
          </Card>
          {bossFeedback === "almost" ? (
            <div className="mt-5">
              <Feedback kind="almost">
                Quase. Use a pergunta como pista, reveja a aula e tente o desafio final novamente.
              </Feedback>
            </div>
          ) : null}
          <GuideTarget step="boss" className="mt-8">
            {bossIndex < boss.items.length - 1 ? (
              <Button
                variant="cta"
                disabled={!bossAnswers[currentBoss.id]}
                onClick={() => setBossIndex((index) => index + 1)}
              >
                Próxima pergunta
              </Button>
            ) : (
              <Button
                variant="cta"
                disabled={boss.items.some((item) => !bossAnswers[item.id])}
                onClick={() => {
                  const ok = boss.items.every((item) => bossAnswers[item.id] === item.answerId);
                  const result = ok ? "success" : "almost";
                  setBossFeedback(result);
                  dispatch({ type: "COMPLETE_BOSS", bossId: boss.id, result });
                  if (!ok) setBossIndex(0);
                }}
              >
                Concluir capítulo
              </Button>
            )}
          </GuideTarget>
        </>
      ) : null}

      {step === "reward" ? (
        <div className="relative motion-grow space-y-6 overflow-hidden py-6 text-center">
          <div aria-hidden className="reward-sparks pointer-events-none absolute inset-0">
            <span className="reward-spark left-[18%] top-4" />
            <span className="reward-spark left-[72%] top-10" />
            <span className="reward-spark left-[48%] top-2" />
          </div>
          <Professor tone="celebration">Capítulo concluído!</Professor>
          <Text variant="bodyLarge">Você terminou {chapter.title}.</Text>
          <Card variant="solid" className="text-left">
            <Text variant="label">Síntese para levar</Text>
            <Text variant="body" className="mt-2 text-[var(--text-primary)]">
              {mission?.content ?? `Você consolidou os conceitos centrais de ${chapter.title}.`}
            </Text>
          </Card>
          <Feedback kind="xp">+{XP_RULES.chapterComplete} XP</Feedback>
          <div className="flex justify-center">
            <FlowerSlot state="bloomed" label={chapter.title} />
          </div>
          {states[chapter.id] === "MASTERED" ? (
            <Feedback kind="achievement">Este capítulo ficou firme.</Feedback>
          ) : (
            <Feedback kind="chapter">Capítulo concluído. Você pode seguir a jornada.</Feedback>
          )}
          <GuideTarget step="reward" className="space-y-3 pt-2">
            {nextChapter && nextChapter.id !== chapter.id ? (
              <Button href={`/capitulo/${nextChapter.id}`} variant="cta" onClick={complete}>
                {active ? "Começar minha jornada" : "Abrir o próximo capítulo"}
              </Button>
            ) : (
              <Button href="/jardim" variant="cta" onClick={complete}>
                {active ? "Começar minha jornada" : "Ver o que floresceu"}
              </Button>
            )}
            <Button href="/mapa" variant="ghost" className="w-full" onClick={complete}>
              Ver todos os capítulos
            </Button>
          </GuideTarget>
        </div>
      ) : null}
    </AppShell>
  );
}
