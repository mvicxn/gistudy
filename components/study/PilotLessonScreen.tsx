"use client";

import { AppShell, BackLink, PageIntro } from "@/components/ds/AppShell";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Feedback } from "@/components/ds/Feedback";
import { TextArea } from "@/components/ds/Input";
import { Professor } from "@/components/ds/Professor";
import { MasteryMeter } from "@/components/ds/Progress";
import { Text } from "@/components/ds/Text";
import { CiteList, KindBadge, MistakeCard, SourcedCard } from "@/components/study/SourcedBlocks";
import { useStudyView } from "@/components/study/StudyProvider";
import { XP_RULES } from "@/config/xp-rules";
import { AULA_01, PHASES_SLIDE_2 } from "@/content/pilot/relogio-da-ferida";
import type { LessonBody } from "@/domain/epistemic";
import type { LessonStep } from "@/domain/experience";
import type { Chapter, Lesson, MicroChallenge, TeachBack, ChapterBoss } from "@/domain/pedagogy";
import { computeMastery, MASTERY_THRESHOLD } from "@/engine/mastery";
import { nextStep, STEP_LABEL, STEP_XP } from "@/engine/lesson-flow";
import { scoreTeachBack } from "@/engine/teachback";
import { nextAvailableChapter } from "@/engine/progression";
import { useState } from "react";

