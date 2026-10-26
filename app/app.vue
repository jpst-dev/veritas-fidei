<script setup lang="ts">
const liturgia = useLiturgia()

useHead({
  titleTemplate: (titulo) => (titulo ? `${titulo} · Veritas Fidei` : 'Veritas Fidei — Formação católica'),
  htmlAttrs: { 'data-cor': () => liturgia.value.cor },
  script: [{ key: 'tema-inicial', innerHTML: scriptTemaInicial, tagPosition: 'head' }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
