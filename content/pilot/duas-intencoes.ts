import { CICATRIZACAO_FILE, cite } from "@/domain/source";
import type { LessonBody } from "@/domain/epistemic";
import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceCatalog } from "@/domain/source";

const FILE = CICATRIZACAO_FILE;
const s = (slide: number, section?: string) => cite(FILE, slide, section);
const published = "published" as const;

export const CICATRIZACAO_04 = "cicatrizacao-04";
export const AULA_04 = "aula-cicatrizacao-04";
const concepts = ["conc-primeira-intencao", "conc-segunda-intencao", "conc-linha-tempo-primeira"];

export const source04: SourceCatalog = {
  documents: [],
  slides: [
    {
      id: "slide-cic-13",
      documentId: "src-cicatrizacao",
      slideNumber: 13,
      title: "PROCESSOS DE CURA",
      text: "A cicatrização é a forma mais comum de cura das inflamações e consiste na substituição mais ou menos completa do tecido destruído por conjuntivo neoformado, indicado como cicatricial.\nO tipo mais simples é a cicatrização por primeira intenção nas feridas operatórias, não contaminadas e pouco traumatizadas.",
      assets: [],
    },
    {
      id: "slide-cic-14",
      documentId: "src-cicatrizacao",
      slideNumber: 14,
      title: "PROCESSOS DE CURA",
      text: "Em três ou quatro dias, o tecido conjuntivo vascular procedente de uma das margens da ferida se encontra e se funde com o que provem da outra, e assim fia restabelecida, pelo menos em parte a continuidade anatômica do tecido.\nA cicatrização por primeira intenção é uma modalidade direta de cura, procedida por uma flogose mínima, com excassa destruição de tecidos e pouca exsudação.",
      assets: [],
    },
    {
      id: "slide-cic-15",
      documentId: "src-cicatrizacao",
      slideNumber: 15,
      title: "PROCESSOS DE CURA",
      text: "A cicatrização por segunda intenção dá-se nas inflamações com grandes perdas de tecidos com exsudação abundante ou nas feridas nas quais não houve junção das margens.\nÉ mais lenta, são cicatrizes excessivas e hipertróficas, e em alguns casos torna aspecto de quelóide.",
      assets: [],
    },
    {
      id: "slide-cic-16",
      documentId: "src-cicatrizacao",
      slideNumber: 16,
      title: "PREPARAÇÃO PARA A PRIMEIRA INTENÇAÕ",
      text: "O exemplo mais característico deste tipo de reparação é a da incisão cirúrgica.\nProcuramos descrever os fenômenos relacionando-os com o espaço temporal que eles ocorrem.\nPrimeiras 24 horas- ocorre acumulo leucocitario, principalmente de neutrofilos. A epiderme marginal se espessa e em 24 a 48 horas, cresce não só para baixo, assim como sob a superfície da crosta para fundir-se e produzir uma camada epitelial fina, mas continua. A continuidade epidérmica é restabelecida antes da reação do tecido subjacente",
      assets: [],
    },
    {
      id: "slide-cic-17",
      documentId: "src-cicatrizacao",
      slideNumber: 17,
      title: "PREPARAÇÃO PARA A PRIMEIRA INTENÇAÕ",
      text: "3° dia- os neutrofilos desaparecem e são substituídos por monócitos que removem, entre outras coisas, hemácias e fibrina. Torna-se visível a hipertrofias dos fibroblastos subepiteliais.\n5° dia- o espaço da incisão é ocupado por tecido conjuntivo fibroblastico frouxo, vascularizado e rico em substancia fundamental. Os brotamentos de capilares neoformados se juntam e formam canais. A vascularização atinge o máximo. As fibrilas colágenas passam a ser abundantes, cruzando a incisão. A epiderme atinge sua espessura normal.",
      assets: [],
    },
    {
      id: "slide-cic-18",
      documentId: "src-cicatrizacao",
      slideNumber: 18,
      title: "PREPARAÇÃO PARA A PRIMEIRA INTENÇAÕ",
      text: "2° semana- ocorre um acumulo de colágeno e fibroblastos. O infiltrado leucocitario começa a comprimir a parede dos capilares. A força de tensão da ferida ainda é baixo.\nAo final do 1° mês- cicatriz formada por tecido conjuntivo celular, ainda hipervascularizado.",
      assets: [],
    },
    {
      id: "slide-cic-19",
      documentId: "src-cicatrizacao",
      slideNumber: 19,
      title: "REPARAÇÃO DE SEGUNDA INTENÇÃO",
      text: "O aumento da força da ferida é lento e não esta associado ao acréscimo do conteúdo de colágeno da ferida, já que ele é grande a partir do inicio da fibroplasia.\nLinchtenstein e col (1970) demonstraram que feridas cuidadosamente suturadas tem pelo menos 70% da força de tensão da pele.\nInfelizmente a junção dermo-epidermica podem levar muitos meses para estabilizar-se",
      assets: [],
    },
  ],
  assets: [],
};

