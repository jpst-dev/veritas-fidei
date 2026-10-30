<script setup lang="ts">
const status = statusVisiveis()
const { data: temas } = await useTemas()
const { data: artigos } = await useArtigos()
const { data: obras } = await useObras()

const { data: trilha } = await useAsyncData('home-trilha', async () => {
  const trilha = await queryCollection('trilhas').where('status', 'IN', status).first()
  if (!trilha) return null
  const passos = await queryCollection('artigos')
    .where('path', 'IN', trilha.artigos.map((slug) => `/artigos/${slug}`))
    .where('status', 'IN', status)
    .select('path', 'title', 'minutos')
    .all()
  const passosEmOrdem = trilha.artigos
    .map((slug) => passos.find((p) => p.path === `/artigos/${slug}`))
    .filter((p) => p !== undefined)
  const minutos = passosEmOrdem.reduce((soma, p) => soma + (p.minutos ?? 0), 0)
  return { ...trilha, slug: slugDe(trilha.stem), passos: passosEmOrdem, minutos }
})

// Obras fixas da home; as demais vêm do tema ou do próprio artigo
const abertura = computed(() => obras.value?.jeronimo)
const defesa = computed(() => obras.value?.tome)
const escrita = computed(() => obras.value?.['sao-paulo'])
const obraDoTema = (slug: string) => obras.value?.[temas.value?.lista.find((t) => t.slug === slug)?.obra ?? '']
const obraDaTrilha = computed(() => (trilha.value ? obraDoTema(trilha.value.tema) : undefined))

const recentes = computed(() =>
  (artigos.value?.slice(0, 3) ?? []).map((a) => ({ ...a, imagem: obras.value?.[a.obra ?? ''] ?? obraDoTema(a.tema) })),
)
const questoes = computed(() => artigos.value?.filter((a) => a.secao === 'defesa-da-fe').slice(0, 4) ?? [])

// Os temas com artigos vêm primeiro; os "em breve" completam a fileira de quatro
const temasDaHome = computed(() => {
  const lista = (temas.value?.lista ?? []).map((tema) => ({
    ...tema,
    qtd: artigos.value?.filter((a) => a.tema === tema.slug).length ?? 0,
    imagem: obras.value?.[tema.obra],
  }))
  const comArtigos = lista.filter((t) => t.qtd)
  const total = Math.max(4, Math.ceil(comArtigos.length / 4) * 4)
  return [...comArtigos, ...lista.filter((t) => !t.qtd)].slice(0, total)
})

useSeoMeta({
  title: null,
  ogTitle: 'Veritas Fidei — Formação católica',
  description: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
  ogDescription: 'Artigos revisados e trilhas de estudo para conhecer, amar e saber dar razão da fé católica.',
})

useHead({
  link: abertura.value
    ? [{ rel: 'preload', as: 'image', href: `/obras/${abertura.value.slug}-1600.webp`, fetchpriority: 'high', media: '(min-width: 1024px)' }]
    : [],
})
</script>

