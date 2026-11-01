# Fluxo de um artigo novo

Como um artigo nasce, da pauta à publicação. Prioridade: **qualidade, não
velocidade**. Cada passo tem uma ferramenta que confere o que dá para conferir
por máquina, e uma leitura humana para o resto. A skill `novo-artigo` segue
este documento.

Os artigos vêm em **blocos por tema** (docs/plano-de-conteudo.md): escrevo e
reviso todos os artigos do bloco, escolho as imagens e volto ao autor uma vez
por bloco.

## Passos

| # | Passo | Ferramenta | Resultado |
| --- | --- | --- | --- |
| 1 | Pauta | `docs/plano-de-conteudo.md`, `grep` no acervo | O que o artigo cobre e o que não repete |
| 2 | Pesquisa | `npm run cic -- 638-658`, `npm run biblia -- "Lc 24,39"` | Texto oficial à mão antes de escrever |
| 3 | Redação | `docs/modelo-artigo.md`, `docs/padrao-editorial.md` | `content/artigos/<slug>.md` como `rascunho` |
| 4 | Verificador | `npm run verificar -- --links --ortografia <arquivo>` | 0 erros; avisos lidos um a um |
| 5 | Parecer doutrinal | skill `revisao-doutrinal`, `npm run biblia -- --artigo`, `npm run cic -- --artigo` | `docs/pareceres/<slug>.md`; correções aplicadas |
| 6 | Revisão independente | agente `revisor-independente` | Seção "## Revisão independente" no parecer; correções aplicadas |
| 7 | Imagem | `npm run commons`, `npm run obra` | Obra escolhida + uma alternativa |
| 8 | Conferência visual | `npm run conferir -- <slug>` | 0 problemas; capturas olhadas |
| 9 | Entrega ao autor | canvas de mockups + resumo | Autor escolhe a imagem e lê os pontos |
| 10 | Publicação | `status: publicado`, commit, push com confirmação | No ar |

### 1. Pauta

- O plano diz o título provisório e a seção (Aprender ou Defesa da fé).
- Antes de escrever, procure no acervo o que já existe sobre o assunto
  (`grep -ril "<palavra>" content/artigos`): artigos publicados para **ligar**
  (links internos) e não repetir; rascunhos antigos que o novo **substitui**
  (apagados no mesmo commit, com redirecionamento em `urls-antigas.json` se o
  slug mudar).
- Um artigo de ensino e uma questão da Defesa sobre o mesmo assunto se dividem:
  o de ensino explica a doutrina; a Defesa responde à objeção e remete ao ensino.

### 2. Pesquisa

- **Catecismo primeiro**: `npm run cic -- <faixa>` mostra os parágrafos com as
  notas de rodapé, que dizem de onde vêm as citações dos Padres e concílios.
- **Escritura**: `npm run biblia -- "<refs>"` mostra o latim da Nova Vulgata.
  Paráfrase com referência é a norma; citação literal só pelo Catecismo ou em
  expressão curta consagrada (padrão editorial, 4.1).
- **Padres**: só com obra e passagem, conferidos na tradução publicada
  (newadvent.org) ou vindos pela nota do Catecismo.
- **Magistério**: documentos no vatican.va.

### 3. Redação

Modelo em `docs/modelo-artigo.md`, regras em `docs/padrao-editorial.md`. Nasce
como `status: rascunho`.

### 4. Verificador

`npm run verificar -- --links --ortografia content/artigos/<slug>.md`. Além do
texto (estrutura, citações, Bíblia na Nova Vulgata, Catecismo literal, links,
ortografia), confere o artigo contra o acervo:

- links internos para artigos que existem e estão publicados;
- obra existe, não abre outro artigo, tem resolução para a faixa e, se vertical,
  tem `posicaoFaixa`;
- parecer doutrinal presente, com a seção da revisão independente, sem voto
  desfavorável;
- `tituloBusca` com até 60 caracteres;
- Padre ou Doutor em destaque citado só pelo Catecismo, sem obra e passagem
  (o `npm run cic` mostra a nota com a obra).

**Erro bloqueia. Aviso se lê e se decide**, e a decisão fica no parecer quando
não for óbvia.

### 5. Parecer doutrinal

Skill `revisao-doutrinal` (modelo do censor, cân. 830). Rode
`npm run biblia -- --artigo` (frase do artigo ao lado do latim) e
`npm run cic -- --artigo` (parágrafos e notas) e confira linha a linha. As
correções do parecer são aplicadas direto (autorização do autor), e o parecer
diz o que mudou.

### 6. Revisão independente

Um segundo revisor, o agente `revisor-independente`, lê o artigo **sem ver o
parecer nem a conversa** em que foi escrito, e devolve um relatório. Eu colo o
relatório no parecer, em `## Revisão independente`, e anoto ao lado de cada
ponto o que foi feito (corrigido, ou por que não). Se ele achar algo que
bloqueia, corrijo e rodo os passos 4 e 5 de novo no trecho.

Obrigatório para artigos publicados a partir de 02/11/2026 (o verificador cobra).

### 7. Imagem

Regras em `docs/imagens.md`. Eu escolho a obra e uma alternativa:

```sh
npm run commons -- "Caravaggio Emmaus" --tema jesus-cristo --baixar <pasta>
npm run obra -- <slug> "<arquivo do Commons>"
```

O `commons` já descarta licença proibida e avisa: reprodução pequena, quadro
vertical, obra já catalogada, artista já usado no tema. As prévias baixadas são
para **olhar** antes de escolher (sem nu em close na faixa, cena fiel ao tema).

### 8. Conferência visual

Com o `npm run dev` no ar (porta 3000):

```sh
npm run conferir -- <slug> [<slug>...]
```

Abre o artigo, o tema e /creditos em 5 larguras, tema escuro e claro; acusa
rolagem horizontal, elemento fora da tela, erro no console e faixa ampliada
(imagem com menos resolução que a tela). **Eu olho as capturas do topo**
(`topo-*.png`) para julgar o recorte da faixa antes de mostrar ao autor.

### 9. Entrega ao autor (uma vez por bloco)

- Canvas de mockups: para cada artigo, a abertura com a obra escolhida e com a
  alternativa.
- Resumo por artigo: o que ensina, o "Em resumo", os pontos do parecer e da
  revisão independente que mudaram o texto, e o que ficou para o autor decidir.

### 10. Publicação

Com a escolha do autor: `status: publicado`, `publicadoEm`, `revisao` no
frontmatter (padrão de `docs/revisao.md`), plano de conteúdo atualizado,
`npm run verificar` de novo, `npx vitest run`, commit na branch. **Push e merge
só com a confirmação do autor.**
