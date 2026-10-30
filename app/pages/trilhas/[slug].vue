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
    .select('path', 'title', 'description', 'status', 'minutos', 'obra')
    .all()
  const passos = t.artigos
    .map((s) => artigos.find((a) => a.path === `/artigos/${s}`))
    .filter((a) => a !== undefined)
  return { ...t, passos }
})

if (!trilha.value) {
  throw createError({ statusCode: 404, message: 'Trilha não encontrada', fatal: true })
}

const minutos = computed(() => trilha.value?.passos.reduce((soma, p) => soma + (p.minutos ?? 0), 0) ?? 0)

// A abertura usa a obra do tema; cada passo, a do seu artigo (ou a do tema, sem ela)
const { data: temas } = await useTemas()
const { data: obras } = await useObras()
const obraDoTema = computed(() => obras.value?.[temas.value?.lista.find((t) => t.slug === trilha.value?.tema)?.obra ?? ''])
const passos = computed(() =>
  (trilha.value?.passos ?? []).map((p) => ({ ...p, imagem: obras.value?.[p.obra ?? ''] ?? obraDoTema.value })),
)

// Progresso do navegador: o botão leva ao primeiro passo ainda não lido
const { lidos } = useLidos()
const slugs = computed(() => passos.value.map((p) => slugDe(p.path)))
const qtdLidos = computed(() => slugs.value.filter((s) => lidos.value.includes(s)).length)
const proximo = computed(() => {
  const i = slugs.value.findIndex((s) => !lidos.value.includes(s))
  return i === -1 ? null : { path: passos.value[i]!.path, num: romano(i + 1) }
})

useSeoMeta({
  title: trilha.value.title,
  description: trilha.value.description,
  ogTitle: `${trilha.value.title} · Veritas Fidei`,
  ogDescription: trilha.value.description,
})
</script>

<template>
  <div v-if="trilha">
    <AberturaObra :obra="obraDoTema">
      <div class="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <div class="flex max-w-2xl flex-col gap-4">
          <NuxtLink to="/trilhas" class="rubrica">← Trilhas · Trilha de estudo</NuxtLink>
          <h1 class="text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.05] font-medium">{{ trilha.title }}</h1>
          <p class="text-[1.15rem] text-text/85">{{ trilha.description }}</p>
        </div>
        <div class="flex w-full flex-col gap-3 sm:w-72">
          <p class="flex justify-between gap-4 font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">
            <span>{{ qtdArtigos(passos.length) }}<template v-if="minutos"> · {{ minutos }} min</template></span>
            <span v-if="qtdLidos" class="text-accent">{{ qtdLidos }} de {{ passos.length }} lido{{ qtdLidos > 1 ? 's' : '' }}</span>
          </p>
          <TrilhaProgresso :slugs="slugs" />
          <NuxtLink
            v-if="proximo"
            :to="proximo.path"
            class="btn btn-primario min-h-13 justify-center"
          >
            {{ qtdLidos ? `Continuar: parte ${proximo.num}` : 'Começar a trilha' }}
          </NuxtLink>
          <p v-else class="font-display text-[0.8rem] tracking-[0.14em] text-accent uppercase">Trilha concluída ✓</p>
        </div>
      </div>
    </AberturaObra>
    <div class="mx-auto max-w-6xl px-6 pt-12">
      <TrilhaPassos :passos="passos" />
    </div>
  </div>
</template>
