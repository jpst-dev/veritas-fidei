# Padrão editorial

Todo artigo do Veritas Fidei segue este padrão, para que o site leia como uma
obra só e não como uma coleção de textos soltos. O processo de conferência
está em [revisao.md](revisao.md) e o esqueleto pronto em
[modelo-artigo.md](modelo-artigo.md).

## 1. Dois tipos de artigo

| Tipo | Seção (`secao`) | Pergunta que responde | Tamanho |
| --- | --- | --- | --- |
| **Ensino** | `aprender` | "O que a Igreja crê sobre isto, e por quê?" | 1.200 a 2.500 palavras |
| **Questão** | `defesa-da-fe` | "Esta objeção à fé procede?" | 900 a 1.800 palavras |

Respostas curtas, glossário, vídeos e podcast virão depois, com padrão próprio.

### Estrutura do Ensino

1. **Abertura** (sem título, 1 a 2 parágrafos): o que é e por que importa.
   O primeiro parágrafo recebe a capitular, por isso nunca começa com título.
2. `## O que a Igreja ensina`: a doutrina dita com precisão, ancorada no
   Catecismo.
   *(Opcional)* Logo depois pode entrar **uma** seção própria do tema, quando
   ele pede (ex.: "Os sete sacramentos e a vida cristã").
3. `## Na Sagrada Escritura`: as passagens principais, lidas no contexto.
4. `## Na Tradição`: Padres da Igreja, concílios e Doutores.
5. `## Dúvidas comuns` *(opcional)*: 2 a 4 perguntas curtas, em `###`.
6. `## Para a vida cristã` *(opcional)*: consequências para a oração e a
   prática.
7. `## Em resumo`: 3 a 5 tópicos que o leitor deve guardar.

### Estrutura da Questão

O frontmatter **precisa** de `quaestio` (Parece que… / Em sentido contrário /
Respondo), que aparece no topo do artigo e na home.

1. **Abertura** (sem título): a objeção no contexto em que é ouvida.
2. `## A objeção`: na sua **melhor** forma, com os argumentos que quem a
   faz usaria. Nada de espantalho.
3. `## O que a Igreja ensina`
4. `## A resposta`: Escritura, Tradição e Magistério, em `###` quando
   necessário.
5. `## Respondendo às objeções`: cada argumento da seção 2, na mesma ordem.
6. `## Em resumo`

### Regras gerais

- No máximo 6 seções `##`, numeradas automaticamente pelo site. Use `###`
  dentro delas; não use `####`.
- Não escreva "Introdução", "Conclusão" nem "Referências" como título: a
  abertura não tem título, o fim é "Em resumo" e as referências ficam no
  frontmatter.
- Parágrafos curtos, de 2 a 5 frases.

## 2. Linguagem

- **Português do Brasil**, claro e sereno. O leitor é um católico curioso:
  explique termos técnicos na primeira vez em que aparecem (ex.:
  *transubstanciação*).
- **Caridade com quem pensa diferente.** "Nossos irmãos protestantes", nunca
  "os hereges". Critique ideias, não pessoas. Firmeza na doutrina e mansidão
  no tom (1Pd 3,15).
- **Títulos em frase**, só com a primeira letra e os nomes próprios em
  maiúscula: "A Eucaristia é apenas um símbolo?", não "A Eucaristia é Apenas
  um Símbolo?".
