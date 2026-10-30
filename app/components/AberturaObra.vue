<script setup lang="ts">
/**
 * Abertura das páginas de tema e de trilha: a obra em largura total, o texto à
 * esquerda sobre o escurecimento e a legenda logo abaixo (mesma linguagem do artigo).
 */
defineProps<{
  obra?: { slug: string; alt: string; posicao: string; titulo: string; autor: string; data: string; acervo: string }
}>()
</script>

<template>
  <header>
    <div class="escuro relative flex min-h-[28rem] flex-col justify-end overflow-hidden bg-bg sm:min-h-[32rem]">
      <ObraImagem v-if="obra" :obra="obra" prioridade sizes="100vw" class="absolute inset-0 size-full brightness-[0.85]" />
      <span class="absolute inset-0 bg-linear-to-b from-bg/10 via-bg/45 via-45% to-bg" aria-hidden="true" />
      <!-- O texto fica à esquerda: escurece esse lado para obras claras, como o São Tomé -->
      <span class="absolute inset-0 bg-linear-to-r from-bg/80 via-bg/35 via-50% to-transparent" aria-hidden="true" />
      <div class="relative mx-auto w-full max-w-6xl px-6 pt-44 pb-10">
        <slot />
      </div>
    </div>
    <p v-if="obra" class="mx-auto max-w-6xl px-6 pt-3 text-sm text-muted sm:text-right">
      <i>{{ obra.titulo }}</i> · {{ obra.autor }}, {{ obra.data }} · {{ obra.acervo }}
    </p>
  </header>
</template>
