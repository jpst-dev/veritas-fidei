<script setup lang="ts">
/** Barra de progresso de uma trilha, um segmento por artigo, com o progresso do navegador. */
const props = defineProps<{ slugs: string[] }>()

const { estadosDaTrilha } = useLidos()
const estados = computed(() => estadosDaTrilha(props.slugs))
</script>

<template>
  <span class="flex gap-1.5" aria-hidden="true">
    <span v-for="(estado, i) in estados" :key="i" class="h-[3px] flex-1" :class="estado === 'lido' ? 'bg-accent' : 'bg-line'" />
  </span>
</template>
