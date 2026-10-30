<script setup lang="ts">
const { data: artigos } = await useAsyncData('defesa-da-fe', () =>
  queryCollection('artigos')
    .where('secao', '=', 'defesa-da-fe')
    .where('status', 'IN', statusVisiveis())
    .order('title', 'ASC')
    .select('path', 'title', 'description', 'tema', 'secao', 'status', 'minutos', 'nivel', 'obra')
    .all(),
)

const { data: obras } = await useObras()

useSeoMeta({
  title: 'Defesa da fé',
  description: 'As objeções mais comuns à fé católica, respondidas com a Escritura, os Padres da Igreja e o Catecismo.',
  ogTitle: 'Defesa da fé · Veritas Fidei',
  ogDescription: 'As objeções mais comuns à fé católica, respondidas com a Escritura, os Padres da Igreja e o Catecismo.',
})
</script>

<template>
  <div>
    <AberturaObra :obra="obras?.tome">
      <div class="flex max-w-2xl flex-col gap-4">
        <p class="rubrica">Defesa da fé · Quæstiones</p>
        <h1 class="text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.05] font-medium">Perguntas difíceis, respostas fundamentadas.</h1>
        <p class="text-[1.15rem] text-text/85">
          As objeções mais comuns à fé católica, respondidas com a Escritura, os Padres da Igreja e o Catecismo.
        </p>
      </div>
    </AberturaObra>
    <div class="mx-auto max-w-6xl px-6 pt-12">
      <ArtigoLista v-if="artigos?.length" :artigos="artigos" sem-secao />
      <p v-else class="text-muted italic">As primeiras respostas estão em revisão.</p>
    </div>
  </div>
</template>
