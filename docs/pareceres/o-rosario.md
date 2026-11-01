# Parecer doutrinal: O Rosário

- Artigo: content/artigos/o-rosario.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Artigo de ensino sobre o Rosário, apoiado na *Rosarium Virginis Mariae*: o caráter mariano na forma e cristológico no centro (CIC 971), o método de cada dezena (RVM 29-35), o terço como instrumento, a Ave-Maria (CIC 2676-2677), os vinte mistérios com as passagens bíblicas, a distribuição na semana (RVM 38), a história (tradição dominicana, Lepanto, Leão XIII, mistérios luminosos) e as dúvidas. A objeção da repetição fica com link para a questão já publicada. Doutrina correta; pontos históricos ajustados para não afirmar mais do que as fontes.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | O Rosário é resumo do Evangelho, oração cristológica | Magistério ordinário (Paulo VI, João Paulo II) | Afirmado com as fontes | CIC 971; RVM 1 | Sim |
| 2 | O rosário é forma de meditação dos mistérios de Cristo | Ensino do CIC | Afirmado | CIC 2708 | Sim |
| 3 | Assunção e realeza de Maria | Dogma (Assunção); doutrina certa (realeza) | Afirmado, com link | CIC 966 | Sim |
| 4 | Maria é transparência de Cristo; pedimos que reze por nós | Doutrina certa | Afirmado | CIC 2674, 2677 | Sim |
| 5 | O Rosário é devoção recomendada, não preceito; indulgências | Disciplina da Igreja | Afirmado com o peso certo | RVM 37 | Sim |
| 6 | Origem dominicana | Tradição piedosa, historicamente discutida | Apresentada como tradição | Leão XIII; RVM 17 | Sim, após correção 1 |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. **História do saltério**: a primeira versão dizia que monges rezavam 150 salmos e iletrados 150 Pais-Nossos, sem fonte aberta. Reescrito só com o que RVM 19 e CIC 2678 dizem (o número 150 como os Salmos; substituto popular da Liturgia das Horas).
2. **Lepanto**: Leão XIII diz que São Pio V instituiu a festa de Nossa Senhora das Vitórias, que Gregório XIII dedicou ao Rosário; o texto atribuía a São Pio V a festa "do Rosário". Corrigido, e "pediu que se rezasse o Rosário" virou "chamou a cristandade à oração, e multidões rezaram o Rosário".
3. **"Uma série de encíclicas" de Leão XIII**: trocado por "muitos outros documentos", que é o que diz RVM 2.
4. **Assunção**: o texto apoiava a realeza de Maria em Ap 12,1 sem a nuance exegética; trocado pelo CIC 966 e link para "A Assunção de Maria".
5. **Repetição no Getsêmani** sem referência: acrescentado Mt 26,44.

### Sugestões

- O texto das orações (Ave-Maria) é o da oração em uso no Brasil, expressão consagrada.
- Fátima e as aparições ficaram de fora de propósito: são revelações privadas, tratadas no tema Maria.

## O que foi conferido

- `npm run biblia -- --artigo`: Lc 1,28.42; as passagens dos vinte mistérios (início de cada uma conferido); Lc 2,19.51; At 1,14; Jo 2,5; Mt 26,44.
- `npm run cic -- --artigo`: 966, 971, 2674, 2676-2678, 2708.
- *Rosarium Virginis Mariae* (texto português no vatican.va): 1, 2, 3, 17, 19-23, 26, 29-38, 40-41.
- Leão XIII, *Supremi apostolatus officio* (vatican.va, inglês): São Domingos, São Pio V, Equínades (Lepanto), Gregório XIII, outubro.

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada que bloqueie.

### Corrigir (todos aplicados)
1. **"Resumo de todo o Evangelho"**: a expressão é de Pio XII (*Philippinas Insulas*, 1946), retomada por Paulo VI (*Marialis cultus* 42, nota 69, conferida no vatican.va). Agora "Pio XII o chamou…; São Paulo VI retomou a expressão, e o Catecismo também".
2. **Ave-Maria entre aspas atribuída a Lc 1,28.42**: "o Senhor é convosco" e "sois vós" são da oração, não de uma tradução bíblica. Agora "retoma a saudação… na forma em que a Igreja as reza", com o texto da oração; o verificador pegou a primeira tentativa, que atribuía a citação ao CIC 2676, e a referência foi separada.
3. **Início e fim do terço**: RVM 37 não traz "um Pai-Nosso e três Ave-Marias". Reescrito: Creio (no Brasil, também Pai-Nosso e três Ave-Marias) ou "Vinde, ó Deus, em meu auxílio"; no fim, intenções do Papa e Salve-Rainha.
4. **Vinte mistérios**: RVM 19 deixa os luminosos à livre escolha; dito no texto e no resumo.
5. **"Não cobrem tudo"**: vem de RVM 24, agora citado junto com o 29.
6. **Outubro de 1883**: Leão XIII dedicou o outubro daquele ano; o costume veio depois. Corrigido.

### Sugestões
- "Mistério" explicado (acontecimento da vida de Cristo em que se revela a obra de Deus, CIC 512-515, conferido). Aplicado.
- Assunção e realeza "ensinadas pela Igreja", sem pôr as duas no mesmo grau. Aplicado.
- "Multidões" → "os fiéis". Aplicado.
- "Como pedimos a uma mãe ou a um irmão na fé" (CIC 2677). Aplicado.
- Caná: Jo 2,1-11. Aplicado.
- Link para "A meditação da Palavra". Aplicado.
- "No Brasil e em Portugal" para o nome "terço". Aplicado.
- Costume da cláusula depois do nome de Jesus: mantido como ilustração.

Depois das correções: `npm run verificar -- --links` com 0 erros; cerca de 1.900 palavras.
