# Processo de revisão

Nenhum artigo vai ao ar sem passar por aqui. O objetivo é publicar pouco e bem:
1 a 2 artigos revisados por mês.

## Status

| `status`     | No site (produção) | Em `npm run dev`        |
| ------------ | ------------------ | ----------------------- |
| `rascunho`   | não aparece        | aparece com selo        |
| `em-revisao` | não aparece        | aparece com selo        |
| `publicado`  | aparece            | aparece                 |

Os 73 textos do site antigo entraram como `rascunho`. A nota em `revisao.notas`
indica possíveis duplicatas.

## Checklist antes de mudar para `publicado`

1. **Texto**: reler inteiro; reescrever o que for vago, genérico ou repetitivo.
   Na dúvida, menos é mais.
2. **Escritura**: conferir cada citação bíblica (livro, capítulo, versículo e
   tradução) numa Bíblia católica.
3. **Catecismo e Magistério**: conferir cada parágrafo citado (§) e cada
   documento (concílio, encíclica) no texto oficial, em vatican.va.
4. **Padres da Igreja**: só citar com obra e passagem identificáveis; nada de
   citações sem fonte.
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

Quando o projeto ganhar relevância, a revisão por um padre ou teólogo entra
como último passo, registrada em `revisao.revisorDoutrinal`.
