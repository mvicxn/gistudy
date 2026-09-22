# FASE 4 — Arquitetura funcional

Status: FECHADA como máquina.
Fases 1, 2, 3A e 3B permanecem fechadas.
Não avançar para a Fase 5.

## Critério cumprido

- Nenhum PPT foi importado ou relido.
- Nenhuma aula real da Giovana foi escrita.
- Nenhuma questão acadêmica foi gerada.
- Nenhuma IA foi adicionada.
- Cloudflare de produção não foi configurado.
- O frontend consome contratos, não arquivos-fonte.

## Camadas

```
FONTE → CONTEÚDO NORMALIZADO → PEDAGOGIA → EXPERIÊNCIA → UI
```

Obreiro (só interface): Importer → Normalizer → PedagogyBuilder → Publisher.

## Árvore relevante

```
domain/           contratos por camada
config/           XP_RULES, níveis, StudyMode
engine/           progressão, mastery, XP, modo, applyAction
repository/       Memory + Local + fábrica
obreiro/          interfaces, sem processamento
content/mock/     Reino das Estruturas
components/study/ telas que consomem contratos
app/capitulo/[id]
app/aula/[id]
app/revisao
app/prova/[id]
```

## Contratos principais

Frontend (`domain/contracts.ts`): Subject, Module, Chapter, Concept, Lesson, Challenge, Boss, Review, Assessment, SourceRef, ProgressSnapshot, StudyMode.

Fonte e parser ficam fora da UI.

## Fluxo funcional (mock)

Castelo → Mapa → Capítulo → Aula → Microdesafio → Teach-back → Boss → Recompensa → próximo capítulo.

Universo: Reino das Estruturas · Portão / Floresta / Torre.

Progresso persiste em `mm-study.progress.v1` via ProgressRepository.

## Testes

`npm test` — progressão, XP, mastery, locked, completion, repository, exam urgency mode.

## Decisões tomadas

1. XP só em `config/xp-rules.ts`.
2. Mastery 0–100 por eventos, recalculável; limiar 80 = MASTERED.
3. Teach-back mock aceita texto ≥ 12 caracteres. Sem IA.
4. EXAM_URGENCY_MODE vive em `config/study-mode.ts`. Componentes só consultam `resolveStudyMode()`.
5. Persistência: Local no browser, Memory no servidor/testes. CloudRepository fica para depois.
6. Static export: rotas dinâmicas com `generateStaticParams` do mock.
7. Obreiro não processa arquivo nesta fase.

## Decisões ainda pendentes

1. Economia final de XP/gemas/flores (valores atuais são do mock).
2. Ilustração da professora.
3. Mapa 2D vs trilha vertical.
4. CloudRepository (D1/R2) na Fase 7.
5. Fase 5: transformar as apresentações reais em aulas — só com ordem explícita.
