<script setup lang="ts">
/** Selo de status editorial. Só aparece em desenvolvimento, onde rascunhos ficam visíveis. */
defineProps<{ status: string }>()

const rotulos: Record<string, string> = {
  'rascunho': 'Rascunho',
  'em-revisao': 'Em revisão',
  'publicado': 'Publicado',
}
const mostrar = import.meta.dev
</script>

<template>
  <span
    v-if="mostrar && status !== 'publicado'"
    class="inline-block border border-dashed border-muted px-2 font-display text-[0.65rem] tracking-[0.14em] text-muted uppercase"
  >
    {{ rotulos[status] ?? status }}
  </span>
</template>
