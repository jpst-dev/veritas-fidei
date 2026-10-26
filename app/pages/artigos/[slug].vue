<script setup lang="ts">
const route = useRoute()
const { data: temas } = await useTemas()

const { data: artigo } = await useAsyncData(`artigo-${route.path}`, () =>
  queryCollection('artigos').path(route.path).where('status', 'IN', statusVisiveis()).first(),
)

if (!artigo.value) {
  throw createError({ statusCode: 404, message: 'Artigo não encontrado', fatal: true })
}

const slug = slugDe(route.path)
const { data: trilhas } = await useAsyncData(`trilhas-de-${slug}`, async () => {
  const todas = await queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all()
  return todas.filter((t) => t.artigos.includes(slug)).map((t) => {
    const i = t.artigos.indexOf(slug)
    return {
      slug: slugDe(t.stem),
      title: t.title,
      posicao: i + 1,
      total: t.artigos.length,
      anterior: t.artigos[i - 1],
      proximo: t.artigos[i + 1],
    }
  })
})

const nomeDoTema = computed(() => temas.value?.nomes[artigo.value!.tema] ?? artigo.value!.tema)
const indice = computed(() => artigo.value?.body?.toc?.links ?? [])

useSeoMeta({
  title: artigo.value.title,
  description: artigo.value.description,
  ogTitle: artigo.value.title,
  ogDescription: artigo.value.description,
  ogType: 'article',
})
</script>

<template>
  <article v-if="artigo" class="mx-auto max-w-6xl px-6 pt-16">
    <header class="mx-auto flex max-w-3xl flex-col gap-5 text-center">
      <p class="flex flex-wrap items-center justify-center gap-3">
        <NuxtLink :to="`/temas/${artigo.tema}`" class="rubrica">{{ nomeDoTema }}</NuxtLink>
        <span v-if="artigo.secao === 'defesa-da-fe'" class="rubrica">· Defesa da fé</span>
        <StatusSelo :status="artigo.status" />
      </p>
      <h1 class="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.06] font-medium text-balance">{{ artigo.title }}</h1>
      <p class="text-[1.15rem] text-muted">{{ artigo.description }}</p>
    </header>

    <section v-if="artigo.quaestio" class="filete-duplo mx-auto mt-14 max-w-5xl border-y-[3px] py-10" aria-label="Resumo da questão">
      <QuaestioBloco :quaestio="artigo.quaestio" />
    </section>

    <!-- No celular a trilha e o índice vêm antes do texto; no desktop, numa coluna lateral -->
    <div class="mt-14 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
      <div class="min-w-0">
        <ContentRenderer :value="artigo" class="prose prose-vf max-w-none" />

        <section v-if="artigo.referencias.length" class="mt-16 border-t border-line pt-8" aria-labelledby="titulo-referencias">
          <h2 id="titulo-referencias" class="rubrica mb-5">Referências</h2>
          <ol class="flex flex-col gap-3">
            <li v-for="ref in artigo.referencias" :key="ref.titulo">
              <a v-if="ref.url" :href="ref.url" rel="noopener" target="_blank">{{ ref.titulo }}</a>
              <span v-else>{{ ref.titulo }}</span>
              <span v-if="ref.autor" class="text-muted"> — {{ ref.autor }}</span>
            </li>
          </ol>
        </section>
      </div>

      <aside class="order-first flex flex-col gap-10 text-base lg:self-start lg:sticky lg:top-8 lg:order-none">
        <nav v-for="trilha in trilhas" :key="trilha.slug" aria-label="Trilha de estudo" class="border border-line p-5">
          <p class="rubrica mb-1">Trilha · {{ trilha.posicao }} de {{ trilha.total }}</p>
          <NuxtLink :to="`/trilhas/${trilha.slug}`" class="text-xl">{{ trilha.title }}</NuxtLink>
          <p class="mt-3 flex justify-between gap-4 text-muted">
            <NuxtLink v-if="trilha.anterior" :to="`/artigos/${trilha.anterior}`">← Anterior</NuxtLink>
            <span v-else />
            <NuxtLink v-if="trilha.proximo" :to="`/artigos/${trilha.proximo}`">Próximo →</NuxtLink>
          </p>
        </nav>

        <template v-if="indice.length">
          <!-- Celular: recolhido, para não empurrar o texto para baixo -->
          <details class="border-y border-line py-3 lg:hidden">
            <summary class="rubrica cursor-pointer py-1">Neste artigo</summary>
            <ol class="mt-3 flex flex-col gap-2 text-muted">
              <li v-for="item in indice" :key="item.id">
                <a :href="`#${item.id}`">{{ item.text }}</a>
              </li>
            </ol>
          </details>
          <nav class="hidden lg:block" aria-labelledby="titulo-indice">
            <p id="titulo-indice" class="rubrica mb-3">Neste artigo</p>
            <ol class="flex flex-col gap-2 text-muted">
              <li v-for="item in indice" :key="item.id">
                <a :href="`#${item.id}`">{{ item.text }}</a>
              </li>
            </ol>
          </nav>
        </template>
      </aside>
    </div>
  </article>
</template>
