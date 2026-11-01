# Parecer doutrinal: Jesus existiu mesmo?

- Artigo: content/artigos/jesus-existiu.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Questão da Defesa da fé sobre a existência histórica de Jesus. Apresenta o "mitismo" na sua forma mais forte (sem fontes da época, fontes interessadas, fontes não cristãs fracas, paralelos pagãos) e responde com Josefo, Tácito e Plínio, com São Paulo (Gl 1; 1Cor 15), com o quadro histórico de Lc 3 e a inscrição de Pilatos, e com o consenso dos historiadores, inclusive não crentes (Ehrman). Distingue bem o fato histórico (existência, crucifixão sob Pilatos) do que é objeto de fé (a filiação divina). A confiabilidade dos Evangelhos fica para o artigo próprio de Bíblia e Tradição. Doutrina correta; pontos de precisão corrigidos.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Jesus de Nazaré, crucificado sob Pilatos, é o Filho de Deus feito homem | De fé (Símbolo) | Afirmado | CIC 423 | Sim |
| 2 | A Igreja afirma a historicidade dos Evangelhos | Magistério (DV 19) | Com o CIC 126, literal | CIC 126 | Sim, após correção 1 |
| 3 | A existência de Jesus é questão histórica; a filiação divina, objeto de fé | Doutrina comum (distinção fé/razão) | Afirmado | CIC 423; coerente com CIC 156-159 | Sim |
| 4 | Tiago, "irmão do Senhor", é parente próximo | Doutrina da Igreja (virgindade perpétua) | Com o CIC 500 | CIC 500 | Sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. **CIC 126 entre aspas**: o texto do Catecismo diz "sem hesitações"; o artigo trazia "sem hesitação". Corrigido para a forma literal.
2. **Gl 1,18**: "poucos anos depois" ficava vago; o texto diz *post annos tres*. Agora "três anos depois".
3. **Negação de Pedro sem referência**: acrescentado Mc 14,66-72.
4. **Pilatos com "uma única inscrição"**: há outras notícias (Josefo, Fílon); reescrito como "algumas páginas de Josefo e de Fílon de Alexandria, e a pedra encontrada em Cesareia".
5. **Tiago, "irmão do Senhor"**: sem explicação, o leitor poderia tomar por irmão de sangue; acrescentado "parente próximo", com o CIC 500.

### Sugestões

- Suetônio (*Cláudio* 25, *impulsore Chresto*) ficou de fora de propósito: a identificação de "Chrestus" com Cristo é discutida, e citar uma fonte incerta enfraqueceria o argumento.
- As frases curtas entre aspas de Josefo, Tácito e Plínio são traduções nossas do latim (Tácito, Plínio) e do inglês de Whiston (Josefo); não há tradução brasileira publicada consultada. Manter curtas.
- O link de referência para o livro de Ehrman foi retirado (o site da editora recusa o verificador, 403); a obra fica citada por título e ano.

## O que foi conferido

- `npm run biblia -- --artigo`: Gl 1,18-19; 1Cor 15,3-8; Lc 3,1-2; 1Cor 1,23; Jo 7,5; Mc 14,66-72.
- `npm run cic -- --artigo`: 126, 423, 500.
- Tácito, *Anais* XV,44 (*auctor nominis eius Christus Tiberio imperitante per procuratorem Pontium Pilatum supplicio adfectus erat*; *exitiabilis superstitio*), e Plínio, *Cartas* X,96 (*carmenque Christo quasi deo dicere*), em thelatinlibrary.com.
- Suetônio, *Cláudio* 25 (thelatinlibrary.com), lido e deixado de fora (sugestão acima).
- Josefo, *Antiguidades* XVIII,3,3 (63-64) e XX,9,1 (200), na tradução de Whiston (Project Gutenberg).
- Fica para o autor, opcional: nenhum versículo entre aspas além de "o irmão do Senhor" (Gl 1,19), expressão curta.

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada que bloqueie.

### Corrigir (todos aplicados)
1. **"Nenhum adversário antigo negou que Jesus existiu"** era absoluto; Trifão (Justino, *Diálogo* 8) é citado pelos negacionistas. Agora "nas fontes que chegaram até nós", com uma frase sobre Trifão, que nega o messianismo, não a existência (newadvent.org/fathers/01281.htm).
2. **Plínio** não fala da pessoa de Jesus; agora atesta o culto a Cristo e a difusão das comunidades, e o resumo distingue Josefo e Tácito (Jesus) de Plínio (o culto).
3. **Alexandre**: temos moedas e inscrições dele; a comparação foi refeita ("a principal narrativa da vida"), com João Batista como exemplo de pregador sem vestígio material, e a lista de fontes sobre Pilatos completada (Tácito, Evangelhos).
4. **Objeção 4**: faltava resposta ao nascimento virginal; acrescentado com o CIC 498 (conferido); "ninguém de fora" reescrito.
5. **Testimonium de Josefo**: a ressalva das interpolações agora vem já na primeira menção.
6. **Quaestio**: "fundador do seu nome" ambíguo; agora "aquele de quem eles tiravam o nome".

### Sugestões
- "O maior historiador romano" → "um dos maiores". Aplicado.
- Prefeito × procurador explicado numa oração. Aplicado.
- Anano identificado (filho do Anás dos Evangelhos). Aplicado.
- Lc 3: "o começo da missão de Jesus", com Lc 3,21-23 (conferido). Aplicado.
- Tácito "aceito pela grande maioria". Aplicado.
- Plínio citado para o incenso (*ture ac vino supplicarent*). Aplicado.
- Segundo historiador não crente (Vermes, Sanders): não aplicado, porque não abri as obras; fica só Ehrman, conferido como tese central do livro.

Depois das correções: `npm run verificar -- --links --ortografia` com 0 erros; cerca de 1.640 palavras de corpo.
