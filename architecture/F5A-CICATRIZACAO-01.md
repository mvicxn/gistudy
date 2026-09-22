# F5A — Capítulo 01 · O relógio da ferida

Não é relatório de status. É o capítulo piloto, para auditoria.

Recorte: slides 1–4 de `cicatrização..[1][1].ppt`.  
Professora: Prof.ª Ms. Cintia Zacaib Silva.  
Máquina: Dermatofuncional II → Cicatrização → Capítulo 01.  
Os demais capítulos não foram escritos.

---

## Contratos usados (sem terceira estrutura)

`source_ref` canônico F2, agora único:

```
{ file, slide, section?, asset_id?, unsourced? }
```

F4 tinha `documentId` + `slideNumber` no objeto de slide da camada FONTE (isso permanece, porque é o catálogo da fonte, não o ponteiro pedagógico). O ponteiro pedagógico é só `source_ref`.

XP canônico = F2. `lessonComplete` (40) fica só no fluxo mock F4.

| F2 | chave canônica | valor |
|---|---|---|
| explicacao | explanationComplete | 10 |
| figura | figureComplete | 10 |
| analogia | analogyComplete | 10 |
| clinica | clinicalComplete | 10 |
| errosComuns | commonMistakesComplete | 15 |
| miniPrimeira | miniChallengeCorrect | 25 |
| miniRetry | miniChallengeRetry | 15 |
| ensineDominio | teachBackComplete | 30 |
| ensineAjuste | teachBackAdjust | 20 |
| boss | bossComplete | 80 |
| capitulo | chapterComplete | 50 |

Níveis canônicos = F2: Aprendiz 0 / Guardiã 500 / Princesa 1500 / Rainha 3500. Exploradora@200 da F4 não entra no conteúdo novo.

Mastery 0–100 por eventos, limiar 80 = MASTERED, separado de XP. Recência **não** está implementada (`MASTERY_RECENCY_IMPLEMENTED = false`).

Epistemic tags em todo bloco:

- `fato-da-fonte`
- `transformacao-pedagogica`
- `inferencia`
- `interpretacao-da-fonte`
- `conhecimento-externo`
- `lacuna`

Aplicação clínica no molde: `clinicalType: "relevance" | "conduct"`. Se nenhum dos dois for sustentado, `kind: lacuna`.

---

## Fonte relida — slides 1–4 (verbatim)

**Slide 1.** `FISIOTERAPIA APLICADA / DERMATO-FUNCIONAL / CICATRIZAÇÃO / Prof.ª Ms. Cintia Zacaib Silva`. 0 imagens.

**Slide 2.** `CICATRIZAÇÃO` — “A cicatrização das feridas ocorre em várias fases:” Coagulação, Inflamação, Proliferação, Contração das feridas, Remodelação. 0 imagens.

**Slide 3.** `COAGULAÇÃO` — “Inicia-se imediatamente após a injúria, sendo mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada de coagulação que aderem-se à parede dos vasos sanguíneos e liberam, vários produtos, entre eles: substâncias vasoativas (ex: prostaglandinas); proteínas adesivas (ex:trombospodina;fibronectina e fibrinogênio); fatores de crescimento e proteases (colagenase, elastase, etc);” 0 imagens.

**Slide 4.** título `COAGUALÇÃO` — “Estes produtos direcionarão o curso futuro da cicatrização de feridas pelos seus efeitos quimiotáxicos e proliferativos nos macrófagos, fibroblastos e células epiteliais e endoteliais. Além disso o estancamento é facilitado por proenzimas de coagulação específicas.” 0 imagens.

O arquivo inteiro (19 slides) não contém mídia embutida. Figura deste capítulo: **LACUNA**. Zero extração. Zero hotspot. Zero legenda inventada.

Grafias preservadas: `cascada`, `trombospodina`, `COAGUALÇÃO`.

Conflito interno da fonte (não resolvido aqui): o slide 2 lista “contração das feridas” como fase própria; o slide 6 coloca contração dentro da proliferativa. Este capítulo ensina a lista do slide 2.

---

## Missão

Hoje você vai conseguir narrar o que o corpo faz no minuto da injúria: nomear as fases na ordem da fonte e explicar por que a coagulação não é só estancar sangue.

`source_ref`: slides 2, 3, 4.

---

## Objetivo

**[transformacao-pedagogica]** Ao terminar, você nomeia as cinco fases na ordem da professora e explica a coagulação como primeiro tempo biológico — não como sinônimo de “o sangue parou”.

`source_ref`: slides 2, 3, 4.

---

## O que é

**[fato-da-fonte]** A cicatrização das feridas ocorre em várias fases: coagulação, inflamação, proliferação, contração das feridas e remodelação.

