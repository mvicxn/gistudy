import { CICATRIZACAO_FILE, cite } from "@/domain/source";
import type { LessonBody } from "@/domain/epistemic";
import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceCatalog } from "@/domain/source";

const FILE = CICATRIZACAO_FILE;
const s = (slide: number, section?: string) => cite(FILE, slide, section);
const published = "published" as const;

export const CICATRIZACAO_02 = "cicatrizacao-02";
export const AULA_02 = "aula-cicatrizacao-02";
const concepts = ["conc-fase-inflamatoria", "conc-inflamacao", "conc-modificadores-inflamacao"];

export const source02: SourceCatalog = {
  documents: [],
  slides: [
    {
      id: "slide-cic-5",
      documentId: "src-cicatrizacao",
      slideNumber: 5,
      title: "FASE INFLAMATÓRIA",
      text: "Fase aguda (inicial), duração de 24 a 48 horas.\nFase subaguda (tardia), se prolonga por mais 10 a 14 horas.\nVasorregulação e coagulação sanguínea\nMigração e ação celulares\nFatores químicos",
      assets: [],
    },
    {
      id: "slide-cic-9",
      documentId: "src-cicatrizacao",
      slideNumber: 9,
      title: "INFLAMAÇÃO",
      text: "Inflamação é uma reação local, por meio do qual o organismo procura defender-se da ação de agentes lesivo-inflamatórios ou flogísticos. Para que haja uma inflamação é necessário que se desenvolvam no local da flogose, também os fenômenos vasculares e exsudativos. Não se inflamam, portanto, os tecidos desprosivos de vasos sanguíneos (ex: tecidos epiteliais).",
      assets: [],
    },
    {
      id: "slide-cic-10",
      documentId: "src-cicatrizacao",
      slideNumber: 10,
      title: "Manifestações locais",
      text: "As manifestações locais de uma inflamação aguda apresentam três componentes desta resposta: modificações hemodinâmicas, modificações da permeabilidade e fenômenos relacionados com os leucócitos, nesta ordem.\nAs modificações hemodinâmicas exigem uma circulação intacta para que ocorra, na seguinte ordem.\n1. dilatação arteriolar, as vezes procedida de vasoconstrição transitória.\n2. aumento do fluxo sanguíneo e nas arteriolas.\n3. abertura de novos capilares e dos leitos venulares locais.",
      assets: [],
    },
    {
      id: "slide-cic-11",
      documentId: "src-cicatrizacao",
      slideNumber: 11,
      title: "Fatores que modificam a inflamação",
      text: "Quando o estado de reatividade é alto, a reação inflamatória torna-se aguda e intensa, e são mais pronunciados as fenômenos exsudativos e hemorrágicos necróticos (inflamação alérgica).\nA reação inflamatória é modificada fortemente por ações hormonais.",
      assets: [],
    },
    {
      id: "slide-cic-12",
      documentId: "src-cicatrizacao",
      slideNumber: 12,
      title: "Cortisona",
      text: "A cortisona inibe o aparecimento da exsudação e dos fenômenos produtivos.\nApós a ação do corticóide, falta as vezes de modo quase que completa, a formação de células gigantes, de granulomas e são inibidas a neoprodução de fibroblastos e de colágenos (tecido de reparação).",
      assets: [],
    },
  ],
  assets: [],
};

export const normalized02: NormalizedCatalog = {
  topics: [
    {
      id: "topic-campo-inflamatorio",
      title: "O campo inflamatório",
      concepts,
      sourceRefs: [s(5), s(9), s(10), s(11), s(12)],
    },
  ],
  concepts: [
    {
      id: "conc-fase-inflamatoria",
      title: "Fase inflamatória",
      description:
        "Fase aguda 24 a 48 horas; subaguda descrita na fonte como mais 10 a 14 horas. Componentes: vasorregulação e coagulação; migração e ação celulares; fatores químicos.",
      sourceRefs: [s(5, "FASE INFLAMATÓRIA")],
      relatedConcepts: ["conc-inflamacao"],
      importance: "core",
      tags: ["tempo"],
    },
    {
      id: "conc-inflamacao",
      title: "Inflamação",
      description:
        "Reação local de defesa. Exige fenômenos vasculares e exsudativos. Tecidos sem vasos (ex.: epiteliais) não se inflamam.",
      sourceRefs: [s(9, "INFLAMAÇÃO"), s(10)],
      relatedConcepts: ["conc-fase-inflamatoria", "conc-modificadores-inflamacao"],
      importance: "core",
      tags: ["vasos"],
    },
    {
      id: "conc-modificadores-inflamacao",
      title: "Fatores que modificam a inflamação",
      description:
        "Reatividade alta: reação aguda intensa (inflamação alérgica). Ações hormonais. Cortisona inibe exsudação, fenômenos produtivos, fibroblastos e colágenos.",
      sourceRefs: [s(11), s(12)],
      relatedConcepts: ["conc-inflamacao"],
      importance: "core",
      tags: ["hormonio"],
    },
  ],
};

