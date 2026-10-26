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
      { name: 'EB Garamond', provider: 'google', weights: [400, 500, 600], styles: ['normal', 'italic'] },
    ],
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
