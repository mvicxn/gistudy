# AUDITORIA DA FASE 2 — CORREÇÕES APLICADAS
# Status: Fase 2 fechada · Sem implementação de produto · Sem reabrir Fase 1

A estrutura geral da Fase 2 permanece aprovada:
20 telas · jornada · molde · professora sem chatbot · erro sem punição ·
mobile-first · Castelo → mapa → capítulo → aula → boss → jardim ·
estados · motion · identidade · território ≠ experiência.

Isto corrige só o que nos prenderia depois.

---

## 0. QUATRO CAMADAS (obrigatório)

A máquina do MM Study tem quatro camadas. Troca o PPT, a máquina continua.

```
FONTE                    arquivos, slides, títulos, textos, imagens, tabelas, ordem original
        ↓
CONTEÚDO NORMALIZADO     conceitos e tópicos estruturados, com source_ref
        ↓
PEDAGOGIA                módulos / capítulos / aulas / analogias / quizzes criados pelo MM Study
        ↓
EXPERIÊNCIA              mapa, XP, flores, mastery, calendário, modos de progressão
```

Regras
- Fonte nunca é reprocessada para mudar pedagogia.
- Os “14 capítulos” da Fase 1 são PEDAGOGIA proposta, não título da fonte.
- Experiência lê pedagogia, não lê PPT.
- Pedagogia aponta para conteúdo normalizado.
- Conteúdo normalizado aponta para fonte via `source_ref`.

---

## 1. FONTE ≠ ESTRUTURA PEDAGÓGICA

SOURCE
- 5 arquivos
- 104 slides na ordem original
- títulos reais dos slides
- textos, imagens, tabelas

NORMALIZED CONTENT
- conceitos / tópicos (ex.: “fases da cicatrização”, “diástase”, “encapsulamento”)
- cada um com `source_ref`

PEDAGOGICAL STRUCTURE
- módulos e capítulos que o MM Study cria
- a proposta atual (4 módulos / 14 capítulos) é um recorte revisável
- pode ser reagrupada sem reler os PPTs

EXPERIENCE
- mapa, flores, XP, mastery, urgência, jardim

O produto NÃO trata `PPT → 14 capítulos` como equivalência rígida.

---

## 2. BOSS É DO CAPÍTULO, NÃO DA AULA

AULA (unidade de conceito / tópico pedagógico)
1. Missão
2. Objetivo
3. Explicação
4. Figura/diagrama, quando existir na fonte
5. Analogia
6. Por que isso importa
7. Aplicação na fisioterapia
8. Erros comuns
9. Microdesafio
10. Ensine de volta
11. Domínio do conceito

CAPÍTULO (conjunto de aulas)
12. Boss
13. Recompensa / Flor

Um capítulo com várias aulas tem UM boss no fim.
Não existe boss depois de cada conceito.

T15 e T16 pertencem ao fechamento do capítulo.
T07–T14 + domínio (parte de T08/T14) pertencem à aula.

---

## 3. RASTREABILIDADE OBRIGATÓRIA

Nada pedagógico importante sem `source_ref`.

```
source_ref:
  file        # arquivo original
  slide       # número do slide/página
  section     # título/bloco no slide, se houver
  asset_id    # imagem/tabela, quando aplicável
```

Vale para: conceito, explicação, analogia, aplicação clínica, erro comum, figura, microdesafio, questão de boss, prova.

Se não houver fonte, o campo fica `unsourced: true` e NÃO entra como fato acadêmico.
É permitido só como cola de experiência (copy de UI, voz da professora genérica).

Alucinação sem identificação é proibida.

---

## 4. ENSINE DE VOLTA — 3 MODOS, SEM IA EM TEMPO REAL

A aluna escolhe o formato. Os três funcionam offline de regra.

MODO LIVRE
Campo curto: “Explique com suas palavras…”

MODO GUIADO
O que é? [ ]
Por que acontece? [ ]
Qual a importância? [ ]

MODO RÁPIDO
3–4 chips/frases para montar a explicação.

Avaliação
- v1: correspondência com gabarito pedagógico (palavras-chave / chips esperados / rubrica).
- IA posterior é opcional e assíncrona.
- O fluxo NUNCA espera modelo em tempo real.

---

## 5. MODOS DE PROGRESSÃO

NORMAL_MODE
- capítulo N+1 abre na vitória de N
- prova do módulo pede progressão mínima
- mapa conduz pela ordem pedagógica vigente

EXAM_URGENCY_MODE
- configuração temporária da EXPERIÊNCIA
- revisão priorizada
- acesso acelerado aos tópicos cobertos pela prova
- prova acessível mesmo sem progressão completa
- aviso honesto se o jardim ainda tem terra nua

A urgência de 22/09 é uma instância (`examDate: 2026-09-22`, `covers: bloco-1`).
Não é regra estrutural permanente.

---

## 6. XP ≠ DOMÍNIO (MASTERY)

XP
- recompensa / gamificação
- nunca desce
- erro não tira XP

MASTERY / DOMÍNIO
- estado pedagógico do conceito
- 0–100
- NÃO sobe só porque ganhou XP

Sinaliza domínio (com pesos a calibrar na Fase 4, não agora):
- acerto em microdesafio
- repetição espaçada
- qualidade do ensine de volta (rubrica, não “enviou texto”)
- revisão feita
- desempenho no boss do capítulo que contém o conceito
- recência (domínio esfria com o tempo)

UI
- barra de domínio do conceito / módulo
- XP à parte, nunca no mesmo número

“1.240 XP” não significa “aprendeu cicatrização”.

---

## 7. FASE 1 INTOCADA

Nenhum fato acadêmico foi reescrito.
Os 14 capítulos continuam no JSON da Fase 1 como proposta pedagógica anotada, não como título de slide.