`source_ref`: `cicatrização..[1][1].ppt` · slide 2 · CICATRIZAÇÃO

**[fato-da-fonte]** Este bloco pertence a Fisioterapia Aplicada Dermato-funcional, CICATRIZAÇÃO, Prof.ª Ms. Cintia Zacaib Silva.

`source_ref`: slide 1

---

## Por que existe

**[transformacao-pedagogica]** A fonte não lista as fases como enfeite: ela as ordena. Coagulação vem primeiro. Sem esse primeiro tempo, o restante do relógio não tem como começar no corpo.

`source_ref`: slides 2 e 3

**[fato-da-fonte]** A coagulação inicia-se imediatamente após a injúria.

`source_ref`: slide 3 · COAGULAÇÃO

---

## Como funciona

Conceito → explicação causal → conexão.

**[fato-da-fonte]** É mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada de coagulação.

`source_ref`: slide 3 · COAGULAÇÃO

**[interpretacao-da-fonte]** A frase da fonte junta plaquetas e cascada e depois diz “que aderem-se à parede dos vasos sanguíneos e liberam”. A redação é ambígua: o sujeito de “aderem-se” e “liberam” não está estabelecido com clareza. O MM Study **não** transforma essa interpretação em fato da professora. O que a fonte afirma sem ambiguidade: a coagulação é mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada; em seguida lista produtos; o slide 4 diz que estes produtos direcionam o curso futuro.

`source_ref`: slides 3 e 4

**[fato-da-fonte]** A fonte lista vários produtos, entre eles: substâncias vasoativas (ex.: prostaglandinas); proteínas adesivas (ex.: trombospodina, fibronectina e fibrinogênio); fatores de crescimento e proteases (colagenase, elastase etc.).

`source_ref`: slide 3 · COAGULAÇÃO

**[fato-da-fonte]** Grafias da fonte a preservar: “cascada”; “trombospodina”; título do slide 4 “COAGUALÇÃO”.

`source_ref`: slides 3 e 4

**[fato-da-fonte]** Estes produtos direcionarão o curso futuro da cicatrização de feridas pelos seus efeitos quimiotáxicos e proliferativos nos macrófagos, fibroblastos e células epiteliais e endoteliais.

`source_ref`: slide 4 · COAGUALÇÃO

**[fato-da-fonte]** Além disso o estancamento é facilitado por proenzimas de coagulação específicas.

`source_ref`: slide 4 · COAGUALÇÃO

**[transformacao-pedagogica]** Duas funções no mesmo instante: (1) estancar, via proenzimas; (2) chamar e estimular, via produtos, as células que vão trabalhar nas fases seguintes. Coagulação não encerra o relógio — ela o dispara.

`source_ref`: slides 3 e 4

---

## Figura

**asset_id:** inexistente  
**source_ref:** slide 2  
**legenda da fonte:** inexistente — não inventada  
**o que observar:** não há figura, diagrama nem foto nos slides 1–4. O arquivo inteiro de cicatrização não contém mídia embutida.  
**conceito que demonstraria:** `conc-fases-cicatrizacao`  
**hotspots:** nenhum

**[lacuna]** LACUNA DE FIGURA. Zero extração. Zero hotspot. Zero legenda inventada.

**[transformacao-pedagogica]** O “relógio” abaixo é mapa pedagógico das cinco fases da fonte, não um asset do PPT.

1. Coagulação  
2. Inflamação  
3. Proliferação  
4. Contração das feridas  
5. Remodelação

---

## Analogia

**[transformacao-pedagogica]** Pense na plaqueta como a primeira equipe no local: ela tapa o vazamento e, ao mesmo tempo, manda recados químicos (quimiotáxicos e proliferativos) para macrófagos, fibroblastos e células epiteliais e endoteliais. Tapar não é o fim do trabalho — é o convite para o resto da obra.

Fiel ao slide 4: estancamento + curso futuro. Não acrescenta célula, tempo ou conduta que a fonte não nomeia.

`source_ref`: slides 3 e 4

---

## Por que importa

**[transformacao-pedagogica]** A coagulação não deve ser estudada como um evento isolado de “parar o sangue”. A própria fonte afirma que os produtos liberados nessa etapa direcionam o curso futuro da cicatrização — pelos efeitos quimiotáxicos e proliferativos em macrófagos, fibroblastos e células epiteliais e endoteliais. Sem esse encaixe, inflamação, proliferação, contração e remodelação parecem capítulos soltos, e não tempos do mesmo relógio.

`source_ref`: slides 2 e 4

**[transformacao-pedagogica]** Microcopy: errar o primeiro tempo é errar o mapa. Âncora, não substitui a explicação.

`source_ref`: slides 2 e 4

