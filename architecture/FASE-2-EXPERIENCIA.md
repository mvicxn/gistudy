# MM STUDY — FASE 2
# Experiência, UX/UI e Wireframe
# Status: fechada-corrigida · Ver FASE-2-CORRECOES.md
# Sem código de produto neste documento · Sem resumo de aula

Âncora da Fase 1 (não reabrir conteúdo acadêmico):
Disciplina Dermatofuncional II · 4 arquivos-fonte · proposta pedagógica revisável ·
prova 22/09 é instância de EXAM_URGENCY_MODE, não regra permanente.

Quatro camadas: FONTE → CONTEÚDO NORMALIZADO → PEDAGOGIA → EXPERIÊNCIA.
Os “14 capítulos” são PEDAGOGIA proposta, não títulos da fonte.

Este documento transforma território em jornada.
Não escreve a aula.
Não resume slide.
Define a experiência para a Fase 3 construir componentes sem inventar decisão.

---

# 1. PRINCÍPIO CENTRAL

Jornada obrigatória de toda unidade de estudo:

APRENDER → INTERAGIR → PRATICAR → EXPLICAR → TESTAR → CONQUISTAR

A Giovana nunca escolhe “o que abrir”.
O produto aponta o próximo passo certo.

Cada tela responde, visível, sem menu escondido:

1. Onde estou (trilha + nome)
2. O que estou aprendendo (título da unidade)
3. O que preciso fazer (1 CTA)
4. Quanto já avancei (barra + passo N de M)
5. Qual é o próximo passo (texto sob o CTA)
6. O que ganhei / ganharei (XP, flor, gema)

Se uma tela não responder as 6, ela está errada.

---

# 2. ESTRUTURA PRINCIPAL — PAPEL DE CADA ETAPA

ENTRADA
Abre o mundo. Identidade + saudação + um único convite.
Não é login técnico. É o portal do castelo.

CASTELO / DASHBOARD
Sala do trono. Mostra o agora: prova, continuar, sequência, jardim em miniatura.
Gera vontade de estudar. Um CTA só.

DISCIPLINA
A capa do livro-mãe. Dermatofuncional II.
Não lista arquivos. Mostra o mundo da matéria e o Bloco I.

MAPA DA DISCIPLINA
O território jogável. Nós vêm da PEDAGOGIA vigente (hoje: proposta de 4 módulos / 14 capítulos).
A fonte não dita o número de nós. Reagrupar pedagogia não relê PPT.
Funcional: toque = entrar. Bloqueio visível não é erro.

CAPÍTULO
Porta da fase. O que será aprendido, tempo, dificuldade, XP, flor.
Ainda não ensina.

MISSÃO
Contrato emocional da fase. “Hoje você vai conseguir X.”
CTA: Começar a aula.

AULA
A professora ensina no molde universal.
Texto longo, profundo, modos (Simples / Faculdade / Clínica / Revisão).
Nunca um slide.

INTERAÇÃO
Figuras e diagramas viram objetos tocáveis.
Hotspots, overlays, antes/depois.
A aluna mexe no conceito.

PRÁTICA
Microdesafio curto, no meio ou ao fim do bloco.
Feedback imediato. Erro ensina.

EXPLICAÇÃO DA ALUNA (ensine de volta)
Ela escreve ou escolhe a própria frase do conceito.
A professora confirma domínio ou devolve com gentileza.

DESAFIO
Missões do capítulo. 2 a 4 perguntas.
Ainda não é o boss.

BOSS DO CAPÍTULO
Quiz da fase. Fecha o capítulo.
Pode refazer. Não pune XP.

RECOMPENSA
Vitória: XP sobe, confete lilás, flor nasce, mensagem.
CTA: próximo capítulo ou jardim.

PRÓXIMO CAPÍTULO
Desbloqueio visual no mapa. Halo no próximo nó.

REVISÃO
Trilha de urgência ou revisão da matéria.
Professor em modo Revisão.
Não é lista de slides.

PROVA FINAL
Prova da matéria / prova do Bloco I.
Coroa. Cerimônia, não formulário.

---

# 3. TELAS (20)

Convenções de todos os estados
- Vazio: nunca “sem dados”. Sempre um convite ou um bloqueio elegante.
- Loading: vidro + pulso de 240ms. Texto curto da professora (“Preparando sua aula…”).
- Erro de sistema: “A sala piscou. Tentar de novo.” Sem código técnico.
- Concluído: check em esmeralda + brilho na borda + selo “Domínio”.
- Locked: nó fosco + cadeado de gema + “Carregando próximas aventuras…”
- Mobile: coluna única, CTA fixo no polegar (acima da tab bar, 64px).
- Tablet: coluna 560–680px centrada, figura ao lado quando couber.
- Notebook: sidebar + canvas 720px + painel auxiliar 280px.
- Desktop: igual notebook, canvas até 800px, nunca esticar.

Navegação global
Mobile: tab bar 5 ícones (Castelo, Biblioteca, Aula, Calendário, Jardim).
Desktop: sidebar esquerda, ícones redondos, halo na ativa.

------------------------------------------------------------
T01 — ENTRADA / PORTAL
------------------------------------------------------------
Objetivo: atravessar o portal e chegar no Castelo em 1 toque.
Emoção: recuo do mundo real, luxo calmo, “isso é meu”.
Principal: “MM Study” + “Boa noite, Giovana”.
Secundária: data, coroa se for dia de prova.
Ação principal: Entrar no Castelo.
Ações secundárias: nenhuma no primeiro uso. Depois: “Continuar de onde parei”.
CTA: pílula “Entrar” com glow roxo.
Progresso: nenhum. É o umbral.
Recompensa: fade+slide 320ms para o Castelo.
Navegação: só para frente. Sem voltar para splash.
Vazio: n/a.
Loading: partículas lentas + “Abrindo o portão…”.
Erro: “O portão emperrou. Tentar de novo.”
Concluído: não permanece. Some após 1 visita por sessão.
Mobile: full-bleed, CTA no terço inferior.
Tablet: portal centrado 480px.
Notebook/Desktop: portal 520px centro, fundo vivo nas laterais.

