import assert from "node:assert/strict";
import { test } from "vitest";
import { scoreTeachBack } from "@/engine/teachback";
import { firstStep, flowFor, PILOT_FLOW } from "@/engine/lesson-flow";
import { lessonBody, pilotPedagogy } from "@/content/pilot/relogio-da-ferida";

test("aula piloto usa o molde completo", () => {
  const lesson = pilotPedagogy.lessons[0];
  assert.equal(lesson.mold, "full");
  assert.equal(firstStep(lesson), "objective");
  assert.deepEqual(flowFor(lesson), PILOT_FLOW);
});

test("teach-back exige as ideias-chave, não qualquer texto longo", () => {
  const teachBack = pilotPedagogy.teachBacks[0];
  assert.equal(scoreTeachBack("texto longo sem o conceito da aula de cicatrização", teachBack), "fail");
  assert.equal(
    scoreTeachBack(
      "Inicia imediatamente após a injúria. Plaquetas e a cascada medeiam. Os produtos direcionam o curso futuro por efeitos quimiotáxicos.",
      teachBack,
    ),
    "success",
  );
});

test("todo fato da fonte tem source_ref rastreável e nenhum unsourced", () => {
  const facts = [
    ...lessonBody.objective,
    ...lessonBody.what,
    ...lessonBody.whyExists,
    ...lessonBody.how,
    ...lessonBody.analogy,
    ...lessonBody.whyMatters,
    ...lessonBody.application,
  ].filter((block) => block.kind === "fato-da-fonte");

  assert.ok(facts.length > 0);
  for (const fact of facts) {
    assert.ok(fact.sourceRefs.length > 0);
    for (const ref of fact.sourceRefs) {
      assert.equal(ref.unsourced, undefined);
      assert.ok(ref.file.includes("cicatriza"));
      assert.ok(ref.slide >= 1 && ref.slide <= 4);
    }
  }
});

test("figura do piloto é lacuna, sem legenda inventada", () => {
  assert.equal(lessonBody.figure.kind, "lacuna");
  assert.equal(lessonBody.figure.captionFromSource, undefined);
  assert.equal(lessonBody.figure.asset_id, undefined);
  assert.ok(lessonBody.figure.lacuna);
});

test("erros comuns usam o formato Confusão → parece correto → acontece → diferenciar", () => {
  assert.equal(lessonBody.mistakes.length, 3);
  for (const mistake of lessonBody.mistakes) {
    assert.ok(mistake.confusion);
    assert.ok(mistake.whyItSeemsRight);
    assert.ok(mistake.whatReallyHappens);
    assert.ok(mistake.howToDifferentiate);
    assert.ok(mistake.sourceRefs.some((ref) => !ref.unsourced));
  }
});

test("boss tem três níveis: reconhecimento, diferenciação e raciocínio", () => {
  const boss = pilotPedagogy.bosses[0];
  const challenge = pilotPedagogy.challenges[0];
  assert.equal(boss.items.length, 3);
  assert.notEqual(boss.items[0].prompt, challenge.prompt);
  assert.match(boss.items[0].prompt, /segunda/i);
  assert.match(boss.items[1].prompt, /diferencia/i);
  assert.match(boss.items[2].prompt, /injúria/i);
});

test("microdesafio e boss não usam conteúdo posterior aos slides 1–4", () => {
  const blob = [
    ...pilotPedagogy.challenges[0].options.map((item) => item.label),
    ...pilotPedagogy.bosses[0].items.flatMap((item) => [item.prompt, ...item.options.map((opt) => opt.label)]),
  ].join(" ");
  assert.equal(/colágeno|14º|21º|24 a 48/i.test(blob), false);
});

test("ambiguidade do slide 3 fica como interpretação, não como fato", () => {
  const block = lessonBody.how.find((item) => item.id === "how-gramatica");
  assert.equal(block?.kind, "interpretacao-da-fonte");
  assert.equal(/adesão à parede e a liberação de produtos são da plaqueta/i.test(block?.text ?? ""), false);
});

test("aplicação separa relevância de conduta", () => {
  const relevance = lessonBody.application.find((item) => item.clinicalType === "relevance");
  const conductGap = lessonBody.application.find((item) => item.kind === "lacuna");
  assert.ok(relevance);
  assert.ok(conductGap);
  assert.equal(relevance?.kind, "transformacao-pedagogica");
});
