<script setup lang="ts">
/**
 * Imagem de uma obra (public/obras/<slug>-800.webp e -1600.webp, gerados por
 * `npm run obra`). O navegador escolhe o tamanho pelo `sizes`.
 */
withDefaults(
  defineProps<{
    obra: { slug: string; alt: string; posicao: string }
    sizes?: string
    /** Quando o texto ao lado já diz tudo, a imagem é só ilustração */
    decorativa?: boolean
    /** A primeira imagem da página carrega logo; as demais, ao rolar */
    prioridade?: boolean
  }>(),
  { sizes: '100vw' },
)
</script>

<template>
  <img
    :src="`/obras/${obra.slug}-800.webp`"
    :srcset="`/obras/${obra.slug}-800.webp 800w, /obras/${obra.slug}-1600.webp 1600w`"
    :sizes="sizes"
    :alt="decorativa ? '' : obra.alt"
    :style="{ objectPosition: obra.posicao }"
    :loading="prioridade ? 'eager' : 'lazy'"
    :fetchpriority="prioridade ? 'high' : undefined"
    decoding="async"
    class="object-cover"
  >
</template>
