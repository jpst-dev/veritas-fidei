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
// A capa mostra só o começo da lista; o resto fica na página do tema
const MAX_LINKS = 2

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
        Do Credo à vida moral, na ordem de um livro. Os temas em cinza estão sendo escritos com calma, um texto revisado de
        cada vez.
      </p>
    </header>

    <!-- Capas na ordem do "livro": a obra ocupa o cartão; os temas sem artigos ficam em cinza -->
    <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
      <li v-for="tema in lista" :key="tema.slug" class="max-sm:[&:last-child:nth-child(odd)]:col-span-2">
        <NuxtLink
          :to="`/temas/${tema.slug}`"
          class="escuro group relative block aspect-[3/4] overflow-hidden bg-bg hover:no-underline max-sm:[li:last-child:nth-child(odd)>&]:aspect-[16/9]"
          :class="{ 'opacity-60 hover:opacity-90': !tema.artigos.length }"
        >
          <ObraImagem
            v-if="obras?.[tema.obra]"
            :obra="obras[tema.obra]!"
            decorativa
            sizes="(min-width: 1152px) 370px, (min-width: 640px) 33vw, 50vw"
            class="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
            :class="{ grayscale: !tema.artigos.length }"
          />
          <span class="absolute inset-0 bg-linear-to-b from-transparent from-20% via-bg/80 via-55% to-bg to-90%" aria-hidden="true" />
          <span class="absolute inset-x-3 bottom-3 flex flex-col gap-1.5 sm:inset-x-5 sm:bottom-5">
            <span class="font-display text-[1.6rem] leading-none sm:text-[2rem]" :class="tema.artigos.length ? 'text-accent' : 'text-muted'">{{ tema.num }}</span>
            <span class="font-display text-[0.6rem] tracking-[0.16em] uppercase sm:text-[0.68rem]" :class="tema.artigos.length ? 'text-accent' : 'text-muted'">
              <template v-if="tema.artigos.length">{{ qtdArtigos(tema.artigos.length) }}<template v-if="tema.trilha"> · trilha</template></template>
              <template v-else>Em breve</template>
            </span>
            <h2 class="text-[1.2rem] leading-tight font-normal group-hover:text-accent sm:text-[1.6rem]">{{ tema.nome }}</h2>
            <!-- Os títulos ficam para telas largas; no celular e no tablet a capa mostra só o tema -->
            <!-- Altura mínima de três linhas, para os nomes dos temas ficarem alinhados na fileira -->
            <ul class="mt-1 hidden min-h-[4.9rem] flex-col gap-1 border-t border-line pt-2.5 text-[0.92rem] leading-snug text-muted lg:flex">
              <li v-for="a in tema.artigos.slice(0, MAX_LINKS)" :key="a.path" class="flex gap-2">
                <span class="text-accent" aria-hidden="true">→</span><span>{{ a.title }}</span>
              </li>
              <li v-if="tema.artigos.length > MAX_LINKS" class="pl-5 italic">e mais {{ tema.artigos.length - MAX_LINKS }}</li>
              <li v-if="!tema.artigos.length" class="italic">{{ tema.resumo.charAt(0).toUpperCase() + tema.resumo.slice(1) }}</li>
            </ul>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
