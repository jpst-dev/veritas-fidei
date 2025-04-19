<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { useFavoritesStore } from "@/stores/favorites";
import { getIconComponent } from "@/utils/IconMapping";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  ScaleIcon,
  GiftIcon,
  TagIcon,
  BookmarkIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  HomeIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const favoritesStore = useFavoritesStore();

// Estado da paginação
const currentPage = ref(1);
const itemsPerPage = 6; // 2 colunas em telas médias, 3 em telas grandes

// Filtros e ordenação
const searchQuery = ref("");
const selectedDifficulty = ref<string>("Todos");
const selectedTag = ref<string>("Todos");
const sortBy = ref<string>("relevancia");
const showFilters = ref(false);

const difficulties = ["Todos", "Iniciante", "Intermediário", "Avançado"];
const allTags = computed(() => {
  const tags = new Set<string>();
  categories.forEach((category) => {
    if (category.tags) {
      category.tags.forEach((tag) => tags.add(tag));
    }
  });
  return ["Todos", ...Array.from(tags)];
});

// Featured categories for the banner section
const featuredCategories = computed(() => {
  return categories.filter((cat) => cat.stats.totalTopics > 5).slice(0, 3);
});

// Filtragem e ordenação
const filteredCategories = computed(() => {
  return categories.filter((category) => {
    // Filtro de busca
    const matchesSearch =
      searchQuery.value.trim() === "" ||
      category.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      category.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesDifficulty =
      selectedDifficulty.value === "Todos" ||
      category.stats.difficulty === selectedDifficulty.value;
    const matchesTag =
      selectedTag.value === "Todos" ||
      category.tags.includes(selectedTag.value);
    return matchesSearch && matchesDifficulty && matchesTag;
  });
});

const sortedCategories = computed(() => {
  const sorted = [...filteredCategories.value];
  switch (sortBy.value) {
    case "alfabetica":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "topics":
      return sorted.sort((a, b) => b.stats.totalTopics - a.stats.totalTopics);
    case "relevancia":
    default:
      return sorted;
  }
});

// Statistic totals
const totalStats = computed(() => {
  return {
    categories: categories.length,
    topics: categories.reduce((sum, cat) => sum + cat.stats.totalTopics, 0),
    tags: [...new Set(categories.flatMap((cat) => cat.tags || []))].length,
  };
});

// Paginação
const totalPages = computed(() => {
  return Math.ceil(sortedCategories.value.length / itemsPerPage);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedCategories.value.slice(start, end);
});

// Check if filters are active
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    selectedDifficulty.value !== "Todos" ||
    selectedTag.value !== "Todos"
  );
});

// Navegação
const navigateToCategory = (categoryId: string) => {
  router.push({
    name: "category",
    params: { categoryId },
  });
};

const navigateToHome = () => {
  router.push({ name: "home" });
};

const navigateToSubcategory = (categoryId: string, subcategoryId: string) => {
  router.push({
    name: "subcategory",
    params: { categoryId, subcategoryId },
  });
};

const navigateToTopic = (
  categoryId: string,
  subcategoryId: string,
  topicId: string
) => {
  router.push({
    name: "topic",
    params: { categoryId, subcategoryId, topicId },
  });
};

const toggleBookmark = (categoryId: string) => {
  favoritesStore.toggleFavorite(categoryId);
};

// Controles de paginação
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToFirstPage = () => goToPage(1);
const goToLastPage = () => goToPage(totalPages.value);
const goToNextPage = () => goToPage(currentPage.value + 1);
const goToPreviousPage = () => goToPage(currentPage.value - 1);

// Alternar visibilidade dos filtros em dispositivos móveis
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

// Limpar filtros
const clearFilters = () => {
  searchQuery.value = "";
  selectedDifficulty.value = "Todos";
  selectedTag.value = "Todos";
  sortBy.value = "relevancia";
};

// Get difficulty class for styling
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

// Reset da paginação quando os filtros mudam
watch([searchQuery, selectedDifficulty, selectedTag, sortBy], () => {
  currentPage.value = 1;
  if (window.innerWidth < 768) {
    showFilters.value = false;
  }
});

