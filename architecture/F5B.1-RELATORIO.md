# F5B.1 RELATÓRIO

Escala controlada do molde congelado (F5A.2). Capítulos 02, 03 e 04 somente.

O molde **não** foi alterado. Não há segundo formato. Capítulo 01 acadêmico não foi reescrito. Capítulos 05–14 não foram processados.

**Conclusão: APROVADO PARA ESCALA**

Os três capítulos cabem no `FULL_LESSON_FLOW` congelado. Onde a fonte não sustenta figura, conduta ou uma classificação, o molde já tem `lacuna` e `interpretacao-da-fonte`. Isso não foi “melhoria” do molde — é o molde em uso. Os ACHADOS abaixo são para auditoria, não para patch desta fase.

---

## Capítulos processados

| id | título | ordem | slides (F1 `origensSlides`) |
|---|---|---|---|
| `cicatrizacao-02` | O campo inflamatório | 2 | 5, 9, 10, 11, 12 |
| `cicatrizacao-03` | Construir e esculpir | 3 | 6, 7, 8 |
| `cicatrizacao-04` | Duas intenções | 4 | 13, 14, 15, 16, 17, 18, 19 |

Pipeline em cada um: SOURCE → NORMALIZED → PEDAGOGY → BOSS → REWARD.

Os 11 blocos obrigatórios estão presentes em cada capítulo: Missão, Objetivo, Explicação, Figura, Analogia, Por que importa, Aplicação clínica, Erros comuns, Microdesafio, Ensine de volta, Mastery. Boss e Reward seguem o fluxo congelado da experiência, sem nova regra.

---

## Arquivos alterados

Conteúdo novo:

- `content/pilot/campo-inflamatorio.ts`
- `content/pilot/construir-esculpir.ts`
- `content/pilot/duas-intencoes.ts`
- `content/pilot/f5b1.test.ts`
- `architecture/F5B.1-RELATORIO.md`

Fiação (sem segundo catálogo):

- `content/catalog.ts` — merge SOURCE/NORMALIZED/PEDAGOGY dos quatro capítulos; `getLessonBody` para 01–04
- `content/pilot/relogio-da-ferida.ts` — **somente** `upcomingChapters` passou a reservar o livro Quelóide (títulos, sem aula). Texto acadêmico do Capítulo 01 intacto
- `obreiro/rules.test.ts` — `validateLessonMold` nos três capítulos novos

UI de leitura do molde (não é Design System):

- `components/study/PilotLessonScreen.tsx` — mapa pedagógico `PHASES_SLIDE_2` só na aula 01; lacuna de figura lida de `body.figure`; copy do professor deixou de falar só de coagulação
- `components/study/MapScreen.tsx` — 01–04 escritos; livro seguinte reservado
- `components/study/BibliotecaScreen.tsx` — 01–04 encadernados

Não tocados: Cloudflare, backend, IA runtime, Design System, `XP_RULES`, níveis, mastery engine, capítulos 05–14, `domain/mold.ts`, `obreiro/rules.ts`.

---

## Fontes utilizadas

Arquivo canônico: `cicatrização..[1][1].ppt` (`CICATRIZACAO_FILE`).

Leitura: `architecture/leitura-integral-104-slides.json` / `.txt` (slides 5–19) e recorte F1 em `architecture/fase-1-dermatofuncional-ii.json` (módulo Cicatrização, capítulos 02–04).

Mídia embutida no PPT de cicatrização: **0**.

---

## Quantidade de conceitos

Novos neste recorte: **8**

- 02: `conc-fase-inflamatoria`, `conc-inflamacao`, `conc-modificadores-inflamacao` (3)
- 03: `conc-fase-proliferativa`, `conc-fase-remodelagem` (2)
- 04: `conc-primeira-intencao`, `conc-segunda-intencao`, `conc-linha-tempo-primeira` (3)

Catálogo Cicatrização após o merge: **10** conceitos (os 2 do Capítulo 01 permanecem).

---

## Quantidade de blocos pedagógicos

Por capítulo (molde de 11 + fecho congelado):

- 1 missão
- 1 `LessonBody` com os 9 campos do molde de aula (`objective` … `mistakes`)
- 1 microdesafio
- 1 teach-back
- 1 passo de mastery (máquina, não XP)
- 1 boss (3 itens)
- 1 reward

Total nos três capítulos: **33 blocos do molde de 11** + 3 bosses + 3 rewards.

---

## Figuras / assets encontrados

| capítulo | assets extraídos | figura no molde |
|---|---|---|
| 02 | 0 | lacuna (`fig-02-ausente`) |
| 03 | 0 | lacuna (`fig-03-ausente`) |
| 04 | 0 | lacuna (`fig-04-ausente`) |

Extração de asset = 0. Nenhuma interpretação semântica de figura. Nenhuma legenda inventada.

---

## Lacunas encontradas

- **Figura** nos três capítulos (fonte sem mídia).
- **Conduta fisioterapêutica** nos três capítulos (`clinicalType` relevância + `kind: lacuna` para conduta). A fonte não descreve o que aplicar, quando tocar, nem técnica.
- Nenhuma lacuna foi preenchida com conhecimento externo.

