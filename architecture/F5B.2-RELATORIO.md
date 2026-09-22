# F5B.2 RELATÓRIO

Teste controlado de conteúdo visual. Capítulos **05 e 06** somente (`queloide-01`, `queloide-02`).

O molde **não** foi alterado. Não há FigureBlockV2, VisualLesson, ImageLesson nem segunda pedagogia. Capítulos 01–04 permanecem semanticamente intactos. 07–14 não foram processados.

**Conclusão: APROVADO**

---

## Capítulos processados

| id seq. | id F1 | título | slides |
|---|---|---|---|
| 05 | `queloide-01` | Quando o reparo falha | 1–7 |
| 06 | `queloide-02` | A cicatriz que transborda | 8–16 |

Pipeline: SOURCE → NORMALIZED → PEDAGOGY → BOSS → REWARD. Os 11 blocos do molde estão nos dois.

---

## Fontes / slides utilizados

Arquivo: `Cicatrização Quelóide e Hipertrófica apresentação definitiva.ppt` (`QUELOIDE_FILE`).

Leitura: `architecture/leitura-integral-104-slides.json` (deck `queloide`) + recorte F1. Extração: PPT → PPTX (LibreOffice) → `ppt/media` mapeado por `slideN.xml.rels`.

Slides 17–31 (capítulo 07+) **não** entram.

---

## Assets encontrados

No PPTX: **16** mídias.

| ficheiro | slide | recorte |
|---|---|---|
| `image2.png` | 4 | 05 — esquema duas fileiras |
| `image3.png` | 5 | 05 — ferida incisional |
| `image4.jpeg` `image5.jpeg` `image6.jpeg` | 10 | 06 — 3 fotos |
| `image7.jpeg` `image8.jpeg` | 11 | 06 — 2 fotos (uma com cartão `040-04NOV93`) |
| `image9.jpeg` | 12 | 06 — 1 foto (FigureBlock) |
| `image10.jpeg` | 13 | 06 — 1 foto |
| `image11.jpeg` | 14 | 06 — 1 foto |
| `image12.jpeg` | 15 | 06 — 1 foto |
| `image13–16` | 19 | **fora** (07) |
| `image1.png` (110 B) | — | mídia do pacote, **não** referenciada nos slides 1–16 |

A leitura F1 já registrou: **não existem legendas nas fotos clínicas de quelóide**. Atlas HTML (`queloidesG8/G13/G16`) estava 502 — legendas de atlas **não** entram.

---

## Assets realmente usados

**11** no catálogo SOURCE deste recorte (2 + 9). Copiados para `public/content/queloide/` com nome `slide-NN-imageN.ext`.

FigureBlock (um por aula, contrato existente):

- 05 usa `q-s04-image2` (slide 4).
- 06 usa `q-s12-image9` (slide 12).

Os demais permanecem em SOURCE e são citados no `how` como “slide sem texto + N assets”. O molde só tem **um** `LessonBody.figure`. Não foi criada galeria paralela. Isso é ACHADO, não patch.

---

## `source_ref` dos assets

Canônico `{ file, slide, asset_id }`.

Exemplos:

- `Cicatrização Quelóide e Hipertrófica apresentação definitiva.ppt · slide 4 · q-s04-image2`
- `… · slide 5 · q-s05-image3`
- `… · slide 12 · q-s12-image9`

`SourceAsset.metadata` guarda `pptMedia` (nome no PPTX) e `slideText: vazio`. Isso não é `captionFromSource`.

---

## Figuras geradas

| capítulo | FigureBlock | kind | captionFromSource | uri |
|---|---|---|---|---|
| 05 | `fig-05-esquema-s04` | `fato-da-fonte` | rótulos escritos **na** figura (Ferida Aberta, Tecido de granulação, Cicatriz, PUS) | `/content/queloide/slide-04-image2.png` |
| 06 | `fig-06-s12` | `lacuna` | ausente | `/content/queloide/slide-12-image9.jpeg` |

05: fato visual = os rótulos visíveis. O *sentido* das duas fileiras é `interpretacao-da-fonte` no `how` (“a figura não escreve quelóide / infecção / segunda intenção”).

06: extração com proveniência + **lacuna de legenda**. Extração ≠ diagnóstico.

