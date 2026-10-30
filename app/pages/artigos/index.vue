<script setup lang="ts">
const { data: temas } = await useTemas()
const { data: artigos } = await useArtigos()
const { data: trilhas } = await useAsyncData('trilhas-visiveis', () =>
  queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all(),
)

// Filtra só no navegador; a página gerada traz o índice completo
const busca = ref('')
const termo = computed(() => semAcentos(busca.value.trim()))

/** Grupos na ordem dos temas, com o número romano do tema; temas sem artigos ficam de fora. */
const grupos = computed(() =>
  (temas.value?.lista ?? [])
    .map((tema, i) => ({
      ...tema,
      num: romano(i + 1),
      artigos: ordemDeLeitura(
        (artigos.value ?? []).filter((a) => a.tema === tema.slug),
        trilhas.value?.find((t) => t.tema === tema.slug),
      ),
    }))
    .filter((g) => g.artigos.length),
)

const gruposVisiveis = computed(() =>
  grupos.value
    .map((g) => ({ ...g, artigos: g.artigos.filter((a) => !termo.value || semAcentos(a.title).includes(termo.value)) }))
    .filter((g) => g.artigos.length),
)

const descricao = 'Todos os artigos do Veritas Fidei, organizados por tema como o índice de um livro.'
useSeoMeta({
  title: 'Todos os artigos',
  description: descricao,
  ogTitle: 'Todos os artigos · Veritas Fidei',
  ogDescription: descricao,
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pt-20">
    <div class="flex flex-col gap-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <header class="flex flex-col gap-4 lg:col-start-2">
        <p class="rubrica">Artigos</p>
        <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Todos os artigos</h1>
        <p class="max-w-2xl text-[1.15rem] text-muted">
          {{ qtdArtigos(artigos?.length ?? 0) }}, organizados como o índice de um livro.
          <span class="font-display text-accent">Q</span> marca as questões da Defesa da fé.
        </p>
      </header>

      <!-- Busca e atalhos: acima da lista no celular, numa coluna lateral no desktop -->
      <aside class="flex flex-col gap-8 lg:sticky lg:top-10 lg:row-span-2 lg:row-start-1 lg:self-start">
        <div class="flex flex-col gap-2.5">
          <label for="busca" class="rubrica text-muted">Procurar pelo título</label>
          <input
            id="busca"
            v-model="busca"
            type="search"
            placeholder="Ex.: batismo"
            class="h-11 border border-line bg-surface px-3.5 text-base text-text placeholder:text-muted focus:border-accent focus:outline-none"
          >
        </div>
        <nav aria-labelledby="titulo-atalhos" class="max-lg:hidden">
          <p id="titulo-atalhos" class="rubrica mb-2 text-muted">Ir para o tema</p>
          <ul>
            <li v-for="g in grupos" :key="g.slug">
              <a :href="`#tema-${g.slug}`" class="flex justify-between gap-3 border-b border-line py-2.5 hover:no-underline">
                <span>{{ g.nome }}</span>
                <span class="text-muted">{{ g.artigos.length }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div class="lg:col-start-2">
        <section v-for="g in gruposVisiveis" :id="`tema-${g.slug}`" :key="g.slug" class="mb-12 scroll-mt-8" :aria-labelledby="`titulo-${g.slug}`">
          <h2 :id="`titulo-${g.slug}`" class="filete-duplo flex items-baseline gap-4 border-b-[3px] pb-3.5 text-[1.75rem] font-medium">
            <span class="font-display text-base text-accent" aria-hidden="true">{{ g.num }}</span>
            <NuxtLink :to="`/temas/${g.slug}`">{{ g.nome }}</NuxtLink>
          </h2>
          <ol>
            <li v-for="artigo in g.artigos" :key="artigo.path" class="border-b border-line">
              <NuxtLink
                :to="artigo.path"
                class="group grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-4.5 hover:no-underline sm:grid-cols-[1.75rem_minmax(0,1fr)_auto]"
              >
                <span class="font-display text-sm text-accent">
                  <template v-if="artigo.secao === 'defesa-da-fe'">Q<span class="sr-only"> (Defesa da fé)</span></template>
                  <span v-else aria-hidden="true">·</span>
                </span>
                <span class="flex flex-wrap items-center gap-3 text-[1.3rem] leading-snug group-hover:text-accent">
                  {{ artigo.title }} <StatusSelo :status="artigo.status" />
                </span>
                <span class="col-start-2 font-display text-[0.68rem] tracking-[0.14em] whitespace-nowrap text-muted uppercase sm:col-start-3 sm:row-start-1">
                  <template v-if="artigo.minutos">{{ artigo.minutos }} min</template>
                  <template v-if="artigo.minutos && artigo.nivel"> · </template>
                  <template v-if="artigo.nivel">{{ NIVEIS[artigo.nivel] }}</template>
                </span>
                <span class="col-[2/3] text-muted sm:col-[2/4]">{{ artigo.description }}</span>
              </NuxtLink>
            </li>
          </ol>
        </section>

        <p v-if="!gruposVisiveis.length" class="text-muted italic">
          <template v-if="termo">Nenhum artigo com “{{ busca }}” no título.</template>
          <template v-else>Os primeiros artigos estão em revisão e serão publicados em breve.</template>
        </p>
      </div>
    </div>
  </div>
</template>
