<script setup lang="ts">
const { data: trilhas } = await useAsyncData('trilhas', async () => {
  const lista = await queryCollection('trilhas').where('status', 'IN', statusVisiveis()).order('title', 'ASC').all()
  return lista.map((t) => ({ ...t, slug: slugDe(t.stem) }))
})

// Cada trilha mostra a obra do seu tema, a duração somada e o progresso do navegador
const { data: temas } = await useTemas()
const { data: obras } = await useObras()
const { data: artigos } = await useArtigos()
const { lidos } = useLidos()
const cartoes = computed(() =>
  (trilhas.value ?? []).map((trilha) => {
    const passos = (artigos.value ?? []).filter((a) => trilha.artigos.includes(slugDe(a.path)))
    return {
      ...trilha,
      tema: temas.value?.nomes[trilha.tema] ?? trilha.tema,
      imagem: obras.value?.[temas.value?.lista.find((t) => t.slug === trilha.tema)?.obra ?? ''],
      total: passos.length,
      minutos: passos.reduce((soma, a) => soma + (a.minutos ?? 0), 0),
      lidos: passos.filter((a) => lidos.value.includes(slugDe(a.path))).length,
      slugs: trilha.artigos.filter((s) => passos.some((a) => slugDe(a.path) === s)),
    }
  }),
)

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
    <ul v-if="cartoes.length" class="flex flex-col gap-8">
      <li v-for="(trilha, i) in cartoes" :key="trilha.slug">
        <NuxtLink
          :to="`/trilhas/${trilha.slug}`"
          class="group grid overflow-hidden bg-surface hover:no-underline md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
        >
          <span class="block aspect-[4/3] overflow-hidden bg-bg">
            <ObraImagem
              v-if="trilha.imagem"
              :obra="trilha.imagem"
              decorativa
              sizes="(min-width: 1152px) 600px, (min-width: 768px) 52vw, 100vw"
              class="size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          </span>
          <span class="flex flex-col justify-center gap-4 p-6 sm:p-10 lg:px-12">
            <span class="flex flex-wrap items-center gap-3">
              <span class="rubrica">Trilha {{ romano(i + 1) }}<template v-if="trilha.tema !== trilha.title"> · {{ trilha.tema }}</template></span>
              <StatusSelo :status="trilha.status" />
            </span>
            <span class="text-[clamp(1.9rem,3.5vw,2.5rem)] leading-[1.1] group-hover:text-accent">{{ trilha.title }}</span>
            <span class="text-[1.1rem] text-muted">{{ trilha.description }}</span>
            <TrilhaProgresso :slugs="trilha.slugs" class="mt-2" />
            <span class="flex flex-wrap justify-between gap-x-6 gap-y-2 font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">
              <span>
                {{ qtdArtigos(trilha.total) }}<template v-if="trilha.minutos"> · {{ trilha.minutos }} min</template><template v-if="trilha.lidos"> · {{ trilha.lidos }} de {{ trilha.total }} lido{{ trilha.lidos > 1 ? 's' : '' }}</template>
              </span>
              <span class="text-accent">{{ trilha.lidos ? 'Continuar' : 'Começar' }} →</span>
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="text-muted italic">A primeira trilha está em revisão.</p>
  </div>
</template>
