import { QUELOIDE_FILE, cite } from "@/domain/source";
import type { LessonBody } from "@/domain/epistemic";
import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceCatalog } from "@/domain/source";

const FILE = QUELOIDE_FILE;
const s = (slide: number, section?: string, asset_id?: string) => cite(FILE, slide, section, asset_id);
const published = "published" as const;

export const QUELOIDE_01 = "queloide-01";
export const AULA_05 = "aula-queloide-01";
const concepts = ["conc-processo-inadequado", "conc-fase-reparo-tecidual", "conc-fatores-interferem"];

const ASSET_S04 = "q-s04-image2";
const ASSET_S05 = "q-s05-image3";

export const source05: SourceCatalog = {
  documents: [
    {
      id: "src-queloide",
      filename: FILE,
      type: "slides",
      title: "Cicatrização Quelóide e Hipertrófica",
      metadata: {
        professor: "Prof.ª Ms. Cintia Zacaib Silva",
        autorOriginal: "AMD",
        editadoPor: "Cintia-cpd",
        tituloInterno: "Cicatrização Quelóide e Hipertrófica",
      },
    },
  ],
  slides: [
    {
      id: "slide-q-1",
      documentId: "src-queloide",
      slideNumber: 1,
      title: "Cicatrização Quelóide e Hipertrófica",
      text: "São decorrentes de um processo cicatricial inadequado, provocado por lesão tecidual seja por trauma, cirurgia ou queimadura.",
      assets: [],
    },
    {
      id: "slide-q-2",
      documentId: "src-queloide",
      slideNumber: 2,
      title: "Processo de cicatrização",
      text: "É o processo pelo qual um tecido lesado é substituído por tecido conjuntivo vascularizado semelhante.\nO processo de cicatrização envolve um conjunto de fases fisiológicas e bioquímicas em resposta a uma lesão, culminando com o reparo tecidual",
      assets: [],
    },
    {
      id: "slide-q-3",
      documentId: "src-queloide",
      slideNumber: 3,
      title: "Fases do Reparo",
      text: "Fase do reparo tecidual – inicia no 3º dia e pode durar até meses ou anos.\nCaracteriza-se pelo alinhamento e reorganização das fibras para aumentar a resistência do tecido e diminuir a espessura da cicatriz.",
      assets: [],
    },
    {
      id: "slide-q-4",
      documentId: "src-queloide",
      slideNumber: 4,
      title: "",
      text: "",
      assets: [ASSET_S04],
    },
    {
      id: "slide-q-5",
      documentId: "src-queloide",
      slideNumber: 5,
      title: "",
      text: "",
      assets: [ASSET_S05],
    },
    {
      id: "slide-q-6",
      documentId: "src-queloide",
      slideNumber: 6,
      title: "Fatores que interferem na cicatrização",
      text: "Perfusão e oxigenação do tecido\nMedicamentos – os quimioterápicos e os radioterápicos retardam a cicatrização porque reduzem a resposta imune normal\nNutrição – a deficiência nutricional dificulta a cicatrização ao deprimir o sistema imune\nEdema e obstrução linfática – dificulta a cicatrização ao diminuir o fluxo sanguíneo",
      assets: [],
    },
    {
      id: "slide-q-7",
      documentId: "src-queloide",
      slideNumber: 7,
      title: "Fatores que interferem na cicatrização",
      text: "Idade – nos idosos, a cicatrização é mais lenta devido a diminuição da capacidade proliferativa das células e pela pouca elasticidade dos tecidos\nLocalização da ferida – feridas mais vascularizadas e em áreas de menor mobilidade cicatrizam mais rápido",
      assets: [],
    },
  ],
  assets: [
    {
      id: ASSET_S04,
      documentId: "src-queloide",
      slideNumber: 4,
      type: "diagram",
      uri: "/content/queloide/slide-04-image2.png",
      metadata: {
        pptMedia: "image2.png",
        slideText: "vazio",
        labelsOnImage: "Ferida Aberta; Tecido de granulação; Cicatriz; PUS",
      },
    },
    {
      id: ASSET_S05,
      documentId: "src-queloide",
      slideNumber: 5,
      type: "diagram",
      uri: "/content/queloide/slide-05-image3.png",
      metadata: {
        pptMedia: "image3.png",
        slideText: "vazio",
        labelsOnImage: "Ferida Incisional; Cicatriz",
      },
    },
  ],
};

