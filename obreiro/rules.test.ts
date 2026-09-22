import assert from "node:assert/strict";
import { test } from "vitest";
import { body02, pedagogy02 } from "@/content/pilot/campo-inflamatorio";
import { body03, pedagogy03 } from "@/content/pilot/construir-esculpir";
import { body04, pedagogy04 } from "@/content/pilot/duas-intencoes";
import { body05, pedagogy05 } from "@/content/pilot/quando-o-reparo-falha";
import { body06, pedagogy06 } from "@/content/pilot/cicatriz-que-transborda";
import { lessonBody, pilotPedagogy } from "@/content/pilot/relogio-da-ferida";
import { FULL_LESSON_FLOW } from "@/domain/mold";
import { PILOT_FLOW } from "@/engine/lesson-flow";
import { assertLessonMold, validateLessonMold, OBREIRO_RULES } from "@/obreiro/rules";

test("molde da experiência é o pipeline congelado", () => {
  assert.deepEqual(PILOT_FLOW, FULL_LESSON_FLOW);
});

test("Capítulo 01 continua compatível com as regras do obreiro", () => {
  const lesson = pilotPedagogy.lessons[0];
  const challenge = pilotPedagogy.challenges[0];
  const teachBack = pilotPedagogy.teachBacks[0];
  const boss = pilotPedagogy.bosses[0];
  const issues = validateLessonMold({ lesson, body: lessonBody, challenge, teachBack, boss });
  assert.deepEqual(issues, []);
  assertLessonMold({ lesson, body: lessonBody, challenge, teachBack, boss });
});

test("regras congeladas cobrem o molde F5A", () => {
  assert.ok(OBREIRO_RULES.interpretationIsNotFact);
  assert.ok(OBREIRO_RULES.clinicalTypes);
  assert.ok(OBREIRO_RULES.lacunaIsValid);
  assert.ok(OBREIRO_RULES.masterySeparateFromXp);
  assert.ok(OBREIRO_RULES.xpCentralized);
});

test("Capítulos 02, 03 e 04 passam no molde congelado sem alterá-lo", () => {
  const packs = [
    { lesson: pedagogy02.lessons[0], body: body02, challenge: pedagogy02.challenges[0], teachBack: pedagogy02.teachBacks[0], boss: pedagogy02.bosses[0] },
    { lesson: pedagogy03.lessons[0], body: body03, challenge: pedagogy03.challenges[0], teachBack: pedagogy03.teachBacks[0], boss: pedagogy03.bosses[0] },
    { lesson: pedagogy04.lessons[0], body: body04, challenge: pedagogy04.challenges[0], teachBack: pedagogy04.teachBacks[0], boss: pedagogy04.bosses[0] },
  ];
  for (const pack of packs) {
    assert.deepEqual(validateLessonMold(pack), []);
    assertLessonMold(pack);
    assert.equal(pack.lesson.mold, "full");
  }
});

test("Capítulos 05 e 06 passam no molde congelado sem alterá-lo", () => {
  const packs = [
    { lesson: pedagogy05.lessons[0], body: body05, challenge: pedagogy05.challenges[0], teachBack: pedagogy05.teachBacks[0], boss: pedagogy05.bosses[0] },
    { lesson: pedagogy06.lessons[0], body: body06, challenge: pedagogy06.challenges[0], teachBack: pedagogy06.teachBacks[0], boss: pedagogy06.bosses[0] },
  ];
  for (const pack of packs) {
    assert.deepEqual(validateLessonMold(pack), []);
    assertLessonMold(pack);
    assert.equal(pack.lesson.mold, "full");
  }
});

test("fato com unsourced viola o molde", () => {
  const issues = validateLessonMold({
    lesson: pilotPedagogy.lessons[0],
    body: {
      ...lessonBody,
      what: [
        {
          id: "fake",
          kind: "fato-da-fonte",
          text: "invenção",
          sourceRefs: [{ file: "", slide: 0, unsourced: true }],
        },
      ],
    },
    challenge: pilotPedagogy.challenges[0],
    teachBack: pilotPedagogy.teachBacks[0],
    boss: pilotPedagogy.bosses[0],
  });
  assert.ok(issues.some((item) => item.rule === "interpretationIsNotFact"));
});
