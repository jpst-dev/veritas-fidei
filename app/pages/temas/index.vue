<script setup lang="ts">
const { data: temas } = await useTemas()

useSeoMeta({
  title: 'Aprender',
  description: 'Os temas da fé católica, organizados como os capítulos de um livro.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pt-20">
    <header class="mb-14 flex flex-col gap-4">
      <p class="rubrica">Aprender</p>
      <h1 class="text-[clamp(2.4rem,5vw,3.6rem)] leading-tight font-medium">Index</h1>
      <p class="max-w-2xl text-[1.15rem] text-muted">Os temas da fé, organizados como um livro: comece por qualquer capítulo.</p>
    </header>
    <ol class="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(tema, i) in temas?.lista" :key="tema.slug" class="flex flex-col gap-2 border-t border-line pt-5">
        <span class="font-display text-xl text-accent" aria-hidden="true">{{ romano(i + 1) }}</span>
        <NuxtLink :to="`/temas/${tema.slug}`" class="text-[1.6rem] leading-tight font-medium">{{ tema.nome }}</NuxtLink>
        <p class="text-muted">{{ tema.descricao }}</p>
      </li>
    </ol>
  </div>
</template>