**[transformacao-pedagogica · unsourced]** A fonte não traz o enunciado da prova. Qualquer leitura de “como cai” permanece unsourced — não é fato da disciplina.

---

## Aplicação na fisioterapia

O molde aceita três saídas. Neste recorte: relevância + lacuna de conduta. Sem protocolo.

**[transformacao-pedagogica · clinicalType: relevance]** Relevância para a fisioterapia: reconhecer que o primeiro tempo após a injúria, na lista da fonte, é coagulação — imediato, mediado por plaquetas e cascada, com produtos que já direcionam as células nomeadas no slide 4. Isso muda o que a aluna está pensando quando lê “ferida recente”: não é remodelação, não é o meio da lista.

`source_ref`: slides 2, 3 e 4

**[lacuna · conduta]** Os quatro slides não descrevem conduta fisioterapêutica (não dizem o que fazer com a ferida, nem prazo de toque, nem técnica). Sem protocolo.

---

## Erros comuns

### 1. Só estancar

- **Confusão:** Coagulação = só parar o sangramento.
- **Por que parece correto:** a palavra “coagulação” e o “estancamento” do slide 4 puxam o pensamento para tampão.
- **O que realmente acontece:** a fonte afirma as duas coisas: estancamento facilitado por proenzimas **e** produtos que direcionam o curso futuro por quimiotaxia e proliferação.
- **Como diferenciar:** se a resposta para na hemostasia, falta a metade do slide 4.

`source_ref`: slide 4 · COAGUALÇÃO · [transformacao-pedagogica]

### 2. A cascada adere (com certeza)

- **Confusão:** A cascada é, com certeza, o que adere à parede do vaso e libera os produtos.
- **Por que parece correto:** a frase do slide 3 cola plaquetas e vias e depois usa “que aderem-se… e liberam”.
- **O que realmente acontece:** a fonte não estabelece o sujeito gramatical com clareza. Transformar “é a cascada” ou “é a plaqueta” em fato da professora seria interpretar a redação ambígua. Nomeados sem essa dúvida: plaquetas e vias da cascada; lista de produtos; estes produtos direcionam o curso futuro.
- **Como diferenciar:** separe o que a professora escreveu do que nós gostaríamos que a frase dissesse. Ambiguidade marcada não vira gabarito.

`source_ref`: slides 3 e 4 · [interpretacao-da-fonte]

### 3. Começar pela inflamação

- **Confusão:** Começar o raciocínio pela inflamação, porque “ferida inflama”.
- **Por que parece correto:** inflamação é a palavra clínica mais famosa.
- **O que realmente acontece:** na lista da fonte, inflamação é a segunda fase. A primeira nomeada é coagulação, imediata.
- **Como diferenciar:** recite a ordem do slide 2 antes de nomear a fase em que está pensando.

`source_ref`: slides 2 e 3 · [transformacao-pedagogica]

---

## Microdesafio

Testa o conceito recém-ensinado (produtos → curso futuro), não a lista de nomes.

**Pergunta:** Os produtos liberados durante a coagulação, segundo a fonte, servem principalmente para:

- A. Apenas o estancamento. O resto da cicatrização começa depois, sem relação com esses produtos.
- **B. Direcionar o curso futuro da cicatrização pelos efeitos quimiotáxicos e proliferativos em macrófagos, fibroblastos e células epiteliais e endoteliais.**
- C. Aparecer somente depois da fase inflamatória.

Gabarito: B.  
`source_ref`: slide 4 · COAGUALÇÃO · `conceptId`: `conc-coagulacao`

A opção C é inversão causal a partir das fases já ensinadas (slide 2) e dos produtos da coagulação (slides 3–4). Não usa slide 7.

Erro = lilás “Quase”. Sem perda de XP.

---

## Ensine de volta

**Pergunta:** Com suas palavras: o que acontece imediatamente após a injúria e por que isso importa para o resto da cicatrização?

Modos: livre / guiado / rápido. Sem IA em tempo real.

**Resposta esperada:** A coagulação inicia-se imediatamente após a injúria. A fonte diz que é mediada pela atividade das plaquetas e pelas vias intrínsecas e extrínsecas da cascada. Produtos dessa etapa direcionam o curso futuro por efeitos quimiotáxicos e proliferativos. O estancamento é facilitado por proenzimas específicas.

**Ideias-chave:** imediatamente · injúria · plaqueta · produtos · curso futuro · quimiotáxicos · estancamento

**Rubrica (todas obrigatórias):**

1. Diz que inicia imediatamente após a injúria — chaves: imediat, injúr/injur
2. Nomeia plaquetas e/ou cascada — chaves: plaquet, cascad
3. Liga os produtos ao curso futuro (quimiotaxia/proliferação) — chaves: futuro, quimiot, prolifer, direcion

