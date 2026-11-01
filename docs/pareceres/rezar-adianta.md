# Parecer doutrinal: Rezar adianta, se Deus já sabe tudo?

- Artigo: content/artigos/rezar-adianta.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Questão da Defesa da fé sobre a oração de petição diante da onisciência, da imutabilidade e da bondade de Deus, e da experiência das orações não atendidas. Responde com Mt 6,8-9, com Santo Tomás (II-II, q. 83, a. 2) e São Gregório (*Diálogos* I, 8), com a doutrina das causas segundas (CIC 306-307), com Santo Agostinho (*Carta 130*, via CIC 2737) e com o CIC 2734-2741. Aprofunda a dúvida curta de "O que é rezar" sem repeti-la. Doutrina correta.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Deus é imutável e onisciente | De fé | Pressuposto, não negado | Tg 1,17; Nm 23,19 | Sim |
| 2 | Deus age por causas segundas e dá às criaturas a dignidade de cooperar | Doutrina certa | Afirmado | CIC 306-308 | Sim |
| 3 | A oração obtém o que Deus dispôs dar por meio dela | Sentença comum (Tomás, Gregório) | Atribuída aos autores | ST II-II 83,2 | Sim |
| 4 | A oração é cooperação com a providência; transforma quem reza | Ensino do CIC | Afirmado | CIC 2738-2739 | Sim |
| 5 | Os "arrependimentos" de Deus na Bíblia são linguagem humana | Doutrina comum | Afirmado, sem exagero | Ex 32; Gn 18; Nm 23,19 | Sim |
| 6 | O pedido de Cristo foi atendido na ressurreição; Deus dá o Espírito | Ensino do CIC | Afirmado | CIC 2741; Hb 5,7; Lc 11,13 | Sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. **Santo Tomás entre aspas**: a frase era tradução nossa de uma tradução inglesa; passou a paráfrase, sem aspas.
2. **"A vida, o sol, a chuva"** sem referência: acrescentado Mt 5,45.
3. **Nm 23,19**: "volta atrás" ficou "muda de ideia", mais perto de *ut mutetur*.

### Sugestões

- O exemplo do agricultor é do autor, apresentado como analogia ("Um exemplo ajuda").
- A citação literal do CIC 2736 omite só a chamada de nota.

## O que foi conferido

- `npm run biblia -- --artigo`: as 20 referências, com a frase ao lado.
- `npm run cic -- --artigo`: 306, 307, 2629, 2735-2739, 2741.
- Santo Tomás, *Suma Teológica* II-II, q. 83, a. 2 (corpo e respostas 1-3), em newadvent.org.
- São Gregório Magno, *Diálogos* I, 8, na tradução inglesa de 1608 (tertullian.org).
- Santo Agostinho, *Carta 130*, 8, 17 (via CIC 2737, nota 26) e 9, 18, em newadvent.org.

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada que bloqueie.

### Corrigir (todos aplicados)
1. **Objeção 4 ("só psicológico") sem resposta completa**: acrescentado que a transformação é obra do Espírito (CIC 2739; Rm 8,26), não autossugestão, e que a oração também obtém o que Deus dispôs dar por ela (Tg 5,16).
2. **"Com as mesmas objeções"**: Santo Tomás tem três, não quatro. Agora "objeções muito parecidas".
3. **CIC 2629**: a petição é a forma mais habitual de súplica, não de toda oração. Corrigido.
4. **Tg 5,16 "conclui"**: o versículo vem antes do exemplo de Elias; ordem invertida.
5. **Hb 5,7 atribuído ao CIC 2741**: separado o que diz a Carta aos Hebreus do que diz o Catecismo (Hb 5,7 entra pela nota 29).
6. **Datas dos Padres** (padrão 4.3): Gregório c. 593, Agostinho c. 412. Aplicado.

### Sugestões
1. "Providência" explicada na primeira vez. Aplicado.
2. "Regateou" → "intercedeu com ousadia", com Gn 19,29 (Ló salvo por causa de Abraão; conferido). Aplicado.
3. Versão fatalista da objeção 2 ("tudo já está decidido, tanto faz") incluída e respondida com Santo Tomás, que rejeita a necessidade, e o exemplo de quem não planta. Aplicado.
4. Parágrafo longo da resposta 4 dividido. Aplicado.
5. "Deus sempre atende, à sua maneira". Aplicado.

Depois das correções: `npm run verificar -- --links` com 0 erros; cerca de 1.630 palavras.
