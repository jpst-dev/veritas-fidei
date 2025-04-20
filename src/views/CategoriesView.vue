<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { useFavoritesStore } from "@/stores/favorites";
import { getIconComponent } from "@/utils/IconMapping";
import {
  AcademicCapIcon,
  BookOpenIcon,
  TagIcon,
  BookmarkIcon,
  ChevronRightIcon,
  HomeIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/vue/24/outline";
import CategoryCard from "@/components/category/CategoryCard.vue";
import FeaturedCategoryCard from "@/components/category/FeaturedCategoryCard.vue";

const router = useRouter();
const favoritesStore = useFavoritesStore();

// Estado da paginação
const currentPage = ref(1);
const itemsPerPage = ref(6);
const viewMode = ref<"grid" | "list">("grid");

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
  return Math.ceil(sortedCategories.value.length / itemsPerPage.value);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
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

// Adicionar estado de carregamento
const isLoading = ref(false);

// Adicionar tooltips
const tooltips = {
  bookmark: "Adicionar aos favoritos",
  share: "Compartilhar categoria",
  filter: "Filtrar categorias",
  sort: "Ordenar categorias",
};

// Adicionar transições
const transitionClasses = {
  enter: "transition-all duration-300 ease-out",
  enterFrom: "opacity-0 transform -translate-y-2",
  enterTo: "opacity-100 transform translate-y-0",
  leave: "transition-all duration-200 ease-in",
  leaveFrom: "opacity-100 transform translate-y-0",
  leaveTo: "opacity-0 transform -translate-y-2",
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Header -->
    <header
      class="relative mb-10 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500"
      role="banner"
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
        <div class="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          <FeaturedCategoryCard
            v-for="(category, index) in featuredCategories"
            :key="category.id"
            :category="category"
            :index="index"
          />
        </div>
      </section>

      <!-- Filters and View Controls -->
      <div class="sticky top-0 z-10 py-4 mb-6 bg-gray-50 dark:bg-gray-900">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <!-- Search and View Mode -->
          <div class="flex items-center gap-4">
            <div class="relative flex-1 max-w-md">
              <MagnifyingGlassIcon
                class="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar categorias..."
                class="w-full py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          <!-- Filter Controls -->
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <button
                @click="viewMode = 'grid'"
                class="p-2 transition-colors rounded-lg"
                :class="
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                "
                aria-label="Visualização em grade"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                class="p-2 transition-colors rounded-lg"
                :class="
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                "
                aria-label="Visualização em lista"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <button
              @click="toggleFilters"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              :aria-expanded="showFilters"
              :aria-label="tooltips.filter"
            >
              <FunnelIcon class="w-5 h-5" />
              <span class="hidden md:inline">Filtros</span>
            </button>

            <button
              @click="clearFilters"
              v-if="hasActiveFilters"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Limpar filtros"
            >
              <XMarkIcon class="w-5 h-5" />
              <span class="hidden md:inline">Limpar</span>
            </button>
          </div>
        </div>

        <!-- Filters Panel -->
        <Transition
          v-bind="transitionClasses"
          @enter="showFilters = true"
          @leave="showFilters = false"
        >
          <div
            v-if="showFilters"
            class="p-4 mt-4 bg-white rounded-lg shadow-sm dark:bg-gray-800"
            role="region"
            aria-label="Painel de filtros"
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
        </Transition>
      </div>

      <!-- Categories Grid/List -->
      <div
        :class="{
          'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3':
            viewMode === 'grid',
          'space-y-4': viewMode === 'list',
        }"
      >
        <template v-if="viewMode === 'grid'">
          <CategoryCard
            v-for="category in paginatedCategories"
            :key="category.id"
            :category="category"
            :is-bookmarked="favoritesStore.isFavorite(category.id)"
            show-bookmark
            @click="navigateToCategory(category.id)"
            @toggle-bookmark="toggleBookmark"
          />
        </template>
        <template v-else>
          <div
            v-for="category in paginatedCategories"
            :key="category.id"
            class="p-4 transition-all duration-200 bg-white border rounded-lg cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:shadow-md"
            @click="navigateToCategory(category.id)"
          >
            <div class="flex items-start gap-4">
              <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <component
                  :is="getIconComponent(category.icon)"
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    {{ category.title }}
                  </h3>
                  <button
                    @click.stop="toggleBookmark(category.id)"
                    class="p-1 text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
                  >
                    <BookmarkIcon
                      v-if="!favoritesStore.isFavorite(category.id)"
                      class="w-5 h-5"
                    />
                    <BookmarkIcon
                      v-else
                      class="w-5 h-5 text-primary-600 dark:text-primary-400"
                    />
                  </button>
                </div>
                <p class="mt-1 text-gray-600 dark:text-gray-300">
                  {{ category.description }}
                </p>
                <div class="flex flex-wrap gap-2 mt-3">
                  <span
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                    :class="getDifficultyClass(category.stats.difficulty)"
                  >
                    {{ category.stats.difficulty }}
                  </span>
                  <span
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    {{ category.stats.totalTopics }} tópicos
                  </span>
                  <span
                    v-for="tag in category.tags.slice(0, 2)"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    {{ tag }}
                  </span>
                  <span
                    v-if="category.tags.length > 2"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                  >
                    +{{ category.tags.length - 2 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex items-center justify-center gap-2 mt-8 mb-8"
      >
        <button
          @click="goToFirstPage"
          :disabled="currentPage === 1"
          class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronDoubleLeftIcon class="w-5 h-5" />
        </button>
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <div class="flex items-center gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="w-8 h-8 text-sm font-medium transition-colors rounded-lg"
            :class="[
              currentPage === page
                ? 'bg-primary-600 text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
            ]"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
        <button
          @click="goToLastPage"
          :disabled="currentPage === totalPages"
          class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronDoubleRightIcon class="w-5 h-5" />
        </button>
      </div>

      <!-- Loading State -->
      <Transition
        v-bind="transitionClasses"
        @enter="isLoading = true"
        @leave="isLoading = false"
      >
        <div
          v-if="isLoading"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="status"
          aria-label="Carregando"
        >
          <div class="p-4 bg-white rounded-lg dark:bg-gray-800">
            <div
              class="w-8 h-8 border-4 rounded-full border-primary-500 animate-spin border-t-transparent"
            ></div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Adicionar animações suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Melhorar acessibilidade do foco */
:focus-visible {
  outline: 2px solid theme("colors.primary.500");
  outline-offset: 2px;
}

/* Melhorar contraste no modo escuro */
.dark .text-gray-600 {
  color: theme("colors.gray.300");
}

/* Adicionar hover states mais suaves */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: inherit;
}
</style>