------------------------------------------------------------
T02 — CASTELO / DASHBOARD
------------------------------------------------------------
Objetivo: gerar vontade e apontar A ação de hoje.
Emoção: acolhida + urgência elegante (hoje: prova).
Principal: saudação + cartão da Prova Bimestral 22/09 com coroa.
Secundária: sequência, XP, nível, jardim miniatura, calendário de 7 dias.
Ação principal: “Entrar na revisão da prova” (modo urgência).
Fora de urgência: “Continuar · [nome do capítulo]”.
Ações secundárias: abrir jardim, abrir calendário, abrir biblioteca.
CTA: único, pílula grande.
Progresso: anel de Bloco I (14 capítulos) + XP do nível.
Recompensa: se voltou de uma vitória, flor nova já brilha no widget.
Navegação: tabs/sidebar. Cartão da prova → Revisão do Bloco. Continuar → capítulo em curso.
Vazio (primeira vez): “Seu castelo acabou de acordar. A primeira flor espera.” CTA = primeiro capítulo.
Loading: skeleton de vidro nos 3 cards.
Erro: card interno “Não consegui lembrar seu progresso. Recarregar.”
Concluído (bloco I 14/14): cartão vira “Prova do Bloco · você está pronta”.
Mobile: saudação → card prova → CTA → strip de stats → jardim 3 flores → semana.
Tablet: 2 colunas (hero + laterais).
Notebook/Desktop: hero centro, calendário 7 dias à direita, jardim abaixo.

------------------------------------------------------------
T03 — BIBLIOTECA
------------------------------------------------------------
Objetivo: escolher um livro mágico, nunca um arquivo.
Emoção: desejo + ordem. Estante de princesa moderna.
Principal: 4 livros do Bloco I, capa, professora, capítulos, progresso, tempo restante.
Secundária: estante bloqueada ao fundo (“Próximas aventuras”).
Ação principal: abrir um livro → Visão da disciplina/livro.
Ações secundárias: filtrar só “em curso” (chip). Sem busca feia.
CTA: o próprio livro (capa inteira é botão).
Progresso: fita luminosa na lombada.
Recompensa: livro 100% ganha selo de gema na capa.
Navegação: back para Castelo. Tap livro → T04.
Vazio: não ocorre no Bloco I (4 livros já existem). Estante II: “Carregando próximas aventuras…”.
Loading: 4 capas em pulso.
Erro: “A estante embaçou. Tentar de novo.”
Concluído: capa com coroa discreta.
Mobile: carrossel vertical de capas 16:10.
Tablet: grade 2 colunas.
Notebook/Desktop: 4 capas em fila + estante bloqueada à direita.

------------------------------------------------------------
T04 — VISÃO DA DISCIPLINA / LIVRO
------------------------------------------------------------
Objetivo: entender o livro antes de entrar no mapa.
Emoção: “eu sei o que me espera”.
Principal: nome do livro, objetivo da matéria (1 frase da Fase 1, sem resumir aula),  N capítulos, progresso.
Secundária: professora da fonte (Cintia) como crédito acadêmico + professora MM Study como guia.
Ação principal: “Abrir o mapa”.
Ações secundárias: “Revisão deste livro” (se ≥1 capítulo concluído).
CTA: Abrir o mapa.
Progresso: X/N capítulos + flores deste livro.
Recompensa: nenhuma ainda.
Navegação: back Biblioteca. CTA → T05.
Vazio: n/a.
Loading: capa expandindo.
Erro: padrão do sistema.
Concluído: selo “Livro dominado” + CTA vira “Revisar” ou “Prova do livro”.
Mobile: capa no topo, objetivo, lista curta de capítulos (nomes), CTA fixo.
Tablet/Desktop: capa à esquerda, objetivo e capítulos à direita.

------------------------------------------------------------
T05 — MAPA DA DISCIPLINA
------------------------------------------------------------
Objetivo: navegar o mundo. Funcional, não poster.
Emoção: exploração controlada. Quero a próxima flor.
Principal: path vertical (mobile) / constelação (desktop) dos capítulos do livro aberto.
No modo urgência do Bloco: mapa-mãe com 4 reinos (livros) e entrada para cada path.
Secundária: conceitos-âncora como estrelas pequenas ao lado do nó (rótulo curto, não aula).
Ação principal: tocar o capítulo disponível.
Ações secundárias: pin de Revisão, pin de Prova do livro, voltar ao livro.
CTA: o nó ativo pulsa.
Progresso: nós concluídos viram flor aberta; atual = halo; futuros = botão fechado.
Recompensa: ao voltar de uma vitória, a flor nasce no nó (420ms).
Navegação: nó → T06. Revisão → T19. Prova → T20.
Vazio: n/a.
Loading: path desenhando-se (stroke 400ms).
Erro: nós em estado “offline” com retry.
Concluído: path inteiro iluminado + coroa no boss do livro.
Locked: “Carregando próximas aventuras…” nos livros do Bloco II. Não parece erro.
Mobile: path vertical scroll, nós 72px, polegar.
Tablet: path centrado.
Notebook/Desktop: constelação horizontal por livro, 4 trilhas empilhadas no mapa-mãe.

Desbloqueio
- NORMAL_MODE: primeiro nó do módulo aberto; N+1 abre na vitória de N.
- EXAM_URGENCY_MODE: acesso acelerado aos tópicos da prova + revisão priorizada. Instância atual = 22/09. Não é regra permanente.
- Fonte futura (Bloco II): visível e bloqueada na EXPERIÊNCIA até existir pedagogia.

