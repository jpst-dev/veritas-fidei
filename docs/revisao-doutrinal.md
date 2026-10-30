# Revisão doutrinal

Como a Igreja avalia se um escrito sobre fé e moral pode ser publicado, e como
o Veritas Fidei aplica esse rigor antes de ter um censor de verdade. A skill
`revisao-doutrinal` (em `.claude/skills/`) segue este guia.

## 1. Como funciona na Igreja

### Quem aprova

- Os pastores têm “o direito de exigir que sejam submetidos ao seu juízo os
  escritos a publicar pelos fiéis, relativos à fé ou à moral” (CDC, cân. 823 §1).
- Quem concede a licença é o **Ordinário do lugar** (em geral, o bispo
  diocesano) **do autor** ou **do lugar onde a obra é publicada** (CDC, cân.
  824 §1). O que vale para livros vale para “quaisquer escritos destinados à
  divulgação pública” (cân. 824 §2): um site entra aqui.
- O Ordinário confia o exame a um **censor**, que pode vir de uma lista da
  Conferência episcopal (cân. 830 §1).

### O que é obrigatório e o que é recomendado

| Escrito | Aprovação |
| --- | --- |
| Bíblia e suas traduções | obrigatória (cân. 825) |
| Livros litúrgicos e de orações | obrigatória (cân. 826) |
| Catecismos e material de catequese | obrigatória (cân. 827 §1) |
| Livros-texto de teologia, Escritura, moral etc. em escolas | obrigatória (cân. 827 §2) |
| Expostos ou vendidos em igrejas | obrigatória (cân. 827 §4) |
| **Escritos de teologia, Escritura, história da Igreja, moral, em geral** | **recomendada** (cân. 827 §3) |

Um site de formação como o Veritas Fidei está na última linha: a aprovação não
é exigida, mas é recomendada. Ela se torna obrigatória se o conteúdo virar
material de catequese, livro-texto ou for vendido em igrejas.

### O que o censor examina

> O censor, no desempenho do seu ofício, posta de parte toda a acepção de
> pessoas, tenha somente em consideração a doutrina da Igreja acerca da fé ou
> dos costumes, como é proposta pelo magistério eclesiástico.
>
> — CDC, cân. 830 §2

O parecer é **por escrito**; se a licença for negada, o autor recebe as razões
(cân. 830 §3).

### O que a aprovação significa

O ***nihil obstat*** (“nada impede”) é o parecer favorável do censor; o
***imprimatur*** (“imprima-se”) é a licença do Ordinário, com o nome dele, a
data e o lugar. A aprovação declara que a obra **não contém nada contrário** ao
magistério da Igreja sobre fé e moral (Congregação para a Doutrina da Fé,
*Instrução sobre alguns aspectos do uso dos instrumentos de comunicação social
na promoção da doutrina da fé*, 1992, n. 7-8). **Não** significa que quem
aprova concorde com todas as opiniões, nem que a obra seja a melhor
explicação possível. Vale para aquele texto, não para novas edições ou
traduções (cân. 829).

### Para o Veritas Fidei, na prática

1. Enquanto o projeto é pequeno: a revisão doutrinal interna (este guia),
   com o parecer guardado em `docs/pareceres/`.
2. Quando ganhar relevância: um **padre ou teólogo** revisa e o nome entra em
   `revisao.revisorDoutrinal` (isso não é um *imprimatur* e o site não deve
   dizer que é).
3. Se um dia o conteúdo virar livro, material de catequese ou for pedida a
   aprovação: procurar a cúria da diocese do autor ou da editora (cân. 824),
   com o texto e os pareceres anteriores.

**Nunca** escrever no site “*nihil obstat*”, “*imprimatur*” ou “aprovado pela
Igreja” sem a licença real do Ordinário.

## 2. O critério: o peso de cada afirmação

A pergunta do censor não é só “isto é verdade?”, mas “isto é apresentado com o
peso certo?”. Um artigo erra tanto ao vender opinião como dogma quanto ao
tratar um dogma como opinião.

### Notas teológicas (do mais ao menos firme)

| Nota | O que é | Exemplo | Assentimento pedido |
| --- | --- | --- | --- |
| **Dogma de fé** (*de fide divina et catholica*) | revelado e definido solenemente ou pelo magistério ordinário universal | Maria, Mãe de Deus (Éfeso, 431) | fé teologal |
| **Doutrina definitiva** (*de fide tenenda*) | proposta de modo definitivo, ligada à Revelação | ordenação reservada a homens | firme aceitação |
| **Magistério autêntico** | ensinado pelo Papa ou bispos, sem definição | muitas posições da doutrina social | “religioso obséquio da vontade e da inteligência” (*Lumen Gentium*, 25) |
| **Sentença comum** | ensinada pela generalidade dos teólogos | Cristo, na vida terrena, via o Pai face a face | respeito |
| **Opinião teológica** | livremente discutida entre católicos | se Maria morreu antes da Assunção (Pio XII deixou em aberto) | liberdade |
| **Piedade e devoção** | prática aprovada, não doutrina | aparições reconhecidas | nenhum (não obrigam a fé) |

As três primeiras correspondem aos três parágrafos finais da *Professio fidei*
(Congregação para a Doutrina da Fé, *Nota doutrinal ilustrativa da fórmula
conclusiva da Professio fidei*, 1998). Sobre a liberdade e os limites do
teólogo: *Donum Veritatis* (1990).

### Censuras teológicas (o que procurar)

| Censura | Quando |
| --- | --- |
| **Herética** | nega ou põe em dúvida um dogma |
| **Próxima da heresia** | nega doutrina quase unanimemente tida como revelada |
| **Errônea** | contradiz doutrina definitiva ou certa |
| **Temerária** | afasta-se sem razão do ensino comum |
| **Ambígua ou malsonante** | pode ser lida em sentido errado; correta só com boa vontade |
| **Ofensiva aos ouvidos piedosos** | fere o sentido de fé dos fiéis, mesmo sem erro |
| **Perigosa para os costumes** | pode levar a conduta errada |

Para um site de formação, as mais comuns são as duas últimas linhas e a
**ambiguidade**: frases verdadeiras escritas de um jeito que o leitor leigo
entende errado.

## 3. Fontes

- *Código de Direito Canônico*, cân. 822-832 (texto oficial em português no
  vatican.va).
- Congregação para a Doutrina da Fé, *Instrução sobre alguns aspectos do uso
  dos instrumentos de comunicação social na promoção da doutrina da fé*
  (30/3/1992).
- Congregação para a Doutrina da Fé, *Nota doutrinal ilustrativa da fórmula
  conclusiva da Professio fidei* (29/6/1998).
- Congregação para a Doutrina da Fé, *Donum Veritatis*, sobre a vocação
  eclesial do teólogo (24/5/1990).
- Concílio Vaticano II, *Lumen Gentium*, 25 (graus de assentimento ao
  magistério).
- Para as notas e censuras, a classificação clássica dos manuais: Ludwig Ott,
  *Grundriss der katholischen Dogmatik* (1952), introdução.
