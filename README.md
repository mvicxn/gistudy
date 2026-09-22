# MM Study

Castelo de estudos da Giovana. Um app pessoal, mobile-first, para aprender Dermatofuncional II com a mesma forma em todo capítulo: aula, desafio, ensine de volta, Boss e vitória.

O conteúdo vem da fonte (PDF/PPT tratado no Obreiro, fora do palco). O produto preserva o export estático, enquanto as Pages Functions fornecem login e progresso persistido no D1.

Site publicado: https://gistudy.pages.dev/

## Tecnologias

- Next.js 16 (App Router, `output: "export"`)
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest
- Cloudflare Pages (estático, pasta `out/`, com Pages Functions)

As Pages Functions fornecem autenticação e persistência de progresso no D1. Não há runtime de IA no site.

## Como rodar

```bash
npm install
npm test
npm run dev
```

Abra http://127.0.0.1:3000.

Outros comandos:

```bash
npm run build      # gera out/
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint (veja pendência conhecida)
```

O progresso autenticado fica no D1 por conta. A sessão usa cookie HttpOnly/Secure/SameSite=Lax. O localStorage é apenas fallback controlado para visitantes não autenticados; ele não é migrado para contas.

## Como publicar

Build estático:

```bash
npx next build
```

Saída: `out/`.

Deploy no projeto Pages existente:

```bash
npx wrangler login
npx wrangler whoami
npx wrangler pages deploy out --project-name=gistudy --branch=main
```

URL de produção: https://gistudy.pages.dev/

### Deploy automático (GitHub → Pages)

O workflow `.github/workflows/deploy.yml` roda em todo push na `main`:

1. `npm ci`
2. `npm test`
3. `npm run build`
4. `wrangler pages deploy out --project-name=gistudy`

Secrets necessários no repositório GitHub:

- `CLOUDFLARE_API_TOKEN` — token com permissão **Cloudflare Pages — Edit**
- `CLOUDFLARE_ACCOUNT_ID` — `8690b830da0b2d1acd9184f2b88ca6cd`

Sem esses secrets, o Actions falha e o deploy continua podendo ser feito à mão com Wrangler:

```bash
npx wrangler pages deploy out --project-name=gistudy --branch=main
```

Conta Cloudflare do projeto: `8690b830da0b2d1acd9184f2b88ca6cd`.

Como criar o token: Cloudflare Dashboard → My Profile → API Tokens → Create Token → template **Edit Cloudflare Pages**.

## Estrutura do projeto

```
app/                 rotas (App Router)
components/ds/       design system
components/study/    telas e guia (UX)
content/             capítulos e catálogo
domain/              contratos e tipos
engine/              regras (XP, mastery, Boss, teach-back)
repository/          persistência local e API autenticada
functions/           Pages Functions (sessão, progresso e administração)
migrations/           migrações do banco D1
obreiro/             regras de importação (off-stage)
config/              XP, modo de estudo
architecture/        histórico de fases
public/              assets estáticos
```

Camadas: SOURCE → NORMALIZED → PEDAGOGY → EXPERIENCE → UI.

Não misture conteúdo acadêmico com copy de interface.

## Fluxo pedagógico

1. **Início (Castelo)** — matéria, capítulo atual, uma ação.
2. **Jornada (Mapa)** — capítulos com estado humano.
3. **Capítulo** — objetivo e entrada da aula.
4. **Aula** — um pedaço por vez (objetivo, o quê, por quê, como, figura, analogia, prática, erros).
5. **Desafio** — escolha + feedback.
6. **Ensine de volta** — explicação nas palavras da estudante.
7. **Boss** — uma pergunta por tela; fecha o capítulo.
8. **Vitória** — XP, flor, próximo capítulo.

O guia de primeira visita aponta para a interface real (spotlight + Passo X de 8). Pode pular, voltar, avançar e reabrir em **Preciso de ajuda**.

## Como adicionar novos capítulos

Não invente conteúdo. A fonte (PDF/PPT) passa pelo Obreiro off-stage.

1. Crie o arquivo em `content/pilot/` no mesmo molde dos capítulos existentes (source_ref, tags epistêmicas, lesson mold).
2. Registre source, pedagogy, lesson body e assets em `content/catalog.ts`.
3. Coloque figuras em `public/content/...`.
4. Rode os testes do conteúdo e `npm test`.
5. Não altere engine, XP, mastery, regras de Boss/Teach-back nem contratos de domínio só para “caber” um texto.

Capítulos futuros já listados como “Em breve” ficam em `upcomingChapters` no catálogo.

## Cloudflare Pages + D1

- Projeto: `gistudy`
- Build: `npx next build`
- Output: `out`
- Framework: Next.js static export (`output: "export"` em `next.config.ts`)
- As funções em `functions/` usam o binding D1 `DB` configurado em `wrangler.toml`.
- Aplique a migração (depois de substituir o `database_id` pelo ID real):

```bash
npx wrangler d1 migrations apply gistudy --remote
```

A migração cria as contas iniciais `gigi/gigi` e `admin/admin` com hashes PBKDF2; senhas nunca são enviadas ao cliente. Em produção, troque as credenciais iniciais após o primeiro acesso por um fluxo administrativo seguro.

Refresh direto de `/castelo`, `/aula/...` etc. funciona porque cada rota vira HTML estático.

## GitHub Actions

Arquivo desejado: `.github/workflows/deploy.yml` (build + `wrangler pages deploy` em todo push na `main`).

O token OAuth deste ambiente **não tem scope `workflow`**, então o arquivo precisa ser criado no GitHub uma vez (UI ou token com permissão `workflow`). Conteúdo:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=gistudy --branch=main
```

Secrets: `CLOUDFLARE_API_TOKEN` (Edit Cloudflare Pages) e `CLOUDFLARE_ACCOUNT_ID` (`8690b830da0b2d1acd9184f2b88ca6cd`).

Até lá, o deploy é: `npx wrangler pages deploy out --project-name=gistudy --branch=main`.

## Testes

```bash
npm test
```

Os testes cobrem engine, repositório, Obreiro e conteúdo piloto. Não altere um teste só para fazê-lo passar.

## Identidade visual

Premium, feminino, acadêmico, mágico, moderno. Hierarquia, tipografia e espaço — sem neon, sem excesso de cards, sem tutorial permanente depois da primeira jornada.
