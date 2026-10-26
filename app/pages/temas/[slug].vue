<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const { data: temas } = await useTemas()
const tema = computed(() => temas.value?.lista.find((t) => t.slug === slug))

if (!tema.value) {
  throw createError({ statusCode: 404, message: 'Tema não encontrado', fatal: true })
}

const { data: artigos } = await useAsyncData(`tema-${slug}`, () =>
  queryCollection('artigos')
    .where('tema', '=', slug)
    .where('status', 'IN', statusVisiveis())
    .order('title', 'ASC')
    .select('path', 'title', 'description', 'tema', 'status', 'secao', 'minutos', 'nivel')
    .all(),
)

const aprender = computed(() => artigos.value?.filter((a) => a.secao === 'aprender') ?? [])
const defesa = computed(() => artigos.value?.filter((a) => a.secao === 'defesa-da-fe') ?? [])

useSeoMeta({
  title: tema.value.nome,
  description: tema.value.descricao,
  ogTitle: `${tema.value.nome} · Veritas Fidei`,
  ogDescription: tema.value.descricao,
})
</script>

<template>
  <div v-if="tema" class="mx-auto max-w-6xl px-6 pt-20">
    <header class="mb-14 flex flex-col gap-4">
      <NuxtLink to="/temas" class="rubrica">← Index</NuxtLink>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">{{ tema.nome }}</h1>
      <p class="max-w-2xl text-[1.15rem] text-muted">{{ tema.descricao }}</p>
    </header>

    <ArtigoLista v-if="aprender.length" :artigos="aprender" :nomes-dos-temas="temas?.nomes" />

    <section v-if="defesa.length" class="mt-20" aria-labelledby="titulo-defesa">
      <h2 id="titulo-defesa" class="filete-duplo mb-8 border-b-[3px] pb-4 font-display text-2xl font-semibold tracking-[0.08em]">
        Defesa da fé
      </h2>
      <ArtigoLista :artigos="defesa" :nomes-dos-temas="temas?.nomes" />
    </section>

    <p v-if="!artigos?.length" class="text-muted italic">Os artigos deste tema estão em revisão.</p>
  </div>
</template>
