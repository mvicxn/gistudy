import { CICATRIZACAO_FILE, cite } from "@/domain/source";
import type { LessonBody } from "@/domain/epistemic";
import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceCatalog } from "@/domain/source";

const FILE = CICATRIZACAO_FILE;
const s = (slide: number, section?: string) => cite(FILE, slide, section);
const published = "published" as const;

export const CICATRIZACAO_03 = "cicatrizacao-03";
export const AULA_03 = "aula-cicatrizacao-03";
const concepts = ["conc-fase-proliferativa", "conc-fase-remodelagem"];

export const source03: SourceCatalog = {
  documents: [],
  slides: [
    {
      id: "slide-cic-6",
      documentId: "src-cicatrizacao",
      slideNumber: 6,
      title: "FASE PROLIFERATIVA",
      text: "Sobrepõe-se à fase inflamatória, com duração de 10 a 17 dias (14 a 21 dias após o início da lesão.\nFibroplasia – importante na formação do tecido de granulação.\nAngiogênese;\nContração da ferida",
      assets: [],
    },
    {
      id: "slide-cic-7",
      documentId: "src-cicatrizacao",
      slideNumber: 7,
      title: "FASE DE REMODELAGEM",
      text: "Sobrepõe-se à fase proliferativa, inicia-se no 14 a 21 dia, até meses ou anos a lesão.\nProcesso que pode levar meses;\nDeposição de fibras colágenas em resposta a lesão tecidual é aparentemente ao acaso, durante a remodelação o arranjo e o tipo de colágeno são mudados;\nColágeno do tipo III é substituído por colágeno do tipo I em resposta ao estresse mecânico até atingir características semelhantes as do tecido anterior à lesão;",
      assets: [],
    },
    {
      id: "slide-cic-8",
      documentId: "src-cicatrizacao",
      slideNumber: 8,
      title: "FASE DE REMODELAGEM",
      text: "A água é reabsorvida da cicatriz, o que permite que as fibras colágenas fiquem juntas novamente, favorecendo a ligação cruzada entre elas e diminui a espessura da cicatriz.\nA neovascularização diminui, gradualmente, levando a uma cicatrização final, consideravelmente mais avascular.\nCicatriz com 80% da força de tensão.",
      assets: [],
    },
  ],
  assets: [],
};

export const normalized03: NormalizedCatalog = {
  topics: [
    {
      id: "topic-construir-esculpir",
      title: "Construir e esculpir",
      concepts,
      sourceRefs: [s(6), s(7), s(8)],
    },
  ],
  concepts: [
    {
      id: "conc-fase-proliferativa",
      title: "Fase proliferativa",
      description:
        "Sobrepõe-se à inflamatória. 10 a 17 dias (14 a 21 dias após o início da lesão). Fibroplasia, angiogênese, contração da ferida.",
      sourceRefs: [s(6, "FASE PROLIFERATIVA")],
      relatedConcepts: ["conc-fase-remodelagem"],
      importance: "core",
      tags: ["construir"],
    },
    {
      id: "conc-fase-remodelagem",
      title: "Fase de remodelagem",
      description:
        "Sobrepõe-se à proliferativa. Inicia no 14 a 21 dia, pode durar meses ou anos. Colágeno III → I; água reabsorvida; 80% da força de tensão.",
      sourceRefs: [s(7, "FASE DE REMODELAGEM"), s(8, "FASE DE REMODELAGEM")],
      relatedConcepts: ["conc-fase-proliferativa"],
      importance: "core",
      tags: ["esculpir"],
    },
  ],
};

