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
    .select('path', 'title', 'description', 'status')
    .all()
  const passos = t.artigos
    .map((s) => artigos.find((a) => a.path === `/artigos/${s}`))
    .filter((a) => a !== undefined)
  return { ...t, passos }
})

if (!trilha.value) {
  throw createError({ statusCode: 404, message: 'Trilha não encontrada', fatal: true })
}

useSeoMeta({ title: trilha.value.title, description: trilha.value.description })
</script>

<template>
  <div v-if="trilha" class="mx-auto max-w-4xl px-6 pt-20">
    <header class="mb-14 flex flex-col gap-4">
      <NuxtLink to="/trilhas" class="rubrica">← Trilhas</NuxtLink>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">{{ trilha.title }}</h1>
      <p class="text-[1.15rem] text-muted">{{ trilha.description }}</p>
    </header>
    <ol>
      <li v-for="(passo, i) in trilha.passos" :key="passo.path" class="flex gap-6 border-b border-line py-7">
        <span class="min-w-12 font-display text-3xl text-accent" aria-hidden="true">{{ romano(i + 1) }}</span>
        <div class="flex flex-col gap-2">
          <p><StatusSelo :status="passo.status" /></p>
          <NuxtLink :to="passo.path" class="text-[1.6rem] leading-tight font-medium">{{ passo.title }}</NuxtLink>
          <p class="text-muted">{{ passo.description }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>
