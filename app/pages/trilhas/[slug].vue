<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)

const { data: trilha } = await useAsyncData(`trilha-${slug}`, async () => {
  const t = await queryCollection('trilhas')
    .where('stem', '=', `trilhas/${slug}`)
    .where('status', 'IN', statusVisiveis())
    .first()
  if (!t) return null
  const artigos = await queryCollection('artigos')
    .where('path', 'IN', t.artigos.map((s) => `/artigos/${s}`))
    .where('status', 'IN', statusVisiveis())
    .select('path', 'title', 'description', 'status', 'minutos')
    .all()
  const passos = t.artigos
    .map((s) => artigos.find((a) => a.path === `/artigos/${s}`))
    .filter((a) => a !== undefined)
  return { ...t, passos }
})

if (!trilha.value) {
  throw createError({ statusCode: 404, message: 'Trilha não encontrada', fatal: true })
}

const minutos = computed(() => trilha.value?.passos.reduce((soma, p) => soma + (p.minutos ?? 0), 0) ?? 0)

useSeoMeta({ title: trilha.value.title, description: trilha.value.description })
</script>

<template>
  <div v-if="trilha" class="mx-auto max-w-5xl px-6 pt-20">
    <header class="mb-14 flex flex-col gap-4">
      <NuxtLink to="/trilhas" class="rubrica">← Trilhas</NuxtLink>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">{{ trilha.title }}</h1>
      <p class="text-[1.15rem] text-muted">{{ trilha.description }}</p>
      <p class="font-display text-[0.7rem] tracking-[0.16em] text-muted uppercase">
        {{ trilha.passos.length }} artigos<template v-if="minutos"> · {{ minutos }} min de leitura</template>
      </p>
    </header>
    <TrilhaPassos :passos="trilha.passos" />
  </div>
</template>
