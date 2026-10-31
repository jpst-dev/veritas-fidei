# Parecer doutrinal: Quem é Deus

- Artigo: content/artigos/quem-e-deus.md (versão do commit 5b8df24)
- Data: 2026-10-30
- Voto: **favorável com correções**
- Natureza: revisão interna (não é *nihil obstat* nem *imprimatur*)

## Resumo

O artigo expõe a doutrina sobre Deus seguindo o Catecismo (198-231, 268-274,
300-312): a unicidade, o nome revelado a Moisés, Deus como verdade e amor, a
onipotência, a onipresença e a Providência. A doutrina está correta e bem
dosada para o nível iniciante. Há uma afirmação factual errada (sobre as
Bíblias católicas e o nome YHWH), uma paráfrase do CIC 271 que acrescenta o
que o texto não diz e uma formulação imprecisa da onipotência.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Há um só Deus, imenso, imutável, incompreensível, todo-poderoso, inefável | dogma (Latrão IV, DH 800) | dogma | CIC 202 | sim |
| 2 | O ser de Deus é verdade e amor | doutrina | doutrina | CIC 214-221, 231 | sim |
| 3 | “Se Deus não for único, não é Deus” | argumento patrístico | citação | CIC 228 (Tertuliano, *Adv. Marc.* I,3,5, conferido na nota) | sim |
| 4 | Só Deus é por si mesmo; as criaturas recebem o ser | doutrina | doutrina | CIC 213 | sim |
| 5 | Deus é eterno e imutável | dogma (Latrão IV; Vaticano I, DH 3001) | doutrina | CIC 212 | sim |
| 6 | As Bíblias católicas e a liturgia dizem “o Senhor” | fato | fato | — | **corrigir** |
| 7 | Deus é amor por essência; revela-se Trindade | doutrina | doutrina | CIC 221 | sim |
| 8 | Em Deus poder, sabedoria, justiça e **bondade** são uma coisa só | doutrina | paráfrase | CIC 271 (não nomeia a bondade) | **corrigir** |
| 9 | “Ele pode tudo o que é bom” | — | definição de onipotência | CIC 268-271 | **corrigir** |
| 10 | Deus está presente no íntimo de cada criatura | doutrina | doutrina | CIC 300 | sim |
| 11 | Deus conhece tudo; Providência | dogma (Vaticano I, DH 3003) | doutrina | CIC 302 | sim |
| 12 | Deus não é causa do mal moral; permite-o e tira dele o bem | doutrina | doutrina | CIC 311-312, 324 | sim |
| 13 | Os “arrependimentos” de Deus são modo humano de falar | sentença comum | explicação | CIC 42-43, 212 | sim (sugestão 4) |
| 14 | Deus não é homem nem mulher | doutrina | doutrina | CIC 239, 370 | sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar

1. **O nome YHWH nas Bíblias.** “As Bíblias católicas e a liturgia dizem ‘o
   Senhor’” não é exato: há Bíblias católicas que transcrevem o nome (a Bíblia
   de Jerusalém, por exemplo). O que vale para todos é a prática da liturgia,
   que segue o costume de Israel (CIC 209). Corrigir para: “Por isso, na
   liturgia, a Igreja diz ‘o Senhor’ e não pronuncia o nome”.
2. **CIC 271.** O Catecismo diz que em Deus “o poder e a essência, a vontade
   e a inteligência, a sabedoria e a justiça” são uma só coisa; não fala de
   bondade nesse lugar. Ajustar a paráfrase.
3. **Onipotência.** “Ele pode tudo o que é bom” sugere uma onipotência
   limitada pelo bem, como se houvesse coisas possíveis que Deus não pode. O
   ponto do CIC 271 é que o poder de Deus nunca é arbitrário porque está unido
   à sua sabedoria e justiça. Reformular nesses termos.

### Sugestões

4. **Referências do “arrependimento”.** Dar as passagens: Gn 6,6 (*paenituit
   Dominum*) e Jn 3,10 (Deus desiste do castigo anunciado). Conferidas na Nova
   Vulgata.
5. **Tertuliano.** O artigo o chama de “autor cristão antigo”, o que é
   correto (não é Padre da Igreja no sentido estrito). Manter.

## O que foi conferido

- Catecismo, texto oficial do vatican.va: 198-231, 239, 268-273, 300-303,
  309-312, 324, 370; e as notas 6 (Latrão IV, DS 800) e 31 (Tertuliano) do
  capítulo 1 da segunda seção.
- `npm run biblia -- --artigo`: Dt 6,4; Is 45,22; Mc 12,29-30; Ex 3,12.14;
  Is 45,15; Sl 102,27-28; Tg 1,17; Ex 34,6; 1Jo 1,5; Is 49,15; Jo 3,16;
  1Jo 4,8.16; Lc 1,37; At 17,28; Sl 139,7-10; Hb 4,13. Todos dizem o que o
  artigo afirma. Gn 6,6 e Jn 3,10 conferidos para a sugestão 4.
- `npm run verificar -- --links --ortografia`: 0 erros; avisos de estilo do
  LanguageTool sem problema real (“Latrão”, “YHWH”, “mal moral”).
- Para o autor, se quiser, na CNBB impressa: “Deus é amor” (1Jo 4,8.16) e
  “Eu sou Aquele que sou” (Ex 3,14), ambos citados pelo Catecismo.

## Correções aplicadas (30/10/2026)

Correções 1 a 3 e sugestão 4 incorporadas.
