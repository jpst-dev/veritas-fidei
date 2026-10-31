# Parecer doutrinal: O Magistério e a infalibilidade

- Artigo: content/artigos/o-magisterio.md (versão do commit 5d68942)
- Data: 2026-10-31
- Voto: **favorável com correções**
- Natureza: revisão interna (não é *nihil obstat* nem *imprimatur*)

## Resumo

O artigo explica o Magistério (CIC 85-95), os graus do ensino (CIC 88,
892, 2035), a infalibilidade da Igreja nas suas três formas (CIC 889-892;
LG 25) e as condições da definição *ex cathedra* (*Pastor aeternus*, cap.
4), e diz o que a infalibilidade não é. Responde às objeções sobre a base
bíblica, o caso de Honório e a leitura pessoal da Bíblia. A doutrina está
correta e as distinções de grau estão bem feitas. As correções dão fonte a
dois fatos históricos e ajustam uma comparação que poderia pôr o Magistério
acima da Palavra.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | A interpretação autêntica cabe ao Magistério vivo | magistério (DV 10) | doutrina | CIC 85 | sim |
| 2 | O Magistério serve a Palavra, não está acima dela | magistério (DV 10) | doutrina | CIC 86 | sim |
| 3 | Dogmas exigem adesão de fé irrevogável | doutrina | doutrina | CIC 88 | sim |
| 4 | Magistério ordinário pede assentimento religioso | magistério (LG 25) | doutrina | CIC 892 | sim |
| 5 | O povo de Deus, em consenso universal, não erra na fé | magistério (LG 12) | doutrina | CIC 92 | sim |
| 6 | O colégio com o papa é infalível ao ensinar definitivamente | dogma (LG 25; Vaticano I) | doutrina | CIC 891 | sim |
| 7 | O papa é infalível *ex cathedra* | dogma (Vaticano I, DH 3074) | doutrina | *Pastor aeternus* 4 | sim |
| 8 | Não há nova revelação pelo papa | dogma (Vaticano I, DH 3070) | doutrina | *Pastor aeternus* 4 | sim |

## Problemas

### Bloqueiam a publicação

Nenhum (a verificação mecânica acusou 7 seções; corrigido antes do commit).

### Corrigir antes de publicar

1. **Honório.** O caso está correto, mas sem fonte. A definição de fé do III
   Concílio de Constantinopla nomeia Honório entre os que favoreceram o
   erro (conferido em papalencyclicals.net). Citar o concílio e incluí-lo
   nas referências.
2. **Imaculada Conceição e Assunção.** Nomear os documentos das definições
   (*Ineffabilis Deus*, 1854; *Munificentissimus Deus*, 1950), para o leitor
   poder conferir.
3. **A comparação com um tribunal constitucional.** Sem ressalva, sugere um
   intérprete acima do texto, o contrário do CIC 86 citado no próprio
   artigo. Acrescentar que esse tribunal não está acima da Constituição, mas
   a serviço dela.

### Sugestões

Nenhuma.

## O que foi conferido

- Catecismo, texto oficial do vatican.va: 85-88, 92, 95, 888-892, 2033-2035.
  A citação literal (CIC 85) passou no verificador.
- Concílio Vaticano I, *Pastor aeternus*, cap. 4 (condições da definição e
  “not so that they might, by his revelation, make known some new
  doctrine”), em papalencyclicals.net.
- III Concílio de Constantinopla (681), definição de fé, em
  papalencyclicals.net: Honório aparece entre os que semearam o erro.
- `npm run biblia -- --artigo`: Lc 10,16; Mt 28,20; Jo 14,26; 16,13;
  1Tm 3,15; At 15,28; Mt 16,18; Lc 22,32. Todos dizem o que o artigo afirma.
- `npm run verificar -- --links --ortografia`: 0 erros depois de unir a
  seção “O que a infalibilidade não é” à anterior.
- CNBB impressa, opcional: “pareceu bem ao Espírito Santo e a nós”
  (At 15,28).

## Correções aplicadas (31/10/2026)

Correções 1 a 3 incorporadas.