------------------------------------------------------------
T06 — VISÃO DE CAPÍTULO
------------------------------------------------------------
Objetivo: comprometer-se com a fase.
Emoção: “eu dou conta”. Determinação calma.
Principal: título do capítulo (Fase 1), tempo estimado, dificuldade, XP da missão, flor que nascerá.
Secundária: passos do molde (12 pontos em dots, sem spoilers de conteúdo).
Ação principal: “Aceitar missão”.
Ações secundárias: voltar ao mapa.
CTA: Aceitar missão.
Progresso: 0/12 passos se novo; senão “Continuar do passo X”.
Recompensa: preview da flor (silhueta).
Navegação: → T07. Back → mapa.
Vazio: n/a.
Loading: carta da missão virando.
Erro: padrão.
Concluído: flor real no lugar da silhueta + “Revisitar” / “Refazer o boss”.
Mobile: carta única full width.
Desktop: carta 560px centro, path de dots à direita.

------------------------------------------------------------
T07 — TELA DE MISSÃO
------------------------------------------------------------
Objetivo: firmar o contrato da aula.
Emoção: foco. A professora olha para ela.
Principal: “Hoje você vai conseguir…” + 3 bullets do que será capaz de fazer (habilidade, não resumo).
Secundária: tempo, XP, modo do professor (chip). Hoje default = Revisão se veio da urgência; senão Faculdade.
Ação principal: “Começar a aula”.
Ações secundárias: trocar modo do professor (Simples / Faculdade / Clínica / Revisão) — 1 linha de chips.
CTA: Começar a aula.
Progresso: passo 1/12.
Recompensa: +0 ainda. Mostra “ao concluir: +XP e 1 flor”.
Navegação: → T08.
Vazio: n/a.
Loading: “Sua professora está preparando a aula…”.
Erro: padrão.
Concluído: se revisitada, CTA vira “Rever missão”.
Mobile: voz da professora no topo, chips, CTA fixo.
Desktop: voz à esquerda, contrato à direita.

------------------------------------------------------------
T08 — TELA DE AULA
------------------------------------------------------------
Objetivo: ensinar profundamente no molde. Não é slide.
Emoção: clareza. Estar com uma professora boa.
Principal: bloco de aula do passo atual (objetivo → explicação).
Secundária: modo do professor, âncora “O que é / Por que existe / Como funciona / Onde aparece / Como cai na prova” como 5 abas-pétala. Conteúdo da Fase 5 preenche. Agora só o lugar.
Ação principal: “Continuar” (próximo bloco do molde).
Ações secundárias: voltar bloco; abrir glossário em sheet; pin de dúvida (salva para revisão, não abre chat).
CTA: Continuar.
Progresso: passo 2–4/12 + barra fina.
Recompensa: micro XP ao terminar a explicação (+10). Número sobe 280ms.
Navegação: Continuar → figura se houver, senão analogia.
Vazio: não existe aula vazia. Se conteúdo ainda não importado (Fase 5), estado “A aula desta fase ainda está sendo escrita.” — não inventar texto.
Loading: linhas de vidro.
Erro: “A aula não abriu. Tentar de novo.”
Concluído: bloco marcado com pétala.
Mobile: texto 18–20px, max 34rem, espaço generoso, CTA fixo.
Tablet: 36rem.
Notebook/Desktop: 40rem centro; pétalas à esquerda; glossário hover à direita.

Regra: NUNCA renderizar “próximo slide”. A aula é contínua, em blocos do molde.

------------------------------------------------------------
T09 — VISUALIZAÇÃO DE IMAGENS / DIAGRAMAS
------------------------------------------------------------
Objetivo: transformar figura da fonte em objeto de estudo.
Emoção: curiosidade clínica, sem voyeurismo.
Principal: figura (hotspots). Overlay: legenda, explicação, observações, destaques — campos da Fase 1, texto na Fase 5.
Secundária: contador “Figura 2 de 3 deste capítulo”.
Ação principal: tocar hotspot / “Entendi esta figura”.
Ações secundárias: pinch-zoom; antes/depois (abdomino, mamo); fechar overlay.
CTA: Entendi · continuar.
Progresso: passo INTERAÇÃO.
Recompensa: +10 XP na última figura do bloco.
Navegação: → Analogia.
Vazio: capítulos sem figura (Cicatrização 1–4 em parte) pulam esta tela com crossfade. Não mostram placeholder.
Loading: blur-up da imagem.
Erro: “A figura não chegou. Seguir para o próximo bloco.” (não trava a aula).
Concluído: hotspots já visitados ficam com brilho suave.
Mobile: imagem full-width, overlays em sheet inferior.
Tablet: imagem 70%, legendas ao lado.
Desktop: palco 70% + trilho de thumbnails + painel de destaques.
Fotos clínicas: fundo grafite, nunca mosaico, nunca galeria. Uma figura por vez. Dignidade.

------------------------------------------------------------
T10 — ANALOGIA
------------------------------------------------------------
Objetivo: ancorar o conceito no cotidiano.
Emoção: “ah, é isso”. Alívio inteligente.
Principal: cartão de analogia (conteúdo Fase 5). Título “Como isso aparece na vida”.
Secundária: volta de 1 linha ao conceito (não resumo longo).
Ação principal: “Faz sentido · continuar”.
Ações secundárias: “Ainda não encaixou” → professora reexplica no modo Simples, sem chat.
CTA: Faz sentido.
Progresso: passo ANALOGIA.
Recompensa: +10 XP.
Navegação: → Por que importa / Aplicação clínica.
Vazio: se analogia ainda não escrita, “Este bloco chega na importação.” Skip permitido.
Loading: carta virando.
Erro: padrão.
Concluído: carta com selo.
Mobile: carta única.
Desktop: carta + mini figura se a analogia apontar para uma.

