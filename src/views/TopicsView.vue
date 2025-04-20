<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { useFavoritesStore } from "@/stores/favorites";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChevronRightIcon,
  TagIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  HomeIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import TopicCard from "@/components/TopicCard.vue";

const router = useRouter();
const favoritesStore = useFavoritesStore();

// Estado
const selectedCategory = ref("Todos");
const selectedDifficulty = ref("");
const selectedTag = ref("");
const sortBy = ref("title");
const searchQuery = ref("");
const showFilters = ref(false);
const isLoading = ref(true);
const resultsCount = ref(0);

// Animação de entrada
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 600);

  // Load favorites
  favoritesStore.loadFavorites();
});

interface Topic {
  id: number;
  title: string;
  description: string;
  content: string;
  references: Reference[];
  tags: string[];
  stats: {
    readingTime: string;
    difficulty: "Iniciante" | "Intermediário" | "Avançado";
    lastUpdated: string;
    progress: number;
  };
  category: string;
  subcategory: string;
  categoryId: string;
  subcategoryId: string;
  icon: string;
}

interface Reference {
  title: string;
  author: string;
  link: string;
}

// Reset filters
const resetFilters = () => {
  selectedCategory.value = "Todos";
  selectedDifficulty.value = "";
  selectedTag.value = "";
  searchQuery.value = "";
};

// Toggle filtros no mobile
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

// Computed
const allTopics = computed(() => {
  const topics: Topic[] = [];
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.topics.forEach((topic) => {
        topics.push({
          ...topic,
          category: category.title,
          subcategory: subcategory.title,
          categoryId: category.id,
          subcategoryId: subcategory.id,
          icon: subcategory.icon || "DocumentTextIcon",
        });
      });
    });
  });
  return topics;
});

const filteredTopics = computed(() => {
  let topics = allTopics.value;

  // Filtrar por pesquisa
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    topics = topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filtrar por categoria
  if (selectedCategory.value !== "Todos") {
    topics = topics.filter(
      (topic) => topic.category === selectedCategory.value
    );
  }

  // Filtrar por dificuldade
  if (selectedDifficulty.value) {
    topics = topics.filter(
      (topic) => topic.stats.difficulty === selectedDifficulty.value
    );
  }

  // Filtrar por tag
  if (selectedTag.value) {
    topics = topics.filter((topic) => topic.tags.includes(selectedTag.value));
  }

  // Ordenar
  let sortedTopics;
  switch (sortBy.value) {
    case "title":
      sortedTopics = topics.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "difficulty":
      const difficultyOrder = { Iniciante: 0, Intermediário: 1, Avançado: 2 };
      sortedTopics = topics.sort(
        (a, b) =>
          difficultyOrder[a.stats.difficulty] -
          difficultyOrder[b.stats.difficulty]
      );
      break;
    case "readingTime":
      sortedTopics = topics.sort((a, b) => {
        const timeA = parseInt(a.stats.readingTime);
        const timeB = parseInt(b.stats.readingTime);
        return timeA - timeB;
      });
      break;
    default:
      sortedTopics = topics;
  }

  // Atualizar contagem
  resultsCount.value = sortedTopics.length;
  return sortedTopics;
});

const categoriesList = computed(() => {
  const uniqueCategories = new Set(
    allTopics.value.map((topic) => topic.category)
  );
  return ["Todos", ...Array.from(uniqueCategories)];
});

const tagsList = computed(() => {
  const allTags = new Set<string>();
  allTopics.value.forEach((topic) => {
    topic.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
});

// Estatísticas
const totalReadingTime = computed(() => {
  return allTopics.value.reduce((total, topic) => {
    const time = parseInt(topic.stats.readingTime);
    return isNaN(time) ? total : total + time;
  }, 0);
});

// Group topics by difficulty for statistics
const topicsByDifficulty = computed(() => {
  const result = {
    Iniciante: 0,
    Intermediário: 0,
    Avançado: 0,
  };

  allTopics.value.forEach((topic) => {
    if (topic.stats.difficulty in result) {
      result[topic.stats.difficulty as keyof typeof result]++;
    }
  });

  return result;
});

// All unique tags across all topics
const allUniqueTags = computed(() => {
  const uniqueTags = new Set<string>();
  allTopics.value.forEach((topic) => {
    topic.tags.forEach((tag) => uniqueTags.add(tag));
  });
  return Array.from(uniqueTags);
});

// Funções
const handleTopicClick = (topic: Topic) => {
  router.push({
    name: "topic",
    params: {
      categoryId: topic.categoryId,
      subcategoryId: topic.subcategoryId,
      topicId: topic.id,
    },
  });
};

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

// Toggle bookmark for a topic
const toggleBookmark = (event: Event, topicId: number) => {
  event.stopPropagation();
  favoritesStore.toggleFavorite(topicId.toString());
};

// Active filter count
const activeFilterCount = computed(() => {
  let count = 0;
  if (selectedCategory.value !== "Todos") count++;
  if (selectedDifficulty.value) count++;
  if (selectedTag.value) count++;
  if (searchQuery.value.trim()) count++;
  return count;
});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    selectedCategory.value !== "Todos" ||
    !!selectedDifficulty.value ||
    !!selectedTag.value ||
    !!searchQuery.value.trim()
  );
});

