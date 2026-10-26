import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // Sobrescrito por NUXT_PUBLIC_SITE_URL na Vercel quando houver domínio próprio
      siteUrl: 'https://veritas-fidei.vercel.app',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'description', content: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.' },
        { name: 'theme-color', content: '#0D1015' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  content: {
    // node:sqlite (Node 22.5+) evita compilar better-sqlite3 no Windows e na Vercel
    experimental: { sqliteConnector: 'native' },
    build: {
      markdown: {
        toc: { depth: 3 },
      },
    },
  },

  fonts: {
    families: [
      { name: 'Cinzel', provider: 'google', weights: [500, 600] },
      // Literata foi desenhada para leitura longa em tela
      { name: 'Literata', provider: 'google', weights: [400, 500, 600], styles: ['normal', 'italic'] },
    ],
  },

  hooks: {
    // Referências não quebram linha entre a sigla e o número: "Mc 16,16", "1Cor 11,27", "CIC 1252".
    // O Content roda os hooks numa worker: a função precisa ser autossuficiente (sem imports).
    'content:file:beforeParse'({ file }) {
      if (!file.id.endsWith('.md') || typeof file.body !== 'string') return
      file.body = file.body
        .replace(/(?<![\p{L}\d])([1-3]?\p{Lu}\p{Ll}{0,3}) (\d+,\d)/gu, '$1 $2')
        .replace(/\b(CIC|DH|Compêndio) (\d)/gu, '$1 $2')
    },
    // Tempo de leitura calculado no build (≈200 palavras por minuto, sem o front matter)
    'content:file:afterParse'({ file, content, collection }) {
      if (collection.name !== 'artigos' || typeof file.body !== 'string') return
      const texto = file.body.replace(/^---[\s\S]*?\n---/, '')
      const palavras = texto.split(/\s+/).filter(Boolean).length
      content.minutos = Math.max(1, Math.round(palavras / 200))
    },
  },

  // Site 100% estático: tudo é pré-renderizado no build
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/rss.xml'],
    },
  },

  typescript: {
    strict: true,
  },
})