------------------------------------------------------------
T11 — APLICAÇÃO CLÍNICA (+ “POR QUE ISSO IMPORTA?”)
------------------------------------------------------------
Objetivo: ligar o conceito à fisioterapia da Giovana.
Emoção: relevância. “Isso é a minha profissão.”
Principal: bloco “Por que isso importa?” + bloco “Na fisioterapia”.
Secundária: vínculo com o livro (ex.: tensão inferior ↔ quelóide da abdominoplastia) — só como ponte de navegação, sem escrever a aula agora.
Ação principal: Continuar.
Ações secundárias: “Ver no mapa” (estrela do conceito).
CTA: Continuar para erros comuns.
Progresso: passo CLÍNICA.
Recompensa: +10 XP.
Navegação: → T12.
Estados iguais ao T10.
Mobile: dois cards empilhados.
Desktop: dois cards lado a lado.

------------------------------------------------------------
T12 — ERROS COMUNS
------------------------------------------------------------
Objetivo: prevenir a confusão da prova.
Emoção: segurança. Alguém já errou isso por ela.
Principal: 2–4 erros em cartas viráveis (frente = confusão; verso = o certo). Sem vermelho.
Secundária: “Isso cai assim…” (1 linha).
Ação principal: virar todas as cartas + Continuar.
Ações secundárias: marcar “ainda me confunde” → entra na revisão.
CTA: Já vi as armadilhas.
Progresso: passo ERROS.
Recompensa: +15 XP se virou todas.
Navegação: → T13.
Vazio: skip se ainda não escrito.
Loading: cartas empilhadas.
Erro: padrão.
Concluído: cartas permanecem viradas em esmeralda suave (não vermelho).
Mobile: swipe de cartas.
Desktop: 2x2.

------------------------------------------------------------
T13 — MINI DESAFIO (PRÁTICA)
------------------------------------------------------------
Objetivo: usar o conceito agora.
Emoção: jogo justo. Coração acelerado discreto.
Principal: 1 pergunta (múltipla, ordenar, ou apontar na figura).
Secundária: professora em silêncio até responder.
Ação principal: responder.
Ações secundárias: “Rever o bloco” (volta à aula no ponto certo, sem perder a pergunta).
CTA: Confirmar.
Progresso: passo PRÁTICA.
Recompensa: acerto primeira: +25 XP + glow. Acerto depois: +15 XP. Erro: 0 XP perdido.
Navegação: acerto → T14. Erro → feedback → mesma pergunta.
Vazio: n/a.
Loading: “Montando seu desafio…”.
Erro sistema: retry.
Concluído: selo “Praticado”.
Mobile: enunciado + alternativas grandes (min 48px).
Desktop: enunciado esquerda, alternativas direita.
Nunca vermelho. Quase = lilás. Acerto = esmeralda + “✨ Isso mesmo.”

------------------------------------------------------------
T14 — ENSINE DE VOLTA
------------------------------------------------------------
Objetivo: a aluna explica com as próprias palavras.
Emoção: orgulho quieto. Virou professora de si.
Principal: um conceito. Três formatos, ela escolhe:
  LIVRE — “Explique com suas palavras…”
  GUIADO — O que é? / Por que acontece? / Qual a importância?
  RÁPIDO — 3–4 chips para montar a frase.
Secundária: “Não precisa ser perfeito. Precisa ser seu.”
Ação principal: enviar.
Ações secundárias: trocar o formato. Sem microfone obrigatório na v1.
CTA: Ensinar.
Progresso: passo EXPLICAR da AULA.
Recompensa: +30 XP se rubrica ok; +20 se ajuste. Mastery sobe só se a rubrica de domínio passar — XP sozinho não basta.
Navegação: domínio do conceito → próxima aula do capítulo, OU boss se for a última aula. Incompleto → mesma tela com pista.
Vazio: n/a.
Loading: “Lendo com cuidado…” (rubrica local, SEM IA em tempo real).
Erro: “Não recebi sua explicação. Tentar de novo.”
Concluído: “Ótimo. Esse conceito já está ficando forte.”
Mobile: chips de modo no topo; guiado = 3 campos curtos; rápido = chips grandes; livre = 3 linhas.
Desktop: prompt à esquerda, resposta à direita.
NÃO é chatbot. Um turno. Sem thread. Sem esperar modelo.

------------------------------------------------------------
T15 — BOSS DO CAPÍTULO
------------------------------------------------------------
Só aparece depois da última aula do capítulo. Nunca depois de um conceito isolado.
Objetivo: testar o CAPÍTULO inteiro.
Emoção: respeito. Chefe da fase, não prova da faculdade.
Principal: 5–8 questões do capítulo (conteúdo na Fase 5). Barra de vidas metafóricas = “fôlego” (não sangue). Fôlego não acaba o jogo; só pede pausa gentil.
Secundária: “Você pode refazer. Nada se perde.”
Ação principal: responder cada uma.
Ações secundárias: pausar (salva); rever um erro comum marcado.
CTA: Enfrentar o chefe / Próxima.
Progresso: questão i/n + passo TESTAR.
Recompensa: boss completo +80 XP. Perfeito (zero retry) +1 gema.
Navegação: fim → T16. Abandonar → T06 com “Continuar o chefe”.
Vazio: n/a.
Loading: “O chefe da fase se aproxima…” (não infantil, 300ms).
Erro sistema: salva respostas.
Concluído: porta da vitória.
Mobile: uma questão por tela.
Desktop: questão + figura se a questão apontar para T09.

------------------------------------------------------------
T16 — RESULTADO DO CAPÍTULO / RECOMPENSA
------------------------------------------------------------
Objetivo: celebrar e apontar o próximo.
Emoção: vitória elegante. Confete lilás, não carnaval.
Principal: “Capítulo concluído” + flor nascendo + XP com número subindo + mensagem da professora.
Secundária: gema se perfeito; streak atualizado; preview do próximo capítulo.
Ação principal: “Próximo capítulo” OU, se último do livro, “Voltar ao mapa”.
Ações secundárias: “Ver no jardim”.
CTA: Próximo capítulo.
Progresso: capítulo X/N do livro.
Recompensa: flor + XP + possível gema + possível conquista.
Navegação: próximo → T06 do seguinte. Jardim → T17. Mapa → T05.
Vazio: n/a.
Loading: n/a (é o destino).
Erro: se flor não gravou, ainda mostra vitória local + retry silencioso.
Concluído: esta tela É o estado concluído.
Mobile: flor no centro, stats abaixo, CTA fixo.
Desktop: flor centro, jardim miniatura à direita.

