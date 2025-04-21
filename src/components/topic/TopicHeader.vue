<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  HomeIcon,
  ChevronRightIcon,
  BookOpenIcon,
  EyeIcon,
} from "@heroicons/vue/24/outline";
import { formatReadingTime, getDifficultyClass } from "@/utils/formatters";
import type { Topic } from "@/data/categories";
import {
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  AcademicCapIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";

interface ExtendedTopic extends Topic {
  categoryId: string;
  subcategoryId: string;
  categoryTitle: string;
  subcategoryTitle: string;
}

const props = defineProps<{
  topic: ExtendedTopic;
  isBookmarked: boolean;
  fontSize: string;
  isFocusMode: boolean;
}>();

const emit = defineEmits<{
  (e: "bookmark"): void;
  (e: "share"): void;
  (e: "reading-mode-toggle"): void;
  (e: "focus-mode-toggle"): void;
}>();

const router = useRouter();

// Computed properties
const difficultyClass = computed(() =>
  getDifficultyClass(props.topic.stats.difficulty)
);
const formattedReadingTime = computed(() =>
  formatReadingTime(props.topic.stats.readingTime)
);

// Navigation
function goBack() {
  router.back();
}
</script>

<template>
  <header
    class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400"
  >
    <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

    <div class="container relative z-10 px-4 py-8 mx-auto">
      <!-- Breadcrumbs -->
      <nav class="flex flex-wrap items-center mb-4 text-sm text-white/90">
        <router-link
          to="/"
          class="flex items-center transition-colors hover:text-white"
        >
          <HomeIcon class="w-4 h-4 mr-1" />
          <span>Início</span>
        </router-link>
        <ChevronRightIcon class="w-4 h-4 mx-1" />
        <router-link
          :to="`/explorar/${topic.categoryId}`"
          class="transition-colors hover:text-white"
        >
          {{ topic.categoryTitle }}
        </router-link>
        <ChevronRightIcon class="w-4 h-4 mx-1" />
        <router-link
          :to="`/explorar/${topic.categoryId}/${topic.subcategoryId}`"
          class="transition-colors hover:text-white"
        >
          {{ topic.subcategoryTitle }}
        </router-link>
        <ChevronRightIcon class="w-4 h-4 mx-1" />
        <span class="font-medium text-white">{{ topic.title }}</span>
      </nav>

      <!-- Title and Description -->
      <div class="max-w-4xl">
        <h1 class="mb-3 text-3xl font-bold text-white md:text-4xl">
          {{ topic.title }}
        </h1>
        <p class="mb-6 text-lg text-white/90">
          {{ topic.description }}
        </p>
      </div>

      <!-- Topic Metadata -->
      <div class="flex flex-wrap items-center gap-4">
        <!-- Reading time -->
        <div
          class="flex items-center px-3 py-1.5 text-sm font-medium text-white rounded-full bg-white/10 backdrop-blur-sm"
        >
          <ClockIcon class="w-4 h-4 mr-1.5" />
          <span>{{ formattedReadingTime }}</span>
        </div>

        <!-- Difficulty badge -->
        <div
          class="flex items-center px-3 py-1.5 text-sm font-medium rounded-full"
          :class="difficultyClass"
        >
          <AcademicCapIcon class="w-4 h-4 mr-1.5" />
          {{ topic.stats.difficulty }}
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap items-center gap-2">
          <div
            v-for="tag in topic.tags"
            :key="tag"
            class="px-3 py-1.5 text-xs font-medium text-white rounded-full bg-white/10 backdrop-blur-sm"
          >
            {{ tag }}
          </div>
        </div>

        <!-- Last updated -->
        <div class="text-sm text-white/80">
          Atualizado: {{ topic.stats.lastUpdated }}
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4 pb-2 mt-6">
        <!-- Bookmark -->
        <button
          @click="emit('bookmark')"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:bg-white/10"
          :class="{ 'text-primary-100': isBookmarked }"
        >
          <BookmarkIcon v-if="!isBookmarked" class="w-5 h-5" />
          <BookmarkSolidIcon v-else class="w-5 h-5" />
          {{ isBookmarked ? "Favoritado" : "Favoritar" }}
        </button>

        <!-- Share -->
        <button
          @click="emit('share')"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <ShareIcon class="w-5 h-5" />
          Compartilhar
        </button>

        <!-- Focus Mode -->
        <button
          @click="emit('focus-mode-toggle')"
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg hover:bg-white/10"
          :class="{ 'bg-white/20': isFocusMode }"
        >
          <EyeIcon class="w-5 h-5" />
          {{ isFocusMode ? "Modo Normal" : "Modo Foco" }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.bg-grid-pattern-light {
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
