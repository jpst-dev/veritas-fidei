<script setup lang="ts">
const { data: trilhas } = await useAsyncData('trilhas', async () => {
  const lista = await queryCollection('trilhas').where('status', 'IN', statusVisiveis()).order('title', 'ASC').all()
  return lista.map((t) => ({ ...t, slug: slugDe(t.stem) }))
})

// Cada trilha mostra a obra do seu tema, a duração somada e, em cada passo, o progresso do navegador
const { data: temas } = await useTemas()
const { data: obras } = await useObras()
const { data: artigos } = await useArtigos()
const { lidos } = useLidos()
const cartoes = computed(() =>
  (trilhas.value ?? []).map((trilha) => {
    const passos = ordemDeLeitura((artigos.value ?? []).filter((a) => trilha.artigos.includes(slugDe(a.path))), trilha)
    return {
      ...trilha,
      tema: temas.value?.nomes[trilha.tema] ?? trilha.tema,
      imagem: obras.value?.[temas.value?.lista.find((t) => t.slug === trilha.tema)?.obra ?? ''],
      total: passos.length,
      minutos: passos.reduce((soma, a) => soma + (a.minutos ?? 0), 0),
      lidos: passos.filter((a) => lidos.value.includes(slugDe(a.path))).length,
      passos: passos.map((a) => ({ path: a.path, title: a.title, lido: lidos.value.includes(slugDe(a.path)) })),
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
    <ul v-if="cartoes.length" class="flex flex-col gap-14">
      <li v-for="(trilha, i) in cartoes" :key="trilha.slug">
        <!-- Faixa: a obra do tema com o título por cima, escura nos dois temas -->
        <NuxtLink
          :to="`/trilhas/${trilha.slug}`"
          class="escuro group relative flex min-h-[26rem] items-end overflow-hidden bg-bg hover:no-underline md:aspect-[21/8] md:min-h-0 md:items-center"
        >
          <ObraImagem
            v-if="trilha.imagem"
            :obra="trilha.imagem"
            decorativa
            faixa
            sizes="(min-width: 1152px) 1104px, 100vw"
            class="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span
            class="absolute inset-0 bg-linear-to-b from-transparent from-10% via-bg/80 via-50% to-bg md:bg-linear-to-r md:from-bg md:from-0% md:via-bg/85 md:via-30% md:to-transparent md:to-70%"
            aria-hidden="true"
          />
          <span class="relative flex max-w-lg flex-col gap-3 p-6 sm:p-9">
            <span class="flex flex-wrap items-center gap-3">
              <span class="rubrica">
                Trilha {{ romano(i + 1) }} · {{ qtdArtigos(trilha.total) }}<template v-if="trilha.minutos"> · {{ trilha.minutos }} min</template>
              </span>
              <StatusSelo :status="trilha.status" />
            </span>
            <span class="text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.1] group-hover:text-accent">{{ trilha.title }}</span>
            <span class="text-[1.05rem] text-muted">{{ trilha.description }}</span>
            <span class="btn btn-primario mt-2 self-start">
              {{ trilha.lidos ? `Continuar · ${trilha.lidos} de ${trilha.total}` : 'Começar' }} →
            </span>
          </span>
        </NuxtLink>
        <!-- Passos: cada capítulo leva ao artigo; o lido ganha o fio verde em cima -->
        <ol class="grid border-b border-line md:grid-flow-col md:auto-cols-fr">
          <li v-for="(passo, n) in trilha.passos" :key="passo.path">
            <NuxtLink
              :to="passo.path"
              class="group/passo grid h-full grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 border-t-2 py-3 hover:no-underline md:grid-cols-1 md:gap-y-1.5 md:pt-4 md:pr-5 md:pb-5"
              :class="passo.lido ? 'border-accent' : 'border-line'"
            >
              <span class="font-display text-[0.85rem] text-accent">{{ romano(n + 1) }}<span v-if="passo.lido" class="sr-only"> (lido)</span></span>
              <span class="leading-snug group-hover/passo:text-accent">{{ passo.title }}</span>
            </NuxtLink>
          </li>
        </ol>
      </li>
    </ul>
    <p v-else class="text-muted italic">A primeira trilha está em revisão.</p>
  </div>
</template>
