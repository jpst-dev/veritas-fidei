<script setup lang="ts">
const status = statusVisiveis()
const { data: temas } = await useTemas()
const { data: artigos } = await useArtigos()

const { data: trilha } = await useAsyncData('home-trilha', async () => {
  const trilha = await queryCollection('trilhas').where('status', 'IN', status).first()
  if (!trilha) return null
  const passos = await queryCollection('artigos')
    .where('path', 'IN', trilha.artigos.map((slug) => `/artigos/${slug}`))
    .where('status', 'IN', status)
    .select('path', 'title', 'minutos')
    .all()
  const passosEmOrdem = trilha.artigos
    .map((slug) => passos.find((p) => p.path === `/artigos/${slug}`))
    .filter((p) => p !== undefined)
  const minutos = passosEmOrdem.reduce((soma, p) => soma + (p.minutos ?? 0), 0)
  return { ...trilha, slug: slugDe(trilha.stem), passos: passosEmOrdem, minutos }
})

const recentes = computed(() => artigos.value?.slice(0, 3) ?? [])
const questoes = computed(() => artigos.value?.filter((a) => a.secao === 'defesa-da-fe').slice(0, 4) ?? [])

// Na home só aparecem os temas com artigos; os demais viram uma linha "em breve"
const temasComArtigos = computed(() =>
  (temas.value?.lista ?? [])
    .map((tema) => ({ ...tema, qtd: artigos.value?.filter((a) => a.tema === tema.slug).length ?? 0 }))
    .filter((t) => t.qtd),
)
const temasEmBreve = computed(() =>
  (temas.value?.lista ?? []).filter((t) => !temasComArtigos.value.some((c) => c.slug === t.slug)),
)

useSeoMeta({
  title: null,
  ogTitle: 'Veritas Fidei — Formação católica',
  description: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
  ogDescription: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6">
    <!-- Abertura curta: o conteúdo começa logo abaixo -->
    <section class="flex flex-col gap-5 pt-12 pb-10 sm:items-center sm:pt-20 sm:pb-16 sm:text-center">
      <p class="rubrica">Formação católica · Artigos revisados</p>
      <h1 class="max-w-4xl text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.1] font-medium text-balance">
        <span class="font-display text-[1.12em] text-accent">C</span>onhecer a fé para <span class="whitespace-nowrap">amá-la</span> — e saber dar razão dela.
      </h1>
      <div class="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
        <NuxtLink v-if="trilha" :to="`/trilhas/${trilha.slug}`" class="btn btn-primario justify-center">Começar a trilha</NuxtLink>
        <NuxtLink to="/artigos" class="btn btn-secundario justify-center">Ver todos os artigos</NuxtLink>
      </div>
    </section>

    <!-- Trilha em destaque -->
    <section v-if="trilha" class="filete-duplo border-t-[3px] pt-10 sm:pt-12" aria-labelledby="titulo-trilha">
      <p class="rubrica mb-2.5">
        Comece por aqui · {{ qtdArtigos(trilha.passos.length) }}<template v-if="trilha.minutos"> · {{ trilha.minutos }} min</template>
      </p>
      <div class="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2 id="titulo-trilha" class="text-[clamp(1.8rem,4vw,2.5rem)] leading-tight font-medium">
          <NuxtLink :to="`/trilhas/${trilha.slug}`">{{ trilha.title }}</NuxtLink>
        </h2>
        <NuxtLink :to="`/trilhas/${trilha.slug}`" class="rubrica max-sm:hidden">Ver a trilha →</NuxtLink>
      </div>
      <TrilhaPassos :passos="trilha.passos" compacto />
    </section>

    <!-- Recentes -->
    <section class="mt-16 sm:mt-20" aria-labelledby="titulo-recentes">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2 id="titulo-recentes" class="font-display text-2xl font-semibold tracking-[0.08em]">Artigos recentes</h2>
        <NuxtLink to="/artigos" class="rubrica max-sm:hidden">Todos os artigos →</NuxtLink>
      </div>
      <ArtigoLista v-if="recentes.length" :artigos="recentes" :nomes-dos-temas="temas?.nomes" />
      <p v-else class="text-muted italic">Os primeiros artigos estão em revisão e serão publicados em breve.</p>
      <NuxtLink to="/artigos" class="btn btn-secundario mt-4 w-full justify-center sm:hidden">Todos os artigos →</NuxtLink>
    </section>

    <!-- Temas e Defesa da fé, compactos -->
    <div class="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-2">
      <section aria-labelledby="titulo-temas">
        <div class="filete-duplo flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[3px] pb-3.5">
          <h2 id="titulo-temas" class="font-display text-[1.4rem] font-semibold tracking-[0.08em]">Temas</h2>
          <NuxtLink to="/temas" class="rubrica">Todos os {{ temas?.lista.length }} →</NuxtLink>
        </div>
        <ul>
          <li v-for="tema in temasComArtigos" :key="tema.slug" class="border-b border-line">
            <NuxtLink :to="`/temas/${tema.slug}`" class="group flex min-h-12 items-center justify-between gap-4 text-[1.15rem] hover:no-underline">
              <span class="group-hover:text-accent">{{ tema.nome }}</span>
              <span class="font-display text-[0.68rem] tracking-[0.14em] whitespace-nowrap text-muted uppercase">{{ qtdArtigos(tema.qtd) }}</span>
            </NuxtLink>
          </li>
          <li v-if="temasEmBreve.length" class="flex min-h-12 items-center justify-between gap-4 border-b border-line text-[1.15rem] text-muted">
            <span>
              {{ temasEmBreve.slice(0, 2).map((t) => t.nome).join(', ') }}<template v-if="temasEmBreve.length > 2"> e mais {{ temasEmBreve.length - 2 }}</template>
            </span>
            <span class="font-display text-[0.68rem] tracking-[0.14em] whitespace-nowrap uppercase">Em breve</span>
          </li>
        </ul>
      </section>

      <section v-if="questoes.length" aria-labelledby="titulo-defesa">
        <div class="filete-duplo flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b-[3px] pb-3.5">
          <h2 id="titulo-defesa" class="font-display text-[1.4rem] font-semibold tracking-[0.08em]">Defesa da fé</h2>
          <NuxtLink to="/defesa-da-fe" class="rubrica">Todas as questões →</NuxtLink>
        </div>
        <ul>
          <li v-for="q in questoes" :key="q.path" class="border-b border-line">
            <NuxtLink :to="q.path" class="group flex items-baseline gap-3.5 py-3.5 text-[1.15rem] leading-snug hover:no-underline">
              <span class="font-display text-sm text-accent" aria-hidden="true">Q</span>
              <span class="group-hover:text-accent">{{ q.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
