<script setup lang="ts">
const liturgia = useLiturgia()
const route = useRoute()
// Toda URL absoluta sai daqui: siteUrl vem de NUXT_PUBLIC_SITE_URL no build
const { siteUrl } = useRuntimeConfig().public
const urlDaPagina = () => `${siteUrl}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`

// Compartilhamento: padrões para todas as páginas. Cada página define título e
// descrição (e ogDescription); os artigos trocam a imagem (scripts/og.ts).
useSeoMeta({
  ogSiteName: 'Veritas Fidei',
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogUrl: urlDaPagina,
  ogDescription: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
  ogImage: `${siteUrl}/og/padrao.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'Veritas Fidei — Conhecer a fé para amá-la e saber dar razão dela.',
  twitterCard: 'summary_large_image',
})

useHead({
  titleTemplate: (titulo) => (titulo ? `${titulo} · Veritas Fidei` : 'Veritas Fidei — Formação católica'),
  htmlAttrs: { 'data-cor': () => liturgia.value.cor },
  link: [
    { key: 'canonical', rel: 'canonical', href: urlDaPagina },
    { key: 'rss', rel: 'alternate', type: 'application/rss+xml', title: 'Veritas Fidei', href: `${siteUrl}/rss.xml` },
  ],
  script: [{ key: 'tema-inicial', innerHTML: scriptTemaInicial, tagPosition: 'head' }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
