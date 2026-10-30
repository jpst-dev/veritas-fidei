# Parecer doutrinal: Conhecer a Deus pela razão e pela fé

- Artigo: content/artigos/conhecer-a-deus.md (versão do commit 14ce7a4)
- Data: 2026-10-30
- Voto: **favorável com correções**
- Natureza: revisão interna (não é *nihil obstat* nem *imprimatur*)

## Resumo

O artigo apresenta a doutrina do conhecimento natural de Deus (Vaticano I,
CIC 36), a necessidade moral e absoluta da Revelação (CIC 37-38 e 50), a
Revelação plena em Cristo (CIC 65-66) e a relação entre fé e razão (CIC
156-159). A doutrina está correta e o peso das afirmações é o devido. Falta,
porém, dizer que a fé é dom da graça e adesão pessoal a Deus: do jeito que
está, o leitor pode entender a fé como simples assentimento intelectual.

## Afirmações doutrinais

| # | Afirmação (resumida) | Nota teológica | Peso no texto | Fonte | OK? |
| --- | --- | --- | --- | --- | --- |
| 1 | Deus pode ser conhecido com certeza pela luz natural da razão, a partir das criaturas | dogma (Vaticano I, *Dei Filius*, cap. 2 e cân. 2,1; DH 3004, 3026) | “definiu” | CIC 36 | sim |
| 2 | Há uma ordem de conhecimento que só a Revelação dá | dogma (DH 3015) | doutrina | CIC 50 | sim |
| 3 | As “provas” são argumentos convergentes, não provas das ciências naturais | magistério | doutrina | CIC 31 | sim |
| 4 | Caminhos do mundo e do homem | magistério | doutrina | CIC 32-34 | sim |
| 5 | A Revelação é moralmente necessária mesmo para verdades acessíveis à razão | doutrina (Vaticano I, DH 3005; Pio XII) | doutrina | CIC 37-38; *Suma*, I, q. 1, a. 1 | sim |
| 6 | Há verdades (Trindade, Encarnação) que a razão nunca alcançaria | doutrina de fé | doutrina | CIC 237 (não citado) | sim (sugestão 5) |
| 7 | Revelação gradual, plena em Cristo; nenhuma nova revelação pública | doutrina | doutrina | CIC 53, 65-66 (DV 4) | sim |
| 8 | Cremos pela autoridade de Deus que revela | dogma (DH 3008) | doutrina | CIC 156 | sim |
| 9 | Motivos de credibilidade: a fé não é cega | dogma (DH 3009, 3033) | doutrina | CIC 156 | sim |
| 10 | Não pode haver desacordo real entre fé e razão | dogma (DH 3017) | doutrina | CIC 159 | sim |
| 11 | A fé é dom de Deus e adesão pessoal | dogma (DH 3010) | **ausente** | CIC 150, 153 | **corrigir** |

## Problemas

### Bloqueiam a publicação

Nenhum.

### Corrigir antes de publicar

1. **A fé como dom da graça.** A seção “A fé e a razão” define crer como
   “aceitar o que Deus revela porque é Deus quem fala”. É verdade, mas
   incompleto: o Catecismo começa pela fé como “adesão pessoal do homem a
   Deus” (CIC 150) e ensina que ela é “um dom de Deus, uma virtude
   sobrenatural infundida por Ele” (CIC 153). Sem isso, o leitor pode achar
   que a fé é conclusão de raciocínio. Acrescentar uma frase com CIC 150 e
   153.
2. **Jo 1,18.** O texto diz “o Filho único, que está junto do Pai”. A Nova
   Vulgata traz *unigenitus Deus* (“o Filho único, que é Deus”), e o versículo
   será usado na trilha para a divindade de Cristo. Não omitir: “o Filho
   único, que é Deus e está junto do Pai”.

### Sugestões

3. **“Como quem fala com um amigo”.** É a imagem de *Dei Verbum* 2, que o
   Catecismo cita: Deus “fala aos homens como amigos” (CIC 142). Dar a fonte.
4. **CIC 159.** “Quem estuda a fundo a natureza” omite a condição do
   Catecismo: quem se esforça “com perseverança e humildade”. Incluir.
5. **Mistérios em sentido estrito.** A frase sobre a Trindade e a Encarnação
   ganha apoio com CIC 237 (a Trindade é “mistério inacessível à razão
   sozinha”).
6. **Revelação e razão.** “A primeira prepara o caminho; a segunda mostra o
   que está no fim dele” pode soar como se a Revelação só completasse a
   filosofia. Basta: “A razão prepara o caminho; a Revelação vai além dele”.

## O que foi conferido

- Catecismo, texto oficial do vatican.va: 27-38, 42-43, 50-53, 65-67, 142,
  150, 153, 155-159, 237. As citações literais batem (o verificador também
  confere).
- *Fides et Ratio*, proêmio, no vatican.va: citação literal confere.
- *Suma Teológica*, I, q. 1, a. 1 (newadvent.org): a paráfrase confere.
- Santo Agostinho: *Confissões*, I,1 e *Sermão* 43, ambos pelo Catecismo
  (CIC 30 e 158).
- `npm run biblia -- --artigo`: Sb 13,5; Sl 19,2; Rm 1,19-20; 1Tm 6,16;
  Hb 1,1-2; Jo 1,18; 1Pd 3,15. Todos dizem o que o artigo afirma, com a
  ressalva da correção 2.
- `npm run verificar -- --links --ortografia`: 0 erros; avisos de estilo do
  LanguageTool, sem problema real (pronomes enclíticos em citação do
  Catecismo, “si mesmo”).
- Para o autor, se quiser: o artigo não tem expressão bíblica entre aspas;
  não há nada a conferir na CNBB impressa.

## Correções aplicadas (30/10/2026)

Correções 1 e 2 e sugestões 3 a 6 incorporadas.
