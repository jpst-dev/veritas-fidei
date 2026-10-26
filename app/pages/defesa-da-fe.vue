<script setup lang="ts">
const { data: temas } = await useTemas()

const { data: artigos } = await useAsyncData('defesa-da-fe', () =>
  queryCollection('artigos')
    .where('secao', '=', 'defesa-da-fe')
    .where('status', 'IN', statusVisiveis())
    .order('title', 'ASC')
    .select('path', 'title', 'description', 'tema', 'status', 'minutos', 'nivel')
    .all(),
)

useSeoMeta({
  title: 'Defesa da fé',
  description: 'As objeções mais comuns à fé católica, respondidas com a Escritura, os Padres da Igreja e o Catecismo.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pt-20">
    <header class="mb-14 flex flex-col gap-4">
      <p class="rubrica">Defesa da fé · Quæstiones</p>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Perguntas difíceis, respostas fundamentadas.</h1>
      <p class="max-w-2xl text-[1.15rem] text-muted">
        As objeções mais comuns à fé católica, respondidas com a Escritura, os Padres da Igreja e o Catecismo.
      </p>
    </header>
    <ArtigoLista v-if="artigos?.length" :artigos="artigos" :nomes-dos-temas="temas?.nomes" />
    <p v-else class="text-muted italic">As primeiras respostas estão em revisão.</p>
  </div>
</template>
