# Processo de revisão

Nenhum artigo vai ao ar sem passar por aqui. A prioridade é a qualidade, não a
velocidade. O fluxo completo de um artigo novo, da pauta à publicação, está em
[fluxo-artigo.md](fluxo-artigo.md); este documento é o checklist da revisão.

## Status

| `status`     | No site (produção) | Em `npm run dev`        |
| ------------ | ------------------ | ----------------------- |
| `rascunho`   | não aparece        | aparece com selo        |
| `em-revisao` | não aparece        | aparece com selo        |
| `publicado`  | aparece            | aparece                 |

Os artigos seguem o [padrão editorial](padrao-editorial.md). Os 73 textos do site antigo entraram como `rascunho`. A nota em `revisao.notas`
indica possíveis duplicatas.

## Antes de escrever

Os rascunhos do site antigo não são base: muitos repetem o mesmo assunto com
títulos diferentes. Todo artigo é escrito do zero no padrão editorial. Antes,
procure no acervo (rascunhos e publicados) os textos sobre o mesmo assunto,
para não duplicar e para saber o que o novo substitui. O rascunho substituído
é apagado no mesmo commit (fica no histórico do git), e o artigo novo diz em
`revisao.notas` quais textos substituiu.

## Checklist antes de mudar para `publicado`

0. **Verificador**: `npm run verificar -- --links --ortografia content/artigos/<slug>.md`.
   Ele confere estrutura, formato das citações, referências bíblicas (formato e
   existência na Nova Vulgata do vatican.va), citações literais do Catecismo
   contra o vatican.va, links e ortografia (LanguageTool). Erros bloqueiam;
   avisos pedem um olhar. Também confere o artigo contra o acervo: links
   internos, obra (repetida, pequena, vertical sem recorte) e o parecer com a
   revisão independente. O que ele não confere (sentido dos versículos,
   Padres, documentos) segue nos itens abaixo.

1. **Texto**: reler inteiro; reescrever o que for vago, genérico ou repetitivo.
   Na dúvida, menos é mais.
2. **Escritura**: `npm run biblia -- --artigo content/artigos/<slug>.md` mostra
   a frase do artigo e o texto da Nova Vulgata de cada referência; conferir que o versículo diz o
   que o artigo afirma (a revisão doutrinal registra isso no parecer). A redação
   das expressões curtas entre aspas na CNBB impressa é opcional (lista em
   `revisao.notas`); citação longa entre aspas exige a CNBB impressa.
3. **Catecismo e Magistério**: `npm run cic -- --artigo content/artigos/<slug>.md`
   mostra cada parágrafo citado com as notas de rodapé; conferir que sustenta a
   frase. Documentos (concílio, encíclica) no texto oficial, em vatican.va.
4. **Padres da Igreja**: só citar com obra e passagem identificáveis; nada de
   citações sem fonte. Frase que não vem por documento oficial é conferida na
   tradução publicada (newadvent.org, bkv.unifr.ch) ou no original, e a
   conferência fica em `revisao.notas`.
5. **Referências**: abrir cada link de `referencias`; trocar blogs por fontes
   primárias sempre que possível.
6. Marcar no frontmatter:
   ```yaml
   status: publicado
   publicadoEm: 2026-11-15
   revisao:
     citacoesConferidas: true
     referenciasConferidas: true
   ```
7. Opcional (artigos da Defesa da fé): preencher `quaestio` com o resumo
   "Parece que… / Em sentido contrário / Respondo".

## Revisão doutrinária

Antes de publicar, cada artigo recebe um **parecer doutrinal interno**, no
modelo do que um censor eclesiástico faz antes do *imprimatur*: o peso de cada
afirmação, as fontes e as ambiguidades. O guia está em
[revisao-doutrinal.md](revisao-doutrinal.md), a skill `revisao-doutrinal` o
aplica e os pareceres ficam em `docs/pareceres/`.

Depois do parecer, o agente `revisor-independente` (`.claude/agents/`) lê o
artigo com contexto limpo, sem ver o parecer, e o relatório dele entra no
parecer em `## Revisão independente`, com o desfecho de cada ponto. Obrigatório
nos artigos publicados a partir de 02/11/2026.

Quando o projeto ganhar relevância, a revisão por um padre ou teólogo entra
como último passo, registrada em `revisao.revisorDoutrinal`. Isso não é um
*imprimatur*, e o site não deve dizer que é.
