# Parecer doutrinal: A Ascensão e Pentecostes

- Artigo: content/artigos/a-ascensao-e-pentecostes.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Artigo de ensino sobre a Ascensão, no fio do CIC 659-667: os quarenta dias, a entrada da humanidade de Jesus na glória, a relação com a Encarnação, o sentido de "sentado à direita do Pai", o sacerdócio celeste; Pentecostes como a Páscoa completada (CIC 731-732, 1076), com link para "O Espírito Santo" em vez de repetir a doutrina; São Leão Magno (via CIC 1115) e São João Damasceno (via CIC 663); e as dúvidas sobre o "lugar" do céu, a ausência de Cristo e os quarenta dias em Lucas. Doutrina correta; dois pontos de precisão corrigidos.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Cristo subiu aos céus e está sentado à direita do Pai | De fé (Símbolo) | Afirmado como Credo | CIC 659-664 | Sim |
| 2 | A Ascensão é acontecimento histórico e transcendente | Doutrina certa | Com as palavras do CIC | CIC 660 | Sim |
| 3 | Subiu com a humanidade glorificada; abriu-nos o acesso ao Pai | Doutrina certa | Afirmado | CIC 661, 665-666 | Sim |
| 4 | "Direita do Pai" = glória e honra da divindade, não lugar | Doutrina comum (Damasceno via CIC) | Afirmado | CIC 663 | Sim |
| 5 | Cristo intercede no céu como sacerdote e envia o Espírito | Doutrina certa | Afirmado | CIC 662, 667 | Sim |
| 6 | Pentecostes completa a Páscoa; revelação plena da Trindade; tempo da Igreja | Doutrina certa | Afirmado | CIC 731-732, 1076 | Sim |
| 7 | O céu não é um espaço, mas um modo de ser | Ensino do CIC | Com o CIC 2794 e 326 | CIC 326, 2794 | Sim |
| 8 | Cristo presente pelos sacramentos, a Palavra e a Igreja; na Eucaristia, com corpo e sangue | De fé quanto à Eucaristia | Afirmado | CIC 1076, 1115 | Sim |
| 9 | Lc 24 e At 1 do mesmo autor, um breve e outro detalhado | Exegese comum | Apresentado como explicação, sem definição | At 1,3 | Sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. **"Voltaram tristes do monte"** atribuído a Lc 24,52: Lucas, no Evangelho, fala de Betânia; o monte das Oliveiras vem de At 1,12. Tirado "do monte".
2. **Data de São Leão** ("por volta de 445"): a data exata do Sermão 74 não foi conferida; trocada por "papa de 440 a 461".

### Sugestões

- A festa da Ascensão no Brasil é transferida para o domingo seguinte (7º domingo da Páscoa), por decisão da CNBB; mantido entre parênteses como informação prática.
- A volta de Cristo e o juízo aparecem só numa frase; o tema está em "A volta de Cristo" (Vida eterna).

## O que foi conferido

- `npm run biblia -- --artigo`: as 16 referências, com a frase ao lado; ajuste no item 1.
- `npm run cic -- --artigo`: 326, 659-668, 731-732, 1076, 1115, 2794, com as notas (599: Prefácio da Ascensão I; 601: Damasceno, *Expositio fidei* 75 = *De fide orthodoxa* 4,2; nota 28 do 1115: Leão Magno, *Sermão* 74,2).
- São Leão Magno, *Sermão 74*, 2, em newadvent.org: "that which till then was visible of our Redeemer was changed into a sacramental presence".
- Fica para o autor, opcional: a redação da CNBB impressa em "é melhor para vós que eu vá" e "eu estou convosco todos os dias".

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada que bloqueie.

### Corrigir (todos aplicados)
1. **"Para onde Jesus foi?"**: o CIC 2794 fala do céu de Deus, não do corpo de Cristo; aplicado sem cuidado, sugeria que a Ascensão é só imagem. Agora "o céu de Deus" e uma frase sobre o corpo verdadeiro e glorioso, não preso ao espaço e ao tempo (CIC 645, conferido; 659, 665).
2. **CIC 326**: "sobretudo… a sua glória" não está no texto; agora "mas também o 'lugar' próprio de Deus".
3. **Modos de presença**: a lista não estava em CIC 1076/1115; agora com CIC 1088 (SC 7, conferido) e a Eucaristia como presença única, "verdadeira, real e substancial" (CIC 1374).
4. **Juízo**: CIC 665 só diz "de onde há de voltar"; acrescentado CIC 682 (conferido) e link para "A volta de Cristo".
5. **Dn 7,14**: o Filho do Homem está no v. 13; referência agora Dn 7,13-14.

### Sugestões
1. "Sobre os Apóstolos" virou "sobre os discípulos reunidos com Maria" (At 1,14; 2,1). Aplicado.
2. "Os anjos" virou "os dois homens de branco, mensageiros de Deus". Aplicado.
3. Mc 16,19 acrescentado (conferido na Nova Vulgata). Aplicado.
4. Link para "A volta de Cristo". Aplicado (item 4).
5. São João Damasceno nas referências, com data (c. 743) e o título *Exposição da fé ortodoxa*. Aplicado.
6. "Em outras palavras:" antes da aplicação do texto de São Leão. Aplicado.

Depois das correções: `npm run verificar -- --links --ortografia` com 0 erros; avisos de estilo lidos.
