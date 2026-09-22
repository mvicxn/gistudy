import assert from "node:assert/strict";
import { test } from "vitest";
import { catalog, getLessonBody } from "@/content/catalog";
import { body02, pedagogy02 } from "@/content/pilot/campo-inflamatorio";
import { body03, pedagogy03 } from "@/content/pilot/construir-esculpir";
import { body04, pedagogy04 } from "@/content/pilot/duas-intencoes";
import { lessonBody, pilotPedagogy } from "@/content/pilot/relogio-da-ferida";
import { FULL_LESSON_FLOW } from "@/domain/mold";
import { flowFor } from "@/engine/lesson-flow";
import type { LessonBody } from "@/domain/epistemic";
import type { PedagogyCatalog } from "@/domain/pedagogy";

const packs: { name: string; pedagogy: PedagogyCatalog; body: LessonBody; forbidden: RegExp }[] = [
  {
    name: "02",
    pedagogy: pedagogy02,
    body: body02,
    forbidden: /fibroplasia|10 a 17|80% da força|primeira intenção|Linchtenstein/i,
  },
  {
    name: "03",
    pedagogy: pedagogy03,
    body: body03,
    forbidden: /cortisona|desprosivos|primeira intenção|quelóide|Linchtenstein|24 a 48 horas/i,
  },
  {
    name: "04",
    pedagogy: pedagogy04,
    body: body04,
    forbidden: /cortisona|desprosivos|10 a 17 dias|80% da força/i,
  },
];

test("catálogo mantém Cicatrização 01–04 e não inventa 07–14", () => {
  const ids = catalog.pedagogy.chapters.map((chapter) => chapter.id);
  assert.deepEqual(ids.slice(0, 4), [
    "cicatrizacao-01",
    "cicatrizacao-02",
    "cicatrizacao-03",
    "cicatrizacao-04",
  ]);
  assert.equal(catalog.pedagogy.lessons.every((lesson) => lesson.mold === "full"), true);
  assert.equal(ids.includes("queloide-03"), false);
  assert.equal(ids.includes("queloide-04"), false);
  assert.equal(ids.some((id) => /abdomino|mamo|cicatrizacao-0[5-9]/.test(id)), false);
});

test("capítulos 02–04 usam o mesmo molde do capítulo 01", () => {
  const moldKeys: (keyof LessonBody)[] = [
    "objective",
    "what",
    "whyExists",
    "how",
    "figure",
    "analogy",
    "whyMatters",
    "application",
    "mistakes",
  ];
  for (const body of [lessonBody, body02, body03, body04]) {
    for (const key of moldKeys) {
      assert.ok(body[key], `falta ${String(key)} em ${body.lessonId}`);
    }
    assert.equal(body.figure.kind, "lacuna");
    assert.ok(body.application.some((block) => block.clinicalType === "relevance"));
    assert.ok(body.application.some((block) => block.kind === "lacuna"));
    assert.equal(body.mistakes.length, 3);
  }
  for (const lesson of catalog.pedagogy.lessons) {
    assert.deepEqual(flowFor(lesson), FULL_LESSON_FLOW);
  }
  assert.equal(pilotPedagogy.missions.length, 1);
  assert.equal(pedagogy02.missions.length, 1);
  assert.equal(pedagogy03.missions.length, 1);
  assert.equal(pedagogy04.missions.length, 1);
});

test("getLessonBody resolve 01–04 e não inventa 05", () => {
  assert.equal(getLessonBody("aula-cicatrizacao-01")?.lessonId, "aula-cicatrizacao-01");
  assert.equal(getLessonBody("aula-cicatrizacao-02")?.lessonId, "aula-cicatrizacao-02");
  assert.equal(getLessonBody("aula-cicatrizacao-03")?.lessonId, "aula-cicatrizacao-03");
  assert.equal(getLessonBody("aula-cicatrizacao-04")?.lessonId, "aula-cicatrizacao-04");
  assert.equal(getLessonBody("aula-cicatrizacao-05"), undefined);
});

test("microdesafio e boss dos capítulos 02–04 não cobram conteúdo de outro recorte", () => {
  for (const pack of packs) {
    const blob = [
      ...pack.pedagogy.challenges[0].options.map((item) => item.label),
      ...pack.pedagogy.bosses[0].items.flatMap((item) => [
        item.prompt,
        ...item.options.map((opt) => opt.label),
      ]),
    ].join(" ");
    assert.equal(pack.forbidden.test(blob), false, `capítulo ${pack.name} vazou recorte alheio`);
    assert.deepEqual(
      pack.pedagogy.bosses[0].items.map((item) => item.level),
      ["recognition", "differentiation", "reasoning"],
    );
  }
});

test("cada fato-da-fonte dos capítulos 02–04 aponta só para o recorte do capítulo", () => {
  const allowed: Record<string, number[]> = {
    "aula-cicatrizacao-02": [5, 9, 10, 11, 12],
    "aula-cicatrizacao-03": [6, 7, 8],
    "aula-cicatrizacao-04": [13, 14, 15, 16, 17, 18, 19],
  };
  for (const body of [body02, body03, body04]) {
    const slides = allowed[body.lessonId];
    const facts = [
      ...body.objective,
      ...body.what,
      ...body.whyExists,
      ...body.how,
      ...body.analogy,
      ...body.whyMatters,
      ...body.application,
    ].filter((block) => block.kind === "fato-da-fonte");
    assert.ok(facts.length > 0);
    for (const fact of facts) {
      for (const ref of fact.sourceRefs) {
        assert.equal(ref.unsourced, undefined);
        assert.ok(slides.includes(ref.slide), `${fact.id} slide ${ref.slide}`);
      }
    }
  }
});
