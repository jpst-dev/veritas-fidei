# Parecer doutrinal: Jesus é Deus?

- Artigo: content/artigos/jesus-e-deus.md (versão do commit 3d3d144)
- Data: 2026-10-30
- Voto: **favorável com correções**
- Natureza: revisão interna (não é *nihil obstat* nem *imprimatur*)

## Resumo

O artigo defende a divindade de Cristo em quatro passos: o que Jesus fez, o
que disse de si, o que os Apóstolos confessaram e o culto dos primeiros
cristãos. Responde às passagens usadas contra a doutrina com o critério das
duas naturezas (CIC 464-474) e o Símbolo *Quicumque*. A doutrina está correta
e o tom com os não católicos é caridoso. As correções tiram uma generalização
falsa (ninguém morre por se dizer profeta), precisam uma leitura exegética
apresentada como evidente (Jo 8,58) e ajustam a descrição de Plínio.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Jesus é verdadeiro Deus e verdadeiro homem | dogma (Niceia, Calcedônia) | dogma | CIC 464, 467 | sim |
| 2 | O Filho é gerado, não criado, consubstancial ao Pai | dogma (Niceia, DH 125) | dogma | CIC 465 | sim |
| 3 | Crer que Jesus é Filho de Deus é necessário para ser cristão | doutrina | doutrina | CIC 454 | sim |
| 4 | O perdão dos pecados revela a divindade de Jesus | doutrina | argumento | CIC 589, 594 | sim |
| 5 | Em Jo 8,58 Jesus usa o nome de Ex 3,14 | leitura exegética comum | apresentada como fato | CIC 590 (cita sem explicar) | **precisar** |
| 6 | Jesus foi condenado por se fazer igual a Deus | doutrina | doutrina | CIC 594; Mc 14,64 | sim (correção 1) |
| 7 | *Kyrios* traduz YHWH; aplicado a Jesus, confessa-o Deus | doutrina | doutrina | CIC 446 | sim |
| 8 | Igual ao Pai segundo a divindade, menor segundo a humanidade | doutrina (Símbolo *Quicumque*) | doutrina | DH 76 | sim |
| 9 | O conhecimento humano de Jesus era verdadeiro e limitado; unido ao Verbo, conhecia os desígnios que veio revelar | doutrina | doutrina | CIC 472-474 | sim |
| 10 | Mc 10,18 não nega a bondade de Jesus | sentença comum (Ambrósio, Tomás) | explicação | — | sim |
| 11 | “Primogênito” indica primazia | sentença comum | explicação | Cl 1,16-18 | sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar

1. **“Ninguém é condenado à morte por se dizer profeta.”** É falso, e o
   próprio Jesus o lembra: Jerusalém mata os profetas (Mt 23,37). O argumento
   correto é que a acusação foi de blasfêmia (Mc 14,64). Corrigir para: “O
   sumo sacerdote não o condenou por se dizer profeta, mas por blasfêmia:
   os seus juízes entenderam que ele se fazia igual a Deus”.
2. **Jo 8,58.** “Usou o nome com que Deus se revelou a Moisés” apresenta como
   evidente uma leitura que é comum, mas é leitura. Corrigir para “evocou o
   nome” e explicar o contraste (“antes que Abraão existisse”, e não “eu
   era”). Dar a referência da reação (Jo 8,59).
3. **Plínio.** *Carmen … dicere secum invicem* é recitar ou cantar em
   alternância um hino ou fórmula. Corrigir para “cantavam, em alternância,
   um hino a Cristo, como a um deus”.

### Sugestões

4. **Tt 2,13.** A frase entre aspas vem da Escritura e não do Catecismo; vai
   para a lista opcional da CNBB.

## O que foi conferido

- Catecismo, texto oficial do vatican.va: 441-450, 454, 464-474, 589-590,
  594. As citações literais (CIC 454, 464) passaram no verificador.
- `npm run biblia -- --artigo`: as 25 referências do corpo e da *quaestio*;
  todas dizem o que o artigo afirma. Jo 8,59 conferido para a correção 2.
- Inácio de Antioquia, *Ef* 18,2 (newadvent.org): “our God, Jesus Christ, was
  … conceived in the womb by Mary”. Plínio, *Ep.* X,96,7 (thelatinlibrary.com):
  “carmenque Christo quasi deo dicere secum invicem”.
- `npm run verificar -- --links --ortografia`: 0 erros depois de corrigir a
  URL do Catecismo (era `p1s2c2`, o certo é `p1s2cap2`).
- Para o autor, se quiser, na CNBB impressa: “Meu Senhor e meu Deus”
  (Jo 20,28), “de condição divina” (Fl 2,6), “nosso grande Deus e Salvador,
  Jesus Cristo” (Tt 2,13).

## Correções aplicadas (30/10/2026)

Correções 1 a 3 e sugestão 4 incorporadas.

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01 (revisão das Defesas publicadas antes deste passo existir)
- Juízo: reparos menores; nada bloqueia

### Corrigir (todos aplicados)

1. Pai-nosso: Jesus ensina os discípulos a rezar assim (Mt 6,9; CIC 443).
2. Ordem das respostas igual à da objeção: “Jesus rezava ao Pai” passou a ser a primeira; a leitura “um deus” de Jo 1,1 entrou na objeção.
3. Corte marcado na citação de Inácio (Efésios 18,2).
4. O argumento da adoração ligado à herança judaica e a Fl 2,10-11.
5. CIC 474 com a precisão: o conhecimento humano de Cristo, unido à Sabedoria divina na pessoa do Verbo.
6. A cura do paralítico com Mc 2,10-12.
7. CIC 589: “torna presente e revela o nome de Deus”.
8. Jo 1,3 com referência; o artigo grego de Jo 20,28 explicado.
9. “Nossos irmãos” tirado das Testemunhas de Jeová.

### Sugestões

- Aplicadas: CIC 590; Ex 3,14; parágrafo de uma frase fundido; Jo 20,29; Ex 4,22; Jo 17,3 na objeção, com resposta; Suma retirada das referências por não ser usada.
