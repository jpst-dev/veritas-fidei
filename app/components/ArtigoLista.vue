<script setup lang="ts">
import type { ArtigosCollectionItem } from '@nuxt/content'

defineProps<{
  artigos: Pick<ArtigosCollectionItem, 'path' | 'title' | 'description' | 'tema' | 'status' | 'minutos' | 'nivel'>[]
  nomesDosTemas?: Record<string, string>
}>()
</script>

<template>
  <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="artigo in artigos" :key="artigo.path">
      <NuxtLink
        :to="artigo.path"
        class="card-capitulo flex h-full flex-col gap-3 border-t-[3px] border-accent p-6 sm:p-7"
      >
        <span class="flex flex-wrap items-center gap-3">
          <span class="rubrica">{{ nomesDosTemas?.[artigo.tema] ?? artigo.tema }}</span>
          <StatusSelo :status="artigo.status" />
        </span>
        <span class="text-[1.45rem] leading-snug font-medium">{{ artigo.title }}</span>
        <span class="text-muted">{{ artigo.description }}</span>
        <span
          v-if="artigo.minutos || artigo.nivel"
          class="mt-auto flex justify-between gap-4 border-t border-line pt-4 font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase"
        >
          <span>{{ artigo.minutos ? `${artigo.minutos} min` : '' }}</span>
          <span>{{ artigo.nivel ? NIVEIS[artigo.nivel] : '' }}</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
