<script setup lang="ts">
const { tema, alternar } = useTema()
</script>

<template>
  <button
    type="button"
    class="grid size-11 cursor-pointer place-items-center border border-line text-text"
    :aria-label="tema === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'"
    @click="alternar"
  >
    <svg v-if="tema === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />
    </svg>
  </button>
</template>