------------------------------------------------------------
T17 — JARDIM DA VITÓRIA
------------------------------------------------------------
Objetivo: ver o corpo do estudo crescer.
Emoção: orgulho terno. Meu jardim.
Principal: canteiros por livro. 14slots do Bloco I. Flores dos capítulos concluídos.
Secundária: nível, conquistas escondidas reveladas, contagem de gemas.
Ação principal: tocar uma flor → reabre o capítulo em modo revisitar.
Ações secundárias: voltar ao Castelo.
CTA: nenhuma obrigatória. É santuário. Se houver capítulo aberto, chip “Continuar a plantar”.
Progresso: flores / 14.
Recompensa: o próprio jardim.
Navegação: flor → T06 concluído. Castelo via tab.
Vazio: terra nua + “A primeira flor espera no Relógio da Ferida.” CTA para cap 1.
Loading: névoa subindo.
Erro: “O jardim está acordando. Tentar de novo.”
Concluído (14/14): constelação + conquista Biblioteca Real.
Mobile: canteiros verticais.
Tablet: 2 canteiros.
Desktop: 4 canteiros (um livro cada) em perspectiva suave, sem 3D pesado.

------------------------------------------------------------
T18 — CALENDÁRIO
------------------------------------------------------------
Objetivo: ver o semestre como mapa de dias, com identidade própria.
Emoção: ordem + magia. Hoje tem halo. Prova tem coroa.
Principal: grade mensal. Dias com pedra (estudou), coroa (prova), flor (capítulo), fogo (streak).
Secundária: painel do dia selecionado.
Ação principal: tocar hoje → ação do dia (hoje: revisão da prova).
Ações secundárias: mudar mês; tocar dia passado (histórico).
CTA no dia de prova: “Estudar o que cai hoje”.
Progresso: pedras no mês.
Recompensa: dia estudado vira gema/pedra com pulso 200ms.
Navegação: dia com aula do Bloco I → livro. Dia futuro bloqueado → sheet “Carregando próximas aventuras…”.
Vazio: mês sem estudo = grade limpa + CTA “Plantar o primeiro dia”.
Loading: grade fade.
Erro: padrão.
Concluído: n/a por tela; o mês se enche.
Mobile: grade 7 colunas, células ≥44px, painel do dia abaixo.
Tablet/Desktop: grade + painel direito estilo agenda (não copiar Google; cantos 24, vidro, halo).
Dias futuros do Bloco II: visíveis, foscos, sem parecer erro.

------------------------------------------------------------
T19 — REVISÃO
------------------------------------------------------------
Objetivo: reativar o Bloco I para a prova sem reler 104 slides.
Emoção: foco de véspera. A professora está com ela.
Principal: trilha única Cicatrização → Quelóide → Abdomino → Mamo → Prova do Bloco.
Secundária: itens marcados “ainda me confunde” + erros comuns virados.
Ação principal: “Continuar a revisão”.
Ações secundárias: pular livro já sólido (ela escolhe; o produto avisa o risco).
CTA: Continuar a revisão.
Progresso: 4 livros em segmentos.
Recompensa: +40 XP ao fechar a trilha.
Navegação: cada segmento usa o molde em modo Revisão (mais curto, mesmas telas T08–T15).
Vazio: se nada concluído, “Vamos construir primeiro. Comece pelo Relógio da Ferida.” CTA cap 1.
Loading: “Montando sua véspera…”.
Erro: padrão.
Concluído: CTA vira “Ir para a Prova do Bloco”.
Mobile: trilha vertical de 4 pedras.
Desktop: trilha horizontal + lista de dúvidas à direita.

------------------------------------------------------------
T20 — PROVA FINAL (matéria ou Bloco I)
------------------------------------------------------------
Objetivo: ritual de fechamento. Coroa.
Emoção: solenidade calma. Eu estudei para isso.
Principal: questões da prova (Fase 5 gera a partir dos ensinamentos, sem inventar fato).
Secundária: “Erro não tira XP. Você pode revisar e refazer.”
Ação principal: responder.
Ações secundárias: pausar; ao errar, ver o capítulo de origem.
CTA: Começar a prova / Entregar.
Progresso: questão i/n.
Recompensa: +150 XP; nível pode subir; conquista; coroa no calendário.
Navegação: fim → cerimônia (variante de T16) → Jardim.
Vazio: bloqueada até revisão mínima OU, no modo urgência do dia 22/09, aberta com aviso “Você pode entrar. O jardim ainda tem terra nua.” — ela decide.
Loading: “A coroa está sendo posta…”.
Erro: salva rascunho.
Concluído: cerimônia + “Rainha desta sala”.
Mobile: uma questão.
Desktop: questão + figura.
Nunca parece Google Forms.

---

# 4. MOLDE UNIVERSAL

AULA (conceito / tópico)
1. MISSÃO
2. OBJETIVO
3. EXPLICAÇÃO
4. FIGURA / DIAGRAMA (somente se a fonte tiver)
5. ANALOGIA
6. POR QUE ISSO IMPORTA?
7. APLICAÇÃO NA FISIOTERAPIA
8. ERROS COMUNS
9. MICRO DESAFIO
10. ENSINE DE VOLTA (livre / guiado / rápido — sem IA em tempo real)
11. DOMÍNIO DO CONCEITO (mastery, não XP)

CAPÍTULO (conjunto de aulas)
12. BOSS
13. RECOMPENSA / FLOR

O conteúdo muda. O molde não muda.
Boss nunca fecha uma aula isolada.

---

# 5. PROFESSORA VIRTUAL — PRESENÇA, NÃO CHAT