export const pedagogy03: PedagogyCatalog = {
  subjects: [],
  modules: [],
  chapters: [
    {
      id: CICATRIZACAO_03,
      moduleId: "module-cicatrizacao",
      title: "Construir e esculpir",
      conceptIds: concepts,
      lessonId: AULA_03,
      missionId: "missao-cicatrizacao-03",
      challengeId: "desafio-cicatrizacao-03",
      teachBackId: "teach-cicatrizacao-03",
      bossId: "boss-cicatrizacao-03",
      sourceRefs: [s(6), s(7), s(8)],
      order: 3,
    },
  ],
  lessons: [
    {
      id: AULA_03,
      chapterId: CICATRIZACAO_03,
      title: "Construir e esculpir",
      content: "Proliferação, contração neste recorte, e remodelagem.",
      sourceRefs: [s(6), s(7), s(8)],
      status: published,
      order: 3,
      conceptIds: concepts,
      mold: "full",
    },
  ],
  missions: [
    {
      id: "missao-cicatrizacao-03",
      chapterId: CICATRIZACAO_03,
      title: "Construir, depois esculpir",
      content:
        "Hoje você separa proliferação de remodelagem com os tempos da fonte, nomeia fibroplasia, angiogênese e contração onde o slide 6 as põe, e não resolve o conflito com o mapa do slide 2 inventando uma terceira lista.",
      sourceRefs: [s(6), s(7), s(8)],
      status: published,
      order: 3,
      conceptIds: concepts,
    },
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    {
      id: "desafio-cicatrizacao-03",
      chapterId: CICATRIZACAO_03,
      title: "Onde está a contração",
      content: "Testa o recorte do slide 6, não uma lista externa.",
      prompt: "Neste recorte (slides 6–8), a contração da ferida aparece como:",
      options: [
        {
          id: "a",
          label: "Uma fase depois da remodelagem, quando a água já foi reabsorvida.",
        },
        {
          id: "b",
          label: "Um componente da fase proliferativa, junto de fibroplasia e angiogênese.",
        },
        {
          id: "c",
          label: "A troca de colágeno III por colágeno I.",
        },
      ],
      answerId: "b",
      sourceRefs: [s(6, "FASE PROLIFERATIVA")],
      status: published,
      order: 3,
      conceptIds: ["conc-fase-proliferativa"],
    },
  ],
  teachBacks: [
    {
      id: "teach-cicatrizacao-03",
      chapterId: CICATRIZACAO_03,
      title: "Explique construir e esculpir",
      content: "Recuperação ativa.",
      prompt:
        "Com suas palavras: o que a fase proliferativa faz neste recorte e o que muda na remodelagem (colágeno, água, força)?",
      mode: "livre",
      expectedAnswer:
        "A proliferativa sobrepõe-se à inflamatória (10 a 17 dias; 14 a 21 após o início da lesão) com fibroplasia, angiogênese e contração da ferida. A remodelagem sobrepõe-se à proliferativa, inicia no 14 a 21 dia, pode levar meses: colágeno III é substituído por I; a água é reabsorvida; a cicatriz fica com 80% da força de tensão.",
      keyIdeas: ["proliferativa", "fibroplasia", "contração", "remodelagem", "colágeno", "80%"],
      rubric: [
        { id: "prol", label: "Nomeia proliferativa e ao menos fibroplasia/angiogênese/contração", keys: ["prolifer", "fibropl", "angiog", "contra"], required: true },
        { id: "remo", label: "Nomeia remodelagem e a troca ou a força", keys: ["remodel", "colágen", "colagen", "80"], required: true },
      ],
      sourceRefs: [s(6), s(7), s(8)],
      status: published,
      order: 3,
      conceptIds: concepts,
    },
  ],
  bosses: [
    {
      id: "boss-cicatrizacao-03",
      chapterId: CICATRIZACAO_03,
      title: "Boss · construir e esculpir",
      content: "Três níveis.",
      sourceRefs: [s(6), s(7), s(8)],
      status: published,
      order: 3,
      conceptIds: concepts,
      items: [
        {
          id: "q-80",
          prompt: "Na fonte, a cicatriz na remodelagem fica com:",
          options: [
            { id: "a", label: "80% da força de tensão" },
            { id: "b", label: "10 a 17 dias de duração única" },
            { id: "c", label: "Só colágeno do tipo III" },
          ],
          answerId: "a",
          level: "recognition",
        },
        {
          id: "q-iii",
          prompt: "O que diferencia a remodelagem da proliferação neste recorte, quanto ao colágeno?",
          options: [
            {
              id: "a",
              label: "Na proliferação o colágeno III já é trocado por I; a remodelagem só faz angiogênese.",
            },
            {
              id: "b",
              label: "Na remodelagem o colágeno III é substituído por I em resposta ao estresse mecânico.",
            },
            {
              id: "c",
              label: "A fonte não nomeia tipos de colágeno.",
            },
          ],
          answerId: "b",
          level: "differentiation",
        },
        {
          id: "q-sobrepor",
          prompt:
            "A fonte diz que a proliferativa se sobrepõe à inflamatória e que a remodelagem se sobrepõe à proliferativa. O que isso muda na leitura do relógio?",
          options: [
            {
              id: "a",
              label: "As fases são caixas fechadas: uma termina, a outra começa, sem sobreposição.",
            },
            {
              id: "b",
              label: "Os tempos se encavalam. Construir e esculpir não esperam a fase anterior acabar no relógio da fonte.",
            },
            {
              id: "c",
              label: "A sobreposição anula a contração da ferida.",
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

export const body03: LessonBody = {
  lessonId: AULA_03,
  objective: [
    {
      id: "obj-03",
      kind: "transformacao-pedagogica",
      text: "Ao terminar, você descreve proliferação (incluindo contração neste slide) e remodelagem com os números da fonte, e deixa visível o conflito com o mapa do slide 2 — sem escolher um vencedor com texto de fora.",
      sourceRefs: [s(6), s(7), s(8)],
    },
  ],
  what: [
    {
      id: "what-prol",
      kind: "fato-da-fonte",
      text: "Fase proliferativa: sobrepõe-se à fase inflamatória, com duração de 10 a 17 dias (14 a 21 dias após o início da lesão. Fibroplasia — importante na formação do tecido de granulação. Angiogênese. Contração da ferida.",
      sourceRefs: [s(6, "FASE PROLIFERATIVA")],
    },
    {
      id: "what-remo",
      kind: "fato-da-fonte",
      text: "Fase de remodelagem: sobrepõe-se à proliferativa, inicia-se no 14 a 21 dia, até meses ou anos. Processo que pode levar meses.",
      sourceRefs: [s(7, "FASE DE REMODELAGEM")],
    },
  ],
  whyExists: [
    {
      id: "why-03",
      kind: "transformacao-pedagogica",
      text: "A fonte não trata proliferação e remodelagem como o mesmo gesto: uma constrói (fibroplasia, angiogênese, contração); a outra rearranja colágeno, água e vasos até 80% da força.",
      sourceRefs: [s(6), s(7), s(8)],
    },
  ],
  how: [
    {
      id: "how-fibro",
      kind: "fato-da-fonte",
      text: "Fibroplasia é importante na formação do tecido de granulação. Angiogênese. Contração da ferida.",
      sourceRefs: [s(6, "FASE PROLIFERATIVA")],
    },
    {
      id: "how-conflito",
      kind: "interpretacao-da-fonte",
      text: "O slide 2 deste arquivo listou “contração das feridas” como fase própria. O slide 6 a coloca dentro da proliferativa. Este capítulo ensina o que o slide 6 escreve. Não se inventa uma lista única para “resolver” o PPT.",
      sourceRefs: [s(6, "FASE PROLIFERATIVA")],
    },
    {
      id: "how-colageno",
      kind: "fato-da-fonte",
      text: "A deposição de fibras colágenas em resposta à lesão é aparentemente ao acaso; durante a remodelação o arranjo e o tipo de colágeno são mudados. Colágeno do tipo III é substituído por colágeno do tipo I em resposta ao estresse mecânico até atingir características semelhantes às do tecido anterior à lesão.",
      sourceRefs: [s(7, "FASE DE REMODELAGEM")],
    },
    {
      id: "how-agua",
      kind: "fato-da-fonte",
      text: "A água é reabsorvida da cicatriz, o que permite que as fibras colágenas fiquem juntas novamente, favorecendo a ligação cruzada entre elas e diminui a espessura da cicatriz. A neovascularização diminui gradualmente, levando a uma cicatrização final consideravelmente mais avascular. Cicatriz com 80% da força de tensão.",
      sourceRefs: [s(8, "FASE DE REMODELAGEM")],
    },
  ],
  figure: {
    id: "fig-03-ausente",
    kind: "lacuna",
    demonstratesConceptId: "conc-fase-proliferativa",
    observe: "Não há figura nos slides 6, 7 e 8.",
    sourceRefs: [s(6)],
    lacuna: "LACUNA DE FIGURA. Zero extração. Zero hotspot. Zero legenda inventada.",
  },
  analogy: [
    {
      id: "an-03",
      kind: "transformacao-pedagogica",
      text: "Primeiro a obra sobe (fibroplasia, vasos novos, a ferida puxa). Depois a casa é esculpida: o colágeno muda de tipo, a água sai, a cicatriz afina e fica menos vascular — e a fonte cifra 80% da força.",
      sourceRefs: [s(6), s(7), s(8)],
    },
  ],
  whyMatters: [
    {
      id: "imp-03",
      kind: "transformacao-pedagogica",
      text: "Se a proliferativa já se sobrepõe à inflamatória e a remodelagem à proliferativa, estudar “em que dia exatamente uma fase morre” não é o que a fonte descreve. O que muda: você lê tempos que se encavalam, e a contração neste recorte não é um terceiro livro — está no slide da proliferação.",
      sourceRefs: [s(6), s(7)],
    },
  ],
  application: [
    {
      id: "app-03-rel",
      kind: "transformacao-pedagogica",
      clinicalType: "relevance",
      text: "Relevância: saber se o raciocínio está no tempo de construir (granulação, angiogênese, contração neste slide) ou de esculpir (colágeno III→I, água, 80%). A fonte não diz o que a fisioterapeuta faz em cada dia.",
      sourceRefs: [s(6), s(7), s(8)],
    },
    {
      id: "app-03-cond",
      kind: "lacuna",
      text: "Slides 6–8 não descrevem conduta fisioterapêutica.",
      sourceRefs: [s(6), s(7), s(8)],
      lacuna: "Sem protocolo.",
    },
  ],
  mistakes: [
    {
      id: "err-03-caixas",
      confusion: "Uma fase acaba, a outra começa. Sem sobreposição.",
      whyItSeemsRight: "Listas em coluna parecem degraus.",
      whatReallyHappens: "A fonte diz que a proliferativa se sobrepõe à inflamatória e a remodelagem à proliferativa.",
      howToDifferentiate: "Se a resposta desenha caixas fechadas, faltou a palavra “sobrepõe-se”.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(6), s(7)],
    },
    {
      id: "err-03-contracao",
      confusion: "Ignorar o slide 6 e tratar contração só como fase isolada do slide 2.",
      whyItSeemsRight: "O mapa inicial a listou à parte.",
      whatReallyHappens: "Neste recorte a contração da ferida está na proliferativa. O conflito com o slide 2 permanece visível; não se apaga um dos dois.",
      howToDifferentiate: "Diga as duas escritas. Não invente a síntese.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(6, "FASE PROLIFERATIVA")],
    },
    {
      id: "err-03-80",
      confusion: "Cicatriz madura = 100% da força da pele.",
      whyItSeemsRight: "“Madura” soa como original.",
      whatReallyHappens: "A fonte cifra 80% da força de tensão.",
      howToDifferentiate: "Se a resposta for 100%, faltou o slide 8.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(8, "FASE DE REMODELAGEM")],
    },
  ],
};
