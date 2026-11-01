# Parecer doutrinal: Os católicos acrescentaram livros à Bíblia?

- Artigo: content/artigos/catolicos-acrescentaram-livros.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Questão da Defesa da fé sobre os deuterocanônicos. Responde com a Septuaginta e o cânon judaico ainda não fechado no tempo de Jesus, as listas antigas (Hipona, Cartago, Santo Agostinho, Inocêncio I, Florença), a definição de Trento, a mudança feita pelos reformadores (Lutero, 1534; Westminster, 1646) e as respostas a cinco argumentos, inclusive o caso de São Jerônimo. Doutrina correta; tom respeitoso com os irmãos protestantes.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | O cânon do AT tem 46 livros, incluindo os deuterocanônicos | De fé (Trento) | Afirmado | CIC 120; DH 1501-1504 | Sim |
| 2 | Foi a Tradição apostólica que discerniu o cânon | Magistério (DV 8) | Citado | CIC 120 | Sim |
| 3 | Os livros “completos, com todas as suas partes” | De fé | Citado | CIC 105 | Sim |
| 4 | A Escritura ensina sem erro a verdade salvífica | De fé | Afirmado | CIC 107 | Sim, após correção |
| 5 | Gênero de Judite e Tobias | Opinião de estudiosos | “Muitos estudiosos católicos” | CIC 110 | Sim |
| 6 | Jâmnia é hipótese discutida | Dado histórico | “muito discutida” | — | Sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. Mt 27,43 estava entre aspas, sem passar pelo Catecismo: virou paráfrase.
2. Resposta 5 falava só de gênero literário; acrescentado o princípio da inerrância (CIC 107), para não parecer que o problema se resolve apenas negando a historicidade.
3. Ortodoxos: conservam esses livros “e alguns outros” (3 Macabeus etc.), para não sugerir cânon idêntico.

### Sugestões

- O argumento das alusões (Hb 11,35; Mt 27,43 e Sb 2,18) é apresentado como eco, não como citação; adequado.
- Sobre Lutero, a frase do apêndice de 1534 é parafraseada, sem aspas.

## O que foi conferido

- `npm run biblia -- --artigo`: Rm 3,2 (*credita sunt illis eloquia Dei*), Jt 1,1 (*qui regnavit in Assyriis in Nineve*), Jo 10,22-23 (*Encaenia*), 1Mc 4,52-59, Hb 11,35, 2Mc 7, Mt 27,43, Sb 2,18, 2Mc 12,43-46.
- `npm run cic -- --artigo`: 105, 107, 109-110, 120 (nota 98: Decreto de Dâmaso, Florença DS 1334-1336, Trento DS 1501-1504).
- Código dos cânones da Igreja africana, cân. 24 (newadvent.org): Tobias, Judite, dois Macabeus.
- Santo Agostinho, *A doutrina cristã*, II, 8, 13 (newadvent.org).
- São Jerônimo, *Apologia contra Rufino*, II, 33 (newadvent.org): seguir “o juízo das Igrejas”; relatava as objeções dos judeus.
- Concílio de Florença, Decreto para os jacobitas (papalencyclicals.net): a lista com Tobias, Judite, Sabedoria, Eclesiástico, Baruc e dois Macabeus.
- Inocêncio I, *Consulenti tibi* (20/2/405), DH 213: por fontes secundárias concordes; o autor pode conferir no Denzinger impresso.

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada bloqueia

### Corrigir (todos aplicados)

1. A objeção não estava na forma mais forte: o argumento 3 passou a ser "Os Padres tinham dúvidas", com São Jerônimo, Santo Atanásio (*Carta festal* 39, conferida no newadvent: Sabedoria, Eclesiástico, Ester, Judite e Tobias "para ler", fora do cânon) e o cardeal Caetano. A resposta reconhece as hesitações e diz como foram resolvidas.
2. "Segundo cânon" explicado (discutido antes de ser reconhecido por todos, não "acrescentado depois"), e o sentido católico de "apócrifos".
3. Flávio Josefo (*Contra Apião*, I, 8: 22 livros) na objeção 1, com resposta.
4. "Que já não reconhecia" virou "que não reconhece"; "a autoridade passou à Igreja" virou "foi a Igreja que recebeu dos Apóstolos a missão de discernir a lista (CIC 120)".
5. Septuaginta: "nos manuscritos que chegaram até nós inclui esses livros" e "lida principalmente pelas primeiras comunidades de língua grega".
6. Os ecos no Novo Testamento não provam o cânon (Jd 14-15 alude a 1 Henoc): dito com honestidade.
7. *Apologia contra Rufino*, II, 33 trata de Daniel: a frase ficou limitada a isso.
8. "Entre as fontes dessa lista, o Catecismo indica" (a nota 98 cita também o Decreto de Dâmaso).

### Sugestões

- Aplicadas: "três gerações antes da Reforma"; Qumran mostra leitura, não canonicidade; 1054 "costuma-se datar", e as Igrejas copta e etíope; Leipzig (1519): Lutero negou 2 Macabeus quando o citaram a favor do purgatório.
- Não aplicadas: a nuance sobre as atas de Hipona (o texto já diz "cuja lista foi retomada"); o prefácio de Jerônimo a Judite (não conferido em fonte online).

Verificador depois das correções: 0 erros; avisos só de ortografia (nomes próprios).
