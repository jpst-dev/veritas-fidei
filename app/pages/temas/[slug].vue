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
    .select('path', 'title', 'description', 'tema', 'status', 'secao', 'minutos', 'nivel', 'obra')
    .all(),
)

// Em ordem de leitura: primeiro a sequência da trilha do tema, depois os demais por título
const { data: trilhas } = await useAsyncData('trilhas-visiveis', () =>
  queryCollection('trilhas').where('status', 'IN', statusVisiveis()).all(),
)
const trilha = computed(() => trilhas.value?.find((t) => t.tema === slug))
const emOrdem = computed(() => ordemDeLeitura(artigos.value ?? [], trilha.value))
const aprender = computed(() => emOrdem.value.filter((a) => a.secao === 'aprender'))
const defesa = computed(() => emOrdem.value.filter((a) => a.secao === 'defesa-da-fe'))

const num = computed(() => romano((temas.value?.lista.indexOf(tema.value!) ?? 0) + 1))
const minutos = (lista: { minutos?: number }[]) => lista.reduce((soma, a) => soma + (a.minutos ?? 0), 0)
const { data: obras } = await useObras()
const obra = computed(() => obras.value?.[tema.value!.obra])

// Convite para ler em ordem, com o progresso do navegador
const { lidos } = useLidos()
const convite = computed(() => {
  if (!trilha.value) return null
  const passos = emOrdem.value.filter((a) => trilha.value!.artigos.includes(slugDe(a.path)))
  return {
    slug: slugDe(trilha.value.stem),
    title: trilha.value.title,
    total: passos.length,
    minutos: minutos(passos),
    lidos: passos.filter((a) => lidos.value.includes(slugDe(a.path))).length,
  }
})

useSeoMeta({
  title: tema.value.nome,
  description: tema.value.descricao,
  ogTitle: `${tema.value.nome} · Veritas Fidei`,
  ogDescription: tema.value.descricao,
})
</script>

<template>
  <div v-if="tema">
    <AberturaObra :obra="obra">
      <div class="flex max-w-2xl flex-col gap-4">
        <NuxtLink to="/temas" class="rubrica">← Temas · {{ num }}</NuxtLink>
        <h1 class="text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.05] font-medium">{{ tema.nome }}</h1>
        <p class="text-[1.15rem] text-text/85">{{ tema.descricao }}</p>
        <p v-if="artigos?.length" class="font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">
          {{ qtdArtigos(artigos.length) }}<template v-if="minutos(artigos)"> · {{ minutos(artigos) }} min</template>
        </p>
      </div>
    </AberturaObra>

    <div class="mx-auto max-w-6xl px-6 pt-12">
      <NuxtLink
        v-if="convite && convite.total > 1"
        :to="`/trilhas/${convite.slug}`"
        class="mb-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-accent p-5 hover:no-underline sm:px-7"
      >
        <span class="flex flex-col gap-1.5">
          <span class="rubrica">Leia em ordem · Trilha de estudo</span>
          <span class="text-[1.4rem]">
            {{ convite.title }}
            <span class="text-base text-muted">
              · {{ qtdArtigos(convite.total) }}<template v-if="convite.minutos"> · {{ convite.minutos }} min</template><template v-if="convite.lidos"> · você leu {{ convite.lidos }} de {{ convite.total }}</template>
            </span>
          </span>
        </span>
        <span class="font-display text-[0.8rem] tracking-[0.16em] text-accent uppercase">{{ convite.lidos ? 'Continuar' : 'Ver a trilha' }} →</span>
      </NuxtLink>

      <ArtigoLista v-if="aprender.length" :artigos="aprender" sem-tema />

      <section v-if="defesa.length" class="mt-20" aria-labelledby="titulo-defesa">
        <h2 id="titulo-defesa" class="filete-duplo mb-8 border-b-[3px] pb-4 font-display text-2xl font-semibold tracking-[0.08em]">
          Defesa da fé
        </h2>
        <ArtigoLista :artigos="defesa" sem-tema sem-secao />
      </section>

      <p v-if="!artigos?.length" class="text-muted italic">Os artigos deste tema estão em revisão.</p>
    </div>
  </div>
</template>
