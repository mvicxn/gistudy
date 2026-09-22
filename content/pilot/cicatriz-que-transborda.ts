import { QUELOIDE_FILE, cite } from "@/domain/source";
import type { LessonBody } from "@/domain/epistemic";
import type { NormalizedCatalog } from "@/domain/normalized";
import type { PedagogyCatalog } from "@/domain/pedagogy";
import type { SourceAsset, SourceCatalog } from "@/domain/source";

const FILE = QUELOIDE_FILE;
const s = (slide: number, section?: string, asset_id?: string) => cite(FILE, slide, section, asset_id);
const published = "published" as const;

export const QUELOIDE_02 = "queloide-02";
export const AULA_06 = "aula-queloide-02";
const concepts = ["conc-cicatriz-queloideana", "conc-extravasamento-limites", "conc-fatores-predisponentes"];

const ASSETS = {
  s10a: "q-s10-image4",
  s10b: "q-s10-image5",
  s10c: "q-s10-image6",
  s11a: "q-s11-image7",
  s11b: "q-s11-image8",
  s12: "q-s12-image9",
  s13: "q-s13-image10",
  s14: "q-s14-image11",
  s15: "q-s15-image12",
} as const;

function photo(id: string, slide: number, file: string, uri: string): SourceAsset {
  return {
    id,
    documentId: "src-queloide",
    slideNumber: slide,
    type: "image",
    uri,
    metadata: {
      pptMedia: file,
      slideText: "vazio",
      captionFromSource: "ausente",
    },
  };
}

export const source06: SourceCatalog = {
  documents: [],
  slides: [
    {
      id: "slide-q-8",
      documentId: "src-queloide",
      slideNumber: 8,
      title: "Cicatriz Queloideana",
      text: "É decorrente de proliferação fibrosa pós-traumática ou conseqüências de reparação viciosa de queimaduras\nCaracteriza-se pela cicatrização excessiva\nO processo de regeneração do tecido conjuntivo torna-se exagerado, formando uma saliência elevada, consistente e de coloração rósea.",
      assets: [],
    },
    {
      id: "slide-q-9",
      documentId: "src-queloide",
      slideNumber: 9,
      title: "Cicatriz Queloideana",
      text: "Apresenta-se arredondada, linear, alongada e sempre extravasa os limites da lesão original\nSubjetivamente, o portador de um quelóide pode ter a sensação de prurido, queimação ou ferroadas porém, são indolores à palpação.",
      assets: [],
    },
    {
      id: "slide-q-10",
      documentId: "src-queloide",
      slideNumber: 10,
      title: "",
      text: "",
      assets: [ASSETS.s10a, ASSETS.s10b, ASSETS.s10c],
    },
    {
      id: "slide-q-11",
      documentId: "src-queloide",
      slideNumber: 11,
      title: "",
      text: "",
      assets: [ASSETS.s11a, ASSETS.s11b],
    },
    {
      id: "slide-q-12",
      documentId: "src-queloide",
      slideNumber: 12,
      title: "",
      text: "",
      assets: [ASSETS.s12],
    },
    {
      id: "slide-q-13",
      documentId: "src-queloide",
      slideNumber: 13,
      title: "",
      text: "",
      assets: [ASSETS.s13],
    },
    {
      id: "slide-q-14",
      documentId: "src-queloide",
      slideNumber: 14,
      title: "",
      text: "",
      assets: [ASSETS.s14],
    },
    {
      id: "slide-q-15",
      documentId: "src-queloide",
      slideNumber: 15,
      title: "",
      text: "",
      assets: [ASSETS.s15],
    },
    {
      id: "slide-q-16",
      documentId: "src-queloide",
      slideNumber: 16,
      title: "Fatores Pré disponentes",
      text: "Raça negra 4 : 1\nPredisposição genética\nFatores hormonais\nSexo feminino",
      assets: [],
    },
  ],
  assets: [
    photo(ASSETS.s10a, 10, "image4.jpeg", "/content/queloide/slide-10-image4.jpeg"),
    photo(ASSETS.s10b, 10, "image5.jpeg", "/content/queloide/slide-10-image5.jpeg"),
    photo(ASSETS.s10c, 10, "image6.jpeg", "/content/queloide/slide-10-image6.jpeg"),
    photo(ASSETS.s11a, 11, "image7.jpeg", "/content/queloide/slide-11-image7.jpeg"),
    photo(ASSETS.s11b, 11, "image8.jpeg", "/content/queloide/slide-11-image8.jpeg"),
    photo(ASSETS.s12, 12, "image9.jpeg", "/content/queloide/slide-12-image9.jpeg"),
    photo(ASSETS.s13, 13, "image10.jpeg", "/content/queloide/slide-13-image10.jpeg"),
    photo(ASSETS.s14, 14, "image11.jpeg", "/content/queloide/slide-14-image11.jpeg"),
    photo(ASSETS.s15, 15, "image12.jpeg", "/content/queloide/slide-15-image12.jpeg"),
  ],
};

