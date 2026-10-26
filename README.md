# Veritas Fidei

Formação e defesa da fé católica: artigos revisados e trilhas de estudo para
conhecer, amar e saber dar razão da fé.

## Stack

- [Nuxt 4](https://nuxt.com) com geração estática (`nuxt generate`) na Vercel
- [Nuxt Content 3](https://content.nuxt.com): conteúdo em Markdown/YAML com schema validado
- [Tailwind CSS 4](https://tailwindcss.com) com tokens em CSS (`app/assets/css/main.css`)
- Vitest

## Desenvolvimento

Requer Node 24 (o Nuxt Content usa o `node:sqlite` nativo; é a versão usada na Vercel).

```bash
npm install
npm run dev        # rascunhos aparecem, com selo de status
npm run generate   # build estático de produção (só artigos publicados)
npm test
npm run typecheck
```

## Conteúdo

```
content/
  artigos/<slug>.md   → /artigos/<slug>
  temas/<slug>.yml    → /temas/<slug>
  trilhas/<slug>.yml  → /trilhas/<slug>
```

O schema de cada coleção está em `content.config.ts`. Um artigo só aparece no
site com `status: publicado`; veja o [processo de revisão](docs/revisao.md).

## Detalhes

- **Cor litúrgica**: a cor de destaque acompanha o tempo litúrgico (verde,
  roxo, branco/dourado, vermelho), calculado em `app/utils/liturgia.ts`
  segundo o calendário romano com as transferências usadas no Brasil.
- **Tema**: escuro por padrão, com modo claro salvo no navegador.
- **RSS**: `/rss.xml`, gerado no build.