function Continue({
  lesson,
  step,
  onContinue,
}: {
  lesson: Lesson;
  step: LessonStep;
  onContinue: () => void;
}) {
  const following = nextStep(lesson, step);
  const rule = STEP_XP[step];
  return (
    <div className="mt-6 space-y-3">
      {rule ? (
        <Feedback kind="xp">
          Ao seguir: +{XP_RULES[rule]} XP ({rule}). Não é domínio.
        </Feedback>
      ) : null}
      <Button variant="cta" onClick={onContinue}>
        {following ? `Seguir · ${STEP_LABEL[following]}` : "Continuar"}
      </Button>
    </div>
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
  const step = snapshot.chapters[chapter.id]?.currentStep ?? "objective";
  const [choice, setChoice] = useState("");
  const [feedback, setFeedback] = useState<"success" | "almost" | null>(null);
  const [teachMode, setTeachMode] = useState<"livre" | "guiado" | "rapido">(teachBack.mode);
  const [teachText, setTeachText] = useState("");
  const [guided, setGuided] = useState({ what: "", why: "", importance: "" });
  const [chips, setChips] = useState<string[]>([]);
  const [bossAnswers, setBossAnswers] = useState<Record<string, string>>({});
  const [bossFeedback, setBossFeedback] = useState<"success" | "almost" | null>(null);

  function advance() {
    dispatch({ type: "COMPLETE_SEGMENT", lessonId: lesson.id, step });
    setFeedback(null);
    setBossFeedback(null);
  }

  const assembledTeach =
    teachMode === "guiado"
      ? `${guided.what} ${guided.why} ${guided.importance}`
      : teachMode === "rapido"
        ? chips.join(" ")
        : teachText;

  const nextChapter = nextAvailableChapter(catalog.pedagogy.chapters, snapshot);

  return (
    <AppShell
      trail={[
        { href: "/biblioteca", label: "Biblioteca" },
        { href: "/mapa", label: "Mapa" },
        { href: `/capitulo/${chapter.id}`, label: chapter.title },
        { label: STEP_LABEL[step] },
      ]}
    >
      <BackLink href={`/capitulo/${chapter.id}`}>Voltar ao capítulo</BackLink>
      <PageIntro kicker={`Passo · ${STEP_LABEL[step]}`} title={chapter.title} />

      {step === "objective" ? (
        <>
          <Professor tone="introduction">{catalog.pedagogy.missions.find((item) => item.id === chapter.missionId)?.content}</Professor>
          <div className="mt-4 space-y-3">
            {body.objective.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "what" ? (
        <>
          <Professor tone="explanation">O que a fonte afirma neste recorte.</Professor>
          <div className="mt-4 space-y-3">
            {body.what.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "whyExists" ? (
        <>
          <Professor tone="explanation">Por que este recorte existe no mapa, não como enfeite.</Professor>
          <div className="mt-4 space-y-3">
            {body.whyExists.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "how" ? (
        <>
          <Professor tone="explanation">Como a fonte descreve o mecanismo neste recorte.</Professor>
          <div className="mt-4 space-y-3">
            {body.how.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "figure" ? (
        <>
          <Professor tone="hint">{body.figure.observe}</Professor>
          <Card variant="locked" className="mt-4 space-y-2">
            <KindBadge kind={body.figure.kind} />
            {body.figure.uri ? (
              <img
                src={body.figure.uri}
                alt={body.figure.captionFromSource ?? "Asset extraído da fonte"}
                className="mt-2 w-full rounded-[var(--radius-lg)]"
              />
            ) : null}
            <Text variant="body" className="text-[var(--text-primary)]">
              {body.figure.observe}
            </Text>
            {body.figure.captionFromSource ? (
              <Text variant="bodySmall">Legenda / rótulos da fonte: {body.figure.captionFromSource}</Text>
            ) : null}
            {body.figure.hotspots?.map((spot) => (
              <Text key={spot.id} variant="bodySmall">
                {spot.label} — {spot.note}
              </Text>
            ))}
            {body.figure.lacuna ? (
              <Text variant="bodySmall" className="text-[var(--pink)]">
                {body.figure.lacuna}
              </Text>
            ) : null}
            <CiteList refs={body.figure.sourceRefs} />
          </Card>
          {lesson.id === AULA_01 ? (
            <Card variant="elevated" className="mt-4 space-y-3">
              <KindBadge kind="transformacao-pedagogica" />
              <Text variant="label">Mapa pedagógico das fases — não é asset do PPT</Text>
              <ol className="space-y-2">
                {PHASES_SLIDE_2.map((phase, index) => (
                  <li
                    key={phase}
                    className="flex min-h-11 items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] px-4"
                  >
                    <span className="text-[var(--lilac)]">{index + 1}</span>
                    <span>{phase}</span>
                  </li>
                ))}
              </ol>
              <CiteList refs={body.what[0]?.sourceRefs ?? body.figure.sourceRefs} />
            </Card>
          ) : null}
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "analogy" ? (
        <>
          <Professor tone="explanation">Uma imagem mental fiel ao conceito, sem virar fato novo.</Professor>
          <div className="mt-4 space-y-3">
            {body.analogy.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "whyMatters" ? (
        <>
          <Professor tone="explanation">Por que este recorte muda o mapa.</Professor>
          <div className="mt-4 space-y-3">
            {body.whyMatters.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "application" ? (
        <>
          <Professor tone="hint">
            Conduta só entra se a fonte sustentar. Se só houver relevância, o bloco é relevância. Sem suporte: lacuna.
          </Professor>
          <div className="mt-4 space-y-3">
            {body.application.map((block) => (
              <SourcedCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "mistakes" ? (
        <>
          <Professor tone="hint">Três confusões que parecem certas — e como separar.</Professor>
          <div className="mt-4 space-y-3">
            {body.mistakes.map((block) => (
              <MistakeCard key={block.id} block={block} />
            ))}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "challenge" ? (
        <>
          <Professor tone="hint">{challenge.prompt}</Professor>
          <CiteList refs={challenge.sourceRefs} />
          <div className="mt-4 space-y-2">
            {challenge.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setChoice(option.id)}
                className={`flex min-h-11 w-full items-center rounded-[var(--radius-lg)] border px-4 py-3 text-left ${
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
              <Feedback kind="almost">
                Quase. Os produtos não param no tampão: eles direcionam o curso futuro.
              </Feedback>
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
          <CiteList refs={teachBack.sourceRefs} />
          <div className="mt-4 flex flex-wrap gap-2">
            {(["livre", "guiado", "rapido"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTeachMode(mode)}
                className={`min-h-11 rounded-[var(--radius-pill)] border px-4 ${
                  teachMode === mode
                    ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                    : "border-[var(--border)]"
                }`}
              >
                {mode === "livre" ? "Livre" : mode === "guiado" ? "Guiado" : "Rápido"}
              </button>
            ))}
          </div>
          {teachMode === "livre" ? (
            <div className="mt-4">
              <TextArea
                value={teachText}
                onChange={(event) => setTeachText(event.target.value)}
                placeholder="Explique com as suas palavras. Sem IA nesta fase."
              />
            </div>
          ) : null}
          {teachMode === "guiado" ? (
            <div className="mt-4 space-y-3">
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
                placeholder="Qual a importância?"
              />
            </div>
          ) : null}
          {teachMode === "rapido" ? (
            <div className="mt-4 flex flex-wrap gap-2">
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
            <div className="mt-4">
              <Feedback kind="almost">
                Quase. Falta alguma ideia-chave: imediato após a injúria, plaqueta/cascada, produtos que
                direcionam o curso futuro.
              </Feedback>
            </div>
          ) : null}
          <div className="mt-6">
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
              Entregar explicação
            </Button>
          </div>
        </>
      ) : null}

      {step === "mastery" ? (
        <>
          <Professor tone="explanation">
            Domínio se calcula por eventos, separado do XP. Recência ainda não esfria o número — lacuna da
            máquina, não da aula.
          </Professor>
          <div className="mt-4 space-y-4">
            {chapter.conceptIds.map((id) => {
              const concept = catalog.normalized.concepts.find((item) => item.id === id);
              const value = computeMastery(snapshot.masteryEvents, id);
              return (
                <Card key={id} variant="progress">
                  <Text variant="h3">{concept?.title ?? id}</Text>
                  <div className="mt-3">
                    <MasteryMeter value={value} label={value >= MASTERY_THRESHOLD ? "Dominado" : "Em construção"} />
                  </div>
                  <CiteList refs={concept?.sourceRefs ?? []} />
                </Card>
              );
            })}
          </div>
          <Continue lesson={lesson} step={step} onContinue={advance} />
        </>
      ) : null}

      {step === "boss" ? (
        <>
          <Professor tone="introduction">{boss.title}. Três perguntas do capítulo inteiro.</Professor>
          <div className="mt-4 space-y-4">
            {boss.items.map((item) => (
              <Card key={item.id} variant="elevated" className="space-y-3">
                <p>{item.prompt}</p>
                {item.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setBossAnswers((current) => ({ ...current, [item.id]: option.id }))}
                    className={`flex min-h-11 w-full items-center rounded-[var(--radius-lg)] border px-4 py-3 text-left ${
                      bossAnswers[item.id] === option.id
                        ? "border-[var(--lilac)] bg-[rgba(185,160,232,0.16)]"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </Card>
            ))}
          </div>
          {bossFeedback === "almost" ? (
            <div className="mt-4">
              <Feedback kind="almost">
                Quase. O boss pede reconhecimento, diferenciação e raciocínio — não só a lista.
              </Feedback>
            </div>
          ) : null}
          <div className="mt-6">
            <Button
              variant="cta"
              disabled={boss.items.some((item) => !bossAnswers[item.id])}
              onClick={() => {
                const ok = boss.items.every((item) => bossAnswers[item.id] === item.answerId);
                const result = ok ? "success" : "almost";
                setBossFeedback(result);
                dispatch({ type: "COMPLETE_BOSS", bossId: boss.id, result });
              }}
            >
              Fechar o capítulo
            </Button>
          </div>
        </>
      ) : null}

      {step === "reward" ? (
        <>
          <Professor tone="celebration">O capítulo fechou. A flor nasceu. XP não é domínio.</Professor>
          <Feedback kind="xp">+{XP_RULES.chapterComplete} XP de capítulo · regra canônica.</Feedback>
          <div className="mt-4">
            <Feedback kind="flower">O canteiro de {chapter.title} respondeu.</Feedback>
          </div>
          {states[chapter.id] === "MASTERED" ? (
            <div className="mt-4">
              <Feedback kind="achievement">Capítulo dominado. Mastery ≥ {MASTERY_THRESHOLD}.</Feedback>
            </div>
          ) : (
            <div className="mt-4">
              <Feedback kind="chapter">Capítulo concluído. Algum conceito ainda não chegou a {MASTERY_THRESHOLD}.</Feedback>
            </div>
          )}
          <div className="mt-6 space-y-3">
            {nextChapter && nextChapter.id !== chapter.id ? (
              <Button href={`/capitulo/${nextChapter.id}`} variant="cta">
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