export const pedagogy02: PedagogyCatalog = {
  subjects: [],
  modules: [],
  chapters: [
    {
      id: CICATRIZACAO_02,
      moduleId: "module-cicatrizacao",
      title: "O campo inflamatório",
      conceptIds: concepts,
      lessonId: AULA_02,
      missionId: "missao-cicatrizacao-02",
      challengeId: "desafio-cicatrizacao-02",
      teachBackId: "teach-cicatrizacao-02",
      bossId: "boss-cicatrizacao-02",
      sourceRefs: [s(5), s(9), s(10), s(11), s(12)],
      order: 2,
    },
  ],
  lessons: [
    {
      id: AULA_02,
      chapterId: CICATRIZACAO_02,
      title: "O campo inflamatório",
      content: "Fase inflamatória, vasos e o que modifica a reação.",
      sourceRefs: [s(5), s(9), s(10), s(11), s(12)],
      status: published,
      order: 2,
      conceptIds: concepts,
      mold: "full",
    },
  ],
  missions: [
    {
      id: "missao-cicatrizacao-02",
      chapterId: CICATRIZACAO_02,
      title: "Ver o campo",
      content:
        "Hoje você nomeia a inflamação como reação local que precisa de vaso, lê os tempos da fonte sem corrigi-los e explica como hormônio e cortisona mudam o campo — sem inventar conduta.",
      sourceRefs: [s(5), s(9), s(12)],
      status: published,
      order: 2,
      conceptIds: concepts,
    },
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    {
      id: "desafio-cicatrizacao-02",
      chapterId: CICATRIZACAO_02,
      title: "Sem vaso",
      content: "Testa a condição da fonte para haver inflamação.",
      prompt: "Para que haja inflamação, segundo a fonte deste capítulo, é necessário que se desenvolvam no local:",
      options: [
        {
          id: "a",
          label: "Apenas fatores químicos. Os vasos são irrelevantes — tecidos epiteliais inflamam normalmente.",
        },
        {
          id: "b",
          label: "Os fenômenos vasculares e exsudativos. Tecidos desprosivos de vasos sanguíneos (ex.: epiteliais) não se inflamam.",
        },
        {
          id: "c",
          label: "Só modificações da permeabilidade, porque a fonte as coloca antes das hemodinâmicas.",
        },
      ],
      answerId: "b",
      sourceRefs: [s(9, "INFLAMAÇÃO")],
      status: published,
      order: 2,
      conceptIds: ["conc-inflamacao"],
    },
  ],
  teachBacks: [
    {
      id: "teach-cicatrizacao-02",
      chapterId: CICATRIZACAO_02,
      title: "Explique a inflamação",
      content: "Recuperação ativa do recorte.",
      prompt:
        "Com suas palavras: o que a fonte chama de inflamação, por que tecido sem vaso não inflama, e o que a cortisona faz neste recorte?",
      mode: "livre",
      expectedAnswer:
        "Inflamação é reação local de defesa contra agentes lesivo-inflamatórios ou flogísticos. Exige fenômenos vasculares e exsudativos no local; tecidos sem vasos (ex.: epiteliais) não se inflamam. A cortisona inibe a exsudação e os fenômenos produtivos, inclusive fibroblastos e colágenos do tecido de reparação.",
      keyIdeas: ["reação local", "vasculares", "exsudativos", "vasos", "epiteliais", "cortisona"],
      rubric: [
        { id: "defesa", label: "Chama de reação local de defesa / flogose", keys: ["local", "defen", "flog"], required: true },
        { id: "vaso", label: "Liga inflamação a vasos / fenômenos vasculares e exsudativos", keys: ["vasc", "vaso", "exsud"], required: true },
        { id: "cort", label: "Nomeia o efeito da cortisona neste recorte", keys: ["cortis", "cortic", "inib"], required: true },
      ],
      sourceRefs: [s(9, "INFLAMAÇÃO"), s(12)],
      status: published,
      order: 2,
      conceptIds: ["conc-inflamacao", "conc-modificadores-inflamacao"],
    },
  ],
  bosses: [
    {
      id: "boss-cicatrizacao-02",
      chapterId: CICATRIZACAO_02,
      title: "Boss · o campo inteiro",
      content: "Reconhecimento, diferenciação, raciocínio.",
      sourceRefs: [s(5), s(9), s(10), s(12)],
      status: published,
      order: 2,
      conceptIds: concepts,
      items: [
        {
          id: "q-aguda",
          prompt: "Na fonte, a fase inflamatória aguda (inicial) dura:",
          options: [
            { id: "a", label: "Mais 10 a 14 horas (o número que o slide usa na subaguda)" },
            { id: "b", label: "24 a 48 horas" },
            { id: "c", label: "O tempo da cortisona, que a fonte não numera nesta fase" },
          ],
          answerId: "b",
          level: "recognition",
        },
        {
          id: "q-ordem",
          prompt: "As manifestações locais da inflamação aguda, na ordem da fonte, começam por:",
          options: [
            { id: "a", label: "Fenômenos relacionados com os leucócitos" },
            { id: "b", label: "Modificações hemodinâmicas" },
            { id: "c", label: "Neoprodução de fibroblastos" },
          ],
          answerId: "b",
          level: "differentiation",
        },
        {
          id: "q-raciocinio",
          prompt:
            "Um tecido epitelial, segundo este recorte, não se inflama. Qual afirmação da fonte sustenta isso e o que isso muda na leitura do campo?",
          options: [
            {
              id: "a",
              label: "Não se inflamam tecidos desprovidos de vasos. Sem vaso não há o campo inflamatório descrito aqui.",
            },
            {
              id: "b",
              label: "A fase aguda dura 24 a 48 horas; portanto qualquer tecido inflama depois desse prazo.",
            },
            {
              id: "c",
              label: "A cortisona cria vasos novos, então o epitélio passa a inflamar.",
            },
          ],
          answerId: "a",
          level: "reasoning",
        },
      ],
    },
  ],
  reviews: [],
  assessments: [],
};

