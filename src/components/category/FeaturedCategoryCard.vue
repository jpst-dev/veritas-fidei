<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { getIconComponent } from "@/utils/IconMapping";
import { getDifficultyClass } from "@/utils/formatters";
import {
  BookOpenIcon,
  ClockIcon,
  AcademicCapIcon,
  TagIcon,
  SparklesIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";
import type { Category } from "@/data/categories";

interface Props {
  category: Category;
  index: number;
}

const props = defineProps<Props>();

const router = useRouter();

const difficultyClass = computed(() =>
  getDifficultyClass(props.category.stats.difficulty)
);

const handleClick = () => {
  router.push(`/explorar/${props.category.id}`);
};

const handleSubcategoryClick = (e: Event, subcategoryId: string) => {
  e.stopPropagation();
  router.push(`/explorar/${props.category.id}/${subcategoryId}`);
};

// Gradientes mais sutis para cada card em destaque
const gradientClasses = [
  "from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30",
  "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
  "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
];
</script>

<template>
  <article
    class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer group rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
    @click="handleClick"
    role="article"
    :aria-label="`Categoria em destaque: ${category.title}`"
  >
    <!-- Top gradient accent bar -->
    <div
      class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400"
      aria-hidden="true"
    ></div>

    <!-- Glow effect -->
    <div
      class="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      :class="gradientClasses[index % gradientClasses.length]"
      aria-hidden="true"
    ></div>

    <div class="relative p-5">
      <!-- Header -->
      <header class="flex items-start justify-between gap-4 mb-4">
        <div class="flex items-start gap-3">
          <!-- Icon -->
          <div
            class="p-2.5 rounded-lg shrink-0 bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors"
            aria-hidden="true"
          >
            <component
              :is="getIconComponent(category.icon)"
              class="w-5 h-5 text-white"
            />
          </div>

          <!-- Title and Description -->
          <div class="flex-1">
            <h3
              class="text-xl font-semibold tracking-tight text-white group-hover:text-primary-100"
            >
              {{ category.title }}
            </h3>
            <p
              class="mt-2 text-base leading-relaxed text-white/90 line-clamp-2"
            >
              {{ category.description }}
            </p>
          </div>
        </div>

        <!-- Featured Badge -->
        <div
          class="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white rounded-full bg-white/20 backdrop-blur-sm"
          aria-hidden="true"
        >
          <SparklesIcon class="w-3.5 h-3.5" />
          <span>Destaque</span>
        </div>
      </header>

      <!-- Subcategories Preview -->
      <section
        v-if="category.subcategories?.length"
        class="p-3 mb-4 rounded-lg bg-gradient-to-br from-primary-50/50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20"
        aria-label="Subcategorias"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5">
            <FolderIcon
              class="w-4 h-4 text-primary-600 dark:text-primary-400"
              aria-hidden="true"
            />
            <span class="text-sm font-semibold text-gray-900 dark:text-white"
              >Subcategorias</span
            >
          </div>
          <span
            v-if="category.subcategories.length > 3"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            {{ category.subcategories.length }} no total
          </span>
        </div>
        <div class="grid grid-cols-1 gap-2">
          <button
            v-for="subcategory in category.subcategories.slice(0, 3)"
            :key="subcategory.id"
            @click="(e) => handleSubcategoryClick(e, subcategory.id)"
            class="flex items-center justify-between p-2 text-sm transition-all duration-200 rounded-lg bg-white/50 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10 group hover:shadow-sm hover:-translate-y-0.5"
            :aria-label="`Ir para subcategoria: ${subcategory.title}`"
          >
            <div class="flex items-center gap-2">
              <div
                class="p-1.5 transition-colors rounded-lg bg-primary-50 dark:bg-primary-900/30 group-hover:bg-primary-100 dark:group-hover:bg-primary-800/30"
              >
                <component
                  :is="getIconComponent(subcategory.icon)"
                  class="w-4 h-4 transition-colors text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300"
                  aria-hidden="true"
                />
              </div>
              <span
                class="font-medium text-gray-800 transition-colors dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400"
              >
                {{ subcategory.title }}
              </span>
            </div>
            <span
              class="text-sm text-gray-500 transition-colors dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            >
              {{ subcategory.stats.totalTopics }} tópicos
            </span>
          </button>
        </div>
        <button
          v-if="category.subcategories.length > 3"
          @click="handleClick"
          class="flex items-center justify-center w-full gap-2 px-3 py-2 mt-3 text-sm font-medium transition-all duration-200 rounded-lg text-primary-600 bg-white/50 hover:bg-white/80 dark:text-primary-400 dark:bg-white/5 dark:hover:bg-white/10 hover:shadow-sm hover:-translate-y-0.5"
          aria-label="Ver todas as subcategorias"
        >
          <span>Ver todas as subcategorias</span>
          <svg
            class="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>

      <!-- Stats -->
      <section
        class="flex flex-wrap gap-2 pt-3 mt-3 border-t border-white/20"
        aria-label="Estatísticas"
      >
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white"
        >
          <BookOpenIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ category.stats.totalTopics }} tópicos
        </span>
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white"
        >
          <ClockIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ category.stats.readingTime }}
        </span>
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-white/10 text-white"
        >
          <AcademicCapIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ category.stats.difficulty }}
        </span>
      </section>

      <!-- Tags -->
      <section
        v-if="category.tags?.length"
        class="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-white/20"
        aria-label="Tags"
      >
        <span
          v-for="tag in category.tags.slice(0, 3)"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-white bg-white/10 rounded-full"
        >
          <TagIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ tag }}
        </span>
        <span
          v-if="category.tags.length > 3"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-white bg-white/10 rounded-full"
        >
          +{{ category.tags.length - 3 }}
        </span>
      </section>

      <!-- Explore Button -->
      <div class="flex items-center mt-4 text-xs font-medium text-white">
        <span>Explorar categoria</span>
        <svg
          class="w-3.5 h-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