Nome na interface: “Professora MM Study”.
Crédito acadêmico separado: “Aula original · Prof.ª Ms. Cintia Zacaib Silva”.

Ela NÃO é um balão de chat permanente.
Ela é uma presença:

- Avatar em vidro, 40–56px, canto superior do canvas da aula.
- Cartão de voz (1–3 linhas) nos momentos: missão, introdução de conceito, correção, conquista.
- Toast de feedback (180–320ms) em acerto/quase.
- Sem input livre de conversa na v1.
- Dúvida = pin para revisão, não thread.

Aparições obrigatórias
- Introduz conceito: cartão no topo do bloco.
- Corrige erro: “💜 Quase. Vamos lembrar juntas.” + 1 pista + link “rever o bloco”.
- Acerto: “✨ Isso mesmo.” + 1 linha do motivo.
- Missão: olha para ela, sem mascote.
- Conquista: “Ótimo. Esse conceito já está ficando forte.”

Tom: acolhedora, inteligente, clara, paciente, acadêmica, incentivadora.
Nunca infantil. Nunca irônica. Nunca punitiva.

Modos (chip na missão e na aula)
- Simples: primeira vez.
- Faculdade: default.
- Clínica: casos e aplicação.
- Revisão: véspera / urgência 22/09.

Trocar modo não reinicia o capítulo. Só reescreve o bloco atual (quando o conteúdo existir na Fase 5).

---

# 6. GAMIFICAÇÃO — REGRAS

Duas métricas, nunca misturadas
- XP: recompensa. Nunca desce. Não significa que aprendeu.
- MASTERY / domínio: 0–100 por conceito. Sobe com acerto, repetição, ensine de volta, revisão, boss e recência. Esfria com o tempo.

Moedas de experiência
- Flor: 1 por capítulo pedagógico (número atual da proposta = 14; revisável).
- Gema: perfeição pontual (boss sem retry, prova sem retry, conquistas).
- Streak: dias consecutivos com pelo menos 1 aula concluída.
- Nível (lê XP, não mastery): Aprendiz 0 · Guardiã 500 · Princesa do Conhecimento 1500 · Rainha da Biblioteca 3500.

Tabela de XP
- Terminar explicação: +10
- Entender figura (última do bloco): +10
- Analogia: +10
- Clínica: +10
- Virar todos os erros comuns: +15
- Mini desafio 1ª tentativa: +25
- Mini desafio após retry: +15
- Ensine de volta (domínio): +30
- Ensine de volta (ajuste depois): +20
- Boss completo: +80
- Boss perfeito: +80 e 1 gema
- Capítulo (vitória): +50 e 1 flor
- Revisão de um livro: +40
- Prova do Bloco: +150
- Streak diário: +10
- Conquista: +20 a +50

Erro
- 0 XP perdido.
- Não quebra streak.
- Não trava capítulo.
- Gera: entendimento → nova tentativa → domínio.
- Cor: lilás. Palavra: Quase.
- Sempre mostra onde revisar.

Refazer
- Mesma questão, mesmo XP de retry (não o de primeira).
- Boss e prova: pode refazer inteiro; gema só na primeira passagem perfeita.

Concluir capítulo
- Exige boss entregue (não exige perfeição).
- Flor nasce. Próximo nó abre.

Sequência
- Quebra só se o dia passar sem nenhum bloco concluído.
- Aviso às 20h: “Sua sequência está acesa. Um bloco já segura o fogo.” Sem pressão feia.

Conquistas (só gatilho, sem escrever história longa)
- Primeira Flor → vitória cicatrizacao-01
- Constelação → 5 fases acesas no mapa de Cicatrização (nós 1–3)
- Olho Clínico → diferencial no boss de queloide-03 sem retry
- Cintura de Luz → livro Abdomino concluído
- Três Pétalas → livro Mamo concluído
- Biblioteca Real → 14/14
- Madrugada → estudar 00h–05h

---

# 7. MAPA / MUNDO

Hierarquia visual

Castelo
  → Biblioteca (estante)
      → Dermatofuncional II
          → Mapa-mãe (4 reinos)
              → Cicatrização (4 nós)
              → Quelóide (4 nós)
              → Abdomino (3 nós)
              → Mamo (3 nós)
          → Revisão do Bloco
          → Prova do Bloco (coroa)
      → Estante II bloqueada

Estados do nó
- locked: botão fechado, fosco
- available: halo lento
- inProgress: halo + barra
- completed: flor aberta
- mastered: flor + gema (boss perfeito)

Conceitos importantes
Estrelas pequenas no ombro do nó. Toque mostra o nome do conceito (id da Fase 1). Não abre aula solta. Convida ao capítulo.

Progresso do path
Linha entre nós: apagada / preenchendo / acesa.

Revisão e prova
Pins no fim do mapa-mãe. Não no meio do path.

---

# 8. CALENDÁRIO — REGRAS DESTE SEMESTRE

Visão mensal. Dias 24 radius. Hoje = halo. Prova = coroa.

Marcas
- 🌸 estudou (bloco concluído)
- 💎 conquista no dia
- 👑 prova (22/09 e 24/11)
- ✨ revisão
- 🔥 streak

EXAM_URGENCY_MODE (instância atual = 22/09)
- Temporário. Amanhã o produto volta a NORMAL_MODE sem desmontar arquitetura.
- Castelo, Revisão e Prova do recorte cobrado são plenos.
- Tópicos cobertos pela prova ficam acessíveis mesmo sem progressão completa.
- Fonte ainda não pedagogizada (29/09 em diante): visível, bloqueada, “Carregando próximas aventuras…”.
- Isso é design, não erro.
- Quando nova fonte entrar e for pedagogizada, o dia correspondente acende.

14/09 casos clínicos: dia passado, pedra se ela registrar estudo; conteúdo dos casos NÃO existe — o dia não abre uma aula vazia. Mostra “Os casos de sala não foram colocados no castelo.”

---

# 9. RESPONSIVIDADE