---

## Ambiguidades encontradas

1. **Slide 5 — subaguda “mais 10 a 14 horas”** enquanto o resto do arquivo usa dias. Tag: `interpretacao-da-fonte`. Número não corrigido.
2. **Slide 2 vs slide 6 — contração.** Slide 2 lista fase própria; slide 6 coloca contração dentro da proliferativa. Capítulo 03 ensina o recorte 6–8 e deixa o conflito visível. Não há lista única “resolvida”.
3. **Slide 19 — Linchtenstein (1970), ≥ 70%**, sob o título `REPARAÇÃO DE SEGUNDA INTENÇÃO`, numa frase sobre feridas cuidadosamente suturadas. Tag: `interpretacao-da-fonte`. Citação não foi movida para primeira intenção.
4. **Grafias da fonte**, preservadas, não “consertadas”: `desprosivos`, `procedida`, `fia restabelecida`, `excassa`, `INTENÇAÕ`, `Linchtenstein`, `dermo-epidermica`, `hipertrofias`, `fibroblastico`, `substancia`, `acumulo`, `torna aspecto`.
5. **Ordem pedagógica F1 ≠ ordem linear do PPT.** Capítulo 02 usa 5 e depois 9–12; 6–8 esperam o Capítulo 03. O molde não reordena a fonte; o F1 já tinha esse recorte.

---

## Questões geradas

**Microdesafios (3):** 1 por capítulo, só `conceptId` e slides ensinados naquele capítulo.

- 02 — “Sem vaso”: fenômenos vasculares e exsudativos (`slide 9`)
- 03 — “Onde está a contração”: componente da proliferativa (`slide 6`)
- 04 — “O tipo mais simples”: primeira intenção em feridas operatórias (`slide 13`)

**Boss (9 itens):** 3 por capítulo.

Distratores não usam conteúdo ainda não ensinado naquele recorte (ex.: Capítulo 02 não cobra fibroplasia / 10–17 dias / 80%).

---

## Níveis de Boss gerados

Os três capítulos têm os três níveis, porque o conteúdo permitiu:

| capítulo | recognition | differentiation | reasoning |
|---|---|---|---|
| 02 | aguda 24–48 h | ordem hemodinâmica → permeabilidade → leucócitos | epitélio sem vaso |
| 03 | 80% da força | colágeno III → I na remodelagem | sobreposição das fases no relógio |
| 04 | fusão em 3–4 dias | 1ª vs 2ª intenção | continuidade epidérmica antes do tecido subjacente |

---

## Resultado do `validateLessonMold`

Capítulos 01, 02, 03 e 04: **0 violações**.

---

## Resultado dos testes

`npm test` (vitest run): **9 arquivos, 34 testes, todos passando.**

Inclui o teste negativo já congelado (fato `unsourced`) e testes novos de 02–04: mesmo molde do 01, recorte de slides, três níveis de boss, catálogo sem 05–14.

---

## Violações das regras

Nenhuma violação do molde congelado, de `XP_RULES`, de mastery≠XP, nem de `source_ref` canônico.

Ajuste de UI (não de molde): o runner da aula piloto falava coagulação / slides 1–4 / mapa das cinco fases em qualquer capítulo. Isso acoplava a experiência ao Capítulo 01. Foi gated. O `FigureBlock` não mudou.

---

## Onde o molde não encaixou naturalmente (ACHADOS DE AUDITORIA)

Não foram usados como motivo para alterar o molde.

1. **Figura obrigatória numa fonte sem imagem.** Os três capítulos repetem lacuna de figura. O slot existe e funciona; o conteúdo visual é vazio. Quelóide (fora desta fase) tem mídia — a auditoria deve ver se “figura = lacuna” continua aceitável ou se o passo pede outro tratamento **depois**, sem inventar asset.
2. **Aplicação clínica quase sempre relevância + lacuna de conduta.** O PPT de cicatrização 02–04 não sustenta protocolo. O molde cobre isso. Escalar para aulas com conduta real (quelóide) é o próximo teste verdadeiro de `clinicalType: conduct`.
3. **Explicação = `what` + `whyExists` + `how`.** O pedido lista “Explicação” como um bloco; o fluxo congelado são três passos. Os capítulos novos seguem os três passos, iguais ao 01. Não unificamos.
4. **Citação fora do “gaveta” conceitual (Linchtenstein no slide de segunda intenção).** O molde não tem bloco “nota de rodapé / conflito de classificação”. Coube em `interpretacao-da-fonte`. Se a auditoria quiser um tipo novo, isso é **depois** do F5B.1.
5. **Runner da aula com copy do Capítulo 01.** Generalização da experiência, não do molde pedagógico. Registrado para não voltar a hardcodar mapa de fases em aula alheia.

---

## Conclusão

**APROVADO PARA ESCALA**

O molde congelado generalizou para 02, 03 e 04 sem segunda arquitetura. As falhas são da fonte (sem figura, sem conduta, conflitos internos) e aparecem como lacuna/interpretação, que é o comportamento pedido no F5A.2.

PARE AQUI. Não processar capítulos 05–14. Não abrir F5B.2 nem F6.
