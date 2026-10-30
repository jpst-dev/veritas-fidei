<script setup lang="ts">
const route = useRoute()
const { data: temas } = await useTemas()
const { lidos, marcarLido } = useLidos()

const { data: artigo } = await useAsyncData(`artigo-${route.path}`, () =>
  queryCollection('artigos').path(route.path).where('status', 'IN', statusVisiveis()).first(),
)

if (!artigo.value) {
  throw createError({ statusCode: 404, message: 'Artigo não encontrado', fatal: true })
}

const slug = slugDe(route.path)
const { data: trilhas } = await useAsyncData(`trilhas-de-${slug}`, async () => {
  const todas = await queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all()
  const minhas = todas.filter((t) => t.artigos.includes(slug))
  const vizinhos = minhas.flatMap((t) => {
    const i = t.artigos.indexOf(slug)
    return [t.artigos[i - 1], t.artigos[i + 1]].filter((s) => s !== undefined)
  })
  const titulos = vizinhos.length
    ? await queryCollection('artigos')
        .where('path', 'IN', vizinhos.map((s) => `/artigos/${s}`))
        .where('status', 'IN', statusVisiveis())
        .select('path', 'title')
        .all()
    : []
  const passo = (s?: string) => {
    const a = s ? titulos.find((t) => t.path === `/artigos/${s}`) : undefined
    return a ? { path: a.path, title: a.title } : null
  }
  return minhas.map((t) => {
    const i = t.artigos.indexOf(slug)
    return {
      slug: slugDe(t.stem),
      title: t.title,
      artigos: t.artigos,
      posicao: i + 1,
      total: t.artigos.length,
      anterior: passo(t.artigos[i - 1]),
      proximo: passo(t.artigos[i + 1]),
    }
  })
})

const trilha = computed(() => trilhas.value?.[0])

// Fim do artigo: até 3 leituras, primeiro do mesmo tema, sem repetir o que a trilha já oferece
const { data: todos } = await useArtigos()
const { data: trilhasVisiveis } = await useAsyncData('trilhas-visiveis', () =>
  queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all(),
)
const continueLendo = computed(() => {
  const jaOferecidos = [route.path, trilha.value?.anterior?.path, trilha.value?.proximo?.path]
  const candidatos = (todos.value ?? []).filter((a) => !jaOferecidos.includes(a.path))
  return [
    ...candidatos.filter((a) => a.tema === artigo.value!.tema),
    ...candidatos.filter((a) => a.tema !== artigo.value!.tema),
  ].slice(0, 3)
})
// Quem chegou fora de uma trilha recebe o convite para ler em ordem, de preferência no mesmo tema
const trilhaSugerida = computed(() => {
  if (trilha.value) return null
  const lista = trilhasVisiveis.value ?? []
  const t = lista.find((t) => t.tema === artigo.value!.tema) ?? lista[0]
  if (!t) return null
  const minutos = t.artigos.reduce((soma, s) => soma + (todos.value?.find((a) => a.path === `/artigos/${s}`)?.minutos ?? 0), 0)
  return { slug: slugDe(t.stem), title: t.title, total: t.artigos.length, minutos }
})
const nomeDoTema = computed(() => temas.value?.nomes[artigo.value!.tema] ?? artigo.value!.tema)
const indice = computed(() => artigo.value?.body?.toc?.links ?? [])

// O artigo conta como lido quando o leitor chega ao fim do texto
const texto = ref<HTMLElement | null>(null)
const fim = ref<HTMLElement | null>(null)
let observador: IntersectionObserver | undefined
onMounted(() => {
  if (!fim.value) return
  observador = new IntersectionObserver(([entrada]) => {
    if (entrada?.isIntersecting) {
      marcarLido(slug)
      observador?.disconnect()
    }
  })
  observador.observe(fim.value)
})
onBeforeUnmount(() => observador?.disconnect())

useSeoMeta({
  title: artigo.value.title,
  description: artigo.value.description,
  ogTitle: artigo.value.title,
  ogDescription: artigo.value.description,
  ogType: 'article',
  // Imagem com o título, gerada por scripts/og.ts para quem não é rascunho
  ...(artigo.value.status !== 'rascunho' && {
    ogImage: `${useRuntimeConfig().public.siteUrl}/og/artigos/${slug}.png`,
    ogImageAlt: artigo.value.title,
  }),
})
</script>