// Navigate to home
const navigateToHome = () => {
  router.push({ name: "home" });
};

// Watch for filter changes to force mobile filter panel closed
watch(
  [selectedCategory, selectedDifficulty, selectedTag, searchQuery],
  () => {
    if (showFilters.value && window.innerWidth < 768) {
      setTimeout(() => {
        showFilters.value = false;
      }, 500);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
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
          <span class="font-medium text-white">Tópicos</span>
        </nav>

        <!-- Page Header -->
        <div class="flex flex-col mb-6 md:flex-row md:items-center">
          <div
            class="p-4 mb-4 rounded-lg md:mb-0 md:mr-6 bg-white/10 backdrop-blur-sm"
          >
            <AcademicCapIcon class="w-12 h-12 text-white" />
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold md:text-4xl">
              Tópicos de Apologética
            </h1>
            <p class="mt-2 text-lg text-primary-100">
              Explore nossa biblioteca de tópicos sobre apologética católica,
              organizados por categorias, dificuldade e tags.
            </p>
          </div>

          <!-- Back Button -->
          <button
            @click="navigateToHome"
            class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-primary-900/80 border-2 border-white/30 rounded-lg shadow-md hover:bg-primary-800 hover:border-white/60 md:mt-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar para Início
          </button>
        </div>

        <!-- Statistics -->
        <div class="flex flex-wrap justify-start gap-4 mt-6">
          <div
            class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <BookOpenIcon class="w-4 h-4 mr-1.5 text-primary-200" />
            <span class="text-sm font-medium text-white"
              >{{ allTopics.length }} Tópicos</span
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
              >{{ allUniqueTags.length }} Tags</span
            >
          </div>
        </div>

        <!-- Difficulty Indicators -->
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
              <span>{{ topicsByDifficulty.Intermediário }} intermediário</span>
            </div>

            <div
              class="flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
            >
              <span class="w-2 h-2 mr-1.5 rounded-full bg-red-400"></span>
              <span>{{ topicsByDifficulty.Avançado }} avançado</span>
            </div>
          </div>
        </div>

        <!-- Active filters pills -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4">
          <div
            v-if="selectedCategory !== 'Todos'"
            class="flex items-center px-3 py-1 text-sm rounded-full bg-white/20"
          >
            <span>Categoria: {{ selectedCategory }}</span>
            <button
              @click="selectedCategory = 'Todos'"
              class="ml-2 text-white hover:text-gray-200"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <div
            v-if="selectedDifficulty"
            class="flex items-center px-3 py-1 text-sm rounded-full bg-white/20"
          >
            <span>Dificuldade: {{ selectedDifficulty }}</span>
            <button
              @click="selectedDifficulty = ''"
              class="ml-2 text-white hover:text-gray-200"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <div
            v-if="selectedTag"
            class="flex items-center px-3 py-1 text-sm rounded-full bg-white/20"
          >
            <span>Tag: {{ selectedTag }}</span>
            <button
              @click="selectedTag = ''"
              class="ml-2 text-white hover:text-gray-200"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <div
            v-if="searchQuery"
            class="flex items-center px-3 py-1 text-sm rounded-full bg-white/20"
          >
            <span>Busca: "{{ searchQuery }}"</span>
            <button
              @click="searchQuery = ''"
              class="ml-2 text-white hover:text-gray-200"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>

          <button
            @click="resetFilters"
            class="flex items-center px-3 py-1 text-sm font-medium transition-colors rounded-full bg-white/30 hover:bg-white/40"
          >
            Limpar todos os filtros
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container px-4 py-8 mx-auto">
      <!-- Results and Search Controls -->
      <div
        class="flex flex-col gap-4 pb-4 mb-6 border-b border-gray-200 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700"
      >
        <!-- Left side: Results count -->
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ resultsCount }}
          {{ resultsCount === 1 ? "Tópico encontrado" : "Tópicos encontrados" }}
        </h2>

        <!-- Right side: Search, Filter, and Sort controls -->
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <!-- Search input -->
          <div class="relative flex-1 min-w-[200px]">
            <div class="relative">
              <MagnifyingGlassIcon
                class="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Pesquisar tópicos..."
                class="w-full py-2 pr-3 text-sm bg-white border border-gray-200 rounded-lg pl-9 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute text-gray-400 -translate-y-1/2 right-2 top-1/2 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Filter button -->
          <div class="flex items-center space-x-2">
            <div class="relative">
              <button
                @click="toggleFilters"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <AdjustmentsHorizontalIcon class="w-4 h-4 mr-1.5" />
                Filtros
                <span
                  v-show="activeFilterCount > 0"
                  class="flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white rounded-full bg-primary-500"
                >
                  {{ activeFilterCount }}
                </span>
              </button>

              <!-- Filter dropdown panel -->
              <div
                v-if="showFilters"
                class="absolute right-0 z-10 w-64 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800"
              >
                <div class="p-4">
                  <div class="mb-4">
                    <label
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Categoria
                    </label>
                    <select
                      v-model="selectedCategory"
                      class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option
                        v-for="category in categoriesList"
                        :key="category"
                        :value="category"
                      >
                        {{ category }}
                      </option>
                    </select>
                  </div>

                  <div class="mb-4">
                    <label
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Dificuldade
                    </label>
                    <select
                      v-model="selectedDifficulty"
                      class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Todas as dificuldades</option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>

                  <div class="mb-4">
                    <label
                      class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Tag
                    </label>
                    <select
                      v-model="selectedTag"
                      class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Todas as tags</option>
                      <option v-for="tag in tagsList" :key="tag" :value="tag">
                        {{ tag }}
                      </option>
                    </select>
                  </div>

                  <div class="flex justify-end">
                    <button
                      v-if="hasActiveFilters"
                      @click="resetFilters"
                      class="px-3 py-1.5 text-sm font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                    >
                      Limpar filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sort options -->
            <div>
              <select
                v-model="sortBy"
                class="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="title">Ordenar: Título</option>
                <option value="difficulty">Ordenar: Dificuldade</option>
                <option value="readingTime">Ordenar: Tempo</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <div
          v-for="i in 6"
          :key="i"
          class="p-6 bg-white rounded-lg shadow-md animate-pulse dark:bg-gray-800"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              class="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
            <div
              class="w-16 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="w-1/3 h-2 mb-2 bg-gray-200 rounded-full dark:bg-gray-700"
          ></div>
          <div
            class="w-3/4 h-4 mb-2 bg-gray-200 rounded-full dark:bg-gray-700"
          ></div>
          <div
            class="w-full h-2 mb-4 bg-gray-200 rounded-full dark:bg-gray-700"
          ></div>
          <div class="flex gap-2 mb-4">
            <div
              class="w-16 h-6 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
            <div
              class="w-16 h-6 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
          </div>
          <div
            class="flex items-center justify-between mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <div
              class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
            <div
              class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700"
            ></div>
          </div>
        </div>
      </div>

      <!-- Topics Grid -->
      <div
        v-else-if="filteredTopics.length > 0"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <TopicCard
          v-for="topic in filteredTopics"
          :key="topic.id"
          :topic="topic"
          :show-bookmark="true"
          :show-category-path="true"
          @toggle-bookmark="toggleBookmark"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="p-10 text-center bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div
          class="flex items-center justify-center w-24 h-24 p-6 mx-auto mb-6 bg-gray-100 rounded-full dark:bg-gray-700"
        >
          <ExclamationTriangleIcon
            class="w-12 h-12 text-gray-400 dark:text-gray-500"
          />
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Nenhum resultado encontrado
        </h3>
        <p class="max-w-md mx-auto mb-6 text-gray-600 dark:text-gray-400">
          Nenhum tópico corresponde aos filtros selecionados. Tente ajustar seus
          critérios de busca para encontrar o que procura.
        </p>
        <button
          @click="resetFilters"
          class="px-4 py-2 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Limpar todos os filtros
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Animações de entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.3s ease-out forwards;
  animation-delay: calc(var(--animation-order, 0) * 0.1s);
  opacity: 0;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-pulse {
  position: relative;
  overflow: hidden;
}

.animate-pulse::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.dark .animate-pulse::after {
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 0)
  );
}
</style>
