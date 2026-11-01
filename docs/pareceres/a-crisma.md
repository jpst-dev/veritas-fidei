# Parecer doutrinal: A Crisma

- Artigo: content/artigos/a-crisma.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Artigo de ensino sobre a Confirmação, no fio do CIC 1285-1321: nomes, rito essencial, efeitos, caráter, fundamento bíblico (Is 11, Pentecostes, imposição das mãos em At 8 e 19, Hb 6,2), testemunho de Tertuliano, Cipriano, Cirilo e Ambrósio, as práticas do Oriente e do Ocidente, e as dúvidas mais comuns (relação com o Batismo, "ratificação", idade, obrigação). Doutrina correta; dois pontos de precisão corrigidos.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | A Confirmação é sacramento, distinto do Batismo, da iniciação cristã | De fé (Trento, sess. VII, Conf. can. 1, DH 1628) | Afirmado | CIC 1285 | Sim |
| 2 | Rito essencial: unção com crisma na fronte, imposição da mão, fórmula | Doutrina certa (Paulo VI, *Divinae consortium naturae*) | Afirmado | CIC 1300, 1320 | Sim |
| 3 | Efeito: efusão especial do Espírito como em Pentecostes; os cinco efeitos | Doutrina certa | Afirmado | CIC 1302-1303 | Sim |
| 4 | Caráter; não se repete | De fé (DH 1609) | Afirmado | CIC 1304 | Sim |
| 5 | Os dons do Espírito, recebidos no Batismo, crescem na Crisma | Doutrina certa | Afirmado | CIC 1266, 1303 | Sim, após correção 1 |
| 6 | Ministro originário o bispo; padre com o crisma do bispo (Oriente, adultos, perigo de morte) | Doutrina e disciplina | Distinção feita | CIC 1312-1314 | Sim |
| 7 | Sem Crisma o Batismo é válido, mas a iniciação fica incompleta; obrigação "no tempo devido" | Doutrina e disciplina | Com o peso do Catecismo e do CDC | CIC 1306; CDC cân. 890 | Sim |
| 8 | A Crisma não é "ratificação" do Batismo | Ensino do Catecismo | Afirmado | CIC 1308 | Sim |
| 9 | At 8 e 19 e Hb 6,2 como origem do sacramento | Leitura da Tradição (Paulo VI, citado no CIC) | Apresentado como a Igreja reconhece | CIC 1288 | Sim |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. **"A Crisma dá os sete dons"**: os dons são dados com a graça santificante no Batismo (CIC 1266); a Crisma os **aumenta** (CIC 1303). Reescrito.
2. **São Cirilo**: "o óleo comunica o Espírito Santo" resumia mal o texto (*made fit to impart His Divine Nature*; "enquanto o corpo é ungido com o óleo visível, a alma é santificada pelo Espírito"). Trocado pela segunda frase, que é a mais clara.

### Sugestões

- Is 11,2 na Nova Vulgata nomeia seis dons; o artigo já explica que a piedade vem da tradução grega (LXX, *eusebeia*) e que a Tradição conta sete (CIC 1831). Mantido assim para não induzir o leitor a achar sete em qualquer Bíblia.

## O que foi conferido

- `npm run biblia -- --artigo`: as 13 referências conferem.
- `npm run cic`: 1285-1321 com as notas, 1266 e 1830-1832. Cipriano (nota 104, *Epistula* 73,21), Ambrósio (nota 129, *De mysteriis* 7,42) e Tomás (notas 132 e 136) vêm pelo Catecismo.
- Tertuliano, *De baptismo* 7-8, e São Cirilo, *Catequeses mistagógicas* III,1-3, lidos em newadvent.org.
- CDC cân. 889-891 e 1065 no texto oficial em português.
- Fica para o autor, opcional: a redação da CNBB impressa nas expressões curtas ("força do alto", "maravilhas de Deus").

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada que bloqueie.

### Corrigir (todos aplicados)
1. **Separação Batismo/Crisma no Ocidente**: "com o batismo das crianças" sugeria que o batismo infantil começou ali. Agora, como no CIC 1290, "a multiplicação dos batismos de crianças, em qualquer época do ano, e das paróquias rurais".
2. **São Cirilo**: faltava a segunda metade da comparação ("já não é simples pão, *mas o Corpo de Cristo*"), essencial para não sugerir mudança só simbólica. Acrescentada.
3. **Data e autoria das Mistagógicas**: "por volta de 350" vale para as Catequeses pré-batismais; as mistagógicas são da segunda metade do século IV e de atribuição discutida (Cirilo ou João de Jerusalém). Agora "a quem a tradição atribui… na segunda metade do século IV".
4. **Cipriano e Ambrósio sem obra**: agora *Cartas* 73, 21 e *Sobre os mistérios* 7, 42, citados no CIC; Ambrósio fala "aos recém-batizados". (Este ponto gerou a checagem nova do verificador, commit ebcc74e.)
5. **Peso doutrinal**: acrescentado que a sacramentalidade e o caráter são de fé (Trento, DH 1628, conferido no texto do cânon 1 sobre a Confirmação; DH 1609), e que idade e modo de celebrar são disciplina.
6. **Ministro**: acrescentado que o bispo é o ministro ordinário no rito latino, que pode dar a faculdade a padres, e o caso do adulto batizado (CIC 1312-1313; CDC cân. 882-884, conferidos no texto oficial).
7. **Idade**: a idade da razão é presumida aos 7 anos (CDC cân. 97 §2, conferido); a conferência dos bispos pode fixar outra, e no Brasil é comum o começo da adolescência.

### Sugestões
1. Confissão: "quem tem consciência de pecado grave deve se confessar; mesmo sem isso, convém" (CIC 1310). Aplicado, com as condições do CDC cân. 889 §2.
2. Dons: "todo cristão em estado de graça". Aplicado.
3. "Como em virtude de um encargo oficial" (*quasi ex officio*). Aplicado.
4. Missa do Crisma "normalmente" na Quinta-feira Santa. Aplicado.
5. Padrinho (CDC cân. 892-893, conferidos): uma frase na seção do rito, para não passar de 4 dúvidas.
6. Batismo de Jesus com Mt 3,16 e Jo 1,33-34. Aplicado.
7. e 8. "Sacramento duplo" mantido entre aspas pelo CIC; "duma" mantido no CIC 1308 por ser citação literal (padrão 4.2 só adapta a grafia).

Depois das correções: `npm run verificar -- --ortografia` com 0 erros; avisos de estilo lidos.