export const normalized05: NormalizedCatalog = {
  topics: [
    {
      id: "topic-quando-reparo-falha",
      title: "Quando o reparo falha",
      concepts,
      sourceRefs: [s(1), s(2), s(3), s(4, undefined, ASSET_S04), s(5, undefined, ASSET_S05), s(6), s(7)],
    },
  ],
  concepts: [
    {
      id: "conc-processo-inadequado",
      title: "Processo cicatricial inadequado",
      description:
        "Quelóide e cicatriz hipertrófica decorrem de processo cicatricial inadequado, provocado por lesão tecidual por trauma, cirurgia ou queimadura.",
      sourceRefs: [s(1)],
      relatedConcepts: ["conc-fase-reparo-tecidual"],
      importance: "core",
      tags: ["abertura"],
    },
    {
      id: "conc-fase-reparo-tecidual",
      title: "Fase do reparo tecidual",
      description:
        "Neste arquivo: inicia no 3º dia, pode durar meses ou anos. Alinhamento e reorganização das fibras para aumentar a resistência e diminuir a espessura da cicatriz.",
      sourceRefs: [s(2), s(3, "Fases do Reparo")],
      relatedConcepts: ["conc-processo-inadequado", "conc-fatores-interferem"],
      importance: "core",
      tags: ["tempo"],
    },
    {
      id: "conc-fatores-interferem",
      title: "Fatores que interferem na cicatrização",
      description:
        "Perfusão e oxigenação; medicamentos (quimio/radioterápicos); nutrição; edema e obstrução linfática; idade; localização da ferida.",
      sourceRefs: [s(6), s(7)],
      relatedConcepts: ["conc-fase-reparo-tecidual"],
      importance: "core",
      tags: ["modificadores"],
    },
  ],
};

