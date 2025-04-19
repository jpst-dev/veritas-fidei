<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { Topic } from "@/data/categories";

interface ExtendedTopic extends Topic {
  categoryId: string;
  subcategoryId: string;
}

interface Props {
  previousTopic: ExtendedTopic | null;
  nextTopic: ExtendedTopic | null;
}

const props = defineProps<Props>();
</script>

<template>
  <nav class="pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
    <div class="flex justify-between">
      <!-- Tópico Anterior -->
      <router-link
        v-if="previousTopic"
        :to="{
          name: 'topic',
          params: {
            categoryId: previousTopic.categoryId,
            subcategoryId: previousTopic.subcategoryId,
            topicId: previousTopic.id,
          },
        }"
        class="group flex items-center max-w-[45%]"
      >
        <ChevronLeftIcon
          class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
        />
        <div class="ml-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">Anterior</p>
          <p
            class="text-base font-medium text-gray-900 truncate group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400"
          >
            {{ previousTopic.title }}
          </p>
        </div>
      </router-link>
      <div v-else class="w-[45%]" />

      <!-- Próximo Tópico -->
      <router-link
        v-if="nextTopic"
        :to="{
          name: 'topic',
          params: {
            categoryId: nextTopic.categoryId,
            subcategoryId: nextTopic.subcategoryId,
            topicId: nextTopic.id,
          },
        }"
        class="group flex items-center text-right max-w-[45%]"
      >
        <div class="mr-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">Próximo</p>
          <p
            class="text-base font-medium text-gray-900 truncate group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400"
          >
            {{ nextTopic.title }}
          </p>
        </div>
        <ChevronRightIcon
          class="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
        />
      </router-link>
      <div v-else class="w-[45%]" />
    </div>
  </nav>
</template>