O runner (`PilotLessonScreen`) passou a renderizar `figure.uri`, `captionFromSource` e hotspots do contrato existente. Não é Design System novo. O mapa pedagógico das cinco fases continua só na aula 01.

---

## Hotspots gerados

**05:** 7 — só os rótulos escritos na figura. `note` = “Rótulo escrito na figura.” Sem overlay novo; lista no bloco Figura.

**06:** 0. Foto sem rótulo anatômico da fonte. Cartão `040-04NOV93` no slide 11 é fato do asset, não hotspot inventado no FigureBlock.

---

## Lacunas

- Figura 06: sem legenda / sem diagnóstico.
- Conduta fisioterapêutica em 05 e 06 (protocolo só nos slides 23–31, fora do recorte).
- Atlas externo: inacessível; não preenchido.

---

## Ambiguidades

1. **Dois relógios.** Este arquivo inicia a “fase do reparo” no 3º dia. Não se funde com as cinco fases do PPT de cicatrização. Tag: `interpretacao-da-fonte`.
2. **PUS no esquema.** Rótulo visível; o slide 4 não tem texto que explique o desfecho. Não foi lido como “quelóide”.
3. **Fotos 10–15.** Só imagem. Leitura integral descreveu conteúdo visual; isso não vira fato da professora.
4. Grafias preservadas: `Queloideana`, `conseqüências`, `Pré disponentes`.

---

## Conceitos

6 novos: `conc-processo-inadequado`, `conc-fase-reparo-tecidual`, `conc-fatores-interferem`, `conc-cicatriz-queloideana`, `conc-extravasamento-limites`, `conc-fatores-predisponentes`.

Catálogo total: 16 conceitos (10 de cicatrização + 6).

---

## Microdesafios

- 05: fase do reparo inicia no 3º dia (slide 3). Distratores do próprio recorte (PUS como se fosse início; idade).
- 06: sempre extravasa os limites (slide 9). Não cobra topografia da foto.

---

## Bosses

Ambos com reconhecimento, diferenciação e raciocínio.

- 05 raciocínio: o que o rótulo PUS permite afirmar (rótulo ≠ diagnóstico).
- 06 raciocínio: foto sem caixa de texto — asset rastreável, texto nos slides 8–9.

---

## `validateLessonMold`

Capítulos **01–06: 0 violações.**

---

## Testes

`npm test`: **10 arquivos, 41 testes, todos passando.**

Inclui `f5b2.test.ts`: 01–04 intactos (figura ainda lacuna, sem uri); assets com proveniência; interpretação visual não entra como fato; 07–14 ausentes.

---

## Violações

Nenhuma do molde, de XP, de mastery, de `source_ref`, nem arquitetura paralela.

`domain/source.ts` só ganhou a constante `QUELOIDE_FILE`. `domain/mold.ts` e `obreiro/rules.ts` intactos.

---

## Onde o molde foi difícil de aplicar (ACHADOS)

Não usados para alterar o molde.

1. **Um `FigureBlock` por aula.** 05 tem 2 diagramas; 06 tem 9 fotos. O contrato existente segura **uma** figura. As outras ficam em SOURCE + `how`. Galeria seria segundo formato — não criada.
2. **`fato-da-fonte` visual exige `captionFromSource`.** Fotos clínicas não têm. Por isso 06 é `lacuna` com asset, não fato. O molde já cobre.
3. **Hotspots só com rótulo na fonte.** O esquema do slide 4 permite. As fotos não. F1 pedia “6 etapas interativas” e “dignidade clínica” — isso seria desenho pedagógico extra, não suporte da fonte.
4. **UI do runner não mostrava `uri`.** Acoplamento da experiência, não do molde. Ligado ao contrato existente.

---

## Tentativa de arquitetura paralela

**Nenhuma.** Não há FigureBlockV2 / VisualLesson / ImageLesson.

---

## Conclusão

**APROVADO**

O molde congelado aceitou asset real: proveniência, rótulos-como-legenda quando existem, lacuna quando a foto não escreve nada, interpretação separada de fato. 01–06 validam. Testes passam.

PARE AQUI. Não processar 07–14. Não iniciar F5B.3. Não iniciar F6.
