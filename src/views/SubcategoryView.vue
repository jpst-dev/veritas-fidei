<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { useFavoritesStore } from "@/stores/favorites";
import { getIconComponent } from "@/utils/IconMapping";
import TopicCard from "@/components/TopicCard.vue";
import {
  TagIcon,
  ClockIcon,
  ArrowLeftIcon,
  HomeIcon,
  ChevronRightIcon,
  BookmarkIcon,
  ChartBarIcon,
  BookOpenIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChevronDoubleLeftIcon,
  CalendarIcon,
  UserGroupIcon,
  FireIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();
const favoritesStore = useFavoritesStore();
const subcategoryId = computed(() => route.params.subcategoryId as string);
const categoryId = computed(() => route.params.categoryId as string);

// Load favorites on mount
onMounted(() => {
  favoritesStore.loadFavorites();
});

// Encontra a categoria e subcategoria atuais
const currentCategory = computed(() => {
  return categories.find((cat) => cat.id === categoryId.value);
});

const currentSubcategory = computed(() => {
  return currentCategory.value?.subcategories.find(
    (sub) => sub.id === subcategoryId.value
  );
});

// Filter completed topics (progress 100%)
const completedTopics = computed(() => {
  return (
    currentSubcategory.value?.topics.filter(
      (topic) => topic.stats.progress === 100
    ) || []
  );
});

// Get total reading time
const totalReadingTime = computed(() => {
  return (
    currentSubcategory.value?.topics.reduce((total, topic) => {
      const time = parseInt(topic.stats.readingTime);
      return isNaN(time) ? total : total + time;
    }, 0) || 0
  );
});

// Get all unique tags from topics
const allTags = computed(() => {
  const tags = new Set<string>();
  currentSubcategory.value?.topics.forEach((topic) => {
    topic.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
});

// Group topics by difficulty
const topicsByDifficulty = computed(() => {
  const result = {
    Iniciante: 0,
    Intermediário: 0,
    Avançado: 0,
  };

  currentSubcategory.value?.topics.forEach((topic) => {
    if (topic.stats.difficulty in result) {
      result[topic.stats.difficulty as keyof typeof result]++;
    }
  });

  return result;
});

// Helper to get appropriate color class for difficulty levels
const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case "Iniciante":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Intermediário":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Avançado":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// Navegação
const goBack = () => {
  router.push({
    name: "category",
    params: { categoryId: categoryId.value },
  });
};

const navigateToTopic = (topicId: string) => {
  router.push(
    `/explorar/${categoryId.value}/${subcategoryId.value}/${topicId}`
  );
};

// Toggle bookmark for a topic
const toggleBookmark = (topicId: string | number) => {
  favoritesStore.toggleFavorite(topicId.toString());
};

const handleTopicClick = (topic: any) => {
  navigateToTopic(topic.id.toString());
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div v-if="currentCategory && currentSubcategory">
      <!-- Hero Header with Gradient Background -->
      <header
        class="relative py-12 text-white bg-gradient-to-r from-primary-700 to-primary-600"
      >
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div class="container relative px-4 mx-auto">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center mb-6 text-sm text-primary-100">
            <router-link to="/" class="flex items-center hover:text-white">
              <HomeIcon class="w-4 h-4 mr-1" />
              Início
            </router-link>
            <ChevronRightIcon class="w-4 h-4 mx-2" />
            <router-link to="/explorar" class="hover:text-white">
              Categorias
            </router-link>
            <ChevronRightIcon class="w-4 h-4 mx-2" />
            <router-link
              :to="`/explorar/${categoryId}`"
              class="hover:text-white"
            >
              {{ currentCategory.title }}
            </router-link>
            <ChevronRightIcon class="w-4 h-4 mx-2" />
            <span class="font-medium text-white">
              {{ currentSubcategory.title }}
            </span>
          </nav>

          <!-- Subcategory Header -->
          <div class="flex flex-col mb-6 md:flex-row md:items-center">
            <div
              class="p-4 mb-4 rounded-lg md:mb-0 md:mr-6 bg-white/10 backdrop-blur-sm"
            >
              <component
                :is="
                  getIconComponent(currentSubcategory.icon || 'BookOpenIcon')
                "
                class="w-12 h-12 text-white"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold md:text-4xl">
                {{ currentSubcategory.title }}
              </h1>
              <p class="mt-2 text-lg text-primary-100">
                {{ currentSubcategory.description }}
              </p>
            </div>

            <!-- Back Button -->
            <button
              @click="goBack"
              class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-primary-900/80 border-2 border-white/30 rounded-lg shadow-md hover:bg-primary-800 hover:border-white/60 md:mt-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              <ArrowLeftIcon class="w-4 h-4 mr-2" />
              Voltar para {{ currentCategory.title }}
            </button>
          </div>

          <!-- Statistics -->
          <div class="flex flex-wrap justify-start gap-4 mt-6">
            <div
              class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <BookOpenIcon class="w-4 h-4 mr-1.5 text-primary-200" />
              <span class="text-sm font-medium text-white"
                >{{ currentSubcategory.topics.length }} Tópicos</span
              >
            </div>
            <div
              class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <ClockIcon class="w-4 h-4 mr-1.5 text-primary-200" />
              <span class="text-sm font-medium text-white"
                >{{ totalReadingTime }} min de leitura</span
              >
            </div>
            <div
              class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <CheckCircleIcon class="w-4 h-4 mr-1.5 text-primary-200" />
              <span class="text-sm font-medium text-white"
                >{{ completedTopics.length }} Concluídos</span
              >
            </div>
            <div
              class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <TagIcon class="w-4 h-4 mr-1.5 text-primary-200" />
              <span class="text-sm font-medium text-white"
                >{{ allTags.length }} Tags</span
              >
            </div>
          </div>

          <!-- Difficulty Indicators (Modern Pills) -->
          <div class="flex flex-wrap items-center gap-2 mt-6">
            <span class="text-xs font-medium text-primary-100"
              >Dificuldade:</span
            >
            <div class="flex flex-wrap gap-2">
              <div
                class="flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
              >
                <span
                  class="w-2.5 h-2.5 mr-1.5 rounded-full bg-green-400"
                ></span>
                <span>{{ topicsByDifficulty.Iniciante }} iniciante</span>
              </div>

              <div
                class="flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
              >
                <span
                  class="w-2.5 h-2.5 mr-1.5 rounded-full bg-yellow-400"
                ></span>
                <span
                  >{{ topicsByDifficulty.Intermediário }} intermediário</span
                >
              </div>

              <div
                class="flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
              >
                <span class="w-2.5 h-2.5 mr-1.5 rounded-full bg-red-400"></span>
                <span>{{ topicsByDifficulty.Avançado }} avançado</span>
              </div>
            </div>
          </div>

          <!-- Mobile Back Button (shown only on mobile) -->
          <button
            @click="goBack"
            class="flex items-center justify-center w-full px-4 py-3 mt-6 text-sm font-medium text-white transition-all duration-200 rounded-lg bg-primary-800/70 md:hidden hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar para {{ currentCategory.title }}
          </button>
        </div>
      </header>

      <div class="container px-4 py-8 mx-auto">
        <!-- Lista de Tópicos -->
        <div v-if="currentSubcategory.topics.length" class="mb-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Tópicos
            </h2>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TopicCard
              v-for="topic in currentSubcategory.topics"
              :key="topic.id"
              :topic="{
                ...topic,
                categoryId: categoryId,
                subcategoryId: subcategoryId,
                categoryTitle: currentCategory?.title,
                subcategoryTitle: currentSubcategory?.title,
              }"
              show-bookmark
              @click="handleTopicClick(topic)"
              @toggle-bookmark="toggleBookmark"
            />
          </div>
        </div>

        <!-- Mensagem quando não há tópicos -->
        <div
          v-else
          class="p-10 text-center bg-white rounded-lg shadow-sm dark:bg-gray-800"
        >
          <div
            class="inline-flex items-center justify-center p-6 mb-6 bg-gray-100 rounded-full dark:bg-gray-700"
          >
            <ExclamationTriangleIcon
              class="w-12 h-12 text-gray-400 dark:text-gray-500"
            />
          </div>
          <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Nenhum tópico disponível
          </h2>
          <p class="mb-6 text-gray-600 dark:text-gray-300">
            Esta subcategoria ainda não possui tópicos cadastrados.
          </p>
          <button
            @click="goBack"
            class="inline-flex items-center px-5 py-2.5 font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <ChevronDoubleLeftIcon class="w-5 h-5 mr-2" />
            Voltar para {{ currentCategory.title }}
          </button>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="container px-4 py-16 mx-auto text-center">
      <div class="max-w-md mx-auto">
        <div
          class="flex items-center justify-center w-24 h-24 p-4 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900/30"
        >
          <ExclamationTriangleIcon
            class="w-12 h-12 text-primary-600 dark:text-primary-400"
          />
        </div>
        <h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Subcategoria não encontrada
        </h1>
        <p class="mb-8 text-lg text-gray-600 dark:text-gray-300">
          A subcategoria que você está procurando não existe ou foi removida.
        </p>
        <router-link
          to="/explorar"
          class="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Voltar para Categorias
        </router-link>
      </div>
    </div>
  </div>
</template>
