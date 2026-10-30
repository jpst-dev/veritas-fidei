# Parecer doutrinal: A Assunção de Maria

- Artigo: content/artigos/assuncao-de-maria.md (versão do commit 952fa13)
- Data: 2026-10-30
- Voto: **favorável com correções**
- Natureza: revisão interna (não é *nihil obstat* nem *imprimatur*)

## Resumo

O artigo apresenta a definição de Pio XII pelos termos da própria bula
(*Munificentissimus Deus*, 44) e pelo CIC 966, distingue Assunção de
Ascensão e trata com o peso certo a questão livre da morte de Maria. Reconhece
que a Escritura não narra o fato e apresenta os textos bíblicos como
argumentos de conveniência, não como provas. Há uma frase que exagera o que a
bula diz, uma datação litúrgica imprecisa e uma paráfrase patrística que pode
ser trocada pela citação literal.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Maria foi assunta em corpo e alma à glória celeste, ao fim da vida terrena | dogma (DH 3903) | dogma | MD 44; CIC 966 | sim |
| 2 | A definição não decide se Maria morreu | dado da definição | questão livre | MD 44 | sim |
| 3 | A Tradição da Dormição sustenta que morreu; JPII a considerou mais conforme | sentença comum | opinião, questão livre | MD 14; audiência de 25/6/1997 | sim |
| 4 | Pio XII diz que os fiéis “sempre admitiram” que Maria morreu | histórico | **mais forte que a fonte** | MD 14 | **corrigir** |
| 5 | Assunção é participação na ressurreição de Cristo e antecipação da nossa | magistério | doutrina | CIC 966, 974 | sim |
| 6 | Maria foi levada (passiva); Cristo subiu por seu poder | sentença comum | doutrina | — | sim |
| 7 | A Escritura não narra a Assunção; o dogma vem da Escritura lida na Tradição | magistério | doutrina | CIC 80-82; MD | sim |
| 8 | 1Cor 15, Sl 132, Ap 11-12 e Gn 3,15 como argumentos de conveniência | argumento | argumento | MD 26, 39 | sim |
| 9 | Ap 12 fala antes de tudo do povo de Deus | exegese comum | sentença | — | sim |
| 10 | Apócrifos do “trânsito” não são fonte do dogma | sentença comum | sentença | — | sim |
| 11 | Festa “em Jerusalém e no Oriente por volta do século VI” | histórico | fato | MD 17-19 | **precisar** |
| 12 | Damasceno: o corpo que trouxe o Autor da vida não podia conhecer a corrupção | paráfrase | paráfrase sem passagem | MD 21 | **corrigir: citar a passagem** |
| 13 | Consulta aos bispos em 1946, resposta quase unânime | histórico | histórico | MD 11-12 | sim |
| 14 | Definição com a infalibilidade descrita pelo Vaticano I | doutrina | doutrina | MD 12 | sim |
| 15 | Maria glorificada é sinal de esperança para a Igreja peregrina | magistério | doutrina | CIC 972 (LG 68) | sim |

## Problemas

### Bloqueiam a publicação

Nenhum. (O verificador acusou um erro na primeira redação: a citação do CIC
966 corrigia uma gralha do texto oficial, “não abandonaste a mundo”. O trecho
foi reformulado antes do commit 952fa13 e passa sem erro.)

### Corrigir antes de publicar

1. **“Os fiéis sempre admitiram que Maria morreu.”** O MD 14 diz que os fiéis
   “não tiveram dificuldade em admitir” que ela morreu. “Sempre” acrescenta um
   peso que a bula não dá. Sugestão: “Na própria bula, ele lembra que os fiéis
   não tiveram dificuldade em admitir que Maria morreu, à semelhança do seu
   Filho (MD 14)”.
2. **Datação da festa.** Em Jerusalém, uma festa da Mãe de Deus em 15 de
   agosto já existia no século V; a extensão a todo o Império, como Dormição,
   é atribuída ao imperador Maurício, por volta de 600; Roma a celebra no
   século VII (São Sérgio I, MD 19). Sugestão: “já celebrada em Jerusalém no
   século V, estendida a todo o Oriente por volta do ano 600 e celebrada em
   Roma no século VII”.
3. **São João Damasceno.** Trocar a paráfrase pela frase que Pio XII cita:
   “Convinha que aquela que no parto manteve ilibada virgindade conservasse o
   corpo incorrupto mesmo depois da morte” (*Homilia II sobre a Dormição*, 14;
   MD 21), e completar a referência no frontmatter com a passagem.

### Sugestões

4. **Festa no Brasil.** “Transferida para o domingo seguinte” vale quando 15
   de agosto não cai em domingo. Precisar.
5. **Lumen Gentium.** O frontmatter lista LG 59 e 68, que o texto só usa via
   CIC 966 e 972. Indicar na citação (“LG 59, citada em CIC 966”) ou deixar
   só o Catecismo.
6. **Sl 132,8.** A bula cita o Salmo pela numeração da Vulgata (131). O artigo
   usa a numeração da CNBB, o que está certo; nada a mudar, só conferir em
   papel.

## O que foi conferido

- Catecismo, texto oficial do vatican.va: 80-82, 966, 972, 974, 975; as
  citações literais batem.
- *Munificentissimus Deus*, texto português no vatican.va: n. 5, 11-12, 14,
  17-19, 21 (com a nota 12: Damasceno, *Hom.* II, 14), 44.
- `npm run verificar -- --links --ortografia`: 0 erros; avisos só de estilo.
- Para o autor conferir em papel, na Bíblia da CNBB: 1Cor 15,20-23;
  Ap 11,19-12,1; Sl 132,8; Gn 3,15.