// Carrega os favoritos ao montar o componente
onMounted(() => {
  favoritesStore.loadFavorites();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Header -->
    <header
      class="relative mb-10 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500"
    >
      <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div class="container relative px-4 py-12 mx-auto">
        <!-- Breadcrumb -->
        <nav class="flex items-center mb-6 text-sm text-primary-100">
          <router-link to="/" class="flex items-center hover:text-white">
            <HomeIcon class="w-4 h-4 mr-1" />
            Início
          </router-link>
          <ChevronRightIcon class="w-4 h-4 mx-2" />
          <span class="font-medium text-white">Explorar</span>
        </nav>

        <!-- Header Content -->
        <div class="flex flex-col items-center justify-between md:flex-row">
          <!-- Left Section with Icon, Title, and Description -->
          <div class="md:flex-1">
            <div class="flex items-start">
              <div class="p-4 mr-6 rounded-lg bg-white/10 backdrop-blur-sm">
                <AcademicCapIcon class="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 class="mb-3 text-3xl font-bold text-white md:text-4xl">
                  Explorar Categorias
                </h1>
                <p class="text-base text-primary-100 md:text-lg">
                  Navegue por tópicos organizados em categorias para encontrar
                  respostas às principais questões sobre a fé católica
                </p>
              </div>
            </div>
          </div>

          <!-- Right Section with Back Button -->
          <button
            @click="navigateToHome"
            class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-primary-900/80 border-2 border-white/30 rounded-lg shadow-md hover:bg-primary-800 hover:border-white/60 md:mt-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          >
            <ChevronLeftIcon class="w-4 h-4 mr-2" />
            Voltar para Categorias
          </button>
        </div>

        <!-- Stats Pills -->
        <div class="flex flex-wrap justify-start gap-4 mt-6">
          <div
            class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <BookOpenIcon class="w-4 h-4 mr-1.5 text-primary-200" />
            <span class="text-sm font-medium text-white">
              {{ totalStats.categories }} Categorias
            </span>
          </div>

          <div
            class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <AcademicCapIcon class="w-4 h-4 mr-1.5 text-primary-200" />
            <span class="text-sm font-medium text-white">
              {{ totalStats.topics }} Tópicos
            </span>
          </div>

          <div
            class="flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <TagIcon class="w-4 h-4 mr-1.5 text-primary-200" />
            <span class="text-sm font-medium text-white">
              {{ totalStats.tags }} Tags
            </span>
          </div>
        </div>

        <!-- Pills de Filtros ativos -->
        <div
          v-if="hasActiveFilters"
          class="flex flex-wrap items-center gap-2 mt-4"
        >
          <span class="mr-2 text-sm text-primary-100">Filtros ativos:</span>
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-white/10"
          >
            <span>Busca: "{{ searchQuery }}"</span>
            <XMarkIcon class="w-3.5 h-3.5 ml-1" />
          </button>
          <button
            v-if="selectedDifficulty !== 'Todos'"
            @click="selectedDifficulty = 'Todos'"
            class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
            :class="getDifficultyClass(selectedDifficulty)"
          >
            <span>{{ selectedDifficulty }}</span>
            <XMarkIcon class="w-3.5 h-3.5 ml-1" />
          </button>
          <button
            v-if="selectedTag !== 'Todos'"
            @click="selectedTag = 'Todos'"
            class="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
          >
            <TagIcon class="w-3 h-3 mr-1" />
            <span>{{ selectedTag }}</span>
            <XMarkIcon class="w-3.5 h-3.5 ml-1" />
          </button>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="inline-flex items-center px-3 py-1 text-xs font-medium text-white rounded-full bg-white/10 hover:bg-white/20"
          >
            <span>Limpar todos</span>
            <XMarkIcon class="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>
    </header>

    <div class="container px-4 mx-auto">
      <!-- Categorias em Destaque -->
      <section v-if="!hasActiveFilters" class="mb-12">
        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Categorias em Destaque
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            v-for="category in featuredCategories"
            :key="category.id"
            @click="navigateToCategory(category.id)"
            class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg group"
          >
            <!-- Top accent bar -->
            <div
              class="absolute top-0 left-0 right-0 h-1 transition-transform duration-300 origin-left transform scale-x-0 bg-primary-600 group-hover:scale-x-100"
            ></div>

            <div class="p-6">
              <div class="flex items-center mb-4">
                <div
                  class="p-3 mr-3 rounded-lg bg-primary-50 dark:bg-primary-900/30"
                >
                  <component
                    :is="getIconComponent(category.icon) || 'BookOpenIcon'"
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                  />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ category.title }}
                </h3>
              </div>

              <p class="mb-4 text-gray-600 dark:text-gray-300">
                {{ category.description }}
              </p>

              <!-- Stats -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                >
                  <BookOpenIcon class="w-3 h-3 mr-1" />
                  {{ category.stats.totalTopics }} tópicos
                </span>
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  <ClockIcon class="w-3 h-3 mr-1" />
                  {{ category.stats.readingTime }}
                </span>
              </div>

              <div
                class="flex items-center mt-4 text-sm font-medium text-primary-600 dark:text-primary-400"
              >
                <span>Explorar categoria</span>
                <ArrowRightIcon
                  class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Search & Filter Section -->
      <div class="mb-8">
        <div
          class="flex flex-col items-start justify-between mb-6 md:flex-row md:items-center"
        >
          <h2
            class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:mb-0"
          >
            {{
              hasActiveFilters ? "Resultados da Busca" : "Todas as Categorias"
            }}
          </h2>

          <div class="flex flex-wrap items-center w-full gap-3 md:w-auto">
            <!-- Search Bar -->
            <div class="relative flex-1 md:w-64 md:flex-none">
              <MagnifyingGlassIcon
                class="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar categorias..."
                class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Filter Toggle Button -->
            <button
              @click="toggleFilters"
              class="flex items-center px-4 py-2 text-sm font-medium transition-colors bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FunnelIcon class="w-4 h-4 mr-2" />
              Filtros
              <span
                v-if="hasActiveFilters"
                class="flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-white rounded-full bg-primary-600"
              >
                {{
                  (searchQuery ? 1 : 0) +
                  (selectedDifficulty !== "Todos" ? 1 : 0) +
                  (selectedTag !== "Todos" ? 1 : 0)
                }}
              </span>
            </button>

            <!-- Sort Dropdown -->
            <div class="relative">
              <div class="flex items-center">
                <select
                  v-model="sortBy"
                  class="px-4 py-2 pr-8 text-sm bg-white border border-gray-300 rounded-lg appearance-none dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="relevancia">Relevância</option>
                  <option value="alfabetica">Ordem Alfabética</option>
                  <option value="topics">Mais Tópicos</option>
                </select>
                <ArrowsUpDownIcon
                  class="absolute w-4 h-4 text-gray-500 pointer-events-none right-3"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Expanded Filter Section -->
        <div
          v-if="showFilters"
          class="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Difficulty Filter -->
            <div>
              <h3
                class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nível de Dificuldade
              </h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="difficulty in difficulties"
                  :key="difficulty"
                  @click="selectedDifficulty = difficulty"
                  class="px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                  :class="
                    selectedDifficulty === difficulty
                      ? difficulty === 'Todos'
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                        : getDifficultyClass(difficulty)
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                  "
                >
                  <span
                    v-if="difficulty !== 'Todos'"
                    class="inline-block w-2 h-2 mr-2 rounded-full"
                    :class="{
                      'bg-green-500 dark:bg-green-400':
                        difficulty === 'Iniciante',
                      'bg-yellow-500 dark:bg-yellow-400':
                        difficulty === 'Intermediário',
                      'bg-red-500 dark:bg-red-400': difficulty === 'Avançado',
                    }"
                  ></span>
                  {{ difficulty }}
                </button>
              </div>
            </div>

            <!-- Tags Filter -->
            <div>
              <h3
                class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tag
              </h3>
              <select
                v-model="selectedTag"
                class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="Todos">Todas as tags</option>
                <option
                  v-for="tag in allTags.filter((t) => t !== 'Todos')"
                  :key="tag"
                  :value="tag"
                >
                  {{ tag }}
                </option>
              </select>
            </div>

            <!-- Filter Actions -->
            <div class="flex items-end">
              <button
                @click="clearFilters"
                class="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        <!-- Results Count -->
        <div
          v-if="filteredCategories.length > 0"
          class="mb-4 text-sm text-gray-700 dark:text-gray-400"
        >
          Mostrando
          <span class="font-medium">{{ paginatedCategories.length }}</span> de
          <span class="font-medium">{{ filteredCategories.length }}</span>
          resultados
        </div>

        <!-- No Results -->
        <div
          v-if="filteredCategories.length === 0"
          class="flex flex-col items-center justify-center p-8 mb-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <MagnifyingGlassIcon class="w-12 h-12 mb-4 text-gray-400" />
          <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Nenhuma categoria encontrada
          </h3>
          <p class="mb-6 text-gray-600 dark:text-gray-400">
            Tente ajustar seus filtros ou termos de busca para encontrar o que
            procura.
          </p>
          <button
            @click="clearFilters"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            <XMarkIcon class="w-4 h-4 mr-2" />
            Limpar todos os filtros
          </button>
        </div>
      </div>

      <!-- Categories Grid -->
      <div v-if="paginatedCategories.length > 0" class="mb-10">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="category in paginatedCategories"
            :key="category.id"
            class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg group"
          >
            <!-- Bookmark Button -->
            <button
              @click.stop="toggleBookmark(category.id)"
              class="absolute z-10 p-1.5 text-gray-400 bg-white rounded-full shadow-sm top-4 right-4 hover:text-yellow-500 dark:bg-gray-700 dark:hover:text-yellow-400"
              :class="{
                'text-yellow-500 dark:text-yellow-400':
                  favoritesStore.isFavorite(category.id),
              }"
            >
              <BookmarkIcon class="w-5 h-5" />
            </button>

            <!-- Card Body with Hover Animation -->
            <div
              @click="navigateToCategory(category.id)"
              class="p-6 cursor-pointer"
            >
              <!-- Category Icon and Title -->
              <div class="flex items-center mb-4">
                <div
                  class="flex items-center justify-center p-3 mr-4 rounded-lg bg-primary-50 dark:bg-primary-900/30"
                >
                  <component
                    :is="getIconComponent(category.icon) || BookOpenIcon"
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                  />
                </div>
                <h3
                  class="text-xl font-semibold text-gray-900 truncate dark:text-white"
                >
                  {{ category.title }}
                </h3>
              </div>

              <!-- Category Description -->
              <p class="mb-4 text-gray-600 line-clamp-2 dark:text-gray-300">
                {{ category.description }}
              </p>

              <!-- Stats & Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <!-- Difficulty Badge -->
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="getDifficultyClass(category.stats.difficulty)"
                >
                  <span
                    class="inline-block w-2 h-2 mr-1.5 rounded-full"
                    :class="{
                      'bg-green-500 dark:bg-green-400':
                        category.stats.difficulty === 'Iniciante',
                      'bg-yellow-500 dark:bg-yellow-400':
                        category.stats.difficulty === 'Intermediário',
                      'bg-red-500 dark:bg-red-400':
                        category.stats.difficulty === 'Avançado',
                    }"
                  ></span>
                  {{ category.stats.difficulty }}
                </span>

                <!-- Topics Count -->
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                >
                  <BookOpenIcon class="w-3 h-3 mr-1" />
                  {{ category.stats.totalTopics }} tópicos
                </span>

                <!-- Reading Time -->
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  <ClockIcon class="w-3 h-3 mr-1" />
                  {{ category.stats.readingTime }}
                </span>
              </div>

              <!-- Tags Row -->
              <div
                v-if="category.tags && category.tags.length > 0"
                class="mb-4"
              >
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in category.tags.slice(0, 3)"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    <TagIcon class="w-3 h-3 mr-1" />
                    {{ tag }}
                  </span>
                  <span
                    v-if="category.tags.length > 3"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    +{{ category.tags.length - 3 }}
                  </span>
                </div>
              </div>

              <!-- View Category Link -->
              <div
                class="flex items-center mt-4 text-sm font-medium text-primary-600 dark:text-primary-400"
              >
                <span>Explorar categoria</span>
                <ArrowRightIcon
                  class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex justify-center mt-8">
        <nav
          class="inline-flex items-center -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <!-- First page -->
          <button
            @click="goToFirstPage"
            :disabled="currentPage === 1"
            class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="sr-only">First page</span>
            <ChevronDoubleLeftIcon class="w-5 h-5" />
          </button>

          <!-- Previous page -->
          <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1"
            class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="w-5 h-5" />
          </button>

          <!-- Current Page Number -->
          <span
            class="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:border-gray-700 dark:text-primary-400"
          >
            {{ currentPage }} de {{ totalPages }}
          </span>

          <!-- Next page -->
          <button
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="w-5 h-5" />
          </button>

          <!-- Last page -->
          <button
            @click="goToLastPage"
            :disabled="currentPage === totalPages"
            class="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="sr-only">Last page</span>
            <ChevronDoubleRightIcon class="w-5 h-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
