---
name: novo-artigo
description: Escreve um artigo novo do Veritas Fidei do começo ao fim, com o máximo rigor - pesquisa no Catecismo e na Nova Vulgata, redação no padrão editorial, verificador, parecer doutrinal, revisão independente, escolha da obra e conferência visual. Use quando o usuário pedir um artigo novo, o próximo do plano de conteúdo ou um bloco de artigos de um tema.
---

# Novo artigo

Siga `docs/fluxo-artigo.md` passo a passo. A prioridade é **qualidade, não
velocidade**: não pule passo por pressa, e na dúvida sobre doutrina abra a
fonte (nunca decida de memória).

## Checklist (um item por passo; marque ao concluir)

1. **Pauta**: título e seção pelo `docs/plano-de-conteudo.md`; `grep` no acervo
   pelo assunto (o que ligar, o que não repetir, rascunhos que o novo substitui).
2. **Pesquisa**: `npm run cic -- <faixas>` e `npm run biblia -- "<refs>"` antes
   de escrever. Padres só com obra e passagem (newadvent ou nota do Catecismo).
3. **Redação**: `docs/modelo-artigo.md` + `docs/padrao-editorial.md`, como
   `rascunho`. Links internos para os artigos publicados do mesmo assunto.
4. **Verificador**: `npm run verificar -- --links --ortografia content/artigos/<slug>.md`
   até 0 erros; cada aviso lido e decidido.
5. **Parecer**: skill `revisao-doutrinal`, com `npm run biblia -- --artigo` e
   `npm run cic -- --artigo` lidos linha a linha. Aplicar as correções.
6. **Revisão independente**: chamar o agente `revisor-independente` passando
   **só** o caminho do artigo (nada do parecer, nada do que já sei). Colar o
   relatório no parecer em `## Revisão independente`, com o desfecho de cada
   ponto. Corrigir e rodar o verificador de novo.
7. **Imagem** (`docs/imagens.md`): `npm run commons -- "<busca>" --tema <tema> --baixar <scratchpad>`,
   olhar as prévias, escolher a obra e uma alternativa, `npm run obra`, preencher
   o yml em português (conferido na página do Commons).
8. **Conferência visual**: `npm run conferir -- <slug>` com o :3000 no ar; olhar
   as capturas `topo-*`; ajustar `posicao`/`posicaoFaixa` se preciso.
9. **Entrega** (uma vez por bloco): canvas com escolhida + alternativa por
   artigo, e resumo (o que ensina, "Em resumo", o que o parecer e a revisão
   independente mudaram, o que o autor decide).
10. **Publicação** depois da escolha: frontmatter de publicado, plano de
    conteúdo, `npm run verificar`, `npx vitest run`, commit. Push só com
    confirmação.

## Melhorar o processo

Se um passo deixou passar um erro, ou se uma conferência manual se repete,
melhore a ferramenta (scripts/verificar, scripts/*.ts) ou este fluxo, com teste
em `test/ferramentas.test.ts`, e anote em `docs/fluxo-artigo.md`.