`conceptId`: `conc-coagulacao`  
`source_ref`: slides 3 e 4

---

## Domínio

Dois conceitos, mastery 0–100, separado de XP.

| conceptId | fonte | o que entra neste capítulo |
|---|---|---|
| conc-fases-cicatrizacao | slide 2 | exposição + item 1 do boss |
| conc-coagulacao | slides 3–4 | exposição + prática + acerto + teach-back + boss |

Limiar 80 = MASTERED. Recência não esfria o número nesta fase.

---

## Boss

Três itens, três níveis. Só fecha se os três estiverem certos. Distratores só do conteúdo dos slides 1–4.

1. **Reconhecimento.** Na ordem em que a fonte lista as fases, a segunda é: Proliferação / **Inflamação** / Remodelação. (slide 2)
2. **Diferenciação.** Qual afirmação diferencia a coagulação de um “simples estancamento”? A coagulação só para o sangue / **Os produtos direcionam o curso futuro por efeitos quimiotáxicos e proliferativos** / A coagulação é a segunda fase, depois da inflamação.
3. **Raciocínio.** Uma pessoa acabou de sofrer uma injúria. Qual processo reconhecer primeiro e por que importa para o depois? Inflamação (a fonte a lista em primeiro) / **Coagulação: imediata, e seus produtos já direcionam o curso futuro** / Remodelação, porque é o destino final.

---

## Recompensa

Flor do canteiro do capítulo. Gema. XP de boss + XP de capítulo, pelas regras canônicas. XP não é domínio.

---

## Lacunas explícitas (não preenchidas com conhecimento próprio)

1. Sem figura no PPT — sem diagrama clínico inventado.
2. Sem conduta fisioterapêutica nos slides 1–4 — sem protocolo inventado.
3. Sem sinal clínico desenhado para “reconhecer” coagulação no paciente — só o tempo biológico da fonte.
4. Sem enunciado real de prova — a linha “como cai na prova” está tagged `unsourced` / transformação pedagógica.
5. Gramática ambígua do slide 3 — tagged `interpretacao-da-fonte`; não vira fato da professora.
6. Conflito slide 2 × slide 6 sobre contração — adiado ao capítulo da proliferação.
7. Recência de mastery — não implementada. MASTERED@80 é estado operacional do motor, não domínio pedagógico definitivo.

---

## F5A.1 — o que mudou

1. Slide 3: interpretação ≠ fato. Tag nova `interpretacao-da-fonte`.
2. “Por que importa” ensina o encaixe produtos → curso futuro; a metáfora ficou microcopy.
3. Aplicação: `clinicalType` relevância | conduta | lacuna. Aqui: relevância + lacuna de conduta.
4. Microdesafio: distrator C é inversão causal (produtos só depois da inflamação), sem slide 7.
5. Boss: reconhecimento / diferenciação / raciocínio. Sem tempos de slides posteriores.
6. Teach-back: gabarito não exige “plaquetas aderem”.
7. Erro comum da cascada: não afirma mais o sujeito da adesão.

Não alterado: SourceRef, XP, níveis, mastery engine, DS, Cloudflare, backend, IA, capítulos 02–14.

Nenhum conteúdo externo entrou como `fato-da-fonte`.

---

## Auditoria interna dos 11 blocos

| # | Bloco | Status |
|---|---|---|
| 1 | Missão | OK. Fonte 2–4. Sem fato novo. |
| 2 | Objetivo | OK. Transformação pedagógica. |
| 3 | O que é | OK. Dois fatos (lista + capa). |
| 4 | Por que existe | OK. Ordem da lista + início imediato. |
| 5 | Como funciona | Corrigido. Ambiguidade isolada como interpretação. Produtos e curso futuro continuam fato. |
| 6 | Figura | OK. Lacuna preservada. Mapa pedagógico tagged. |
| 7 | Analogia | OK. Mantida. Não é fato da fonte. |
| 8 | Por que importa | Corrigido. Ensina o encaixe; unsourced de prova permanece. |
| 9 | Aplicação | Corrigido. Relevância vs conduta vs lacuna. |
| 10 | Erros comuns | Corrigido o #2. Formato Confusão → parece → acontece → diferenciar. |
| 11 | Microdesafio | Corrigido. Distratores do recorte ensinado. |

Ensine de volta: aprovado na auditoria anterior; gabarito alinhado à ambiguidade.  
Domínio: operacional; recência ainda lacuna.  
Boss: fortalecido em três níveis.  
Recompensa: inalterada.

---

## O que esta fase não fez

- Não escreveu os outros capítulos.
- Não avançou para F5B.
- Não fez Cloudflare, backend de produção, nem IA em tempo real.
- Não alterou o design system.
