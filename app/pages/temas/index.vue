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
const { data: obras } = await useObras()
// O cartão mostra só o começo da lista; o resto fica na página do tema
const MAX_LINKS = 3
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

    <ul class="grid items-start gap-7 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="tema in comArtigos" :key="tema.slug" class="flex flex-col bg-surface">
        <NuxtLink :to="`/temas/${tema.slug}`" class="escuro group relative block aspect-[4/3] overflow-hidden bg-bg hover:no-underline">
          <ObraImagem
            v-if="obras?.[tema.obra]"
            :obra="obras[tema.obra]!"
            decorativa
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            class="size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <span class="absolute inset-0 bg-linear-to-b from-transparent from-25% via-bg/80 via-60% to-bg" aria-hidden="true" />
          <div class="absolute inset-x-5 bottom-4 flex flex-col gap-1 sm:inset-x-6">
            <span class="rubrica">{{ tema.num }} · {{ tema.resumo }}</span>
            <h2 class="text-[1.75rem] leading-tight font-medium group-hover:text-accent">{{ tema.nome }}</h2>
          </div>
        </NuxtLink>
        <div class="flex flex-col gap-3 px-5 pt-4 pb-5 sm:px-6">
          <p class="font-display text-[0.68rem] tracking-[0.16em] text-muted uppercase">Neste tema · {{ qtdArtigos(tema.artigos.length) }}</p>
          <!-- Sumário de links, não descrição: cada linha com seta e sublinhado leva ao artigo -->
          <ul class="flex flex-col divide-y divide-line border-y border-line leading-snug">
            <li v-for="a in tema.artigos.slice(0, MAX_LINKS)" :key="a.path">
              <NuxtLink :to="a.path" class="group/link flex items-baseline gap-3 py-2.5 hover:no-underline">
                <span class="text-accent transition-transform group-hover/link:translate-x-0.5" aria-hidden="true">→</span>
                <span class="underline decoration-line underline-offset-4 group-hover/link:text-accent group-hover/link:decoration-accent">{{ a.title }}</span>
              </NuxtLink>
            </li>
            <li v-if="tema.artigos.length > MAX_LINKS" class="py-2.5 text-[0.95rem] text-muted italic">
              e mais {{ qtdArtigos(tema.artigos.length - MAX_LINKS) }} no tema
            </li>
          </ul>
          <p class="mt-1 font-display text-[0.68rem] tracking-[0.14em] uppercase">
            <NuxtLink v-if="tema.trilha" :to="`/trilhas/${tema.trilha.slug}`" class="text-accent">Trilha: {{ tema.trilha.title }} →</NuxtLink>
            <NuxtLink v-else :to="`/temas/${tema.slug}`" class="text-accent">Ver o tema →</NuxtLink>
          </p>
        </div>
      </li>
    </ul>

    <section v-if="emPreparacao.length" class="mt-20" aria-labelledby="titulo-preparacao">
      <h2 id="titulo-preparacao" class="filete-duplo mb-7 border-b-[3px] pb-4 font-display text-xl font-semibold tracking-[0.08em]">
        Em preparação
      </h2>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
        <li v-for="tema in emPreparacao" :key="tema.slug" class="flex flex-col gap-2.5 opacity-70">
          <span class="block aspect-square overflow-hidden bg-surface">
            <ObraImagem
              v-if="obras?.[tema.obra]"
              :obra="obras[tema.obra]!"
              decorativa
              sizes="(min-width: 1024px) 180px, (min-width: 640px) 33vw, 50vw"
              class="size-full grayscale"
            />
          </span>
          <span class="font-display text-[0.62rem] tracking-[0.16em] text-muted uppercase">{{ tema.num }} · Em breve</span>
          <span class="text-[1.15rem] leading-tight">{{ tema.nome }}</span>
          <span class="text-[0.9rem] leading-snug text-muted first-letter:uppercase">{{ tema.resumo }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