<template>
  <div>
    <!-- Abertura: o São Jerônimo de Caravaggio; o fundo negro do quadro recebe o texto -->
    <section class="escuro relative overflow-hidden bg-bg" aria-labelledby="titulo-abertura">
      <div v-if="abertura" class="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        <ObraImagem :obra="abertura" prioridade sizes="100vw" class="size-full" />
        <span class="absolute inset-0 bg-linear-to-b from-transparent from-50% to-bg lg:bg-linear-to-r lg:from-bg lg:from-0% lg:via-bg/85 lg:via-35% lg:to-transparent lg:to-65%" aria-hidden="true" />
      </div>
      <div class="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-8 max-lg:-mt-16 lg:min-h-[44rem] lg:justify-center lg:py-24">
        <div class="flex max-w-xl flex-col gap-6">
          <p class="rubrica">Formação católica</p>
          <h1 id="titulo-abertura" class="text-[clamp(2.3rem,6vw,4rem)] leading-[1.06] font-normal text-balance">
            <span class="font-display text-[1.12em] text-accent">C</span>onhecer a fé para <span class="whitespace-nowrap">amá-la</span> — e saber dar razão dela.
          </h1>
          <p class="text-[1.12rem] leading-relaxed text-text/80">
            Artigos revisados e trilhas de estudo sobre o que a Igreja ensina, por que ensina e onde isso está nas
            Escrituras e na Tradição.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <NuxtLink v-if="trilha" :to="`/trilhas/${trilha.slug}`" class="btn btn-primario min-h-13 justify-center px-7">Começar a trilha</NuxtLink>
            <NuxtLink to="/artigos" class="btn btn-secundario min-h-13 justify-center border-text/40 px-7">Todos os artigos</NuxtLink>
          </div>
        </div>
      </div>
      <p v-if="abertura" class="relative mx-auto max-w-6xl px-6 pb-6 text-sm text-muted lg:absolute lg:right-0 lg:bottom-0 lg:left-0 lg:text-right">
        <i>{{ abertura.titulo }}</i> · {{ abertura.autor }}, {{ abertura.data }}
      </p>
    </section>

    <div class="mx-auto max-w-6xl px-6">
      <!-- Trilha em destaque, com a obra do seu tema -->
      <section v-if="trilha" class="mt-16 grid items-center gap-10 sm:mt-24 lg:grid-cols-2 lg:gap-16" aria-labelledby="titulo-trilha">
        <figure v-if="obraDaTrilha" class="max-lg:order-last">
          <NuxtLink :to="`/trilhas/${trilha.slug}`" class="group block aspect-[4/3] overflow-hidden" tabindex="-1" aria-hidden="true">
            <ObraImagem :obra="obraDaTrilha" decorativa sizes="(min-width: 1024px) 560px, 100vw" class="size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
          </NuxtLink>
          <figcaption class="mt-2.5 text-sm text-muted"><i>{{ obraDaTrilha.titulo }}</i> · {{ obraDaTrilha.autor }}, {{ obraDaTrilha.data }}</figcaption>
        </figure>
        <div class="flex flex-col gap-4">
          <p class="rubrica">Comece por aqui · Trilha de estudo</p>
          <h2 id="titulo-trilha" class="text-[clamp(2rem,4.5vw,2.9rem)] leading-tight font-normal">
            <NuxtLink :to="`/trilhas/${trilha.slug}`">{{ trilha.title }}</NuxtLink>
          </h2>
          <p class="text-[1.08rem] text-muted">{{ trilha.description }}</p>
          <ol class="mt-1 border-t border-line">
            <li v-for="(passo, i) in trilha.passos" :key="passo.path" class="border-b border-line">
              <NuxtLink :to="passo.path" class="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-3 py-3.5 hover:no-underline">
                <span class="font-display text-accent" aria-hidden="true">{{ romano(i + 1) }}</span>
                <span class="text-[1.12rem] leading-snug group-hover:text-accent">{{ passo.title }}</span>
                <span v-if="passo.minutos" class="font-display text-[0.68rem] tracking-[0.12em] whitespace-nowrap text-muted uppercase">{{ passo.minutos }} min</span>
              </NuxtLink>
            </li>
          </ol>
          <NuxtLink :to="`/trilhas/${trilha.slug}`" class="rubrica mt-1 self-start">
            Começar · {{ qtdArtigos(trilha.passos.length) }}<template v-if="trilha.minutos">, {{ trilha.minutos }} min</template> →
          </NuxtLink>
        </div>
      </section>

      <!-- Temas: cada um com a sua obra; os que ainda não têm artigos aparecem velados -->
      <section class="mt-24 sm:mt-32" aria-labelledby="titulo-temas">
        <div class="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="titulo-temas" class="text-[clamp(1.9rem,4vw,2.5rem)] font-normal">Temas da fé</h2>
          <NuxtLink to="/temas" class="rubrica">Os {{ temas?.lista.length }} temas →</NuxtLink>
        </div>
        <ul class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <li v-for="tema in temasDaHome" :key="tema.slug">
            <NuxtLink
              :to="`/temas/${tema.slug}`"
              class="escuro group relative block aspect-[3/4] overflow-hidden bg-bg hover:no-underline"
              :class="{ 'opacity-60 hover:opacity-90': !tema.qtd }"
            >
              <ObraImagem
                v-if="tema.imagem"
                :obra="tema.imagem"
                decorativa
                sizes="(min-width: 1024px) 280px, 50vw"
                class="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                :class="{ grayscale: !tema.qtd }"
              />
              <span class="absolute inset-0 bg-linear-to-b from-transparent from-30% via-bg/70 via-65% to-bg" aria-hidden="true" />
              <span class="absolute inset-x-4 bottom-4 flex flex-col gap-1 sm:inset-x-5 sm:bottom-5">
                <span class="font-display text-[0.62rem] tracking-[0.16em] uppercase sm:text-[0.68rem]" :class="tema.qtd ? 'text-accent' : 'text-muted'">
                  {{ tema.qtd ? qtdArtigos(tema.qtd) : 'Em breve' }}
                </span>
                <span class="text-[1.15rem] leading-tight sm:text-[1.5rem]">{{ tema.nome }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>

    <!-- Defesa da fé: São Tomé, o apóstolo que pediu provas -->
    <section v-if="questoes.length" class="escuro relative mt-24 overflow-hidden bg-bg sm:mt-32" aria-labelledby="titulo-defesa">
      <div v-if="defesa" class="relative aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[62%]">
        <ObraImagem :obra="defesa" sizes="(min-width: 1024px) 62vw, 100vw" class="size-full" />
        <span class="absolute inset-0 bg-linear-to-b from-transparent from-45% to-bg lg:bg-linear-to-r lg:from-bg lg:from-0% lg:via-bg/50 lg:via-25% lg:to-transparent lg:to-60%" aria-hidden="true" />
      </div>
      <div class="relative mx-auto max-w-6xl px-6 pb-8 max-lg:-mt-12 lg:py-24">
        <div class="flex max-w-lg flex-col gap-4">
          <p class="rubrica">Defesa da fé</p>
          <h2 id="titulo-defesa" class="text-[clamp(1.9rem,4vw,2.75rem)] leading-tight font-normal">Perguntas difíceis, respostas fundamentadas.</h2>
          <ul class="mt-2 border-t border-line">
            <li v-for="q in questoes" :key="q.path" class="border-b border-line">
              <NuxtLink :to="q.path" class="group flex items-baseline gap-3.5 py-3.5 text-[1.12rem] leading-snug hover:no-underline">
                <span class="font-display text-sm text-accent" aria-hidden="true">Q</span>
                <span class="group-hover:text-accent">{{ q.title }}</span>
              </NuxtLink>
            </li>
          </ul>
          <NuxtLink to="/defesa-da-fe" class="rubrica mt-1 self-start">Todas as questões →</NuxtLink>
        </div>
      </div>
      <p v-if="defesa" class="relative mx-auto max-w-6xl px-6 pb-6 text-sm text-muted lg:absolute lg:right-0 lg:bottom-0 lg:left-0 lg:text-right">
        <i>{{ defesa.titulo }}</i> · {{ defesa.autor }}, {{ defesa.data }}
      </p>
    </section>

    <div class="mx-auto max-w-6xl px-6">
      <!-- Recentes: cada artigo com a sua obra -->
      <section class="mt-24 sm:mt-28" aria-labelledby="titulo-recentes">
        <div class="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="titulo-recentes" class="text-[clamp(1.9rem,4vw,2.5rem)] font-normal">Artigos recentes</h2>
          <NuxtLink to="/artigos" class="rubrica max-sm:hidden">Todos os artigos →</NuxtLink>
        </div>
        <ul v-if="recentes.length" class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          <li v-for="artigo in recentes" :key="artigo.path">
            <NuxtLink :to="artigo.path" class="group flex h-full flex-col gap-3 hover:no-underline">
              <span class="block aspect-[16/10] overflow-hidden bg-surface">
                <ObraImagem
                  v-if="artigo.imagem"
                  :obra="artigo.imagem"
                  decorativa
                  sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                  class="size-full transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                />
              </span>
              <span class="mt-1 flex flex-wrap items-center gap-3">
                <span class="rubrica">{{ artigo.secao === 'defesa-da-fe' ? 'Defesa da fé · ' : '' }}{{ temas?.nomes[artigo.tema] }}</span>
                <StatusSelo :status="artigo.status" />
              </span>
              <span class="text-[1.45rem] leading-snug group-hover:text-accent">{{ artigo.title }}</span>
              <span class="text-muted">{{ artigo.description }}</span>
              <span
                v-if="artigo.minutos || artigo.nivel"
                class="mt-auto font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase"
              >
                {{ [artigo.minutos ? `${artigo.minutos} min` : '', artigo.nivel ? NIVEIS[artigo.nivel] : ''].filter(Boolean).join(' · ') }}
              </span>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="text-muted italic">Os primeiros artigos estão em revisão e serão publicados em breve.</p>
        <NuxtLink to="/artigos" class="btn btn-secundario mt-8 w-full justify-center sm:hidden">Todos os artigos →</NuxtLink>
      </section>

      <!-- Como escrevemos: a razão para confiar no que se lê aqui -->
      <section class="mt-24 grid items-center gap-6 border-y border-line py-10 sm:mt-28 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[11rem_minmax(0,1fr)_auto] lg:gap-12" aria-labelledby="titulo-escrita">
        <ObraImagem v-if="escrita" :obra="escrita" sizes="176px" class="h-52 w-40 max-sm:hidden lg:w-44" />
        <div class="flex flex-col gap-3">
          <h2 id="titulo-escrita" class="rubrica">Como escrevemos</h2>
          <p class="text-[clamp(1.2rem,2.4vw,1.5rem)] leading-snug">
            Cada artigo é revisado antes de publicar, e cada citação é conferida na fonte: o Catecismo, a Escritura na
            tradução da CNBB e os Padres da Igreja.
          </p>
        </div>
        <NuxtLink to="/sobre" class="rubrica whitespace-nowrap sm:col-start-2 lg:col-start-auto">Sobre o projeto →</NuxtLink>
      </section>
    </div>
  </div>
</template>
