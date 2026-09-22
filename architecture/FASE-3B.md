# FASE 3B — Fechamento do Design System

Status: FECHADA como fundação visual.
Fase 2 permanece FECHADA.
Não avançar para a Fase 4.

## Critério cumprido

- Nenhum PPT foi relido.
- Nenhum conteúdo acadêmico foi criado.
- Nenhuma aula, quiz, IA ou fluxo pedagógico foi ativado.
- A casa visual ficou independente do conteúdo.

## O que foi criado

### Tokens (`styles/tokens.css`, `lib/tokens.ts`)
background, surface, surface elevated, glass, border, text primary/secondary/muted, purple, violet, lilac, pink, success, warning, focus, locked, shadows, glow, radius, spacing, typography, z-index, motion (fast/normal/slow/celebration).

### Tipografia (`components/ds/Text.tsx`)
Display, H1, H2, H3, Body Large, Body, Body Small, Caption, Label, Button.
Body Large usa leading de aula (`--leading-lesson`).

### Componentes
- Button: primary, secondary, ghost, danger, icon, pill, large CTA + default/hover/active/focus/disabled/loading/success/locked. Touch 44px.
- Card: glass, solid, elevated, interactive, locked, completed, achievement, progress.
- ExamCard: genérico, dados por props.
- Navigation: desktop sidebar, tablet top rail, mobile bottom tabs, back, context trail.
- Progress: bar (XP / mastery / chapter), circular, XP chip, mastery meter, streak/level/gems/flowers via StatChip/GemBadge.
- Map: node states locked/available/inProgress/completed/mastered, connection, pins (concept/revision/exam). Nós genéricos.
- Garden: empty, growing, bloomed, gem.
- Professor: introduction, explanation, success, almost, hint, celebration. Texto externo.
- Feedback: success, almost, hint, toast, XP, achievement, chapter, flower. Ícone + texto + motion.
- Motion: fade, slide, page, XP float, unlock, grow, reveal, button scale, card lift, glow.
- Reduced motion: remove partículas e transforms excessivos; preserva fade/opacity.
- Loading: skeleton, spinner pontual, content placeholder.
- Locked: linguagem “próxima aventura”, nunca erro.
- Empty states: biblioteca, mapa, jardim, calendário, progresso.

### Catálogo
`/design-system` organizado em FOUNDATIONS e COMPONENTS, com estados aplicáveis.

### Cascas
`/`, `/castelo`, `/biblioteca`, `/mapa`, `/jardim`, `/calendario` passaram a consumir o DS. Sem aula.

## Decisões pendentes — próximas fases

1. Ilustração da professora: marca abstrata vs retrato.
2. Mapa 2D canvas vs trilha vertical (hoje: trilha vertical reutilizável).
3. Economia exata de XP, gemas e flores.
4. Tema claro futuro ou dark-only.
5. Biblioteca de ícones (hoje: marcas tipográficas do DS).
6. Som e haptics — fora da 3B.
7. Intensidade do blur glass em aparelhos fracos.
8. Type fluido entre 390 e 1440 vs escala fixa (hoje: escala fixa premium).
9. Quando EXAM_URGENCY_MODE entra e sai — regra de produto, não de visual.
10. Fase 4: arquitetura funcional — aberta por ordem explícita. Ver FASE-4.md.
