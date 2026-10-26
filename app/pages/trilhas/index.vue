<script setup lang="ts">
const { data: trilhas } = await useAsyncData('trilhas', async () => {
  const lista = await queryCollection('trilhas').where('status', 'IN', statusVisiveis()).order('title', 'ASC').all()
  return lista.map((t) => ({ ...t, slug: slugDe(t.stem) }))
})

useSeoMeta({
  title: 'Trilhas de estudo',
  description: 'Sequências de artigos para ler em ordem, do fundamento ao aprofundamento.',
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
      <li v-for="trilha in trilhas" :key="trilha.slug" class="flex flex-col gap-3 border border-line p-7">
        <p class="flex items-center gap-3">
          <span class="rubrica">{{ trilha.artigos.length }} artigos</span>
          <StatusSelo :status="trilha.status" />
        </p>
        <NuxtLink :to="`/trilhas/${trilha.slug}`" class="text-[1.8rem] leading-tight font-medium">{{ trilha.title }}</NuxtLink>
        <p class="text-muted">{{ trilha.description }}</p>
      </li>
    </ul>
    <p v-else class="text-muted italic">A primeira trilha está em revisão.</p>
  </div>
</template>
