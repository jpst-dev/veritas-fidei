<script setup lang="ts">
const status = statusVisiveis()
const { data: temas } = await useTemas()

const { data: home } = await useAsyncData('home', async () => {
  const [trilha, destaque, objecoes, recentes] = await Promise.all([
    queryCollection('trilhas').where('status', 'IN', status).first(),
    queryCollection('artigos')
      .where('secao', '=', 'defesa-da-fe')
      .where('status', 'IN', status)
      .where('quaestio', 'IS NOT NULL')
      .select('path', 'title', 'quaestio')
      .first(),
    queryCollection('artigos')
      .where('secao', '=', 'defesa-da-fe')
      .where('status', 'IN', status)
      .select('path', 'title')
      .limit(5)
      .all(),
    queryCollection('artigos')
      .where('status', 'IN', status)
      .order('publicadoEm', 'DESC')
      .select('path', 'title', 'description', 'tema', 'status', 'minutos', 'nivel')
      .limit(3)
      .all(),
  ])

  const passos = trilha
    ? await queryCollection('artigos')
        .where('path', 'IN', trilha.artigos.map((slug) => `/artigos/${slug}`))
        .select('path', 'title', 'minutos')
        .all()
    : []
  const passosEmOrdem = trilha
    ? trilha.artigos
        .map((slug) => passos.find((p) => p.path === `/artigos/${slug}`))
        .filter((p) => p !== undefined)
    : []

  return {
    trilha: trilha ? { ...trilha, slug: slugDe(trilha.stem), passos: passosEmOrdem } : null,
    destaque,
    objecoes: objecoes.filter((o) => o.path !== destaque?.path).slice(0, 4),
    recentes,
  }
})

useSeoMeta({
  title: null,
  ogTitle: 'Veritas Fidei — Formação católica',
  description: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
  ogDescription: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto flex max-w-6xl flex-col items-center gap-7 px-6 pt-28 pb-24 text-center">
      <p class="rubrica">Formação católica</p>
      <h1 class="max-w-4xl text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.04] font-medium text-balance">
        <span class="font-display text-[1.12em] text-accent">C</span>onhecer a fé para <span class="whitespace-nowrap">amá-la</span> — e saber dar razão dela.
      </h1>
      <p class="max-w-2xl text-[1.15rem] text-muted">
        Artigos revisados e trilhas de estudo para quem quer entender o que a Igreja ensina, por que ensina e onde isso
        está nas Escrituras e na Tradição.
      </p>
      <div class="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:justify-center">
        <NuxtLink to="/trilhas" class="btn btn-primario justify-center">Começar pelos fundamentos</NuxtLink>
        <NuxtLink to="/temas" class="btn btn-secundario justify-center">Explorar temas</NuxtLink>
      </div>
      <figure class="mt-12 flex flex-col items-center gap-3 text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5">
        <span class="hidden h-px w-16 bg-accent lg:block" aria-hidden="true" />
        <blockquote class="text-[1.2rem] italic">“Estai sempre prontos a dar razão da vossa esperança.”</blockquote>
        <figcaption class="rubrica">1Pd 3,15</figcaption>
        <span class="hidden h-px w-16 bg-accent lg:block" aria-hidden="true" />
      </figure>
    </section>

    <!-- Índice dos temas -->
    <section class="mx-auto flex max-w-6xl flex-wrap gap-16 px-6 pb-24" aria-labelledby="titulo-index">
      <div class="flex-[1_1_16rem]">
        <h2 id="titulo-index" class="mb-3 font-display text-3xl font-semibold tracking-[0.08em]">Temas</h2>
        <p class="text-muted">Os temas da fé, organizados como um livro: comece por qualquer capítulo.</p>
      </div>
      <ol class="flex-[3_1_32rem]">
        <li v-for="(tema, i) in temas?.lista" :key="tema.slug" class="flex items-baseline gap-3 border-b border-line py-3.5">
          <span class="min-w-11 font-display text-accent" aria-hidden="true">{{ romano(i + 1) }}</span>
          <NuxtLink :to="`/temas/${tema.slug}`" class="text-2xl font-medium">{{ tema.nome }}</NuxtLink>
          <span class="flex-1 -translate-y-1.5 border-b border-dotted border-line" aria-hidden="true" />
          <span class="hidden text-base text-muted italic sm:inline">{{ tema.resumo }}</span>
        </li>
      </ol>
    </section>

    <!-- Defesa da fé -->
    <section class="filete-duplo border-y-[3px] bg-surface" aria-labelledby="titulo-defesa">
      <div class="mx-auto flex max-w-6xl flex-col gap-9 px-6 py-22">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="rubrica mb-2">Defesa da fé · Quæstio</p>
            <h2 id="titulo-defesa" class="text-[2.4rem] leading-tight font-medium">
              <NuxtLink v-if="home?.destaque" :to="home.destaque.path">{{ home.destaque.title }}</NuxtLink>
              <template v-else>Perguntas difíceis, respostas fundamentadas.</template>
            </h2>
          </div>
          <NuxtLink to="/defesa-da-fe" class="rubrica">Todas as questões →</NuxtLink>
        </div>
        <QuaestioBloco v-if="home?.destaque?.quaestio" :quaestio="home.destaque.quaestio" />
        <ul v-if="home?.objecoes.length" class="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 italic">
          <li v-for="objecao in home.objecoes" :key="objecao.path">
            <NuxtLink :to="objecao.path">{{ objecao.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Trilha em destaque -->
    <section v-if="home?.trilha" class="mx-auto flex max-w-6xl flex-wrap gap-16 px-6 py-24" aria-labelledby="titulo-trilha">
      <div class="flex flex-[1_1_16rem] flex-col gap-4">
        <p class="rubrica">Trilha de estudo</p>
        <h2 id="titulo-trilha" class="text-[2.4rem] leading-tight font-medium">
          <NuxtLink :to="`/trilhas/${home.trilha.slug}`">{{ home.trilha.title }}</NuxtLink>
        </h2>
        <p class="text-muted">{{ home.trilha.description }}</p>
      </div>
      <TrilhaPassos :passos="home.trilha.passos" compacto class="flex-[3_1_32rem]" />
    </section>

    <!-- Recentes -->
    <section class="mx-auto flex max-w-6xl flex-col gap-8 px-6" :class="{ 'pt-24': !home?.trilha }" aria-labelledby="titulo-recentes">
      <h2 id="titulo-recentes" class="filete-duplo border-b-[3px] pb-4 font-display text-3xl font-semibold tracking-[0.08em]">
        Publicados recentemente
      </h2>
      <ArtigoLista v-if="home?.recentes.length" :artigos="home.recentes" :nomes-dos-temas="temas?.nomes" />
      <p v-else class="text-muted italic">Os primeiros artigos estão em revisão e serão publicados em breve.</p>
    </section>
  </div>
</template>
