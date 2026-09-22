import { CICATRIZACAO_FILE, cite, unsourced } from "@/domain/source";
import type { LessonBody } from "@/domain/epistemic";
import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceCatalog } from "@/domain/source";

const FILE = CICATRIZACAO_FILE;
const s = (slide: number, section?: string) => cite(FILE, slide, section);

export const CICATRIZACAO_01 = "cicatrizacao-01";
export const AULA_01 = "aula-cicatrizacao-01";

export const PHASES_SLIDE_2 = [
  "Coagulação",
  "Inflamação",
  "Proliferação",
  "Contração das feridas",
  "Remodelação",
] as const;

export const upcomingChapters = [
  { id: "queloide-03", title: "A cicatriz que cabe — e o diagnóstico diferencial" },
  { id: "queloide-04", title: "Tratar sem punir a pele" },
] as const;

export const pilotSource: SourceCatalog = {
  documents: [
    {
      id: "src-cicatrizacao",
      filename: FILE,
      type: "slides",
      title: "Cicatrização",
      metadata: {
        professor: "Prof.ª Ms. Cintia Zacaib Silva",
        autorOriginal: "natalia.eleuterio",
        editadoPor: "Cintia-cpd",
        tituloInterno: "FISIOTERAPIA APLICADA DERMATO-FUNCIONAL",
      },
    },
  ],
  slides: [
    {
      id: "slide-cic-1",
      documentId: "src-cicatrizacao",
      slideNumber: 1,
      title: "CICATRIZAÇÃO",
      text: "FISIOTERAPIA APLICADA DERMATO-FUNCIONAL\nCICATRIZAÇÃO\nProf.ª Ms. Cintia Zacaib Silva",
      assets: [],
    },
    {
      id: "slide-cic-2",
      documentId: "src-cicatrizacao",
      slideNumber: 2,
      title: "CICATRIZAÇÃO",
      text: "A cicatrização das feridas ocorre em várias fases:\nCoagulação\nInflamação\nProliferação\nContração das feridas\nRemodelação",
      assets: [],
    },
    {
      id: "slide-cic-3",
      documentId: "src-cicatrizacao",
      slideNumber: 3,
      title: "COAGULAÇÃO",
      text: "Inicia-se imediatamente após a injúria, sendo mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada de coagulação que aderem-se à parede dos vasos sanguíneos e liberam, vários produtos, entre eles: substâncias vasoativas (ex: prostaglandinas); proteínas adesivas (ex:trombospodina;fibronectina e fibrinogênio); fatores de crescimento e proteases (colagenase, elastase, etc);",
      assets: [],
    },
    {
      id: "slide-cic-4",
      documentId: "src-cicatrizacao",
      slideNumber: 4,
      title: "COAGUALÇÃO",
      text: "Estes produtos direcionarão o curso futuro da cicatrização de feridas pelos seus efeitos quimiotáxicos e proliferativos nos macrófagos, fibroblastos e células epiteliais e endoteliais. Além disso o estancamento é facilitado por proenzimas de coagulação específicas.",
      assets: [],
    },
  ],
  assets: [],
};

export const pilotNormalized: NormalizedCatalog = {
  topics: [
    {
      id: "topic-relogio",
      title: "O relógio da ferida",
      concepts: ["conc-fases-cicatrizacao", "conc-coagulacao"],
      sourceRefs: [s(2), s(3), s(4)],
    },
  ],
  concepts: [
    {
      id: "conc-fases-cicatrizacao",
      title: "Fases da cicatrização",
      description:
        "A cicatrização das feridas ocorre em várias fases: coagulação, inflamação, proliferação, contração das feridas e remodelação.",
      sourceRefs: [s(2, "CICATRIZAÇÃO")],
      relatedConcepts: ["conc-coagulacao"],
      importance: "core",
      tags: ["mapa", "tempo"],
    },
    {
      id: "conc-coagulacao",
      title: "Coagulação",
      description:
        "Primeira fase nomeada. Inicia-se imediatamente após a injúria. Plaquetas e vias intrínsecas e extrínsecas da cascada; produtos que direcionam o curso futuro; estancamento por proenzimas.",
      sourceRefs: [s(3, "COAGULAÇÃO"), s(4, "COAGUALÇÃO")],
      relatedConcepts: ["conc-fases-cicatrizacao"],
      importance: "core",
      tags: ["inicio", "plaqueta"],
    },
  ],
};

