<script setup lang="ts">
const { data: trilhas } = await useAsyncData('trilhas', async () => {
  const lista = await queryCollection('trilhas').where('status', 'IN', statusVisiveis()).order('title', 'ASC').all()
  return lista.map((t) => ({ ...t, slug: slugDe(t.stem) }))
})

useSeoMeta({
  title: 'Trilhas de estudo',
  description: 'Sequências de artigos para ler em ordem, do fundamento ao aprofundamento.',
  ogTitle: 'Trilhas de estudo · Veritas Fidei',
  ogDescription: 'Sequências de artigos para ler em ordem, do fundamento ao aprofundamento.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pt-20">
    <header class="mb-14 flex flex-col gap-4">
      <p class="rubrica">Trilhas</p>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Trilhas de estudo</h1>
      <p class="max-w-2xl text-[1.15rem] text-muted">Artigos para ler em ordem, capítulo após capítulo.</p>
    </header>
    <ul v-if="trilhas?.length" class="grid gap-8 md:grid-cols-2">
      <li v-for="(trilha, i) in trilhas" :key="trilha.slug">
        <NuxtLink :to="`/trilhas/${trilha.slug}`" class="card-capitulo flex h-full gap-4 border-l-[3px] border-accent p-5 sm:gap-5 sm:p-7">
          <span class="min-w-[0.9em] shrink-0 font-display text-3xl leading-[0.9] text-accent sm:text-5xl" aria-hidden="true">{{ romano(i + 1) }}</span>
          <span class="flex flex-col gap-3">
            <span class="flex items-center gap-3">
              <span class="rubrica">{{ trilha.artigos.length }} artigos</span>
              <StatusSelo :status="trilha.status" />
            </span>
            <span class="text-[1.8rem] leading-tight font-medium">{{ trilha.title }}</span>
            <span class="text-muted">{{ trilha.description }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="text-muted italic">A primeira trilha está em revisão.</p>
  </div>
</template>
