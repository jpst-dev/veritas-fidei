# Imagens: curadoria de arte sacra

As imagens do Veritas Fidei são **obras de arte sacra**, não fotos de banco de
imagens. A arte da Igreja já é catequese: uma boa obra ilustra o tema, dá
identidade ao site e ensina sozinha. Este guia mantém a escolha com o mesmo
rigor que o padrão editorial dá ao texto ([padrao-editorial.md](padrao-editorial.md)).

## 1. Onde buscar

Só no **Wikimedia Commons** (commons.wikimedia.org). Lá cada arquivo traz a
licença e a procedência verificáveis, e o `npm run obra` lê esses dados
direto da fonte.

Não usar:

- **Imagens do Google** ou de outros sites: quase sempre têm direitos autorais,
  mesmo quando a obra é antiga (a foto pode ser protegida).
- **Bancos de imagens** (Unsplash, Pexels etc.): fotos genéricas, sem a
  identidade do site.
- **Arte contemporânea** e fotos de igrejas ou pessoas atuais, salvo licença
  CC clara e crédito.
- **Imagens geradas por IA.**

## 2. Licenças aceitas

| Licença no Commons | Pode usar? | O que exige |
| --- | --- | --- |
| Public domain / PD-Art / PD-old | Sim | Nada, mas creditamos mesmo assim |
| CC0 | Sim | Nada |
| CC BY, CC BY-SA | Sim | **Crédito** ao autor da foto e à licença (campo `credito`) |
| CC BY-NC, CC BY-ND, "all rights reserved", sem licença | **Não** | — |

O script recusa sozinho o que não estiver na lista.

## 3. Como escolher a obra

1. **Fiel ao tema, não só bonita.** A cena precisa dizer algo sobre o artigo:
   o Batismo de Cristo para o batismo, o Filho pródigo para a confissão, São
   Tomé tocando as chagas para a defesa da fé.
2. **Tradição da Igreja.** Preferência por mestres reconhecidos (Fra Angelico,
   Caravaggio, Rembrandt, Rublev, Giotto, Rafael, Murillo, El Greco,
   iluminuras medievais, ícones). Evitar obras com interpretação teológica
   duvidosa ou cenas que precisem de explicação para não escandalizar.
3. **Reprodução de qualidade.** Arquivo com pelo menos 1600 px no lado maior,
   sem moldura de museu, sem legenda impressa, sem marca-d'água, cores fiéis.
   Entre várias versões no Commons, a do *Google Art Project* ou a do próprio
   museu costuma ser a melhor.
4. **Funciona recortada.** O site recorta as imagens (4:3, 3:4, 16:10). Se o
   essencial da cena está numa ponta, use `posicao`; se a obra é larga demais
   (um tríptico, um afresco inteiro), procure um **detalhe** no Commons.
5. **Pede o tema escuro.** Fundos escuros (Caravaggio, Rembrandt) combinam com a
   paleta Noite. Obras claras e muito coloridas ficam melhor em cartões
   pequenos do que em faixas grandes.

## 4. Passo a passo

```sh
# 1. Encontre o arquivo no Commons e copie o nome (sem "File:")
npm run obra -- batismo-de-cristo "Piero della Francesca - Battesimo di Cristo (National Gallery, London).jpg"
```

O script:

- confere a licença na API do Commons e recusa o que não for aceito;
- gera `public/obras/<slug>-1600.webp` e `<slug>-800.webp` (WebP, lado maior
  limitado ao tamanho);
- cria `content/obras/<slug>.yml` com licença e fonte preenchidas e os
  demais campos marcados com `REVISAR`.

Depois, **à mão**, em português:

| Campo | Exemplo |
| --- | --- |
| `titulo` | `O Batismo de Cristo` (título consagrado em português; detalhe entre parênteses) |
| `autor` | `Piero della Francesca` (nome usado em português) |
| `data` | `c. 1450`, `1601`, `séc. XVI` |
| `acervo` | `National Gallery, Londres` (onde está hoje, conferido na página do Commons ou do museu) |
| `alt` | Uma frase que descreve a cena para quem não vê a imagem |
| `posicao` | Recorte, como em CSS `object-position`: `center 40%` |
| `posicaoFaixa` | Opcional. Recorte nas faixas largas (abertura de artigo, tema e trilha). Use em quadros verticais, quando os rostos ficam cortados no alto |
| `credito` | Só para CC BY/BY-SA: `Foto: <autor>, CC BY-SA 3.0` |

Por fim, ligue a obra a quem a usa:

- **Tema:** `obra: <slug>` em `content/temas/<tema>.yml` (obrigatório);
- **Artigo:** `obra: <slug>` no frontmatter (opcional; sem ele, vale a obra do tema).

A página `/creditos` lista todas as obras automaticamente.

## 5. Checklist antes de publicar

- [ ] A obra ilustra de fato o tema do artigo.
- [ ] Licença aceita (tabela acima) e, se CC BY/BY-SA, `credito` preenchido.
- [ ] Nenhum campo com `REVISAR` em `content/obras/`.
- [ ] Título, autor, data e acervo conferidos na página do Commons.
- [ ] `alt` descreve a cena.
- [ ] O recorte foi conferido no site (home, cartões e página do artigo).
- [ ] A mesma obra não se repete em artigos vizinhos da home, quando houver alternativa.