export const pedagogy05: PedagogyCatalog = {
  subjects: [],
  modules: [
    {
      id: "module-queloide",
      subjectId: "subject-dermatofuncional-ii",
      title: "Quelóide e Cicatriz Hipertrófica",
      chapterIds: [QUELOIDE_01],
      sourceRefs: [s(1), s(2), s(3), s(4), s(5), s(6), s(7)],
      order: 2,
    },
  ],
  chapters: [
    {
      id: QUELOIDE_01,
      moduleId: "module-queloide",
      title: "Quando o reparo falha",
      conceptIds: concepts,
      lessonId: AULA_05,
      missionId: "missao-queloide-01",
      challengeId: "desafio-queloide-01",
      teachBackId: "teach-queloide-01",
      bossId: "boss-queloide-01",
      sourceRefs: [s(1), s(2), s(3), s(4, undefined, ASSET_S04), s(5, undefined, ASSET_S05), s(6), s(7)],
      order: 5,
    },
  ],
  lessons: [
    {
      id: AULA_05,
      chapterId: QUELOIDE_01,
      title: "Quando o reparo falha",
      content: "Processo de cicatrização, fase do reparo e o que interfere — com o esquema rotulado do slide 4.",
      sourceRefs: [s(1), s(2), s(3), s(4, undefined, ASSET_S04), s(6), s(7)],
      status: published,
      order: 5,
      conceptIds: concepts,
      mold: "full",
    },
  ],
  missions: [
    {
      id: "missao-queloide-01",
      chapterId: QUELOIDE_01,
      title: "Nomear o inadequado sem diagnosticar a figura",
      content:
        "Hoje você lê o que este arquivo chama de processo inadequado e de fase do reparo, nomeia os fatores que interferem, e olha o esquema do slide 4 pelos rótulos que a própria figura escreve — sem inventar legenda nem fundir este relógio com o PPT anterior.",
      sourceRefs: [s(1), s(3), s(4, undefined, ASSET_S04), s(6)],
      status: published,
      order: 5,
      conceptIds: concepts,
    },
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    {
      id: "desafio-queloide-01",
      chapterId: QUELOIDE_01,
      title: "Quando começa o reparo neste arquivo",
      content: "Testa o slide 3, não o relógio do outro PPT.",
      prompt: "Neste recorte, a fase do reparo tecidual inicia:",
      options: [
        {
          id: "a",
          label: "No 3º dia, e pode durar até meses ou anos.",
        },
        {
          id: "b",
          label: "Só quando a figura do slide 4 escreve PUS.",
        },
        {
          id: "c",
          label: "Apenas nos idosos, porque a fonte reserva o reparo à pouca elasticidade.",
        },
      ],
      answerId: "a",
      sourceRefs: [s(3, "Fases do Reparo")],
      status: published,
      order: 5,
      conceptIds: ["conc-fase-reparo-tecidual"],
    },
  ],
  teachBacks: [
    {
      id: "teach-queloide-01",
      chapterId: QUELOIDE_01,
      title: "Explique o reparo neste arquivo",
      content: "Recuperação ativa.",
      prompt:
        "Com suas palavras: de onde vêm quelóide e cicatriz hipertrófica neste recorte, quando começa a fase do reparo, e o que a figura do slide 4 escreve (não o que você imagina que ela significa)?",
      mode: "livre",
      expectedAnswer:
        "Decorrem de processo cicatricial inadequado por trauma, cirurgia ou queimadura. A fase do reparo inicia no 3º dia e pode durar meses ou anos, com alinhamento das fibras. O esquema do slide 4 rotula Ferida Aberta, Tecido de granulação, Cicatriz; a fileira de baixo inclui PUS. O slide não explica o PUS nem nomeia quelóide na figura.",
      keyIdeas: ["inadequado", "3º", "reparo", "PUS", "granulação"],
      rubric: [
        { id: "orig", label: "Liga a processo inadequado / trauma-cirurgia-queimadura", keys: ["inadeq", "trauma", "cirurg", "queim"], required: true },
        { id: "dia", label: "Cita o 3º dia da fase do reparo", keys: ["3", "reparo"], required: true },
        { id: "fig", label: "Nomeia rótulo da figura (ferida / granulação / PUS / cicatriz)", keys: ["ferida", "granula", "pus", "cicatriz"], required: true },
      ],
      sourceRefs: [s(1), s(3), s(4, undefined, ASSET_S04)],
      status: published,
      order: 5,
      conceptIds: concepts,
    },
  ],
  bosses: [
    {
      id: "boss-queloide-01",
      chapterId: QUELOIDE_01,
      title: "Boss · quando o reparo falha",
      content: "Três níveis, inclusive o esquema rotulado.",
      sourceRefs: [s(1), s(3), s(4, undefined, ASSET_S04), s(6), s(7)],
      status: published,
      order: 5,
      conceptIds: concepts,
      items: [
        {
          id: "q-med",
          prompt: "Quimioterápicos e radioterápicos, segundo a fonte, retardam a cicatrização porque:",
          options: [
            { id: "a", label: "Reduzem a resposta imune normal" },
            { id: "b", label: "Aumentam a elasticidade dos tecidos no idoso" },
            { id: "c", label: "Escrevem PUS na fileira de cima do esquema" },
          ],
          answerId: "a",
          level: "recognition",
        },
        {
          id: "q-loc",
          prompt: "O que diferencia localização de idade, neste recorte?",
          options: [
            {
              id: "a",
              label: "Idade: feridas mais vascularizadas cicatrizam mais rápido. Localização: idosos têm reparo mais lento.",
            },
            {
              id: "b",
              label: "Idade: em idosos o reparo é mais lento (proliferação e elasticidade). Localização: áreas mais vascularizadas e de menor mobilidade cicatrizam mais rápido.",
            },
            {
              id: "c",
              label: "Os dois fatores são o mesmo: a fonte só nomeia PUS.",
            },
          ],
          answerId: "b",
          level: "differentiation",
        },
        {
          id: "q-pus",
          prompt:
            "No esquema do slide 4, a palavra PUS aparece na fileira de baixo, entre Ferida Aberta e Tecido de granulação. O que a fonte permite afirmar?",
          options: [
            {
              id: "a",
              label: "PUS é o nome que a professora deu ao quelóide neste esquema.",
            },
            {
              id: "b",
              label: "A figura rotula um passo PUS nessa fileira. O slide não traz texto que explique o desfecho nem ligue PUS a quelóide.",
            },
            {
              id: "c",
              label: "A fileira de cima é a fase do reparo que inicia no 3º dia, porque a fonte escreve isso na figura.",
            },
          ],
          answerId: "b",
          level: "reasoning",
        },
      ],
    },
  ],
  reviews: [],
  assessments: [],
};

