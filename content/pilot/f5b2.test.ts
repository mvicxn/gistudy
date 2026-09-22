import assert from "node:assert/strict";
import { test } from "vitest";
import { catalog, getLessonBody } from "@/content/catalog";
import { lessonBody } from "@/content/pilot/relogio-da-ferida";
import { body02 } from "@/content/pilot/campo-inflamatorio";
import { body03 } from "@/content/pilot/construir-esculpir";
import { body04 } from "@/content/pilot/duas-intencoes";
import { body05, pedagogy05, source05 } from "@/content/pilot/quando-o-reparo-falha";
import { body06, pedagogy06, source06 } from "@/content/pilot/cicatriz-que-transborda";
import { FULL_LESSON_FLOW } from "@/domain/mold";
import { flowFor } from "@/engine/lesson-flow";
import { validateLessonMold } from "@/obreiro/rules";

test("01–04 permanecem semanticamente intactos depois do F5B.2", () => {
  assert.equal(lessonBody.figure.kind, "lacuna");
  assert.equal(lessonBody.figure.asset_id, undefined);
  assert.equal(lessonBody.figure.uri, undefined);
  assert.equal(body02.figure.kind, "lacuna");
  assert.equal(body03.figure.kind, "lacuna");
  assert.equal(body04.figure.kind, "lacuna");
  assert.equal(getLessonBody("aula-cicatrizacao-01")?.what[0]?.id, "what-fases");
  assert.equal(getLessonBody("aula-cicatrizacao-05"), undefined);
});

test("catálogo F5B.2 tem 01–06 e nenhum 07–14", () => {
  assert.deepEqual(
    catalog.pedagogy.chapters.map((chapter) => chapter.id),
    [
      "cicatrizacao-01",
      "cicatrizacao-02",
      "cicatrizacao-03",
      "cicatrizacao-04",
      "queloide-01",
      "queloide-02",
    ],
  );
  assert.ok(catalog.pedagogy.modules.some((module) => module.id === "module-queloide"));
  assert.equal(catalog.upcoming.some((item) => item.id === "queloide-03"), true);
  assert.equal(catalog.source.assets.length, source05.assets.length + source06.assets.length);
});

test("assets de 05–06 têm proveniência e o FigureBlock único não vira outra arquitetura", () => {
  assert.equal(body05.figure.asset_id, "q-s04-image2");
  assert.ok(body05.figure.uri?.includes("slide-04-image2"));
  assert.ok(body05.figure.captionFromSource?.includes("PUS"));
  assert.equal(body05.figure.kind, "fato-da-fonte");
  assert.ok((body05.figure.hotspots?.length ?? 0) >= 1);
  assert.ok(body05.figure.sourceRefs.some((ref) => ref.asset_id === "q-s04-image2"));

  assert.equal(body06.figure.asset_id, "q-s12-image9");
  assert.ok(body06.figure.uri?.includes("slide-12-image9"));
  assert.equal(body06.figure.captionFromSource, undefined);
  assert.equal(body06.figure.kind, "lacuna");
  assert.equal(body06.figure.hotspots, undefined);
  assert.ok(body06.figure.lacuna);

  for (const asset of [...source05.assets, ...source06.assets]) {
    assert.ok(asset.uri.startsWith("/content/queloide/"));
    assert.ok(asset.slideNumber);
    assert.ok(asset.metadata.pptMedia);
  }
});

test("validateLessonMold cobre 01–06 no catálogo", () => {
  for (const chapter of catalog.pedagogy.chapters) {
    const lesson = catalog.pedagogy.lessons.find((item) => item.id === chapter.lessonId);
    const body = getLessonBody(chapter.lessonId);
    const challenge = catalog.pedagogy.challenges.find((item) => item.id === chapter.challengeId);
    const teachBack = catalog.pedagogy.teachBacks.find((item) => item.id === chapter.teachBackId);
    const boss = catalog.pedagogy.bosses.find((item) => item.id === chapter.bossId);
    assert.ok(lesson && body && challenge && teachBack && boss);
    assert.deepEqual(validateLessonMold({ lesson, body, challenge, teachBack, boss }), []);
    assert.deepEqual(flowFor(lesson), FULL_LESSON_FLOW);
  }
});

test("microdesafio e boss de 05–06 não cobram recorte posterior", () => {
  const packs = [
    { name: "05", pedagogy: pedagogy05, forbidden: /extravasa|prurido|raça negra|hipertrófica regride|malha elástica|radioterapia/i },
    { name: "06", pedagogy: pedagogy06, forbidden: /miofibroblasto|regride espontaneamente|malha elástica|radioterapia|3º dia|quimioter/i },
  ];
  for (const pack of packs) {
    const blob = [
      ...pack.pedagogy.challenges[0].options.map((item) => item.label),
      ...pack.pedagogy.bosses[0].items.flatMap((item) => [item.prompt, ...item.options.map((opt) => opt.label)]),
    ].join(" ");
    assert.equal(pack.forbidden.test(blob), false, `capítulo ${pack.name} vazou recorte alheio: ${blob.match(pack.forbidden)}`);
    assert.deepEqual(
      pack.pedagogy.bosses[0].items.map((item) => item.level),
      ["recognition", "differentiation", "reasoning"],
    );
  }
});

test("interpretação visual não entra como fato sem suporte", () => {
  const facts = [
    ...body06.objective,
    ...body06.what,
    ...body06.whyExists,
    ...body06.how,
    ...body06.analogy,
    ...body06.whyMatters,
    ...body06.application,
  ].filter((block) => block.kind === "fato-da-fonte");
  for (const fact of facts) {
    assert.equal(/diagnóstico cervical|ângulo da mandíbula|atlas/i.test(fact.text), false, fact.id);
  }
  assert.equal(body06.how.some((block) => block.id === "how-fotos-sentido" && block.kind === "interpretacao-da-fonte"), true);
});
