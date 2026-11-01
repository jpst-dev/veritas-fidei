# Parecer doutrinal: Os Dez Mandamentos

- Artigo: content/artigos/os-dez-mandamentos.md (versão de trabalho na branch feat/rodada-1)
- Data: 2026-11-01
- Voto: favorável com correções
- Natureza: revisão interna (não é nihil obstat nem imprimatur)

## Resumo

Ensino de nível iniciante sobre o Decálogo: palavras da Aliança, expressão da lei natural, obrigação permanente, a fórmula catequética do *Compêndio*, um resumo de cada mandamento com o parágrafo do Catecismo, Jesus e os mandamentos (Mt 19; Mt 5; Mt 22) e quatro dúvidas (imagens e numeração, sábado e domingo, graça e mandamentos, gravidade). Doutrina correta.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Os mandamentos obrigam também os cristãos justificados | Dogma (Trento VI, cân. 19-20) | Afirmado | CIC 2068 | Sim |
| 2 | Deus não manda o impossível; dá a graça para cumprir | Dogma (Trento VI, cap. 11) | Afirmado | CIC 2082; Trento VI, cap. 11 | Sim, após a revisão |
| 3 | O Decálogo exprime a lei natural | Doutrina católica | Afirmado | CIC 2070-2071 | Sim |
| 4 | A numeração é tradição, não dogma; o texto é o mesmo | Fato | Afirmado | CIC 2066 | Sim |
| 5 | O culto das imagens não fere o primeiro mandamento | Dogma (Niceia II) | Afirmado | CIC 2129-2132 | Sim, após a revisão |
| 6 | Há faltas leves contra os mandamentos | Doutrina católica | Afirmado | CIC 2073, 1857 | Sim, após a revisão |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar (aplicado)

1. Santo Agostinho citado com obra e passagem (*Sermão* 33, 2, pelo CIC 2067).
2. A fórmula catequética conferida no *Compêndio* (2005); o CIC em português não a reproduz em texto corrido.

### Sugestões

- O verificador acusava “**São palavras da Aliança**” como nome de santo sem obra; a regra foi corrigida (exige nome próprio em maiúscula), com teste em test/ferramentas.test.ts.

## O que foi conferido

- `npm run biblia -- --artigo`: Ex 34,28; 31,18; 20,1-17; Dt 5,6-21; Ex 20,2; Tg 2,10; Mt 19,16-21; 5,17; 5,21-22.27-28; 22,37-40; Rm 13,9-10; Dt 4,15-16; Nm 21,8-9; Ex 25,18-20; Mc 16,2; At 20,7; Ap 1,10; Jo 14,15; 1Jo 5,3; Jo 15,5.
- `npm run cic -- --artigo`: 1857, 2052-2084, 2113, 2129-2132, 2142, 2148, 2150, 2174-2176, 2180, 2185, 2197, 2258, 2336, 2401, 2464, 2514, 2534, 2538.
- *Compêndio do Catecismo* (2005), fórmula catequética (vatican.va, português); Concílio de Trento, sessão VI, cap. 11 e cân. 19-20; Santo Irineu, *Contra as heresias*, IV, 16, 3-4, pelo CIC 2063.

## Revisão independente

- Revisor: agente revisor-independente (contexto limpo, sem acesso a este parecer)
- Data: 2026-11-01
- Juízo: reparos menores; nada bloqueia

### Corrigir (todos aplicados)

1. Imagens: o mandamento proíbe o ídolo (CIC 2132); no Antigo Testamento vedava também representar o próprio Deus (Dt 4,15-16; CIC 2129). A frase anterior atribuía às fontes o que elas não dizem.
2. O detalhe da numeração grega ficou sem a referência ao CIC 2066, que não o descreve.
3. Gravidade: “mesmo em matéria grave, para haver pecado mortal é preciso também plena consciência e consentimento deliberado (CIC 1857)”.
4. A frase de Ex 20,2 entre aspas virou paráfrase com referência.
5. Mt 19: “citou mandamentos da segunda tábua” (não todos).
6. Domingo: At 20,7 para a reunião; Ap 1,10 para o nome “dia do Senhor”.
7. Referências precisas: CIC 2113 (ídolos), 2148 e 2150 (blasfêmia, juramento), 2538 (inveja).

### Sugestões

- Aplicadas: “razão” em vez de “consciência” (CIC 2071); o sexto mandamento abrange toda a sexualidade (CIC 2336); a sacralidade da vida como no CIC 2258; Trento, cap. 11, citado no corpo; “festas de guarda” explicado; fórmula do nono mandamento literal; “tradição católica, sobretudo a latina”; a distinção entre preceito moral e ritual do sábado (CIC 2176); datas de Agostinho e Irineu; link para “Somos salvos só pela fé?”.

Verificador depois das correções: 0 erros, 0 avisos.
