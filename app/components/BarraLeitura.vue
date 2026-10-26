<script setup lang="ts">
/** Barra fina no topo que mostra quanto do artigo já foi lido. */
const props = defineProps<{ alvo: HTMLElement | null }>()
const progresso = ref(0)

let quadro = 0
function medir() {
  cancelAnimationFrame(quadro)
  quadro = requestAnimationFrame(() => {
    const el = props.alvo
    if (!el) return
    const { top, height } = el.getBoundingClientRect()
    const percorrido = window.innerHeight - top
    progresso.value = Math.min(1, Math.max(0, percorrido / height))
  })
}

onMounted(() => {
  window.addEventListener('scroll', medir, { passive: true })
  window.addEventListener('resize', medir, { passive: true })
  medir()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', medir)
  window.removeEventListener('resize', medir)
  cancelAnimationFrame(quadro)
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-40 h-[3px] bg-line/60" aria-hidden="true">
    <div class="h-full origin-left bg-accent" :style="{ transform: `scaleX(${progresso})` }" />
  </div>
</template>