export const body02: LessonBody = {
  lessonId: AULA_02,
  objective: [
    {
      id: "obj-02",
      kind: "transformacao-pedagogica",
      text: "Ao terminar, você define inflamação com as palavras da fonte, explica por que sem vaso não há inflamação e lê os tempos do slide 5 sem corrigi-los em silêncio.",
      sourceRefs: [s(5), s(9)],
    },
  ],
  what: [
    {
      id: "what-fase",
      kind: "fato-da-fonte",
      text: "Fase inflamatória: aguda (inicial), duração de 24 a 48 horas. Fase subaguda (tardia), se prolonga por mais 10 a 14 horas. Componentes: vasorregulação e coagulação sanguínea; migração e ação celulares; fatores químicos.",
      sourceRefs: [s(5, "FASE INFLAMATÓRIA")],
    },
    {
      id: "what-def",
      kind: "fato-da-fonte",
      text: "Inflamação é uma reação local, por meio do qual o organismo procura defender-se da ação de agentes lesivo-inflamatórios ou flogísticos.",
      sourceRefs: [s(9, "INFLAMAÇÃO")],
    },
  ],
  whyExists: [
    {
      id: "why-defesa",
      kind: "transformacao-pedagogica",
      text: "Neste recorte a inflamação existe como defesa local — não como enfeite da lista de fases. A fonte a amarra a vasos e a exsudação: sem isso, o nome “inflamação” não se aplica ao tecido.",
      sourceRefs: [s(9, "INFLAMAÇÃO")],
    },
  ],
  how: [
    {
      id: "how-condicao",
      kind: "fato-da-fonte",
      text: "Para que haja uma inflamação é necessário que se desenvolvam no local da flogose também os fenômenos vasculares e exsudativos. Não se inflamam os tecidos desprosivos de vasos sanguíneos (ex.: tecidos epiteliais).",
      sourceRefs: [s(9, "INFLAMAÇÃO")],
    },
    {
      id: "how-grafia-desprosivos",
      kind: "fato-da-fonte",
      text: "Grafia da fonte a preservar: “desprosivos”.",
      sourceRefs: [s(9, "INFLAMAÇÃO")],
    },
    {
      id: "how-subaguda",
      kind: "interpretacao-da-fonte",
      text: "O slide 5 escreve a fase subaguda (tardia) como “mais 10 a 14 horas”. As demais fases deste arquivo usam dias. O MM Study não corrige para “dias” em silêncio. Fato: a fonte escreveu horas. A inconsistência temporal fica marcada.",
      sourceRefs: [s(5, "FASE INFLAMATÓRIA")],
    },
    {
      id: "how-ordem",
      kind: "fato-da-fonte",
      text: "Manifestações locais da inflamação aguda, nesta ordem: modificações hemodinâmicas, modificações da permeabilidade e fenômenos relacionados com os leucócitos.",
      sourceRefs: [s(10)],
    },
    {
      id: "how-hemo",
      kind: "fato-da-fonte",
      text: "As modificações hemodinâmicas exigem circulação intacta, nesta ordem: 1) dilatação arteriolar, às vezes procedida de vasoconstrição transitória; 2) aumento do fluxo sanguíneo nas arteríolas; 3) abertura de novos capilares e dos leitos venulares locais.",
      sourceRefs: [s(10)],
    },
    {
      id: "how-alergica",
      kind: "fato-da-fonte",
      text: "Quando o estado de reatividade é alto, a reação torna-se aguda e intensa, com fenômenos exsudativos e hemorrágicos necróticos mais pronunciados (inflamação alérgica). A reação é modificada fortemente por ações hormonais.",
      sourceRefs: [s(11)],
    },
    {
      id: "how-cortisona",
      kind: "fato-da-fonte",
      text: "A cortisona inibe o aparecimento da exsudação e dos fenômenos produtivos. Após o corticóide, pode faltar quase por completo a formação de células gigantes e de granulomas; ficam inibidas a neoprodução de fibroblastos e de colágenos (tecido de reparação).",
      sourceRefs: [s(12)],
    },
  ],
  figure: {
    id: "fig-02-ausente",
    kind: "lacuna",
    demonstratesConceptId: "conc-inflamacao",
    observe: "Não há figura nos slides 5, 9, 10, 11 e 12. O arquivo de cicatrização não contém mídia embutida.",
    sourceRefs: [s(9)],
    lacuna: "LACUNA DE FIGURA. Zero extração. Zero hotspot. Zero legenda inventada.",
  },
  analogy: [
    {
      id: "an-02",
      kind: "transformacao-pedagogica",
      text: "Pense no vaso como a rua por onde a defesa chega. Sem rua, a fonte não chama aquilo de inflamação — mesmo que o tecido tenha sido lesado.",
      sourceRefs: [s(9)],
    },
  ],
  whyMatters: [
    {
      id: "imp-02",
      kind: "transformacao-pedagogica",
      text: "Se inflamação exige vaso e exsudação, “o tecido está vermelho / o epitélio reagiu” não é o mesmo que o campo que a fonte descreve. E se a cortisona inibe fibroblastos e colágenos, a inflamação deste recorte já aponta para o reparo — sem virar receita.",
      sourceRefs: [s(9), s(12)],
    },
  ],
  application: [
    {
      id: "app-02-rel",
      kind: "transformacao-pedagogica",
      clinicalType: "relevance",
      text: "Relevância: reconhecer se você está no tempo inflamatório da fonte (aguda 24–48 h, com a subaguda tal como escrita) e se o tecido em questão tem vaso. Hormônio e cortisona, neste recorte, modificam a reação e o tecido de reparação.",
      sourceRefs: [s(5), s(9), s(12)],
    },
    {
      id: "app-02-cond",
      kind: "lacuna",
      text: "Os slides 5 e 9–12 não descrevem conduta fisioterapêutica (não dizem o que aplicar, quando tocar, qual técnica).",
      sourceRefs: [s(5), s(12)],
      lacuna: "Sem protocolo. Conduta só entra quando a fonte a sustentar.",
    },
  ],
  mistakes: [
    {
      id: "err-02-epitelio",
      confusion: "Todo tecido lesado inflama, inclusive o epitélio.",
      whyItSeemsRight: "Lesão e inflamação parecem sinônimos na fala clínica.",
      whatReallyHappens: "A fonte afirma que não se inflamam tecidos desprovidos de vasos (ex.: epiteliais).",
      howToDifferentiate: "Pergunte: este tecido tem vaso, segundo o recorte? Sem vaso, a fonte não chama de inflamação.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(9, "INFLAMAÇÃO")],
    },
    {
      id: "err-02-horas",
      confusion: "Corrigir a subaguda para “10 a 14 dias”, porque “horas não faz sentido”.",
      whyItSeemsRight: "As outras fases do arquivo usam dias.",
      whatReallyHappens: "O slide 5 escreveu horas. Interpretar e substituir seria inventar o texto da professora.",
      howToDifferentiate: "Cite o slide como está e marque a inconsistência. Não reescreva o número.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(5, "FASE INFLAMATÓRIA")],
    },
    {
      id: "err-02-cortisona",
      confusion: "Cortisona só “corta a dor”; o reparo segue igual.",
      whyItSeemsRight: "Uso clínico popular do corticóide.",
      whatReallyHappens:
        "Neste recorte a cortisona inibe exsudação, fenômenos produtivos, células gigantes, granulomas, fibroblastos e colágenos do tecido de reparação.",
      howToDifferentiate: "Se a resposta para na analgesia, falta o slide 12.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(12)],
    },
  ],
};
