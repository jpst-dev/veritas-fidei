<script setup lang="ts">
import { computed } from "vue";
import {
  ChevronRightIcon,
  BookOpenIcon,
  ClockIcon,
  AcademicCapIcon,
} from "@heroicons/vue/24/outline";
import type { Topic } from "@/data/categories";
import { getDifficultyClass, formatReadingTime } from "@/utils/formatters";

const emit = defineEmits<{
  (e: "update:activeHeading", value: string): void;
}>();

interface ExtendedTopic extends Topic {
  categoryId: string;
  subcategoryId: string;
  categoryTitle: string;
  subcategoryTitle: string;
}

interface Props {
  topic: ExtendedTopic;
  activeHeading: string;
  relatedTopics: ExtendedTopic[];
}

const props = defineProps<Props>();

const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim(); // Remove espaços no início e fim
};

const headings = computed(() => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(props.topic.content, "text/html");
  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

  return Array.from(headings).map((heading) => ({
    id: generateId(heading.textContent || ""),
    text: heading.textContent || "",
    level: parseInt(heading.tagName[1]),
  }));
});

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 88; // Altura do header fixo
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Força a atualização do heading ativo após a rolagem
    setTimeout(() => {
      emit("update:activeHeading", id);
    }, 500);
  }
};
</script>

<template>
  <aside class="sticky top-[88px] flex-shrink-0 hidden w-80 lg:block">
    <div class="space-y-8">
      <!-- Índice de Conteúdo -->
      <div
        class="relative overflow-hidden shadow-sm bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl"
      >
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div class="relative p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <BookOpenIcon
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
              />
            </div>
            <h3
              class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Índice
            </h3>
          </div>
          <nav class="space-y-2">
            <button
              v-for="heading in headings"
              :key="heading.id"
              @click="scrollToHeading(heading.id)"
              class="flex items-center w-full px-4 py-2 text-sm transition-all duration-200 rounded-lg"
              :class="{
                'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/30':
                  activeHeading === heading.id,
                'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50':
                  activeHeading !== heading.id,
                'ml-4': heading.level > 2,
                'ml-8': heading.level > 3,
              }"
            >
              <ChevronRightIcon
                class="w-4 h-4 mr-2 transition-transform"
                :class="{
                  'text-primary-600 dark:text-primary-400 rotate-90':
                    activeHeading === heading.id,
                  'text-gray-400 dark:text-gray-500':
                    activeHeading !== heading.id,
                }"
              />
              {{ heading.text }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tópicos Relacionados -->
      <div
        v-if="relatedTopics.length"
        class="relative overflow-hidden shadow-sm rounded-xl"
      >
        <div class="relative p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30">
              <AcademicCapIcon
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
              />
            </div>
            <h3
              class="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Tópicos Relacionados
            </h3>
          </div>
          <div class="space-y-4">
            <router-link
              v-for="relatedTopic in relatedTopics"
              :key="relatedTopic.id"
              :to="{
                name: 'topic',
                params: {
                  categoryId: relatedTopic.categoryId,
                  subcategoryId: relatedTopic.subcategoryId,
                  topicId: relatedTopic.id,
                },
              }"
              class="block p-4 transition-all duration-200 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <h4
                class="text-base font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
              >
                {{ relatedTopic.title }}
              </h4>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {{ relatedTopic.description }}
              </p>
              <div class="flex items-center gap-3 mt-3">
                <span
                  class="flex items-center text-xs text-gray-500 dark:text-gray-400"
                >
                  <ClockIcon class="w-3 h-3 mr-1" />
                  {{ formatReadingTime(relatedTopic.stats.readingTime) }}
                </span>
                <span
                  class="flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                  :class="getDifficultyClass(relatedTopic.stats.difficulty)"
                >
                  <AcademicCapIcon class="w-3 h-3 mr-1" />
                  {{ relatedTopic.stats.difficulty }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sticky {
  position: sticky;
  height: fit-content;
  max-height: calc(100vh - 88px);
  overflow-y: auto;
}

/* Estilização da barra de rolagem */
.sticky::-webkit-scrollbar {
  width: 6px;
}

.sticky::-webkit-scrollbar-track {
  background: transparent;
}

.sticky::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.dark .sticky::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

.sticky::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

.dark .sticky::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