export const body05: LessonBody = {
  lessonId: AULA_05,
  objective: [
    {
      id: "obj-05",
      kind: "transformacao-pedagogica",
      text: "Ao terminar, você define processo inadequado e fase do reparo com este arquivo, lista os fatores que interferem, e lê o esquema do slide 4 pelos rótulos escritos na figura — sem inventar legenda e sem fundir com o PPT de cicatrização.",
      sourceRefs: [s(1), s(3), s(4, undefined, ASSET_S04), s(6)],
    },
  ],
  what: [
    {
      id: "what-inadeq",
      kind: "fato-da-fonte",
      text: "Quelóide e cicatriz hipertrófica são decorrentes de um processo cicatricial inadequado, provocado por lesão tecidual seja por trauma, cirurgia ou queimadura.",
      sourceRefs: [s(1)],
    },
    {
      id: "what-proc",
      kind: "fato-da-fonte",
      text: "Processo de cicatrização: o processo pelo qual um tecido lesado é substituído por tecido conjuntivo vascularizado semelhante. Envolve um conjunto de fases fisiológicas e bioquímicas em resposta a uma lesão, culminando com o reparo tecidual.",
      sourceRefs: [s(2, "Processo de cicatrização")],
    },
  ],
  whyExists: [
    {
      id: "why-05",
      kind: "transformacao-pedagogica",
      text: "Este arquivo não começa pela lista de cinco fases do outro PPT: começa pelo inadequado (trauma, cirurgia, queimadura) e só depois nomeia a fase do reparo. Sem essa abertura, o esquema do slide 4 vira desenho solto.",
      sourceRefs: [s(1), s(3)],
    },
  ],
  how: [
    {
      id: "how-reparo",
      kind: "fato-da-fonte",
      text: "Fase do reparo tecidual — inicia no 3º dia e pode durar até meses ou anos. Caracteriza-se pelo alinhamento e reorganização das fibras para aumentar a resistência do tecido e diminuir a espessura da cicatriz.",
      sourceRefs: [s(3, "Fases do Reparo")],
    },
    {
      id: "how-relogio-outro",
      kind: "interpretacao-da-fonte",
      text: "Este arquivo chama “Fase do reparo tecidual” e a inicia no 3º dia. Não há, neste recorte, uma lista de cinco fases. O MM Study não funde este relógio com o de outro arquivo.",
      sourceRefs: [s(3, "Fases do Reparo")],
    },
    {
      id: "how-s4-estrutura",
      kind: "fato-da-fonte",
      text: "O slide 4 não tem caixa de texto. Tem um asset (image2.png). Rótulos visíveis na figura: Ferida Aberta; Tecido de granulação; Cicatriz; na fileira de baixo, também PUS.",
      sourceRefs: [s(4, undefined, ASSET_S04)],
    },
    {
      id: "how-s4-sentido",
      kind: "interpretacao-da-fonte",
      text: "A figura não escreve “quelóide”, “hipertrófica”, “infecção” nem “segunda intenção”. Extração do asset não interpreta as duas fileiras. Qualquer leitura de “preço da infecção” permanece interpretação, não fato da professora.",
      sourceRefs: [s(4, undefined, ASSET_S04)],
    },
    {
      id: "how-s5",
      kind: "fato-da-fonte",
      text: "O slide 5 não tem caixa de texto. Tem um asset (image3.png). Rótulos visíveis: Ferida Incisional; Cicatriz.",
      sourceRefs: [s(5, undefined, ASSET_S05)],
    },
    {
      id: "how-fatores-6",
      kind: "fato-da-fonte",
      text: "Fatores que interferem: perfusão e oxigenação do tecido; medicamentos — quimioterápicos e radioterápicos retardam porque reduzem a resposta imune normal; nutrição — deficiência deprime o sistema imune; edema e obstrução linfática — diminuem o fluxo sanguíneo.",
      sourceRefs: [s(6)],
    },
    {
      id: "how-fatores-7",
      kind: "fato-da-fonte",
      text: "Idade — nos idosos, a cicatrização é mais lenta devido à diminuição da capacidade proliferativa das células e pela pouca elasticidade dos tecidos. Localização da ferida — feridas mais vascularizadas e em áreas de menor mobilidade cicatrizam mais rápido.",
      sourceRefs: [s(7)],
    },
  ],
  figure: {
    id: "fig-05-esquema-s04",
    asset_id: ASSET_S04,
    uri: "/content/queloide/slide-04-image2.png",
    captionFromSource:
      "Ferida Aberta → Tecido de granulação → Cicatriz. Fileira inferior: Ferida Aberta → PUS → Tecido de granulação → Cicatriz.",
    kind: "fato-da-fonte",
    demonstratesConceptId: "conc-processo-inadequado",
    observe:
      "Asset extraído do slide 4. Olhe os rótulos escritos na própria figura. O slide não tem legenda fora da imagem.",
    sourceRefs: [s(4, undefined, ASSET_S04)],
    hotspots: [
      { id: "hs-fa-top", label: "Ferida Aberta (fileira de cima)", note: "Rótulo escrito na figura." },
      { id: "hs-tg-top", label: "Tecido de granulação (fileira de cima)", note: "Rótulo escrito na figura." },
      { id: "hs-ci-top", label: "Cicatriz (fileira de cima)", note: "Rótulo escrito na figura." },
      { id: "hs-fa-bot", label: "Ferida Aberta (fileira de baixo)", note: "Rótulo escrito na figura." },
      { id: "hs-pus", label: "PUS", note: "Rótulo escrito na figura, na fileira de baixo." },
      { id: "hs-tg-bot", label: "Tecido de granulação (fileira de baixo)", note: "Rótulo escrito na figura." },
      { id: "hs-ci-bot", label: "Cicatriz (fileira de baixo)", note: "Rótulo escrito na figura." },
    ],
  },
  analogy: [
    {
      id: "an-05",
      kind: "transformacao-pedagogica",
      text: "Pense em dois caminhos desenhados a partir da mesma ferida aberta. A figura nomeia os passos; ela não conta a história clínica. Os fatores dos slides 6–7 são o que a fonte escreve sobre o que atrasa o caminho — não o diagnóstico da imagem.",
      sourceRefs: [s(4, undefined, ASSET_S04), s(6), s(7)],
    },
  ],
  whyMatters: [
    {
      id: "imp-05",
      kind: "transformacao-pedagogica",
      text: "Se quelóide e hipertrófica já nascem, neste arquivo, de processo inadequado, o primeiro clique não é “que técnica usar”. É reconhecer o relógio deste PPT (reparo no 3º dia) e não tratar o esquema rotulado como se ele tivesse diagnosticado a foto clínica que só aparece depois.",
      sourceRefs: [s(1), s(3), s(4, undefined, ASSET_S04)],
    },
  ],
  application: [
    {
      id: "app-05-rel",
      kind: "transformacao-pedagogica",
      clinicalType: "relevance",
      text: "Relevância: saber se o raciocínio está nos fatores que este recorte nomeia (imune, nutrição, edema, idade, localização) ou no esquema rotulado. A fonte não diz o que a fisioterapeuta aplica.",
      sourceRefs: [s(6), s(7)],
    },
    {
      id: "app-05-cond",
      kind: "lacuna",
      text: "Slides 1–7 não descrevem conduta fisioterapêutica.",
      sourceRefs: [s(1), s(7)],
      lacuna: "Sem protocolo. Conduta deste livro só aparece em slides posteriores, fora deste recorte.",
    },
  ],
  mistakes: [
    {
      id: "err-05-fundir",
      confusion: "A fase do reparo deste arquivo é a mesma lista de cinco fases do PPT de cicatrização.",
      whyItSeemsRight: "Os dois arquivos falam de cicatrizar.",
      whatReallyHappens: "Aqui a fase do reparo inicia no 3º dia e fala de alinhamento de fibras. A outra lista não está neste recorte.",
      howToDifferentiate: "Cite o slide 3 deste arquivo. Não importe o relógio do outro PPT.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(3, "Fases do Reparo")],
    },
    {
      id: "err-05-pus-queloide",
      confusion: "PUS no esquema = quelóide.",
      whyItSeemsRight: "O capítulo se chama quelóide e a figura está no mesmo arquivo.",
      whatReallyHappens: "A figura escreve PUS. Não escreve quelóide. O slide 4 não tem texto.",
      howToDifferentiate: "Separe rótulo visível de diagnóstico inventado.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(4, undefined, ASSET_S04)],
    },
    {
      id: "err-05-idade",
      confusion: "Toda ferida de idoso cicatriza mais rápido se for bem vascularizada.",
      whyItSeemsRight: "A fonte fala de vascularização e de idade no mesmo bloco de fatores.",
      whatReallyHappens: "São fatores distintos: idade (proliferação/elasticidade) e localização (vascularização e mobilidade).",
      howToDifferentiate: "Recite os dois bullets do slide 7 em separado.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(7)],
    },
  ],
};