export const normalized06: NormalizedCatalog = {
  topics: [
    {
      id: "topic-cicatriz-transborda",
      title: "A cicatriz que transborda",
      concepts,
      sourceRefs: [s(8), s(9), s(10), s(12, undefined, ASSETS.s12), s(16)],
    },
  ],
  concepts: [
    {
      id: "conc-cicatriz-queloideana",
      title: "Cicatriz queloideana",
      description:
        "Proliferação fibrosa pós-traumática ou reparação viciosa de queimaduras. Cicatrização excessiva. Saliência elevada, consistente, coloração rósea.",
      sourceRefs: [s(8, "Cicatriz Queloideana")],
      relatedConcepts: ["conc-extravasamento-limites"],
      importance: "core",
      tags: ["definicao"],
    },
    {
      id: "conc-extravasamento-limites",
      title: "Extravasa os limites da lesão original",
      description:
        "Apresenta-se arredondada, linear, alongada e sempre extravasa os limites da lesão original. Prurido, queimação ou ferroadas; indolores à palpação.",
      sourceRefs: [s(9, "Cicatriz Queloideana")],
      relatedConcepts: ["conc-cicatriz-queloideana"],
      importance: "core",
      tags: ["olho"],
    },
    {
      id: "conc-fatores-predisponentes",
      title: "Fatores pré-disponentes",
      description: "Raça negra 4 : 1; predisposição genética; fatores hormonais; sexo feminino.",
      sourceRefs: [s(16, "Fatores Pré disponentes")],
      relatedConcepts: ["conc-cicatriz-queloideana"],
      importance: "core",
      tags: ["risco"],
    },
  ],
};

