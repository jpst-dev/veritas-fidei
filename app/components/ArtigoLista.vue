<script setup lang="ts">
import type { ArtigosCollectionItem } from '@nuxt/content'

const props = defineProps<{
  artigos: Pick<ArtigosCollectionItem, 'path' | 'title' | 'description' | 'tema' | 'secao' | 'status' | 'minutos' | 'nivel' | 'obra'>[]
  /** Na página do próprio tema, o rótulo do tema só repetiria o título */
  semTema?: boolean
  /** Idem para a seção, na página Defesa da fé e na seção de mesmo nome do tema */
  semSecao?: boolean
}>()

const { data: temas } = await useTemas()
const { data: obras } = await useObras()
const { lidos } = useLidos()

// Cada cartão mostra a obra do artigo ou, sem ela, a do tema
const cartoes = computed(() =>
  props.artigos.map((artigo) => {
    const tema = temas.value?.lista.find((t) => t.slug === artigo.tema)
    const rotulo = [!props.semSecao && artigo.secao === 'defesa-da-fe' && 'Defesa da fé', !props.semTema && (tema?.nome ?? artigo.tema)]
    return {
      ...artigo,
      rotulo: rotulo.filter(Boolean).join(' · '),
      imagem: obras.value?.[artigo.obra ?? ''] ?? obras.value?.[tema?.obra ?? ''],
      lido: lidos.value.includes(slugDe(artigo.path)),
    }
  }),
)
</script>

<template>
  <ul class="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="artigo in cartoes" :key="artigo.path">
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
        <span v-if="artigo.rotulo || artigo.status !== 'publicado'" class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span v-if="artigo.rotulo" class="rubrica">{{ artigo.rotulo }}</span>
          <StatusSelo :status="artigo.status" />
        </span>
        <span class="text-[1.45rem] leading-snug group-hover:text-accent">{{ artigo.title }}</span>
        <span class="text-muted">{{ artigo.description }}</span>
        <span class="mt-auto flex justify-between gap-4 font-display text-[0.68rem] tracking-[0.14em] text-muted uppercase">
          <span>{{ [artigo.minutos ? `${artigo.minutos} min` : '', artigo.nivel ? NIVEIS[artigo.nivel] : ''].filter(Boolean).join(' · ') }}</span>
          <span v-if="artigo.lido" class="text-accent">✓ Lido</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