<template>
  <article v-if="artigo" class="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
    <BarraLeitura :alvo="texto" />

    <header class="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
      <p class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <NuxtLink :to="`/temas/${artigo.tema}`" class="rubrica">{{ nomeDoTema }}</NuxtLink>
        <span v-if="artigo.secao === 'defesa-da-fe'" class="rubrica">· Defesa da fé</span>
        <span v-if="trilha" class="rubrica">· Trilha {{ romano(trilha.posicao) }} de {{ romano(trilha.total) }}</span>
        <StatusSelo :status="artigo.status" />
      </p>
      <h1 class="text-[clamp(2.1rem,5.5vw,3.5rem)] leading-[1.1] font-medium text-balance">{{ artigo.title }}</h1>
      <p class="max-w-2xl text-[1.2rem] leading-relaxed text-muted italic">{{ artigo.description }}</p>
      <p class="mt-1 flex flex-wrap justify-center gap-x-5 gap-y-2 font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">
        <span v-if="artigo.minutos">{{ artigo.minutos }} min de leitura</span>
        <span v-if="artigo.nivel">Nível {{ NIVEIS[artigo.nivel] }}</span>
        <span v-if="artigo.revisao.citacoesConferidas" class="text-accent">✓ Citações conferidas</span>
      </p>
    </header>

    <section v-if="artigo.quaestio" class="filete-duplo mx-auto mt-14 max-w-5xl border-y-[3px] py-10" aria-label="Resumo da questão">
      <QuaestioBloco :quaestio="artigo.quaestio" />
    </section>

    <!-- No celular a trilha e o índice vêm antes do texto; no desktop, numa coluna lateral -->
    <div class="mt-12 flex flex-col gap-8 sm:mt-16 lg:grid lg:grid-cols-[14rem_minmax(0,39rem)] lg:justify-center lg:gap-16">
      <aside class="flex flex-col gap-8 text-[0.95rem] lg:sticky lg:top-10 lg:gap-10 lg:self-start">
        <nav v-if="trilha" aria-label="Trilha de estudo" class="max-lg:border-l-[3px] max-lg:border-accent max-lg:bg-surface max-lg:p-5 lg:order-last lg:border-t lg:border-line lg:pt-8">
          <p class="rubrica mb-2">Trilha</p>
          <NuxtLink :to="`/trilhas/${trilha.slug}`" class="text-lg leading-snug">{{ trilha.title }}</NuxtLink>
          <ol class="mt-3 flex gap-1.5" :aria-label="`Artigo ${trilha.posicao} de ${trilha.total}`">
            <li
              v-for="(s, i) in trilha.artigos"
              :key="s"
              class="h-[3px] flex-1"
              :class="i < trilha.posicao || lidos.includes(s) ? 'bg-accent' : 'bg-line'"
            />
          </ol>
        </nav>

        <template v-if="indice.length">
          <!-- Celular: recolhido, para não empurrar o texto para baixo -->
          <details class="border-y border-line py-3 lg:hidden">
            <summary class="rubrica cursor-pointer py-1">Neste artigo</summary>
            <ol class="mt-3 flex flex-col gap-2.5 text-muted">
              <li v-for="(item, i) in indice" :key="item.id" class="flex gap-3">
                <span class="w-7 shrink-0 font-display text-xs leading-7 text-accent">{{ romano(i + 1) }}</span>
                <a :href="`#${item.id}`">{{ item.text }}</a>
              </li>
            </ol>
          </details>
          <nav class="hidden lg:block" aria-labelledby="titulo-indice">
            <p id="titulo-indice" class="rubrica mb-4">Neste artigo</p>
            <ol class="flex flex-col gap-3 leading-snug text-muted">
              <li v-for="(item, i) in indice" :key="item.id" class="flex gap-3">
                <span class="w-7 shrink-0 font-display text-xs leading-6 text-accent">{{ romano(i + 1) }}</span>
                <a :href="`#${item.id}`" class="hover:text-text">{{ item.text }}</a>
              </li>
            </ol>
          </nav>
        </template>
      </aside>

      <div ref="texto" class="min-w-0">
        <ContentRenderer :value="artigo" class="prose prose-vf" />

        <section v-if="artigo.referencias.length" class="mt-16 border-t border-line pt-8" aria-labelledby="titulo-referencias">
          <h2 id="titulo-referencias" class="rubrica mb-5">Referências</h2>
          <ol class="flex list-decimal flex-col gap-3 pl-5 marker:font-display marker:text-sm marker:text-accent">
            <li v-for="ref in artigo.referencias" :key="ref.titulo">
              <a v-if="ref.url" :href="ref.url" rel="noopener" target="_blank">{{ ref.titulo }}</a>
              <span v-else>{{ ref.titulo }}</span>
              <span v-if="ref.autor" class="text-muted"> — {{ ref.autor }}</span>
            </li>
          </ol>
        </section>

        <div ref="fim" aria-hidden="true" />

        <!-- Fim do artigo: seguir na trilha -->
        <nav v-if="trilha" aria-label="Continuar a trilha" class="mt-14 grid gap-4 sm:grid-cols-2">
          <NuxtLink
            v-if="trilha.anterior"
            :to="trilha.anterior.path"
            class="flex flex-col gap-1.5 border border-line p-5 hover:border-accent hover:no-underline"
          >
            <span class="font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">← Anterior · {{ romano(trilha.posicao - 1) }}</span>
            <span class="text-lg leading-snug">{{ trilha.anterior.title }}</span>
          </NuxtLink>
          <span v-else class="max-sm:hidden" />
          <NuxtLink
            :to="trilha.proximo ? trilha.proximo.path : '/trilhas'"
            class="flex flex-col gap-1.5 bg-accent p-5 text-on-accent hover:no-underline"
          >
            <span class="font-display text-[0.68rem] tracking-[0.14em] uppercase">
              {{ trilha.proximo ? `Próximo · ${romano(trilha.posicao + 1)} →` : 'Trilha concluída ✓' }}
            </span>
            <span class="text-lg leading-snug">{{ trilha.proximo ? trilha.proximo.title : 'Ver outras trilhas →' }}</span>
          </NuxtLink>
        </nav>

        <!-- Fim do artigo: o que ler depois -->
        <section v-if="continueLendo.length || trilhaSugerida" class="mt-18" aria-labelledby="titulo-continue">
          <h2 id="titulo-continue" class="rubrica mb-2">Continue lendo</h2>
          <ol v-if="continueLendo.length" class="filete-duplo border-t-[3px]">
            <li v-for="a in continueLendo" :key="a.path" class="border-b border-line">
              <NuxtLink :to="a.path" class="group grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1.5 py-5 hover:no-underline">
                <span class="font-display text-[0.68rem] tracking-[0.16em] text-muted uppercase">
                  {{ a.secao === 'defesa-da-fe' ? 'Defesa da fé · ' : '' }}{{ temas?.nomes[a.tema] ?? a.tema }}
                </span>
                <span v-if="a.minutos" class="row-span-2 self-center font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                  {{ a.minutos }} min
                </span>
                <span class="text-[1.3rem] leading-snug group-hover:text-accent">{{ a.title }}</span>
              </NuxtLink>
            </li>
          </ol>

          <NuxtLink
            v-if="trilhaSugerida"
            :to="`/trilhas/${trilhaSugerida.slug}`"
            class="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-accent px-6 py-5 hover:no-underline"
          >
            <span class="flex flex-col gap-1.5">
              <span class="rubrica text-[0.68rem]">Quer ler em ordem? · Trilha</span>
              <span class="text-[1.3rem]">
                {{ trilhaSugerida.title }}
                <span class="text-base text-muted">
                  · {{ qtdArtigos(trilhaSugerida.total) }}<template v-if="trilhaSugerida.minutos"> · {{ trilhaSugerida.minutos }} min</template>
                </span>
              </span>
            </span>
            <span class="rubrica">Começar →</span>
          </NuxtLink>

          <p class="mt-6">
            <NuxtLink to="/artigos" class="rubrica text-muted">Ver todos os artigos →</NuxtLink>
          </p>
        </section>
      </div>
    </div>
  </article>
</template>