export const pedagogy06: PedagogyCatalog = {
  subjects: [],
  modules: [],
  chapters: [
    {
      id: QUELOIDE_02,
      moduleId: "module-queloide",
      title: "A cicatriz que transborda",
      conceptIds: concepts,
      lessonId: AULA_06,
      missionId: "missao-queloide-02",
      challengeId: "desafio-queloide-02",
      teachBackId: "teach-queloide-02",
      bossId: "boss-queloide-02",
      sourceRefs: [s(8), s(9), s(10), s(11), s(12, undefined, ASSETS.s12), s(13), s(14), s(15), s(16)],
      order: 6,
    },
  ],
  lessons: [
    {
      id: AULA_06,
      chapterId: QUELOIDE_02,
      title: "A cicatriz que transborda",
      content: "Definição textual da cicatriz queloideana e fotos sem legenda.",
      sourceRefs: [s(8), s(9), s(12, undefined, ASSETS.s12), s(16)],
      status: published,
      order: 6,
      conceptIds: concepts,
      mold: "full",
    },
  ],
  missions: [
    {
      id: "missao-queloide-02",
      chapterId: QUELOIDE_02,
      title: "Transbordar sem legendas inventadas",
      content:
        "Hoje você define cicatriz queloideana com o texto dos slides 8–9 e 16, e olha as fotos dos slides 10–15 sabendo que a fonte não escreveu legenda — extração não é diagnóstico.",
      sourceRefs: [s(8), s(9), s(12, undefined, ASSETS.s12), s(16)],
      status: published,
      order: 6,
      conceptIds: concepts,
    },
  ],
  analogies: [],
  clinicalApplications: [],
  commonMistakes: [],
  challenges: [
    {
      id: "desafio-queloide-02",
      chapterId: QUELOIDE_02,
      title: "Sempre extravasa",
      content: "Testa o slide 9, não a foto sem legenda.",
      prompt: "Segundo a fonte textual deste capítulo, a cicatriz queloideana:",
      options: [
        {
          id: "a",
          label: "Permanece no limite da lesão original e é dolorosa à palpação.",
        },
        {
          id: "b",
          label: "Apresenta-se arredondada, linear, alongada e sempre extravasa os limites da lesão original.",
        },
        {
          id: "c",
          label: "Só ocorre no sexo masculino, porque a fonte lista sexo feminino como fator pré-disponente.",
        },
      ],
      answerId: "b",
      sourceRefs: [s(9, "Cicatriz Queloideana")],
      status: published,
      order: 6,
      conceptIds: ["conc-extravasamento-limites"],
    },
  ],
  teachBacks: [
    {
      id: "teach-queloide-02",
      chapterId: QUELOIDE_02,
      title: "Explique a cicatriz que transborda",
      content: "Recuperação ativa.",
      prompt:
        "Com suas palavras: o que é cicatriz queloideana neste recorte, o que ela faz com os limites da lesão, e o que as fotos dos slides 10–15 não trazem?",
      mode: "livre",
      expectedAnswer:
        "Decorre de proliferação fibrosa pós-traumática ou reparação viciosa de queimaduras; cicatrização excessiva; saliência elevada, consistente, rósea. Sempre extravasa os limites da lesão original. Pode haver prurido, queimação ou ferroadas; indolores à palpação. As fotos não têm legenda da fonte: extração não diagnostica.",
      keyIdeas: ["extravasa", "rósea", "prurido", "legenda"],
      rubric: [
        { id: "def", label: "Nomeia excesso / saliência / rósea ou proliferação fibrosa", keys: ["exces", "saliên", "salienc", "róse", "rose", "fibros"], required: true },
        { id: "lim", label: "Diz que extravasa os limites", keys: ["extravas", "limites", "limite"], required: true },
        { id: "foto", label: "Marca ausência de legenda ou que extração não diagnostica", keys: ["legenda", "diagn", "extra", "foto", "sem texto"], required: true },
      ],
      sourceRefs: [s(8), s(9), s(12, undefined, ASSETS.s12)],
      status: published,
      order: 6,
      conceptIds: concepts,
    },
  ],
  bosses: [
    {
      id: "boss-queloide-02",
      chapterId: QUELOIDE_02,
      title: "Boss · a cicatriz que transborda",
      content: "Texto + o que a foto não escreve.",
      sourceRefs: [s(8), s(9), s(12, undefined, ASSETS.s12), s(16)],
      status: published,
      order: 6,
      conceptIds: concepts,
      items: [
        {
          id: "q-pre",
          prompt: "Os fatores pré-disponentes nomeados neste recorte incluem:",
          options: [
            { id: "a", label: "Raça negra 4 : 1; predisposição genética; fatores hormonais; sexo feminino" },
            { id: "b", label: "Somente predisposição genética; a fonte não nomeia raça, hormônio nem sexo" },
            { id: "c", label: "A etiqueta 040-04NOV93 escrita em uma das fotos" },
          ],
          answerId: "a",
          level: "recognition",
        },
        {
          id: "q-palpa",
          prompt: "O que diferencia a queixa subjetiva da palpação, segundo a fonte?",
          options: [
            {
              id: "a",
              label: "São dolorosos à palpação e o portador nunca sente prurido.",
            },
            {
              id: "b",
              label: "Pode haver prurido, queimação ou ferroadas; porém são indolores à palpação.",
            },
            {
              id: "c",
              label: "A foto do slide 12 traz essa diferença escrita na legenda.",
            },
          ],
          answerId: "b",
          level: "differentiation",
        },
        {
          id: "q-foto",
          prompt:
            "O slide 12 é uma foto extraída, sem caixa de texto. O que a fonte deste capítulo permite afirmar sobre ela?",
          options: [
            {
              id: "a",
              label: "A professora nomeou topografia, diagnóstico e mecanismo na legenda do slide.",
            },
            {
              id: "b",
              label: "Há um asset rastreável. Não há legenda da fonte. O texto que ensina a ler quelóide está nos slides 8–9, não na foto.",
            },
            {
              id: "c",
              label: "A foto prova, por si, os fatores pré-disponentes do slide 16.",
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

export const body06: LessonBody = {
  lessonId: AULA_06,
  objective: [
    {
      id: "obj-06",
      kind: "transformacao-pedagogica",
      text: "Ao terminar, você define cicatriz queloideana com o texto da fonte, nomeia o extravasamento dos limites, e trata as fotos 10–15 como assets sem legenda — não como diagnóstico automático.",
      sourceRefs: [s(8), s(9), s(12, undefined, ASSETS.s12)],
    },
  ],
  what: [
    {
      id: "what-quelo",
      kind: "fato-da-fonte",
      text: "Cicatriz queloideana: decorrente de proliferação fibrosa pós-traumática ou conseqüências de reparação viciosa de queimaduras. Caracteriza-se pela cicatrização excessiva. A regeneração do tecido conjuntivo torna-se exagerada, formando uma saliência elevada, consistente e de coloração rósea.",
      sourceRefs: [s(8, "Cicatriz Queloideana")],
    },
    {
      id: "what-limites",
      kind: "fato-da-fonte",
      text: "Apresenta-se arredondada, linear, alongada e sempre extravasa os limites da lesão original. Subjetivamente, o portador pode ter prurido, queimação ou ferroadas; porém são indolores à palpação.",
      sourceRefs: [s(9, "Cicatriz Queloideana")],
    },
  ],
  whyExists: [
    {
      id: "why-06",
      kind: "transformacao-pedagogica",
      text: "A fonte não pede que você “adivinhe a foto”. Ela escreve o excesso e o extravasamento. As imagens vêm depois, sem texto. O molde precisa do texto para ler a imagem — não o contrário.",
      sourceRefs: [s(8), s(9), s(10)],
    },
  ],
  how: [
    {
      id: "how-grafia-06",
      kind: "fato-da-fonte",
      text: "Grafias da fonte a preservar: “Queloideana”; “conseqüências”; título do slide 16 “Fatores Pré disponentes”.",
      sourceRefs: [s(8), s(16, "Fatores Pré disponentes")],
    },
    {
      id: "how-fotos-estrutura",
      kind: "fato-da-fonte",
      text: "Slides 10 a 15 não têm caixa de texto. Contêm somente assets: slide 10 (3 imagens), 11 (2), 12 (1), 13 (1), 14 (1), 15 (1).",
      sourceRefs: [s(10), s(11), s(12, undefined, ASSETS.s12), s(13), s(14), s(15)],
    },
    {
      id: "how-fotos-sentido",
      kind: "interpretacao-da-fonte",
      text: "A leitura integral registrou essas imagens como fotos clínicas. Isso não é legenda da professora. Não nomear topografia, diagnóstico ou mecanismo como fato da fonte a partir da extração. O atlas HTML ligado a algumas imagens estava inacessível; legendas de atlas não entram.",
      sourceRefs: [s(12, undefined, ASSETS.s12)],
    },
    {
      id: "how-etiqueta",
      kind: "fato-da-fonte",
      text: "Num dos assets do slide 11 há um cartão visível na própria foto com o texto “040-04NOV93”. Não há outra legenda no slide.",
      sourceRefs: [s(11, undefined, ASSETS.s11b)],
    },
    {
      id: "how-pre",
      kind: "fato-da-fonte",
      text: "Fatores pré-disponentes: raça negra 4 : 1; predisposição genética; fatores hormonais; sexo feminino.",
      sourceRefs: [s(16, "Fatores Pré disponentes")],
    },
  ],
  figure: {
    id: "fig-06-s12",
    asset_id: ASSETS.s12,
    uri: "/content/queloide/slide-12-image9.jpeg",
    kind: "lacuna",
    demonstratesConceptId: "conc-extravasamento-limites",
    observe:
      "Asset extraído do slide 12 (image9.jpeg). O slide não tem caixa de texto. Não há captionFromSource.",
    sourceRefs: [s(12, undefined, ASSETS.s12)],
    lacuna:
      "LACUNA DE LEGENDA. Extração ≠ interpretação. A foto não sustenta diagnóstico, topografia nem mecanismo como fato da professora. O texto que ensina quelóide está nos slides 8–9.",
  },
  analogy: [
    {
      id: "an-06",
      kind: "transformacao-pedagogica",
      text: "A foto é o objeto na mesa. A ficha da peça são os slides 8–9. Sem a ficha, a peça não ganha nome de fato — só de extração.",
      sourceRefs: [s(8), s(9), s(12, undefined, ASSETS.s12)],
    },
  ],
  whyMatters: [
    {
      id: "imp-06",
      kind: "transformacao-pedagogica",
      text: "Se “sempre extravasa os limites” é frase da fonte, o olho clínico deste recorte não é adivinhar a foto: é recusar inventar legenda e ainda assim saber o que o texto exige reconhecer numa cicatriz queloideana.",
      sourceRefs: [s(9), s(12, undefined, ASSETS.s12)],
    },
  ],
  application: [
    {
      id: "app-06-rel",
      kind: "transformacao-pedagogica",
      clinicalType: "relevance",
      text: "Relevância: o texto deste recorte muda o que você procura (extravasamento, saliência rósea, prurido sem dor à palpação). A fonte não descreve conduta.",
      sourceRefs: [s(8), s(9)],
    },
    {
      id: "app-06-cond",
      kind: "lacuna",
      text: "Slides 8–16 não descrevem conduta fisioterapêutica.",
      sourceRefs: [s(8), s(16)],
      lacuna: "Sem protocolo neste recorte.",
    },
  ],
  mistakes: [
    {
      id: "err-06-limite",
      confusion: "Quelóide cabe no ferimento; o que transborda é outra doença.",
      whyItSeemsRight: "Cicatriz parece seguir o corte.",
      whatReallyHappens: "A fonte afirma que sempre extravasa os limites da lesão original.",
      howToDifferentiate: "Se a resposta deixar o quelóide “dentro do corte”, faltou o slide 9.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(9, "Cicatriz Queloideana")],
    },
    {
      id: "err-06-foto-fato",
      confusion: "A foto extraída já é o diagnóstico da professora.",
      whyItSeemsRight: "Está no PPT de quelóide.",
      whatReallyHappens: "Os slides 10–15 não têm texto. Extração não interpreta. Atlas externo não entra.",
      howToDifferentiate: "Pergunte: onde está a legenda da fonte? Se não há, não há fato visual nomeado.",
      kind: "interpretacao-da-fonte",
      sourceRefs: [s(12, undefined, ASSETS.s12)],
    },
    {
      id: "err-06-dor",
      confusion: "Quelóide dói na palpação.",
      whyItSeemsRight: "Lesão elevada parece dolorosa.",
      whatReallyHappens: "A fonte: prurido, queimação ou ferroadas; indolores à palpação.",
      howToDifferentiate: "Separe queixa subjetiva de achado à palpação.",
      kind: "transformacao-pedagogica",
      sourceRefs: [s(9, "Cicatriz Queloideana")],
    },
  ],
};