export const normalized04: NormalizedCatalog = {
  topics: [
    {
      id: "topic-duas-intencoes",
      title: "Duas intenções",
      concepts,
      sourceRefs: [s(13), s(14), s(15), s(16), s(17), s(18), s(19)],
    },
  ],
  concepts: [
    {
      id: "conc-primeira-intencao",
      title: "Primeira intenção",
      description:
        "Tipo mais simples: feridas operatórias, não contaminadas e pouco traumatizadas. Modalidade direta, flogose mínima, pouca exsudação. Em 3 ou 4 dias as margens se fundem.",
      sourceRefs: [s(13, "PROCESSOS DE CURA"), s(14)],
      relatedConcepts: ["conc-segunda-intencao", "conc-linha-tempo-primeira"],
      importance: "core",
      tags: ["cura"],
    },
    {
      id: "conc-segunda-intencao",
      title: "Segunda intenção",
      description:
        "Grandes perdas de tecido com exsudação abundante, ou feridas sem junção das margens. Mais lenta; cicatrizes excessivas e hipertróficas; em alguns casos torna aspecto de quelóide. Aumento da força lento e não associado ao acréscimo de colágeno.",
      sourceRefs: [s(15), s(19, "REPARAÇÃO DE SEGUNDA INTENÇÃO")],
      relatedConcepts: ["conc-primeira-intencao"],
      importance: "core",
      tags: ["cura"],
    },
    {
      id: "conc-linha-tempo-primeira",
      title: "Linha do tempo da primeira intenção",
      description:
        "Incisão cirúrgica no tempo: 24 h / 24–48 h / 3º dia / 5º dia / 2ª semana / 1º mês. Continuidade epidérmica antes da reação do tecido subjacente. Força ainda baixa na 2ª semana.",
      sourceRefs: [s(16, "PREPARAÇÃO PARA A PRIMEIRA INTENÇAÕ"), s(17), s(18)],
      relatedConcepts: ["conc-primeira-intencao"],
      importance: "core",
      tags: ["tempo"],
    },
  ],
};