Prioridade: iPhone → iPad → notebook → desktop.
Conteúdo sempre centrado. Nunca esticar.

Mobile
- Tab bar 5.
- CTA 64px acima da tab, safe-area.
- Toque ≥ 44px, preferir 48–56.
- Tabelas (diferencial hipertrófica vs quelóide): duas cartas empilhadas, NÃO grid de 8 células.
- Imagem: width 100%, pinch.
- Polegar: ações primárias na metade inferior.

Tablet
- Tab bar ou rail curta.
- Canvas 600–680.

Notebook/Desktop
- Sidebar.
- Canvas 720–800.
- Painel auxiliar: glossário, figura, progresso.
- Mapa mais largo.
- Hover existe; tap também.

---

# 10. MICROINTERAÇÕES (180–450ms)

| Evento | Motion | Duração |
|---|---|---|
| Botão hover | glow + scale 1.02 | 180 |
| Botão press | scale 0.98 | 120 + 180 |
| Card | lift 4px + borda luminosa | 220 |
| Página | fade 0.96 + slide 12px Y | 320 |
| XP | número sobe, brilho | 280 |
| Barra | glow percorre fill | 400 |
| Acerto | glow esmeralda + partícula curta | 320 |
| Quase | pulso lilás, sem shake violento | 280 |
| Flor nasce | scale + glow + pétalas 6 | 420 |
| Confete vitória | lilás/rosa, 12–18 peças, sobe e some | 450 |
| Desbloqueio de nó | cadeado dissolve, halo acende | 360 |
| Imagem | zoom 1.03 no enter | 300 |
| Calendário hoje | halo respira | 240 loop suave |
| Pedra do dia | pulso 1x | 200 |
| Conquista | sheet de vidro sobe | 360 |
| Reduced motion | só fade 180, sem partículas, sem scale | 180 |

Nada quica. Nada gira 360. Nada “boing”.

---

# 11. DESIGN SYSTEM (tokens — Fase 3 implementa)

Cor
- bg: #0B0B10 grafite
- bg-elev: #14141C
- glass: rgba(255,255,255,0.06) + blur 16
- primary: #4B1E7A roxo profundo
- secondary: #B9A0E8 lilás
- accent: #F48FB1 rosa
- success: #1FA97A esmeralda
- warning-soft: #C9A7E0 (quase; NUNCA erro vermelho)
- text: #F6F3FA
- text-dim: #B7B0C7
- line: rgba(185,160,232,0.28)
- glow-purple: 0 0 24px rgba(120,70,200,0.45)

Claro (obrigatório)
- bg #F6F1FA · text #1A1224 · glass branco 0.7 · mesmos accentos

Tipo
- Display: família serif moderna (ex. Fraunces) 28/34/40. Títulos de capítulo.
- Corpo: sans (ex. Source Serif? Não. Sans humana: "Manrope" ou "Sora") 16/18/20.
- UI: same sans 13/14.
- Nunca menor que 14 no mobile corpo. Aula ≥ 18.

Espaço
- escala 4: 8, 12, 16, 24, 32, 40, 56, 72.
- padding de tela mobile 20.
- gap de cards 16.

Forma
- card radius 24
- pill radius 999
- input radius 16
- sheet radius 28 topo

Sombra
- soft: 0 8 24 rgba(0,0,0,0.35)
- sem sombra dura

Componentes
- Botão primário: pílula, glow, hover/press.
- Botão fantasma: vidro, borda lilás.
- Card: vidro, borda luminosa 1px, 24.
- Input: vidro, glow no focus, placeholder dim.
- Progress: fill brilhante, partícula só no 100%.
- Badge: gema 12–16px, não chip material.
- Tooltip: vidro, 12 radius, 13px.
- Modal/sheet: vidro, dim 50%, fecha no fundo.
- Nav: ícone 24, hit 48, halo ativo.
- Ícones: traço redondo, 1.75, nunca emoji como ícone de sistema (emoji só na voz da professora, pontual).
- Ilustrações: flores, pedras, halo. Sem mascote infantil.
- Partículas: 6–18, lilás/rosa, some rápido.

---

# 12. ACESSIBILIDADE

- Contraste texto ≥ 4.5. Lilás em fundo escuro testado; se falhar, text-on-lilac #1A1224.
- Fonte aula ≥ 18. Zoom do SO respeitado.
- Tab order: skip link “Ir para a aula” → canvas → CTA.
- Foco: anel 2px lilás + glow. Nunca outline:none sem substituto.
- ARIA: nós do mapa = buttons com aria-current e aria-disabled. Figuras = figure + figcaption. Hotspots = buttons nomeados.
- Reduced motion: tokens acima. Jardim estático. Confete vira fade da flor.
- Toque ≥ 44.
- Feedback além de cor: ícone + palavra (Isso mesmo / Quase) + haptics leves se o OS permitir.
- Leitor de tela: professora lida como heading+texto, não como live region a cada tecla.

---

# 13. ESTADOS DE COMPONENTE

Todo componente interativo declara:

DEFAULT · HOVER · ACTIVE · FOCUS · DISABLED · LOCKED · LOADING · SUCCESS · ERROR · COMPLETED

Mapa rápido
- Botão locked ≠ disabled. Disabled = não pode agora (rede). Locked = conteúdo futuro, visual de aventura.
- ERROR de questão = estado SUCCESS-parcial: “Quase”, nunca ERROR vermelho.
- ERROR de sistema = banner lilás-grafite, retry.
- COMPLETED em card = borda esmeralda 30% + selo.

---

# 14. WIREFRAMES (hierarquia e posição)

Mobile-first. Unidades relativas.

T01 ENTRADA
[ fundo partículas ]
[ logo 12% topo ]
[ “MM Study” display ]
[ “Boa noite, Giovana” ]
[ coroa se 22/09 ]
[ spacer ]
[ CTA Entrar 88% width, 56h, 12% bottom ]

