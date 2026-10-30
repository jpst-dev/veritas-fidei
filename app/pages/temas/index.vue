<script setup lang="ts">
const { data: temas } = await useTemas()
const { data: artigos } = await useArtigos()
const { data: trilhas } = await useAsyncData('trilhas-visiveis', () =>
  queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all(),
)

// O número romano é a posição do tema no "livro", mesmo quando ele ainda está em preparação
const lista = computed(() =>
  (temas.value?.lista ?? []).map((tema, i) => {
    const trilha = trilhas.value?.find((t) => t.tema === tema.slug)
    return {
      ...tema,
      num: romano(i + 1),
      artigos: ordemDeLeitura((artigos.value ?? []).filter((a) => a.tema === tema.slug), trilha),
      trilha: trilha ? { slug: slugDe(trilha.stem), title: trilha.title } : null,
    }
  }),
)
const comArtigos = computed(() => lista.value.filter((t) => t.artigos.length))
const emPreparacao = computed(() => lista.value.filter((t) => !t.artigos.length))

const descricao = 'Os temas da fé católica, do Credo à vida moral, organizados como os capítulos de um livro.'
useSeoMeta({
  title: 'Temas',
  description: descricao,
  ogTitle: 'Temas · Veritas Fidei',
  ogDescription: descricao,
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pt-20">
    <header class="mb-12 flex flex-col gap-4">
      <p class="rubrica">Temas</p>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Temas da fé</h1>
      <p class="max-w-2xl text-[1.15rem] text-muted">
        Do Credo à vida moral. Os temas com artigos vêm primeiro; os outros estão sendo escritos com calma, um texto revisado
        de cada vez.
      </p>
    </header>

    <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="tema in comArtigos" :key="tema.slug" class="flex flex-col bg-surface gap-3 border-t-[3px] border-accent p-6 sm:p-7">
        <p class="flex justify-between gap-3 font-display text-[0.68rem] tracking-[0.16em] text-accent uppercase">
          <span>{{ tema.num }} · {{ tema.resumo }}</span>
          <span class="whitespace-nowrap">{{ qtdArtigos(tema.artigos.length) }}</span>
        </p>
        <h2 class="text-[1.75rem] leading-tight font-medium">
          <NuxtLink :to="`/temas/${tema.slug}`">{{ tema.nome }}</NuxtLink>
        </h2>
        <ul class="flex flex-col gap-2 leading-snug text-muted">
          <li v-for="a in tema.artigos" :key="a.path">
            <NuxtLink :to="a.path" class="hover:text-text">— {{ a.title }}</NuxtLink>
          </li>
        </ul>
        <p class="mt-auto border-t border-line pt-4 font-display text-[0.68rem] tracking-[0.14em] uppercase">
          <NuxtLink v-if="tema.trilha" :to="`/trilhas/${tema.trilha.slug}`" class="text-accent">Trilha: {{ tema.trilha.title }} →</NuxtLink>
          <NuxtLink v-else :to="`/temas/${tema.slug}`" class="text-muted">Ver o tema →</NuxtLink>
        </p>
      </li>
    </ul>

    <section v-if="emPreparacao.length" class="mt-14" aria-labelledby="titulo-preparacao">
      <h2 id="titulo-preparacao" class="rubrica mb-2 text-muted">Em preparação</h2>
      <ul class="filete-duplo grid border-t-[3px] sm:grid-cols-2 sm:gap-x-12">
        <li
          v-for="tema in emPreparacao"
          :key="tema.slug"
          class="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-line py-4"
        >
          <span class="font-display text-sm text-muted" aria-hidden="true">{{ tema.num }}</span>
          <span class="text-[1.2rem]">{{ tema.nome }} <span class="text-[0.95rem] text-muted">· {{ tema.resumo }}</span></span>
          <span class="font-display text-[0.62rem] tracking-[0.18em] text-muted uppercase">Em breve</span>
        </li>
      </ul>
    </section>
  </div>
</template>