export const pedagogy04: PedagogyCatalog = {
  subjects: [],
  modules: [],
  chapters: [
    {
      id: CICATRIZACAO_04,
      moduleId: "module-cicatrizacao",
      title: "Duas intenções",
      conceptIds: concepts,
      lessonId: AULA_04,
      missionId: "missao-cicatrizacao-04",
      challengeId: "desafio-cicatrizacao-04",
      teachBackId: "teach-cicatrizacao-04",
      bossId: "boss-cicatrizacao-04",
      sourceRefs: [s(13), s(14), s(15), s(16), s(17), s(18), s(19)],
      order: 4,
    },
  ],
  lessons: [
    {
      id: AULA_04,
      chapterId: CICATRIZACAO_04,
      title: "Duas intenções",
      content: "Primeira e segunda intenção no tempo da fonte.",
      sourceRefs: [s(13), s(14), s(15), s(16), s(17), s(18), s(19)],
      status: published,
      order: 4,
      conceptIds: concepts,
      mold: "full",
    },
  ],
  missions: [
    {
      id: "missao-cicatrizacao-04",
      chapterId: CICATRIZACAO_04,
      title: "Separar as duas curas",
      content:
        "Hoje você distingue primeira e segunda intenção com as palavras da fonte, narra a linha do tempo da incisão sem inventar conduta, e deixa visível que a citação de Linchtenstein está no slide da segunda intenção — sem mudá-la de lugar.",
      sourceRefs: [s(13), s(15), s(16), s(19)],
      status: published,
      order: 4,
      conceptIds: concepts,
    },
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    {
      id: "desafio-cicatrizacao-04",
      chapterId: CICATRIZACAO_04,
      title: "O tipo mais simples",
      content: "Testa a distinção da fonte, não um protocolo.",
      prompt: "O tipo mais simples de cicatrização, segundo a fonte deste capítulo, é:",
      options: [
        {
          id: "a",
          label: "Segunda intenção, porque a fonte a chama de forma mais comum de cura das inflamações.",
        },
        {
          id: "b",
          label: "Primeira intenção, nas feridas operatórias, não contaminadas e pouco traumatizadas.",
        },
        {
          id: "c",
          label: "Qualquer ferida em que as margens não se juntaram, desde que a flogose seja mínima.",
        },
      ],
      answerId: "b",
      sourceRefs: [s(13, "PROCESSOS DE CURA")],
      status: published,
      order: 4,
      conceptIds: ["conc-primeira-intencao"],
    },
  ],
  teachBacks: [
    {
      id: "teach-cicatrizacao-04",
      chapterId: CICATRIZACAO_04,
      title: "Explique as duas intenções",
      content: "Recuperação ativa.",
      prompt:
        "Com suas palavras: o que diferencia primeira e segunda intenção neste recorte, e o que acontece nas primeiras 24 a 48 horas da incisão?",
      mode: "livre",
      expectedAnswer:
        "Primeira intenção é o tipo mais simples, em feridas operatórias não contaminadas e pouco traumatizadas: cura direta, flogose mínima, pouca exsudação; em três ou quatro dias as margens se fundem. Segunda intenção ocorre em grandes perdas com exsudação abundante ou sem junção das margens; é mais lenta e pode tornar-se hipertrófica ou com aspecto de quelóide. Nas primeiras 24 horas há acúmulo de neutrófilos; em 24 a 48 horas a epiderme cresce sob a crosta e a continuidade epidérmica se restabelece antes da reação do tecido subjacente.",
      keyIdeas: ["primeira", "segunda", "operatór", "neutrófil", "epiderm"],
      rubric: [
        { id: "pri", label: "Nomeia primeira intenção e o tipo de ferida", keys: ["primeira", "operat", "simples"], required: true },
        { id: "seg", label: "Nomeia segunda intenção e perda/sem junção", keys: ["segunda", "perda", "junção", "juncao", "queló", "hipertr"], required: true },
        { id: "24h", label: "Cita o tempo inicial da incisão (24 h / epiderme)", keys: ["24", "neutro", "epiderm", "48"], required: true },
      ],
      sourceRefs: [s(13), s(15), s(16)],
      status: published,
      order: 4,
      conceptIds: concepts,
    },
  ],
  bosses: [
    {
      id: "boss-cicatrizacao-04",
      chapterId: CICATRIZACAO_04,
      title: "Boss · duas intenções",
      content: "Três níveis.",
      sourceRefs: [s(13), s(14), s(15), s(16), s(18), s(19)],
      status: published,
      order: 4,
      conceptIds: concepts,
      items: [
        {
          id: "q-fusao",
          prompt: "Na fonte, em três ou quatro dias acontece:",
          options: [
            { id: "a", label: "A fusão do tecido conjuntivo vascular das duas margens, ao menos em parte" },
            { id: "b", label: "A junção dermo-epidérmica já estabilizada" },
            { id: "c", label: "O aspecto de quelóide, que a fonte reserva à primeira intenção" },
          ],
          answerId: "a",
          level: "recognition",
        },
        {
          id: "q-intencoes",
          prompt: "O que diferencia segunda intenção de primeira neste recorte?",
          options: [
            {
              id: "a",
              label: "Segunda intenção é o tipo mais simples, em feridas operatórias não contaminadas.",
            },
            {
              id: "b",
              label:
                "Segunda intenção dá-se em grandes perdas com exsudação abundante ou sem junção das margens; é mais lenta, com cicatrizes excessivas e hipertróficas.",
            },
            {
              id: "c",
              label: "Não há diferença: a fonte usa os dois nomes para a mesma incisão cirúrgica.",
            },
          ],
          answerId: "b",
          level: "differentiation",
        },
        {
          id: "q-epiderme",
          prompt:
            "A fonte diz que a continuidade epidérmica é restabelecida antes da reação do tecido subjacente. O que isso muda na leitura das primeiras 24 a 48 horas?",
          options: [
            {
              id: "a",
              label: "Se a epiderme já se fundiu, a força de tensão da ferida já não é baixa.",
            },
            {
              id: "b",
              label:
                "Pode haver camada epitelial contínua enquanto o tecido de baixo ainda não fez o que o 3º e o 5º dia descrevem.",
            },
            {
              id: "c",
              label: "Isso só ocorre na segunda intenção, quando não houve junção das margens.",
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

export const body04: LessonBody = {
  lessonId: AULA_04,
  objective: [
    {
      id: "obj-04",
      kind: "transformacao-pedagogica",
      text: "Ao terminar, você separa primeira e segunda intenção com o vocabulário da fonte e narra a linha do tempo da incisão (24 h → 1º mês) sem preencher conduta nem mover a citação de Linchtenstein para outro slide.",
      sourceRefs: [s(13), s(15), s(16), s(19)],
    },
  ],
  what: [
    {
      id: "what-cura",
      kind: "fato-da-fonte",
      text: "A cicatrização é a forma mais comum de cura das inflamações e consiste na substituição mais ou menos completa do tecido destruído por conjuntivo neoformado, indicado como cicatricial. O tipo mais simples é a cicatrização por primeira intenção nas feridas operatórias, não contaminadas e pouco traumatizadas.",
      sourceRefs: [s(13, "PROCESSOS DE CURA")],
    },
    {
      id: "what-segunda",
      kind: "fato-da-fonte",
      text: "A cicatrização por segunda intenção dá-se nas inflamações com grandes perdas de tecidos com exsudação abundante ou nas feridas nas quais não houve junção das margens. É mais lenta, são cicatrizes excessivas e hipertróficas, e em alguns casos torna aspecto de quelóide.",
      sourceRefs: [s(15)],
    },
  ],
  whyExists: [
    {
      id: "why-04",
      kind: "transformacao-pedagogica",
      text: "A fonte não trata “cicatrizar” como um único desenho. Há duas intenções, com feridas diferentes e ritmos diferentes. Sem essa cisão, a linha do tempo da incisão parece valer para toda perda de tecido.",
      sourceRefs: [s(13), s(14), s(15)],
    },
  ],
  how: [
    {
      id: "how-fusao",
      kind: "fato-da-fonte",
      text: "Em três ou quatro dias, o tecido conjuntivo vascular procedente de uma das margens da ferida se encontra e se funde com o que provem da outra, e assim fia restabelecida, pelo menos em parte a continuidade anatômica do tecido.",
      sourceRefs: [s(14)],
    },
    {
      id: "how-flosose",
      kind: "fato-da-fonte",
      text: "A cicatrização por primeira intenção é uma modalidade direta de cura, procedida por uma flogose mínima, com excassa destruição de tecidos e pouca exsudação.",
      sourceRefs: [s(14)],
    },
    {
      id: "how-grafias-04",
      kind: "fato-da-fonte",
      text: "Grafias da fonte a preservar: “fia restabelecida”; “excassa”; “procedida”; título do slide 16 “INTENÇAÕ”; “Linchtenstein”; “dermo-epidermica”.",
      sourceRefs: [s(14), s(16, "PREPARAÇÃO PARA A PRIMEIRA INTENÇAÕ"), s(19)],
    },
    {
      id: "how-24h",
      kind: "fato-da-fonte",
      text: "O exemplo mais característico deste tipo de reparação é a da incisão cirúrgica. Primeiras 24 horas: ocorre acumulo leucocitario, principalmente de neutrofilos. A epiderme marginal se espessa e em 24 a 48 horas cresce não só para baixo, assim como sob a superfície da crosta para fundir-se e produzir uma camada epitelial fina, mas continua. A continuidade epidérmica é restabelecida antes da reação do tecido subjacente.",
      sourceRefs: [s(16, "PREPARAÇÃO PARA A PRIMEIRA INTENÇAÕ")],
    },
    {
      id: "how-3-5",
      kind: "fato-da-fonte",
      text: "3° dia: os neutrofilos desaparecem e são substituídos por monócitos que removem, entre outras coisas, hemácias e fibrina. Torna-se visível a hipertrofias dos fibroblastos subepiteliais. 5° dia: o espaço da incisão é ocupado por tecido conjuntivo fibroblastico frouxo, vascularizado e rico em substancia fundamental. Os brotamentos de capilares neoformados se juntam e formam canais. A vascularização atinge o máximo. As fibrilas colágenas passam a ser abundantes, cruzando a incisão. A epiderme atinge sua espessura normal.",
      sourceRefs: [s(17)],
    },
    {
      id: "how-semana-mes",
      kind: "fato-da-fonte",
      text: "2° semana: ocorre um acumulo de colágeno e fibroblastos. O infiltrado leucocitario começa a comprimir a parede dos capilares. A força de tensão da ferida ainda é baixo. Ao final do 1° mês: cicatriz formada por tecido conjuntivo celular, ainda hipervascularizado.",
      sourceRefs: [s(18)],
    },
    {
      id: "how-forca-segunda",
      kind: "fato-da-fonte",
      text: "O aumento da força da ferida é lento e não esta associado ao acréscimo do conteúdo de colágeno da ferida, já que ele é grande a partir do inicio da fibroplasia. Linchtenstein e col (1970) demonstraram que feridas cuidadosamente suturadas tem pelo menos 70% da força de tensão da pele. Infelizmente a junção dermo-epidermica podem levar muitos meses para estabilizar-se.",
      sourceRefs: [s(19, "REPARAÇÃO DE SEGUNDA INTENÇÃO")],
    },
    {
      id: "how-liechtenstein-lugar",
      kind: "interpretacao-da-fonte",
      text: "A citação de Linchtenstein (1970) sobre feridas cuidadosamente suturadas (≥ 70% da força) está no slide cujo título é REPARAÇÃO DE SEGUNDA INTENÇÃO. A sentença fala de feridas suturadas; o título do slide é segunda intenção. O MM Study não move a citação para o bloco da primeira intenção como se a professora a tivesse classificado assim. Fato: o texto está no slide 19. A classificação do dado permanece ambígua.",
      sourceRefs: [s(19, "REPARAÇÃO DE SEGUNDA INTENÇÃO")],
    },
  ],
  figure: {
    id: "fig-04-ausente",
    kind: "lacuna",
    demonstratesConceptId: "conc-primeira-intencao",
    observe: "Não há figura nos slides 13–19.",
    sourceRefs: [s(13)],
    lacuna: "LACUNA DE FIGURA. Zero extração. Zero hotspot. Zero legenda inventada.",
  },
  analogy: [
    {
      id: "an-04",
      kind: "transformacao-pedagogica",
      text: "Primeira intenção é a costura que encontra a outra margem em poucos dias. Segunda intenção é quando não há encontro — há perda, há exsudação, e a cicatriz pode crescer demais. A linha do tempo da incisão descreve a costura, não o buraco.",
      sourceRefs: [s(13), s(14), s(15), s(16)],
    },
  ],
  whyMatters: [
    {
      id: "imp-04",
      kind: "transformacao-pedagogica",
      text: "Se você lê toda ferida com o relógio da incisão (24 h, 3º dia, 5º dia), aplica primeira intenção onde a fonte descreveu perda e ausência de junção. E se a epiderme já se fundiu às 24–48 h, isso ainda não é força: na 2ª semana a fonte diz que a tensão ainda é baixa.",
      sourceRefs: [s(15), s(16), s(18)],
    },
  ],
  application: [
    {
      id: "app-04-rel",
      kind: "transformacao-pedagogica",
      clinicalType: "relevance",
      text: "Relevância: reconhecer se o raciocínio está numa ferida operatória de primeira intenção ou numa perda/sem junção de segunda. A linha do tempo (24 h → 1º mês) é da preparação para a primeira intenção (incisão cirúrgica). A fonte não diz o que a fisioterapeuta aplica em cada dia.",
      sourceRefs: [s(13), s(15), s(16)],
    },
    {
      id: "app-04-cond",
      kind: "lacuna",
      text: "Slides 13–19 não descrevem conduta fisioterapêutica.",
      sourceRefs: [s(13), s(19)],
      lacuna: "Sem protocolo.",
    },
  ],
  mistakes: [
    {
      id: "err-04-simples",
      confusion: "Segunda intenção é o tipo mais simples, porque “cura das inflamações” parece o caso geral.",
      whyItSeemsRight: "O slide 13 chama a cicatrização de forma mais comum de cura das inflamações.",
      whatReallyHappens: "O tipo mais simples nomeado é primeira intenção, em feridas operatórias não contaminadas e pouco traumatizadas.",
      howToDifferentiate: "Separe “forma mais comum de cura” de “tipo mais simples”. São frases diferentes do mesmo slide.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(13, "PROCESSOS DE CURA")],
    },
    {
      id: "err-04-forca",
      confusion: "Na 2ª semana já há muito colágeno, logo a força já é alta.",
      whyItSeemsRight: "A fonte fala de acúmulo de colágeno na 2ª semana.",
      whatReallyHappens: "Na mesma frase: a força de tensão da ferida ainda é baixo.",
      howToDifferentiate: "Colágeno visível ≠ força. Cite o slide 18 inteiro.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(18)],
    },
    {
      id: "err-04-liechtenstein",
      confusion: "Tratar os 70% de Linchtenstein como fato da primeira intenção, porque “suturada” parece incisão.",
      whyItSeemsRight: "Ferida suturada soa como primeira intenção.",
      whatReallyHappens:
        "A sentença está no slide 19, título REPARAÇÃO DE SEGUNDA INTENÇÃO. Mover o dado para o capítulo da primeira intenção seria interpretar o lugar do texto.",
      howToDifferentiate: "Cite o slide 19 e marque a ambiguidade. Não reclassifique em silêncio.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(19, "REPARAÇÃO DE SEGUNDA INTENÇÃO")],
    },
  ],
};

export const sourceConflicts04 = [
  {
    kind: "interpretacao-da-fonte" as const,
    text: "Linchtenstein (1970) sobre feridas suturadas ≥ 70% está sob o título de segunda intenção.",
    sourceRefs: [s(19)],
  },
];
