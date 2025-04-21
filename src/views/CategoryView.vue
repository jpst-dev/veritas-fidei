<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { useFavoritesStore } from "@/stores/favorites";
import { getIconComponent } from "@/utils/IconMapping";
import { getDifficultyClass } from "@/utils/formatters";
import TopicCard from "@/components/TopicCard.vue";
import {
  ArrowRightIcon,
  ClockIcon,
  TagIcon,
  HomeIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ChartBarIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  PencilIcon,
  LightBulbIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();
const categoryId = route.params.categoryId as string;
const subcategoryId = route.params.subcategoryId as string;
const favoritesStore = useFavoritesStore();

// Load favorites
onMounted(() => {
  favoritesStore.loadFavorites();
});

// Current category data
const currentCategory = computed(() => {
  return categories.find((cat) => cat.id === categoryId);
});

// Get all topics from subcategories
const topics = computed(() => {
  if (!currentCategory.value) return [];
  return currentCategory.value.subcategories.flatMap((subcategory) =>
    subcategory.topics.map((topic) => ({
      ...topic,
      subcategoryId: subcategory.id,
      subcategoryTitle: subcategory.title,
    }))
  );
});

// Group topics by difficulty for statistics
const topicsByDifficulty = computed(() => {
  const result = {
    Iniciante: 0,
    Intermediário: 0,
    Avançado: 0,
  };

  topics.value.forEach((topic) => {
    if (topic.stats.difficulty in result) {
      result[topic.stats.difficulty as keyof typeof result]++;
    }
  });

  return result;
});

// Total reading time for all topics
const totalReadingTime = computed(() => {
  return topics.value.reduce((total, topic) => {
    const time = parseInt(topic.stats.readingTime);
    return isNaN(time) ? total : total + time;
  }, 0);
});

// All unique tags across all topics in this category
const allTags = computed(() => {
  const tags = new Set<string>();
  topics.value.forEach((topic) => {
    topic.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
});

// Navigation functions
const handleSubcategoryClick = (subcategoryId: string) => {
  router.push({
    name: "subcategory",
    params: { categoryId, subcategoryId },
  });
};

const handleTopicClick = (topic: any) => {
  router.push(
    `/explorar/${route.params.categoryId}/${topic.subcategoryId}/${topic.id}`
  );
};

const navigateToCategories = () => {
  router.push({ name: "explore" });
};

// Helper methods
const isFavorite = (topicId: string | number) => {
  return favoritesStore.isFavorite(topicId.toString());
};

const toggleBookmark = (topicId: string | number) => {
  favoritesStore.toggleFavorite(topicId.toString());
};

// Get random icon for each subcategory if one is not provided
const getDefaultIcon = (index: number) => {
  const icons = [
    BookOpenIcon,
    AcademicCapIcon,
    ChartBarIcon,
    DocumentTextIcon,
    PencilIcon,
    LightBulbIcon,
  ];
  return icons[index % icons.length];
};

const showDetailedStats = ref(false);
const totalTopics = computed(() => topics.value.length);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div v-if="currentCategory">
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
            <span class="font-medium text-white">
              {{ currentCategory.title }}
            </span>
          </nav>

          <!-- Category Header -->
          <div class="flex flex-col mb-6 md:flex-row md:items-center">
            <div
              class="p-4 mb-4 rounded-lg md:mb-0 md:mr-6 bg-white/10 backdrop-blur-sm"
            >
              <component
                :is="getIconComponent(currentCategory.icon)"
                class="w-12 h-12 text-white"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold md:text-4xl">
                {{ currentCategory.title }}
              </h1>
              <p class="mt-2 text-lg text-primary-100">
                {{ currentCategory.description }}
              </p>
            </div>

            <!-- Back Button -->
            <button
              @click="navigateToCategories"
              class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-primary-900/80 border-2 border-white/30 rounded-lg shadow-md hover:bg-primary-800 hover:border-white/60 md:mt-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              <ArrowLeftIcon class="w-4 h-4 mr-2" />
              Voltar para Categorias
            </button>
          </div>

          <!-- Category Statistics -->
          <div class="flex flex-wrap justify-start gap-4 mt-6">
            <div
              class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <BookOpenIcon class="w-4 h-4 mr-1.5 text-primary-200" />
              <span class="text-sm font-medium text-white"
                >{{ topics.length }} Tópicos</span
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
              <TagIcon class="w-4 h-4 mr-1.5 text-primary-200" />
              <span class="text-sm font-medium text-white"
                >{{ allTags.length }} Tags</span
              >
            </div>
          </div>

          <!-- Difficulty Indicators (Subtle Pills) -->
          <div class="flex flex-wrap items-center gap-2 mt-4">
            <span class="text-xs text-primary-100">Dificuldade:</span>
            <div class="flex items-center gap-1.5">
              <div
                class="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
              >
                <span class="w-2 h-2 mr-1.5 rounded-full bg-green-400"></span>
                <span>{{ topicsByDifficulty.Iniciante }} iniciante</span>
              </div>

              <div
                class="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
              >
                <span class="w-2 h-2 mr-1.5 rounded-full bg-yellow-400"></span>
                <span
                  >{{ topicsByDifficulty.Intermediário }} intermediário</span
                >
              </div>

              <div
                class="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
              >
                <span class="w-2 h-2 mr-1.5 rounded-full bg-red-400"></span>
                <span>{{ topicsByDifficulty.Avançado }} avançado</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="container px-4 py-8 mx-auto">
        <!-- Subcategorias -->
        <section v-if="currentCategory.subcategories?.length" class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Subcategorias
            </h2>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="(subcategory, index) in currentCategory.subcategories"
              :key="subcategory.id"
              @click="handleSubcategoryClick(subcategory.id)"
              class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 group hover:shadow-lg hover:-translate-y-1"
            >
              <!-- Top gradient accent bar -->
              <div
                class="h-2 bg-gradient-to-r from-primary-500 to-primary-400"
              ></div>

              <div class="p-6">
                <div class="flex items-start space-x-4">
                  <div
                    class="p-3 rounded-lg shrink-0 bg-primary-50 dark:bg-primary-900/30"
                  >
                    <component
                      :is="
                        getIconComponent(subcategory.icon) ||
                        getDefaultIcon(index)
                      "
                      class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                    >
                      {{ subcategory.title }}
                    </h3>
                    <p class="mt-1 text-gray-600 dark:text-gray-300">
                      {{ subcategory.description }}
                    </p>
                  </div>
                </div>

                <!-- Statistics -->
                <div
                  class="flex flex-wrap gap-3 pt-4 mt-4 border-t border-gray-100 dark:border-gray-700"
                >
                  <span
                    class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300"
                  >
                    <BookOpenIcon class="w-3 h-3 mr-1" />
                    {{ subcategory.topics.length }} tópicos
                  </span>
                  <span
                    class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    <ClockIcon class="w-3 h-3 mr-1" />
                    {{ subcategory.stats.readingTime }}
                  </span>
                  <span
                    class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full"
                    :class="getDifficultyClass(subcategory.stats.difficulty)"
                  >
                    <AcademicCapIcon class="w-3 h-3 mr-1" />
                    {{ subcategory.stats.difficulty }}
                  </span>
                </div>

                <div
                  class="flex items-center mt-4 text-sm font-medium text-primary-600 dark:text-primary-400"
                >
                  <span>Explorar subcategoria</span>
                  <ArrowRightIcon
                    class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Topics -->
        <section v-if="topics.length > 0" class="mt-8">
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Tópicos
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TopicCard
              v-for="topic in topics"
              :key="topic.id"
              :topic="topic"
              :is-bookmarked="isFavorite(topic.id)"
              show-category-path
              show-bookmark
              @click="handleTopicClick(topic)"
              @toggle-bookmark="toggleBookmark(topic.id)"
            />
          </div>
        </section>
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
          Categoria não encontrada
        </h1>
        <p class="mb-8 text-lg text-gray-600 dark:text-gray-300">
          A categoria que você está procurando não existe ou foi removida.
        </p>
        <button
          @click="navigateToCategories"
          class="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Voltar para Categorias
        </button>
      </div>
    </div>
  </div>
</template>
