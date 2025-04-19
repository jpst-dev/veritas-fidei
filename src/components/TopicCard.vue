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
</script>

<template>
  <div
    @click="navigateToTopic"
    class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 group hover:shadow-lg hover:-translate-y-1"
  >
    <!-- Progress indicator on top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-700">
      <div
        class="h-full bg-primary-600 dark:bg-primary-500"
        :style="{ width: `${topicStats.progress || 0}%` }"
      ></div>
    </div>

    <!-- Bookmark button (optional) -->
    <button
      v-if="showBookmark"
      @click="toggleBookmark"
      class="absolute top-4 right-4 z-10 p-1.5 bg-white rounded-full shadow-sm dark:bg-gray-700 transition-transform duration-200 hover:scale-110"
      :class="{
        'text-primary-600 dark:text-primary-400': favoritesStore.isFavorite(
          topic.id.toString()
        ),
        'text-gray-400 dark:text-gray-500': !favoritesStore.isFavorite(
          topic.id.toString()
        ),
      }"
    >
      <component
        :is="
          favoritesStore.isFavorite(topic.id.toString())
            ? BookmarkSolidIcon
            : BookmarkIcon
        "
        class="w-4 h-4"
      />
    </button>

    <div class="p-6" :class="{ 'pt-7': true }">
      <!-- Category Path (optional) -->
      <div
        v-if="showCategoryPath && categoryPath"
        class="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400"
      >
        {{ categoryPath }}
      </div>

      <h3
        class="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
      >
        {{ topic.title }}
      </h3>

      <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
        {{ topic.description }}
      </p>

      <!-- Tags -->
      <div
        v-if="topic.tags && topic.tags.length > 0"
        class="flex flex-wrap gap-1.5 mb-4"
      >
        <span
          v-for="tag in topic.tags.slice(0, 3)"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300"
        >
          <TagIcon class="w-3 h-3 mr-1" />
          {{ tag }}
        </span>
        <span
          v-if="topic.tags.length > 3"
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-400"
        >
          +{{ topic.tags.length - 3 }}
        </span>
      </div>

      <!-- Stats -->
      <div
        class="flex items-center justify-between pt-3 mt-auto border-t border-gray-100 dark:border-gray-700"
      >
        <div
          class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
        >
          <span class="flex items-center">
            <ClockIcon class="w-4 h-4 mr-1" />
            {{ topicStats.readingTime }}
          </span>
          <span
            class="flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
            :class="getDifficultyClass(topicStats.difficulty)"
          >
            {{ topicStats.difficulty }}
          </span>
        </div>

        <!-- Progress indicator as percentage -->
        <div class="flex items-center gap-1">
          <span
            v-if="topicStats.progress !== undefined"
            class="text-xs font-medium"
            :class="{
              'text-green-600 dark:text-green-400': topicStats.progress === 100,
              'text-gray-500 dark:text-gray-400': topicStats.progress !== 100,
            }"
          >
            {{ topicStats.progress }}%
          </span>
          <ArrowRightIcon
            class="w-4 h-4 text-gray-400 transition-transform group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
