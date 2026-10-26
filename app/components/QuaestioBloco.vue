<script setup lang="ts">
defineProps<{
  quaestio: { pareceQue: string, emSentidoContrario: string, respondo: string }
}>()
</script>

<template>
  <dl class="grid gap-10 md:grid-cols-3">
    <div class="flex flex-col gap-2">
      <dt class="rubrica">Parece que…</dt>
      <dd>{{ quaestio.pareceQue }}</dd>
    </div>
    <div class="flex flex-col gap-2">
      <dt class="rubrica">Em sentido contrário</dt>
      <dd>{{ quaestio.emSentidoContrario }}</dd>
    </div>
    <div class="flex flex-col gap-2">
      <dt class="rubrica">Respondo</dt>
      <dd>{{ quaestio.respondo }}</dd>
    </div>
  </dl>
</template>
