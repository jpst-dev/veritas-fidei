<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "@/stores/favorites";
import { getDifficultyClass, formatReadingTime } from "@/utils/formatters";
import {
  TagIcon,
  ClockIcon,
  BookmarkIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";

interface TopicStats {
  readingTime: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  progress?: number;
  lastUpdated?: string;
}

interface TopicProp {
  id: number | string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  subcategory?: string;
  categoryTitle?: string;
  subcategoryTitle?: string;
  categoryId?: string;
  subcategoryId?: string;
  stats?: TopicStats;
  // For backwards compatibility with different views
  difficulty?: string;
  readingTime?: string;
  progress?: number;
}

const props = defineProps<{
  topic: TopicProp;
  showBookmark?: boolean;
  showCategoryPath?: boolean;
}>();

const emit = defineEmits(["toggle-bookmark"]);

const router = useRouter();
const favoritesStore = useFavoritesStore();

// Normalize stats between different topic formats
const topicStats = computed(() => {
  if (props.topic.stats) {
    return {
      ...props.topic.stats,
      readingTime: formatReadingTime(props.topic.stats.readingTime),
    };
  }

  // Fallback for older topic format
  return {
    readingTime: formatReadingTime(props.topic.readingTime || "5 min"),
    difficulty:
      (props.topic.difficulty as "Iniciante" | "Intermediário" | "Avançado") ||
      "Iniciante",
    progress: props.topic.progress || 0,
  };
});

// Get proper category/subcategory path for display
const categoryPath = computed(() => {
  if (props.topic.categoryTitle && props.topic.subcategoryTitle) {
    return `${props.topic.categoryTitle} › ${props.topic.subcategoryTitle}`;
  }

  if (props.topic.category && props.topic.subcategory) {
    return `${props.topic.category} › ${props.topic.subcategory}`;
  }

  return "";
});

// Handle navigating to topic
const navigateToTopic = () => {
  if (props.topic.categoryId && props.topic.subcategoryId) {
    router.push({
      name: "topic",
      params: {
        categoryId: props.topic.categoryId,
        subcategoryId: props.topic.subcategoryId,
        topicId: props.topic.id.toString(),
      },
    });
  } else {
    // Try to find from URL
    const handleTopicClick = () => {
      if (typeof props.topic.id === "string" && props.topic.id.includes("/")) {
        // If the ID contains paths, it's likely a full path
        router.push(props.topic.id);
      } else if (typeof props.topic === "object" && "url" in props.topic) {
        // Some topics might have direct URLs
        router.push((props.topic as any).url);
      } else {
        // Default to search route with query
        router.push({
          name: "search",
          query: {
            q: props.topic.title,
          },
        });
      }
    };

    handleTopicClick();
  }
};

// Toggle bookmark on topic
const toggleBookmark = (event: Event) => {
  event.stopPropagation();
  favoritesStore.toggleFavorite(props.topic.id.toString());
  emit("toggle-bookmark", props.topic.id);
};

// Determine if topic is complete
const isCompleted = computed(() => {
  return topicStats.value.progress === 100;
});

// Calculate dynamic background color based on progress
const progressBackground = computed(() => {
  const progress = topicStats.value.progress || 0;
  // Gradient background only appears when there's progress
  if (progress > 0) {
    return {
      background: `linear-gradient(to right, var(--tw-gradient-stops))`,
      "--tw-gradient-from": "rgb(var(--color-primary-500) / 1)",
      "--tw-gradient-to": "rgb(var(--color-primary-400) / 1)",
      "--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
      width: `${progress}%`,
    };
  }
  return { width: "0%" };
});

// Generate readable ID for article accessibility
const articleId = computed(() => {
  return `topic-${props.topic.id.toString().replace(/[^a-z0-9]/gi, "-")}`;
});
</script>

<template>
  <article
    :id="articleId"
    @click="navigateToTopic"
    class="relative overflow-hidden transition-all duration-300 transform bg-white border border-gray-200 shadow-sm cursor-pointer group dark:bg-gray-800 dark:border-gray-700 rounded-xl hover:shadow-lg focus-within:ring-2 focus-within:ring-primary-500 hover:-translate-y-1"
    tabindex="0"
    @keyup.enter="navigateToTopic"
    @keyup.space="navigateToTopic"
    role="article"
    :aria-label="`Tópico: ${topic.title}`"
  >
    <!-- Decorative Top Accent -->
    <div
      class="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-gray-100 dark:bg-gray-700"
      aria-hidden="true"
    >
      <div
        class="h-full transition-all duration-500 ease-out"
        :style="progressBackground"
        role="progressbar"
        :aria-valuenow="topicStats.progress || 0"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Progresso: ${topicStats.progress || 0}%`"
      ></div>
    </div>

    <!-- Main Content Container -->
    <div class="p-5 pt-6">
      <!-- Category Path & Bookmark -->
      <div class="flex items-center justify-between mb-3">
        <div
          v-if="showCategoryPath && categoryPath"
          class="flex items-center text-xs font-medium text-primary-600 dark:text-primary-400"
        >
          <FolderIcon class="w-3 h-3 mr-1.5" aria-hidden="true" />
          {{ categoryPath }}
        </div>

        <!-- Bookmark Button - Always visible but conditional display -->
        <button
          v-if="showBookmark"
          @click="toggleBookmark"
          class="p-1.5 rounded-full bg-white dark:bg-gray-700 shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 z-10"
          :class="{
            'text-primary-600 dark:text-primary-400': favoritesStore.isFavorite(
              topic.id.toString()
            ),
            'text-gray-400 dark:text-gray-500': !favoritesStore.isFavorite(
              topic.id.toString()
            ),
          }"
          :aria-label="
            favoritesStore.isFavorite(topic.id.toString())
              ? 'Remover dos favoritos'
              : 'Adicionar aos favoritos'
          "
        >
          <component
            :is="
              favoritesStore.isFavorite(topic.id.toString())
                ? BookmarkSolidIcon
                : BookmarkIcon
            "
            class="w-4 h-4"
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- Header with Icon, Title and Description -->
      <header class="mb-4">
        <div class="flex items-start gap-3 mb-3">
          <!-- Topic Icon -->
          <div class="flex-shrink-0 mt-1">
            <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30">
              <DocumentTextIcon
                class="w-5 h-5 text-primary-600 dark:text-primary-400"
              />
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <h3
              class="text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-1.5"
            >
              {{ topic.title }}
            </h3>

            <p
              class="text-sm leading-relaxed text-gray-600 transition-colors duration-200 dark:text-gray-300 line-clamp-2 group-hover:text-gray-800 dark:group-hover:text-gray-200"
            >
              {{ topic.description }}
            </p>
          </div>
        </div>
      </header>

      <!-- Tags Section -->
      <section
        v-if="topic.tags && topic.tags.length > 0"
        class="flex flex-wrap gap-1.5 mb-4"
        aria-label="Tags"
      >
        <span
          v-for="tag in topic.tags.slice(0, 3)"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20"
        >
          <TagIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ tag }}
        </span>
        <span
          v-if="topic.tags.length > 3"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400"
        >
          +{{ topic.tags.length - 3 }}
        </span>
      </section>

      <!-- Progress Bar -->
      <div
        v-if="
          !isCompleted &&
          topicStats.progress !== undefined &&
          topicStats.progress > 0
        "
        class="mb-4"
      >
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-xs font-medium text-gray-600 dark:text-gray-400"
            >Progresso</span
          >
          <span
            class="text-xs font-medium text-primary-600 dark:text-primary-400"
            >{{ topicStats.progress }}%</span
          >
        </div>
        <div
          class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
        >
          <div
            class="h-full transition-all duration-500 rounded-full bg-primary-500 dark:bg-primary-400"
            :style="{ width: `${topicStats.progress}%` }"
            role="progressbar"
            :aria-valuenow="topicStats.progress"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <!-- Completion Badge -->
      <div v-if="isCompleted" class="mb-4">
        <div
          class="flex items-center px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400"
        >
          <CheckCircleIcon class="w-4 h-4 mr-2" aria-hidden="true" />
          <span class="text-xs font-medium">Leitura concluída</span>
        </div>
      </div>

      <!-- Stats Section -->
      <section
        class="flex flex-wrap items-center gap-2 py-3 border-t border-gray-100 dark:border-gray-700"
        aria-label="Estatísticas"
      >
        <!-- Reading Time -->
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        >
          <ClockIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ topicStats.readingTime }}
        </span>

        <!-- Difficulty -->
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
          :class="getDifficultyClass(topicStats.difficulty)"
        >
          <AcademicCapIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ topicStats.difficulty }}
        </span>

        <!-- Last Updated -->
        <span
          v-if="topicStats.lastUpdated"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        >
          <CalendarIcon class="w-3 h-3 mr-1" aria-hidden="true" />
          {{ topicStats.lastUpdated }}
        </span>
      </section>

      <!-- Footer with Continue Reading Action -->
      <footer
        class="flex items-center justify-end pt-3 mt-3 border-t border-gray-100 dark:border-gray-700"
      >
        <div
          class="flex items-center text-sm font-medium transition-colors text-primary-600 dark:text-primary-400"
        >
          <span>Continuar leitura</span>
          <ArrowRightIcon
            class="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </footer>
    </div>
  </article>
</template>
