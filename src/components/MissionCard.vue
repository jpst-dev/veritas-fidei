<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  icon: any;
  color: string;
}>();

defineEmits(["click"]);
</script>

<template>
  <div
    class="relative p-6 overflow-hidden bg-white border border-gray-100 cursor-pointer mission-card rounded-xl dark:border-gray-800 dark:bg-gray-800 group"
    @click="$emit('click')"
    tabindex="0"
    role="button"
    @keydown.enter="$emit('click')"
    @keydown.space="$emit('click')"
  >
    <!-- Gradiente decorativo no topo -->
    <div
      class="absolute inset-x-0 top-0 h-1 transition-transform duration-300 origin-left transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-primary-500 to-primary-400"
      aria-hidden="true"
    ></div>

    <!-- Fundo decorativo que aparece no hover -->
    <div
      class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-5"
      :class="color.replace('text-', 'bg-').replace('dark:', '')"
      aria-hidden="true"
    ></div>

    <div class="relative flex items-center gap-4 mb-4">
      <div
        class="p-3 transition-all duration-300 rounded-full shadow-sm group-hover:scale-110 group-hover:shadow-md"
        :class="color"
      >
        <component
          :is="icon"
          class="w-6 h-6 transition-transform duration-300 group-hover:rotate-3"
          aria-hidden="true"
        />
      </div>
      <h3
        class="text-xl font-bold text-gray-900 transition-colors duration-200 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
      >
        {{ title }}
      </h3>
    </div>
    <p
      class="text-gray-600 transition-colors duration-200 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200"
    >
      {{ description }}
    </p>

    <!-- Indicador sutil de "clicável" -->
    <div
      class="absolute flex items-center justify-center w-6 h-6 text-gray-300 transition-opacity duration-300 opacity-0 bottom-3 right-3 dark:text-gray-600 group-hover:opacity-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* Implementação explícita da animação de hover com transformação */
.mission-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;
}

.mission-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
