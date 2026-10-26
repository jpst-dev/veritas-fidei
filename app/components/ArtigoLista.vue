<script setup lang="ts">
import type { ArtigosCollectionItem } from '@nuxt/content'

defineProps<{
  artigos: Pick<ArtigosCollectionItem, 'path' | 'title' | 'description' | 'tema' | 'status'>[]
  nomesDosTemas?: Record<string, string>
}>()
</script>

<template>
  <ul class="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="artigo in artigos" :key="artigo.path" class="flex flex-col gap-2">
      <p class="flex flex-wrap items-center gap-3">
        <span class="rubrica">{{ nomesDosTemas?.[artigo.tema] ?? artigo.tema }}</span>
        <StatusSelo :status="artigo.status" />
      </p>
      <NuxtLink :to="artigo.path" class="text-[1.6rem] leading-tight font-medium">{{ artigo.title }}</NuxtLink>
      <p class="text-muted">{{ artigo.description }}</p>
    </li>
  </ul>
</template>