T02 CASTELO
[ top: saudação + nível + XP ]
[ card Prova 100% — coroa, data, 1 frase ]
[ CTA 100% ]
[ row stats: streak | XP | flores    3 col iguais ]
[ jardim miniatura 3 flores 100% ]
[ semana 7 dots ]
[ tab bar ]

T03 BIBLIOTECA
[ título “Biblioteca Real” ]
[ livro 100% x 180 — capa, nome, prof, caps, fita ]
[ x4 ]
[ estante fosca “próximas aventuras” ]
[ tab bar ]

T04 LIVRO
[ capa 100% x 160 ]
[ nome + objetivo 1 frase ]
[ meta: N caps · tempo · flores ]
[ lista caps (nome + estado) ]
[ CTA Abrir mapa ]

T05 MAPA
[ back + nome do livro ]
[ path: linha central ]
[ nó 72  ] título à direita
[ nó ]
[ pin Revisão ]
[ pin Prova ]
[ tab bar ]

T06 CAPÍTULO
[ flor silhueta ]
[ título ]
[ tempo · dificuldade · XP ]
[ dots 12 passos ]
[ CTA Aceitar ]

T07 MISSÃO
[ avatar professora ]
[ cartão de voz ]
[ 3 bullets habilidade ]
[ chips de modo ]
[ CTA Começar ]

T08 AULA
[ trilha “Livro · Cap · passo” ]
[ 5 pétalas (o que / por que / como / onde / prova) ]
[ texto longo ]
[ CTA Continuar + XP +10 preview ]

T09 FIGURA
[ stage imagem 100% ]
[ hotspots ]
[ sheet: legenda / explicação / destaques ]
[ CTA Entendi ]

T10 ANALOGIA
[ selo “Na vida” ]
[ carta ]
[ CTA Faz sentido ]

T11 CLÍNICA
[ carta Por que importa ]
[ carta Na fisioterapia ]
[ CTA ]

T12 ERROS
[ cartas viráveis ]
[ CTA Já vi as armadilhas ]

T13 MINI
[ enunciado ]
[ alternativas 56h ]
[ CTA Confirmar ]
[ feedback overlay ]

T14 ENSINE
[ prompt ]
[ textarea OU 3 chips ]
[ CTA Ensinar ]

T15 BOSS
[ “Chefe da fase” ]
[ i/n ]
[ questão ]
[ CTA ]

T16 VITÓRIA
[ flor nascendo ]
[ XP count-up ]
[ mensagem ]
[ CTA Próximo | Ver jardim ]

T17 JARDIM
[ céu ]
[ canteiro livro ]
[ flores / slots ]
[ stats gemas · nível ]

T18 CALENDÁRIO
[ mês · hoje halo ]
[ grade 7x5+ ]
[ painel do dia ]
[ CTA do dia ]

T19 REVISÃO
[ 4 pedras de livro ]
[ dúvidas pinadas ]
[ CTA Continuar revisão ]

T20 PROVA
[ coroa ]
[ i/n ]
[ questão ]
[ CTA ]

Desktop: sidebar 80 | canvas centro | aside 280 (progresso, figura, glossário).

---

# 15. FLUXOS COMPLETOS

Feliz (dia 22/09)
Entrar → Castelo → CTA revisão → Revisão Bloco
→ Livro Cicatrização (modo Revisão) → mapa ou trilha linear
→ Capítulo → Missão → Aula → (Figura) → Analogia → Clínica → Erros
→ Mini → Ensine → Boss → Vitória → Flor
→ Próximo livro da trilha → … → Prova do Bloco → Cerimônia → Jardim

Acerto
Resposta → glow esmeralda → “✨ Isso mesmo.” + motivo → XP sobe → próximo item.

Erro
Resposta → pulso lilás → “💜 Quase. Vamos lembrar juntas.” + pista + “Rever o bloco”
→ mesma questão → acerto de retry → +XP menor → segue.
Streak intacta. XP intacto.

Abandona
Back ou fecha no meio → progresso do passo salvo.
Castelo mostra “Continuar · [capítulo] · passo X”.
Boss pausado guarda respostas.

Retorna depois
Portal pula se sessão recente.
Castelo: Continuar. Mapa: nó inProgress.
Jardim mostra flores já nascidas.

Termina uma disciplina/livro
Última vitória do livro → mapa com path aceso → CTA “Revisão deste livro” ou “Prova do livro”.
Se for o 4º livro do Bloco: “Prova do Bloco”.

Revisão
Castelo (urgência) ou pin no mapa → T19 → molde em modo Revisão (blocos mais curtos, mesmas telas) → T20.

Prova final
T20. Pausa permitida. Erro = Quase + origem do capítulo. Entrega → cerimônia → jardim + coroa no calendário.

Primeira vez (sem urgência, para o futuro)
Entrar → Castelo vazio nobre → “A primeira flor espera” → Capítulo 1 Cicatrização → molde → jardim com 1 flor.

Livro bloqueado
Tap → sheet “Carregando próximas aventuras…” + data do planograma. Sem erro.

---

# 16. REGRA FINAL DESTA FASE

Fase 2 fechada com correções.
Não há aula escrita. Não há resumo de slide. Fase 1 acadêmica intocada.

A Fase 3 implementa o Design System (tokens, botões, cards, nav, motion) em vazio elegante — ainda sem importar fonte e sem fazer a aula funcionar.

Decisões que a Fase 3 NÃO pode reinventar
- 20 telas e seus CTAs
- 4 camadas: fonte → normalizado → pedagogia → experiência
- Molde de aula (11) + molde de capítulo (boss + flor)
- Professora = presença, não chat
- Ensine de volta em 3 modos, sem IA em tempo real
- XP ≠ mastery
- source_ref obrigatório em fato pedagógico
- NORMAL_MODE vs EXAM_URGENCY_MODE
- Erro = lilás Quase
- Mobile tab 5 · desktop sidebar
- Tabelas viram cartas no mobile
- Foto clínica = uma por vez
)
