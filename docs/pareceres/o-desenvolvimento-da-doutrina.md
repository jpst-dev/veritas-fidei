# Parecer doutrinal: O desenvolvimento da doutrina

- Artigo: content/artigos/o-desenvolvimento-da-doutrina.md (versão de trabalho na branch feat/rodada-1; substitui o rascunho antigo de mesmo slug)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Artigo de ensino sobre o desenvolvimento da doutrina: a Revelação completa mas não plenamente explicitada (CIC 66), o depósito da fé e o crescimento da sua inteligência (CIC 84, 94), o dogma (CIC 88), a regra de São Vicente de Lérins, o Vaticano I (*Dei Filius*, cap. 4 e cân. 3), fórmulas e verdades (CIC 170; São João XXIII; *Mysterium Ecclesiae*, 5), as notas de Newman, a Escritura (Jo 16,12-13; parábolas do crescimento; At 15; 1Tm 6,20; Gl 1,8; Jd 3) e exemplos históricos. Doutrina correta e bem equilibrada entre crescimento e fidelidade.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Não haverá nova revelação pública antes da volta de Cristo | De fé (DV 4) | Afirmado | CIC 66 | Sim |
| 2 | A inteligência do depósito cresce com a assistência do Espírito | Magistério (DV 8) | Afirmado | CIC 94 | Sim |
| 3 | O sentido dos dogmas declarado pela Igreja não pode mudar | De fé (Vaticano I) | Afirmado, atribuído ao concílio | *Dei Filius*, cap. 4, cân. 3 | Sim |
| 4 | Fórmulas podem ser aperfeiçoadas; o sentido permanece | Magistério (CDF 1973) | Atribuído ao documento | *Mysterium Ecclesiae*, 5 | Sim |
| 5 | As notas de Newman | Sentença teológica | Atribuído ao autor, “não uma definição da Igreja” | *Ensaio*, cap. 5 | Sim |
| 6 | Tradições disciplinares podem mudar; a Tradição apostólica não | Doutrina certa | Afirmado | CIC 83 | Sim |
| 7 | Interpretação autêntica confiada ao Magistério | De fé (DV 10) | Afirmado | CIC 85 | Sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. **São Gregório Magno** citado só pelo Catecismo: acrescentada a obra (*Homilias sobre Ezequiel*, I, 7, 8, pela nota do CIC 94).
2. O cânon 3 da *Dei Filius* é um anátema: “rejeitou” virou “condenou”.

### Sugestões

- O rascunho antigo (673 palavras, sem fontes conferidas) é substituído; o slug é o mesmo, sem redirecionamento.
- O rascunho `igreja-doutrinas-nao-biblicas` trata do mesmo assunto em chave de Defesa; a dúvida “Se a doutrina se desenvolve, por que não aceitar qualquer novidade?” e os links para O Magistério e A Tradição cobrem o essencial. Decisão do autor: apagá-lo e redirecionar para este artigo.

## O que foi conferido

- `npm run biblia -- --artigo`: as 11 referências, com a frase ao lado. Jo 16,12-13 (*deducet vos in omnem veritatem*), Mc 4,26-28, Mt 13,52 (*nova et vetera*), At 15,28 (*Visum est enim Spiritui Sancto et nobis*), 2Tm 1,14 (*bonum depositum custodi per Spiritum Sanctum*). Jd 3 (*certare pro semel tradita sanctis fide*): de início conferido à mão como Jd 1,3; depois da correção do script, lido também pelo `npm run biblia`.
- `npm run cic -- --artigo`: 66, 83-86, 88, 91-94, 120, 170-171, 250-251.
- São Vicente de Lérins, *Commonitório*, 23 (newadvent.org): progresso e não alteração; *in eodem dogmate, eodem sensu*; a imagem do corpo e a do trigo e do joio.
- Vaticano I, *Dei Filius*, cap. 4 e cân. 3 (papalencyclicals.net, inglês), parafraseados.
- São João XXIII, *Gaudet Mater Ecclesia*, VI, 5 (vatican.va, português): só o trecho conferido vai entre aspas.
- *Mysterium Ecclesiae*, 5 (vatican.va, português): “de modo incompleto, se bem que nunca falso”.
- Newman, *Ensaio*, cap. 5 (newmanreader.org): as sete notas e a definição de corrupção. Doutor da Igreja desde 1º/11/2025 (Leão XIV).

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada bloqueia

### Corrigir (todos aplicados)

1. "Sentido contrário" era mais fraco que o Vaticano I, que condena um sentido **diferente** (*diversus*): agora "um sentido diferente daquele que já declarou (*Dei Filius*, cap. 4 e cânon 3)".
2. Dogma e doutrina definitiva estavam juntos: agora o dogma é proposto "como revelado" e pede adesão de fé irrevogável; as verdades ligadas por nexo necessário são propostas "de modo definitivo" (CIC 88). O resumo acompanha.
3. Newman: as sete notas, com esses nomes e a frase sobre a corrupção, são da edição revista de 1878 (cap. 5), que é o texto do newmanreader; referência e citação dizem isso.

### Sugestões

- Aplicadas: Gl 1,8 com o anátema, como está no texto; "consubstancial" e "transubstanciação" explicados; revelações privadas (CIC 67); a festa da Conceição desde o século VIII antes da definição de 1854; CIC 250 atribuído só aos primeiros concílios; *depositum fidei* com aspas simples e "o mesmo sentido e o mesmo alcance"; "Entre elas" no lugar de "Os principais"; Lc 2,19.51 ligado ao CIC 94.
- Ferramenta: o revisor notou que "Jd 3" não era lido pelo `npm run biblia`. Corrigido em `scripts/verificar/vulgata.ts` (livros de um só capítulo), com teste em `test/verificar.test.ts` e nota em `docs/fluxo-artigo.md`.

Verificador depois das correções: 0 erros; avisos só de ortografia (nomes próprios e termos latinos).