const published = "published" as const;
const concepts = ["conc-fases-cicatrizacao", "conc-coagulacao"];

export const pilotPedagogy: PedagogyCatalog = {
  subjects: [
    {
      id: "subject-dermatofuncional-ii",
      title: "Dermatofuncional II",
      moduleIds: ["module-cicatrizacao"],
    },
  ],
  modules: [
    {
      id: "module-cicatrizacao",
      subjectId: "subject-dermatofuncional-ii",
      title: "Cicatrização",
      chapterIds: [CICATRIZACAO_01],
      sourceRefs: [s(1), s(2), s(3), s(4)],
      order: 1,
    },
  ],
  chapters: [
    {
      id: CICATRIZACAO_01,
      moduleId: "module-cicatrizacao",
      title: "O relógio da ferida",
      conceptIds: concepts,
      lessonId: AULA_01,
      missionId: "missao-cicatrizacao-01",
      challengeId: "desafio-cicatrizacao-01",
      teachBackId: "teach-cicatrizacao-01",
      bossId: "boss-cicatrizacao-01",
      sourceRefs: [s(1), s(2), s(3), s(4)],
      order: 1,
    },
  ],
  lessons: [
    {
      id: AULA_01,
      chapterId: CICATRIZACAO_01,
      title: "O relógio da ferida",
      content: "As fases da cicatrização e a coagulação.",
      sourceRefs: [s(2), s(3), s(4)],
      status: published,
      order: 1,
      conceptIds: concepts,
      mold: "full",
    },
  ],
  missions: [
    {
      id: "missao-cicatrizacao-01",
      chapterId: CICATRIZACAO_01,
      title: "Ler o relógio",
      content:
        "Hoje você vai conseguir narrar o que o corpo faz no minuto da injúria: nomear as fases na ordem da fonte e explicar por que a coagulação não é só estancar sangue.",
      sourceRefs: [s(2), s(3), s(4)],
      status: published,
      order: 1,
      conceptIds: concepts,
    },
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    {
      id: "desafio-cicatrizacao-01",
      chapterId: CICATRIZACAO_01,
      title: "O que os produtos fazem",
      content: "Testa a ligação coagulação → curso futuro, não a lista de nomes.",
      prompt:
        "Os produtos liberados durante a coagulação, segundo a fonte, servem principalmente para:",
      options: [
        {
          id: "a",
          label: "Apenas o estancamento. O resto da cicatrização começa depois, sem relação com esses produtos.",
        },
        {
          id: "b",
          label:
            "Direcionar o curso futuro da cicatrização pelos efeitos quimiotáxicos e proliferativos em macrófagos, fibroblastos e células epiteliais e endoteliais.",
        },
        {
          id: "c",
          label: "Aparecer somente depois da fase inflamatória.",
        },
      ],
      answerId: "b",
      sourceRefs: [s(4, "COAGUALÇÃO")],
      status: published,
      order: 1,
      conceptIds: ["conc-coagulacao"],
    },
  ],
  teachBacks: [
    {
      id: "teach-cicatrizacao-01",
      chapterId: CICATRIZACAO_01,
      title: "Explique a coagulação",
      content: "Recuperação ativa do conceito recém-ensinado.",
      prompt:
        "Com suas palavras: o que acontece imediatamente após a injúria e por que isso importa para o resto da cicatrização?",
      mode: "livre",
      expectedAnswer:
        "A coagulação inicia-se imediatamente após a injúria. A fonte diz que é mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada. Produtos dessa etapa direcionam o curso futuro por efeitos quimiotáxicos e proliferativos. O estancamento é facilitado por proenzimas específicas.",
      keyIdeas: [
        "imediatamente",
        "injúria",
        "plaqueta",
        "produtos",
        "curso futuro",
        "quimiotáxicos",
        "estancamento",
      ],
      rubric: [
        {
          id: "quando",
          label: "Diz que inicia imediatamente após a injúria",
          keys: ["imediat", "injúr", "injur"],
          required: true,
        },
        {
          id: "quem",
          label: "Nomeia plaquetas e/ou cascada",
          keys: ["plaquet", "cascad"],
          required: true,
        },
        {
          id: "futuro",
          label: "Liga os produtos ao curso futuro (quimiotaxia/proliferação)",
          keys: ["futuro", "quimiot", "prolifer", "direcion"],
          required: true,
        },
      ],
      sourceRefs: [s(3, "COAGULAÇÃO"), s(4, "COAGUALÇÃO")],
      status: published,
      order: 1,
      conceptIds: ["conc-coagulacao"],
    },
  ],
  bosses: [
    {
      id: "boss-cicatrizacao-01",
      chapterId: CICATRIZACAO_01,
      title: "Boss · o relógio inteiro",
      content: "Testa o capítulo, não o microdesafio de novo.",
      sourceRefs: [s(2), s(3), s(4)],
      status: published,
      order: 1,
      conceptIds: concepts,
      items: [
        {
          id: "q-ordem",
          prompt: "Na ordem em que a fonte lista as fases da cicatrização, a segunda é:",
          options: [
            { id: "a", label: "Proliferação" },
            { id: "b", label: "Inflamação" },
            { id: "c", label: "Remodelação" },
          ],
          answerId: "b",
          level: "recognition",
        },
        {
          id: "q-diferenca",
          prompt:
            "Qual afirmação diferencia a coagulação de um “simples estancamento”, segundo a fonte deste capítulo?",
          options: [
            {
              id: "a",
              label: "A coagulação inicia-se imediatamente após a injúria e serve apenas para parar o sangue.",
            },
            {
              id: "b",
              label:
                "Os produtos dessa etapa direcionam o curso futuro da cicatrização por efeitos quimiotáxicos e proliferativos.",
            },
            {
              id: "c",
              label: "A coagulação é a segunda fase da lista, depois da inflamação.",
            },
          ],
          answerId: "b",
          level: "differentiation",
        },
        {
          id: "q-raciocinio",
          prompt:
            "Uma pessoa acabou de sofrer uma injúria. Segundo o conteúdo estudado, qual processo deve ser reconhecido primeiro e por que ele é relevante para o que acontece depois?",
          options: [
            {
              id: "a",
              label: "Inflamação, porque é a palavra clínica mais associada a ferida e a fonte a lista em primeiro.",
            },
            {
              id: "b",
              label:
                "Coagulação: inicia-se imediatamente após a injúria e seus produtos já direcionam o curso futuro da cicatrização.",
            },
            {
              id: "c",
              label: "Remodelação, porque é o destino final da ferida e por isso deve ser pensada primeiro.",
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

export const lessonBody: LessonBody = {
  lessonId: AULA_01,
  objective: [
    {
      id: "obj-1",
      kind: "transformacao-pedagogica",
      text: "Ao terminar, você nomeia as cinco fases na ordem da professora e explica a coagulação como primeiro tempo biológico — não como sinônimo de “o sangue parou”.",
      sourceRefs: [s(2), s(3), s(4)],
    },
  ],
  what: [
    {
      id: "what-fases",
      kind: "fato-da-fonte",
      text: "A cicatrização das feridas ocorre em várias fases: coagulação, inflamação, proliferação, contração das feridas e remodelação.",
      sourceRefs: [s(2, "CICATRIZAÇÃO")],
    },
    {
      id: "what-capa",
      kind: "fato-da-fonte",
      text: "Este bloco pertence a Fisioterapia Aplicada Dermato-funcional, CICATRIZAÇÃO, Prof.ª Ms. Cintia Zacaib Silva.",
      sourceRefs: [s(1)],
    },
  ],
  whyExists: [
    {
      id: "why-clock",
      kind: "transformacao-pedagogica",
      text: "A fonte não lista as fases como enfeite: ela as ordena. Coagulação vem primeiro. Sem esse primeiro tempo, o restante do relógio não tem como começar no corpo.",
      sourceRefs: [s(2, "CICATRIZAÇÃO"), s(3, "COAGULAÇÃO")],
    },
    {
      id: "why-imediato",
      kind: "fato-da-fonte",
      text: "A coagulação inicia-se imediatamente após a injúria.",
      sourceRefs: [s(3, "COAGULAÇÃO")],
    },
  ],
  how: [
    {
      id: "how-mediada",
      kind: "fato-da-fonte",
      text: "É mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada de coagulação.",
      sourceRefs: [s(3, "COAGULAÇÃO")],
    },
    {
      id: "how-gramatica",
      kind: "interpretacao-da-fonte",
      text: "A frase da fonte junta plaquetas e cascada e depois diz “que aderem-se à parede dos vasos sanguíneos e liberam”. A redação é ambígua: o sujeito de “aderem-se” e “liberam” não está estabelecido com clareza. O MM Study não transforma essa interpretação em fato da professora. O que a fonte afirma sem ambiguidade: a coagulação é mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada; em seguida lista produtos; o slide 4 diz que estes produtos direcionam o curso futuro.",
      sourceRefs: [s(3, "COAGULAÇÃO"), s(4, "COAGUALÇÃO")],
    },
    {
      id: "how-produtos",
      kind: "fato-da-fonte",
      text: "A fonte lista vários produtos, entre eles: substâncias vasoativas (ex.: prostaglandinas); proteínas adesivas (ex.: trombospodina, fibronectina e fibrinogênio); fatores de crescimento e proteases (colagenase, elastase etc.).",
      sourceRefs: [s(3, "COAGULAÇÃO")],
    },
    {
      id: "how-grafia",
      kind: "fato-da-fonte",
      text: "Grafias da fonte a preservar: “cascada” (não “cascata”); “trombospodina”; título do slide 4 “COAGUALÇÃO”.",
      sourceRefs: [s(3, "COAGULAÇÃO"), s(4, "COAGUALÇÃO")],
    },
    {
      id: "how-futuro",
      kind: "fato-da-fonte",
      text: "Estes produtos direcionarão o curso futuro da cicatrização de feridas pelos seus efeitos quimiotáxicos e proliferativos nos macrófagos, fibroblastos e células epiteliais e endoteliais.",
      sourceRefs: [s(4, "COAGUALÇÃO")],
    },
    {
      id: "how-estanco",
      kind: "fato-da-fonte",
      text: "Além disso o estancamento é facilitado por proenzimas de coagulação específicas.",
      sourceRefs: [s(4, "COAGUALÇÃO")],
    },
    {
      id: "how-conexao",
      kind: "transformacao-pedagogica",
      text: "Duas funções no mesmo instante: (1) estancar, via proenzimas; (2) chamar e estimular, via produtos, as células que vão trabalhar nas fases seguintes. Coagulação não encerra o relógio — ela o dispara.",
      sourceRefs: [s(3), s(4)],
    },
  ],
  figure: {
    id: "fig-ausente",
    kind: "lacuna",
    demonstratesConceptId: "conc-fases-cicatrizacao",
    observe:
      "Não há figura, diagrama nem foto nos slides 1–4. O arquivo inteiro de cicatrização não contém mídia embutida.",
    sourceRefs: [s(2)],
    lacuna:
      "LACUNA DE FIGURA. Zero extração. Zero hotspot. Zero legenda inventada. O “relógio” abaixo é mapa pedagógico das cinco fases da fonte, não um asset do PPT.",
  },
  analogy: [
    {
      id: "an-1",
      kind: "transformacao-pedagogica",
      text: "Pense na plaqueta como a primeira equipe no local: ela tapa o vazamento e, ao mesmo tempo, manda recados químicos (quimiotáxicos e proliferativos) para macrófagos, fibroblastos e células epiteliais e endoteliais. Tapar não é o fim do trabalho — é o convite para o resto da obra.",
      sourceRefs: [s(3), s(4)],
    },
  ],
  whyMatters: [
    {
      id: "imp-1",
      kind: "transformacao-pedagogica",
      text: "A coagulação não deve ser estudada como um evento isolado de “parar o sangue”. A própria fonte afirma que os produtos liberados nessa etapa direcionam o curso futuro da cicatrização — pelos efeitos quimiotáxicos e proliferativos em macrófagos, fibroblastos e células epiteliais e endoteliais. Sem esse encaixe, inflamação, proliferação, contração e remodelação parecem capítulos soltos, e não tempos do mesmo relógio.",
      sourceRefs: [s(2, "CICATRIZAÇÃO"), s(4, "COAGUALÇÃO")],
    },
    {
      id: "imp-micro",
      kind: "transformacao-pedagogica",
      text: "Microcopy: errar o primeiro tempo é errar o mapa. Serve como âncora, não substitui a frase acima.",
      sourceRefs: [s(2), s(4)],
    },
    {
      id: "imp-prova",
      kind: "transformacao-pedagogica",
      text: "A fonte não traz o enunciado da prova. Qualquer leitura de “como cai” permanece unsourced — não é fato da disciplina.",
      sourceRefs: [unsourced()],
    },
  ],
  application: [
    {
      id: "app-relevancia",
      kind: "transformacao-pedagogica",
      clinicalType: "relevance",
      text: "Relevância para a fisioterapia, sustentada por este recorte: reconhecer que o primeiro tempo após a injúria, na lista da fonte, é coagulação — imediato, mediado por plaquetas e cascada, com produtos que já direcionam as células nomeadas no slide 4. Isso muda o que a aluna está pensando quando lê “ferida recente”: não é remodelação, não é o meio da lista.",
      sourceRefs: [s(2, "CICATRIZAÇÃO"), s(3, "COAGULAÇÃO"), s(4, "COAGUALÇÃO")],
    },
    {
      id: "app-conduta",
      kind: "lacuna",
      text: "Os quatro slides não descrevem conduta fisioterapêutica (não dizem o que fazer com a ferida, nem prazo de toque, nem técnica).",
      sourceRefs: [s(3), s(4)],
      lacuna: "Sem protocolo. Conduta só entra quando a fonte a sustentar. Aqui não sustenta.",
    },
  ],
  mistakes: [
    {
      id: "err-estancar-so",
      confusion: "Coagulação = só parar o sangramento.",
      whyItSeemsRight: "A palavra “coagulação” e o “estancamento” do slide 4 puxam o pensamento para tampão.",
      whatReallyHappens:
        "A fonte afirma as duas coisas: estancamento facilitado por proenzimas E produtos que direcionam o curso futuro por quimiotaxia e proliferação.",
      howToDifferentiate: "Se a resposta para na hemostasia, falta a metade do slide 4.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(4, "COAGUALÇÃO")],
    },
    {
      id: "err-cascada-adere",
      confusion: "A cascada é, com certeza, o que adere à parede do vaso e libera os produtos.",
      whyItSeemsRight: "A frase do slide 3 cola plaquetas e vias e depois usa “que aderem-se… e liberam”.",
      whatReallyHappens:
        "A fonte não estabelece o sujeito gramatical com clareza. Transformar “é a cascada” ou “é a plaqueta” em fato da professora seria interpretar a redação ambígua. O que está nomeado sem essa dúvida: plaquetas e vias da cascada medeiam; há uma lista de produtos; estes produtos direcionam o curso futuro.",
      howToDifferentiate:
        "Separe o que a professora escreveu do que nós gostaríamos que a frase dissesse. Ambiguidade marcada não vira gabarito.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(3, "COAGULAÇÃO"), s(4, "COAGUALÇÃO")],
    },
    {
      id: "err-ordem",
      confusion: "Começar o raciocínio pela inflamação, porque “ferida inflama”.",
      whyItSeemsRight: "Inflamação é a palavra clínica mais famosa.",
      whatReallyHappens: "Na lista da fonte, inflamação é a segunda fase. A primeira nomeada é coagulação, imediata.",
      howToDifferentiate: "Recite a ordem do slide 2 antes de nomear a fase em que está pensando.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(2, "CICATRIZAÇÃO"), s(3, "COAGULAÇÃO")],
    },
  ],
};

export const sourceConflicts = [
  {
    kind: "fato-da-fonte" as const,
    text: "O slide 2 lista “contração das feridas” como fase própria. Mais adiante no mesmo arquivo, a contração aparece dentro da fase proliferativa. Este capítulo ensina a lista do slide 2. A reconciliação fica para o capítulo da proliferação — não se resolve aqui com texto externo.",
    sourceRefs: [s(2, "CICATRIZAÇÃO")],
    laterSlide: 6,
  },
];