- **Pergunta no título só na Defesa da fé**, que responde a uma objeção
  ("Venerar Maria é idolatria?"). Em Aprender o título afirma o assunto ("A
  Santíssima Trindade", "Conhecer a Deus pela razão e pela fé"). O verificador
  confere.
- Maiúsculas reverenciais nos nomes divinos e títulos marianos: Deus, Cristo,
  Espírito Santo, Nossa Senhora, a Igreja (instituição). Os pronomes ficam em
  minúscula: "ele", "seu".
- Termos latinos em itálico: *ex opere operato*, *Lumen Gentium*.
- Sem superlativos vazios ("o dogma mais importantíssimo") e sem frases de
  enchimento ("é importante ressaltar que…").

## 3. Fontes

### Hierarquia

1. **Sagrada Escritura**, na tradução escolhida (ver 4.1).
2. **Magistério**: Catecismo (CIC) e seu Compêndio, concílios, encíclicas e
   documentos papais. O texto oficial em português está em
   [vatican.va](https://www.vatican.va). Use também o Denzinger (DH) para
   definições dogmáticas.
3. **Padres e Doutores da Igreja**: sempre com obra e passagem identificáveis.
4. **Teólogos de referência** (Ratzinger, Garrigou-Lagrange, Scott Hahn
   etc.): para apoio, nunca como prova única.

### Nunca usar como fonte

- Blogs, Wikipédia, vídeos e posts em redes sociais. Eles podem levar à fonte
  primária, mas a citação é feita da fonte primária.
- Citações "atribuídas" sem obra (é comum circularem frases de santos que eles
  nunca disseram).
- Textos gerados por IA. A IA pode ajudar a escrever e a revisar, mas **toda
  citação literal é conferida na fonte original** antes de publicar.

## 4. Como citar

### 4.1 Bíblia

- Tradução padrão: **Bíblia Sagrada, tradução oficial da CNBB**. Se precisar
  de outra (por exemplo, para comparar), indique-a: "(Jo 6,55 — Ave-Maria)".
- **Siglas da CNBB, sem espaço e sem ponto**: Gn, Ex, Mt, Mc, Lc, Jo, At,
  Rm, 1Cor, 2Cor, Gl, Ef, Fl, Cl, 1Ts, Hb, Tg, 1Pd, 1Jo, Ap, Eclo, Sb, 2Mc etc.
- **Vírgula entre capítulo e versículo** (o padrão brasileiro, não os
  dois-pontos):
  - um versículo: `Jo 6,55`
  - intervalo: `Jo 6,53-56`
  - versículos soltos: `Jo 6,53.55`
  - mais de uma passagem: `Jo 6,55; 1Cor 11,27`
  - capítulos inteiros: `Jo 6`
- No texto corrido, a referência vai entre parênteses, depois da citação:
  “A minha carne é verdadeiramente comida” (Jo 6,55).
- **Paráfrase com referência é a regra.** Conte o que o texto diz e dê a
  referência: Maria profetiza que todas as gerações a chamarão bem-aventurada
  (Lc 1,48). O leitor abre a própria Bíblia.
- **Aspas só em dois casos**: a citação vem pelo Catecismo ou por outro
  documento oficial, e então se indica a fonte (“O que foi gerado nela vem do
  Espírito Santo” (Mt 1,20, citado em CIC 497)); ou é uma expressão curta e
  consagrada, igual em qualquer tradução católica (“cheia de graça”, Lc 1,28).
  Citação longa entre aspas, só conferida palavra por palavra na CNBB impressa.
  A expressão curta não bloqueia a publicação: o sentido se confere na Nova
  Vulgata, e a redação na CNBB impressa fica como conferência opcional.
- **Conferência.** O verificador confere cada referência contra a **Nova
  Vulgata** do vatican.va, o texto latino oficial da Igreja: o capítulo e o
  versículo têm de existir. Se o versículo diz o que o artigo afirma se vê com
  `npm run biblia -- --artigo content/artigos/<slug>.md`, que mostra o texto
  latino de cada referência; a revisão doutrinal faz essa leitura. A Nova
  Vulgata numera os Salmos pela numeração hebraica, como a CNBB; Ester,
  Daniel, Joel, Malaquias e Eclesiástico podem divergir, e ali o verificador só
  avisa.

### 4.2 Catecismo e Magistério

| Fonte | Formato | Exemplo |
| --- | --- | --- |
| Catecismo | `CIC` + número (sem §) | (CIC 1374) · (CIC 1373-1381) |
| Compêndio do Catecismo | `Compêndio` + número | (Compêndio 282) |
| Documento papal ou conciliar | título em itálico, número | (*Lumen Gentium*, 11) |
| Concílio sem nome curto | concílio, sessão, capítulo | (Concílio de Trento, sessão XIII, cap. 4) |
| Denzinger | `DH` + número | (DH 1642) |
| Código de Direito Canônico | `CDC, cân.` + número | (CDC, cân. 916) |

O texto em português do vatican.va segue a ortografia de Portugal ("Baptismo",
"acção", "Matrimónio"). Cite-o **adaptando só a grafia** ao Brasil ("Batismo",
"ação", "Matrimônio"), sem trocar nenhuma palavra. O `npm run verificar`
compara ignorando essas diferenças.

### 4.3 Padres da Igreja

Autor, obra em itálico, passagem e data aproximada:

> (Santo Inácio de Antioquia, *Carta aos Esmirnenses*, 7,1; c. 110)

### 4.4 Citações longas

Se passar de 2 linhas, use citação em bloco (`>`). A referência vai na última
linha, depois de um travessão:

```md
> No santíssimo sacramento da Eucaristia estão “contidos, verdadeira, real e
> substancialmente, o corpo e o sangue, conjuntamente com a alma e a divindade
> de nosso Senhor Jesus Cristo e, por conseguinte, Cristo completo”.
>
> — CIC 1374
```

No bloco, a citação vai sem aspas, porque o próprio bloco já indica que é
citação. Use aspas curvas (“ ”) no texto corrido e aspas simples curvas
(‘ ’) para uma citação dentro de outra. Dentro do bloco, mantenha as aspas que
o próprio texto citado traz (no exemplo, o Catecismo cita o Concílio de Trento).

## 5. Frontmatter obrigatório para publicar

```yaml
title: A Eucaristia é apenas um símbolo?   # em frase; questões terminam com ?
description: >-                              # até 160 caracteres (aparece no Google)
  Jesus falava por imagens, mas em João 6 ele insiste: sua carne é
  verdadeiramente comida. O que a Igreja ensina e por quê.
tema: sacramentos
secao: defesa-da-fe
nivel: iniciante                             # iniciante | intermediario | avancado
tags: [eucaristia, presenca-real]
publicadoEm: 2026-11-15
referencias:                                 # pelo menos 3, com link quando houver
  - titulo: Catecismo da Igreja Católica, 1373-1381
    url: https://www.vatican.va/archive/cathechism_po/index_new/p2s2cap1_1210-1419_po.html
quaestio: { … }                              # obrigatório na Defesa da fé
revisao:
  citacoesConferidas: true
  referenciasConferidas: true
```
