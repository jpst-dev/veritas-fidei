<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  title: string;
  icon: any;
  viewAllLink?: string;
  viewAllLabel?: string;
  iconClass?: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-3">
      <div
        :class="`p-2 rounded-lg ${
          iconClass || 'bg-primary-100 dark:bg-primary-900/30'
        }`"
      >
        <component
          :is="icon"
          class="w-6 h-6 text-primary-600 dark:text-primary-400"
          aria-hidden="true"
        />
      </div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h2>
    </div>

    <router-link
      v-if="viewAllLink"
      :to="viewAllLink"
      class="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30"
    >
      {{ viewAllLabel || "Ver todos" }}
      <ArrowRightIcon class="w-4 h-4 ml-2" aria-hidden="true" />
    </router-link>
  </div>
</template>
