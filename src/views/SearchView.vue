<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { getIconComponent } from "@/utils/IconMapping";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  BookmarkIcon,
  ClockIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  FunnelIcon,
} from "@heroicons/vue/24/outline";
import { useThemeStore } from "@/stores/theme";

const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

// State
const searchQuery = ref((route.query.q as string) || "");
const selectedCategory = ref("");
const selectedDifficulty = ref("");
const selectedTags = ref<string[]>([]);
const isLoading = ref(false);
const showFilters = ref(false);
const sortBy = ref("relevance");

// Interface definitions
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId?: string;
  subcategoryId?: string;
  type: "category" | "subcategory" | "topic";
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  url: string;
  readingTime?: string;
  tags?: string[];
  isBookmarked: boolean;
  icon?: string;
}

// Get all available tags from categories
const allTags = computed(() => {
  const tags = new Set<string>();

  categories.forEach((category) => {
    category.tags.forEach((tag) => tags.add(tag));

    category.subcategories.forEach((subcategory) => {
      subcategory.topics.forEach((topic) => {
        topic.tags.forEach((tag) => tags.add(tag));
      });
    });
  });

  return Array.from(tags).sort();
});

// Search functionality
const searchResults = computed(() => {
  if (!searchQuery.value) return [];

  // Simulate loading state
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 500);

  const query = searchQuery.value.toLowerCase();
  const results: SearchResult[] = [];

  // Search in categories
  categories.forEach((category) => {
    if (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    ) {
      results.push({
        id: category.id,
        title: category.title,
        description: category.description,
        category: "Categoria",
        type: "category",
        categoryId: category.id,
        difficulty: category.stats.difficulty,
        url: `/explorar/${category.id}`,
        readingTime: category.stats.readingTime,
        tags: category.tags,
        isBookmarked: false,
        icon: category.icon,
      });
    }

    // Search in subcategories
    category.subcategories.forEach((subcategory) => {
      if (
        subcategory.title.toLowerCase().includes(query) ||
        subcategory.description.toLowerCase().includes(query)
      ) {
        results.push({
          id: subcategory.id,
          title: subcategory.title,
          description: subcategory.description,
          category: category.title,
          type: "subcategory",
          categoryId: category.id,
          subcategoryId: subcategory.id,
          difficulty: subcategory.stats.difficulty,
          url: `/explorar/${category.id}/${subcategory.id}`,
          readingTime: subcategory.stats.readingTime,
          isBookmarked: false,
          icon: subcategory.icon,
        });
      }

      // Search in topics
      subcategory.topics.forEach((topic) => {
        if (
          topic.title.toLowerCase().includes(query) ||
          topic.description.toLowerCase().includes(query) ||
          topic.content?.toLowerCase().includes(query)
        ) {
          results.push({
            id: topic.id.toString(),
            title: topic.title,
            description: topic.description,
            category: `${category.title} > ${subcategory.title}`,
            categoryId: category.id,
            subcategoryId: subcategory.id,
            type: "topic",
            difficulty: topic.stats.difficulty,
            url: `/explorar/${category.id}/${subcategory.id}/${topic.id}`,
            readingTime: topic.stats.readingTime,
            tags: topic.tags,
            isBookmarked: false,
          });
        }
      });
    });
  });

  // Apply filters
  let filteredResults = results.filter((result) => {
    // Filter by category
    if (
      selectedCategory.value &&
      result.categoryId !== selectedCategory.value
    ) {
      return false;
    }

    // Filter by difficulty
    if (
      selectedDifficulty.value &&
      result.difficulty !== selectedDifficulty.value
    ) {
      return false;
    }

    // Filter by tags
    if (
      selectedTags.value.length > 0 &&
      (!result.tags ||
        !result.tags.some((tag) => selectedTags.value.includes(tag)))
    ) {
      return false;
    }

    return true;
  });

  // Apply sorting
  switch (sortBy.value) {
    case "relevance":
      // Default sorting is by relevance
      return filteredResults;
    case "alphabetical":
      return filteredResults.sort((a, b) => a.title.localeCompare(b.title));
    case "readingTime":
      return filteredResults.sort((a, b) => {
        if (!a.readingTime) return 1;
        if (!b.readingTime) return -1;
        return parseInt(a.readingTime) - parseInt(b.readingTime);
      });
    default:
      return filteredResults;
  }
});

// Toggle bookmark status
const toggleBookmark = (resultId: string) => {
  const result = searchResults.value.find((r) => r.id === resultId);
  if (result) {
    result.isBookmarked = !result.isBookmarked;
  }
};

// Clear search
const clearSearch = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  selectedDifficulty.value = "";
  selectedTags.value = [];
};

// Clear filters
const clearFilters = () => {
  selectedCategory.value = "";
  selectedDifficulty.value = "";
  selectedTags.value = [];
};

// Perform search
const performSearch = () => {
  // Update URL with search query
  router.push({
    path: "/buscar",
    query: { q: searchQuery.value },
  });
};

// Toggle tag selection
const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
};

// Navigate to result
const navigateToResult = (result: SearchResult) => {
  router.push(result.url);
};

// Helper function to get difficulty class
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

// Watch for route query changes
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery as string;
    }
  }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container px-4 py-8 mx-auto">
      <!-- Page Header -->
      <div class="mb-8 text-center">
        <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Buscar Conteúdo
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          Encontre tópicos de apologética por palavras-chave, categorias ou tags
        </p>
      </div>

      <!-- Search Section -->
      <div class="max-w-3xl mx-auto mb-8">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
          >
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
          </div>

          <input
            type="text"
            v-model="searchQuery"
            class="block w-full py-3 pl-12 pr-12 leading-5 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Digite sua busca por tópicos, categorias ou conteúdos..."
            @keyup.enter="performSearch"
          />

          <div class="absolute inset-y-0 right-0 flex items-center">
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="p-2 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>

            <button
              @click="performSearch"
              class="px-4 py-2 mr-1 text-white rounded-r-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <!-- Filter and Results Container -->
      <div class="max-w-6xl mx-auto">
        <!-- Filter Controls -->
        <div class="flex items-center justify-between mb-4">
          <button
            @click="showFilters = !showFilters"
            class="flex items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm text-primary-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-primary-400 dark:hover:bg-gray-700"
          >
            <FunnelIcon class="w-4 h-4 mr-2" />
            Filtros
            <span
              v-if="
                selectedCategory ||
                selectedDifficulty ||
                selectedTags.length > 0
              "
              class="flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold text-white rounded-full bg-primary-600"
            >
              {{
                (selectedCategory ? 1 : 0) +
                (selectedDifficulty ? 1 : 0) +
                selectedTags.length
              }}
            </span>
          </button>

          <div class="flex items-center">
            <span class="mr-2 text-sm text-gray-500 dark:text-gray-400"
              >Ordenar por:</span
            >
            <select
              v-model="sortBy"
              class="px-2 py-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="relevance">Relevância</option>
              <option value="alphabetical">Alfabética</option>
              <option value="readingTime">Tempo de leitura</option>
            </select>
          </div>
        </div>

        <!-- Expanded Filters -->
        <div
          v-if="showFilters"
          class="p-4 mb-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <!-- Category Filter -->
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Categoria
              </label>
              <select
                v-model="selectedCategory"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Todas as categorias</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
                </option>
              </select>
            </div>

            <!-- Difficulty Filter -->
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nível de dificuldade
              </label>
              <select
                v-model="selectedDifficulty"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Todas as dificuldades</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            <!-- Tags Filter -->
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tags ({{ selectedTags.length }} selecionadas)
              </label>
              <div
                class="flex flex-wrap gap-2 p-2 overflow-y-auto rounded-md bg-gray-50 dark:bg-gray-700 max-h-32"
              >
                <button
                  v-for="tag in allTags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  class="px-2 py-1 text-xs font-medium transition-colors rounded-full"
                  :class="
                    selectedTags.includes(tag)
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                  "
                >
                  {{ tag }}
                </button>
                <button
                  v-if="selectedTags.length > 0"
                  @click="selectedTags = []"
                  class="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                >
                  Limpar tags
                </button>
              </div>
            </div>
          </div>

          <!-- Filter Actions -->
          <div class="flex justify-end mt-4">
            <button
              @click="clearFilters"
              class="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Limpar filtros
            </button>
            <button
              @click="showFilters = false"
              class="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600"
            >
              Aplicar filtros
            </button>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center py-12"
        >
          <div
            class="w-12 h-12 border-4 border-t-4 rounded-full border-primary-200 border-t-primary-600 animate-spin"
          ></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">
            Buscando resultados...
          </p>
        </div>

        <!-- Search Results -->
        <div v-else>
          <!-- Results Count -->
          <div v-if="searchQuery && !isLoading" class="mb-6">
            <p class="text-gray-600 dark:text-gray-300">
              <span v-if="searchResults.length > 0">
                {{ searchResults.length }} resultados encontrados para "{{
                  searchQuery
                }}"
              </span>
              <span v-else>
                Nenhum resultado encontrado para "{{ searchQuery }}"
              </span>
            </p>
          </div>

          <!-- Results Grid -->
          <div
            v-if="searchResults.length > 0"
            class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2"
          >
            <div
              v-for="result in searchResults"
              :key="result.id"
              @click="navigateToResult(result)"
              class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer group dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700"
            >
              <!-- Top accent bar -->
              <div
                class="absolute top-0 left-0 right-0 h-1 transition-transform origin-left transform scale-x-0 bg-primary-600 group-hover:scale-x-100"
              ></div>

              <div class="p-6">
                <!-- Result Type Badge -->
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300':
                        result.type === 'category',
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300':
                        result.type === 'subcategory',
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                        result.type === 'topic',
                    }"
                  >
                    {{
                      result.type === "category"
                        ? "Categoria"
                        : result.type === "subcategory"
                        ? "Subcategoria"
                        : "Tópico"
                    }}
                  </span>

                  <button
                    @click.stop="toggleBookmark(result.id)"
                    class="p-1 text-gray-400 transition-colors rounded-full hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                    :class="{
                      'text-primary-600 dark:text-primary-400':
                        result.isBookmarked,
                    }"
                  >
                    <BookmarkIcon class="w-5 h-5" />
                  </button>
                </div>

                <!-- Breadcrumb path if not category -->
                <div
                  v-if="result.type !== 'category'"
                  class="mb-2 text-xs text-gray-500 dark:text-gray-400"
                >
                  {{ result.category }}
                </div>

                <!-- Title and description -->
                <div class="flex items-start mb-3">
                  <div
                    v-if="result.icon"
                    class="flex-shrink-0 p-2 mr-3 rounded-md bg-primary-50 dark:bg-primary-900/30"
                  >
                    <component
                      :is="getIconComponent(result.icon)"
                      class="w-5 h-5 text-primary-600 dark:text-primary-400"
                    />
                  </div>

                  <div>
                    <h3
                      class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
                    >
                      {{ result.title }}
                    </h3>
                    <p
                      class="mt-1 text-sm text-gray-600 line-clamp-2 dark:text-gray-300"
                    >
                      {{ result.description }}
                    </p>
                  </div>
                </div>

                <!-- Tags -->
                <div
                  v-if="result.tags && result.tags.length > 0"
                  class="flex flex-wrap gap-1 mb-3"
                >
                  <span
                    v-for="tag in result.tags.slice(0, 3)"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded-full text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    <TagIcon class="w-3 h-3 mr-1" />
                    {{ tag }}
                  </span>
                  <span
                    v-if="result.tags.length > 3"
                    class="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 rounded-full text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  >
                    +{{ result.tags.length - 3 }}
                  </span>
                </div>

                <!-- Stats -->
                <div
                  class="flex items-center justify-between pt-3 mt-3 text-sm text-gray-500 border-t border-gray-100 dark:border-gray-700 dark:text-gray-400"
                >
                  <div class="flex items-center space-x-3">
                    <span v-if="result.readingTime" class="flex items-center">
                      <ClockIcon class="w-4 h-4 mr-1" />
                      {{ result.readingTime }}
                    </span>

                    <span
                      v-if="result.difficulty"
                      class="flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                      :class="getDifficultyClass(result.difficulty)"
                    >
                      <AcademicCapIcon class="w-3 h-3 mr-1" />
                      {{ result.difficulty }}
                    </span>
                  </div>

                  <ArrowRightIcon
                    class="w-4 h-4 text-gray-400 transition-transform transform group-hover:translate-x-1 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div
            v-else-if="searchQuery"
            class="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <MagnifyingGlassIcon class="w-16 h-16 mb-4 text-gray-400" />
            <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Nenhum resultado encontrado
            </h2>
            <p class="mb-6 text-gray-600 dark:text-gray-300">
              Tente ajustar sua busca ou filtros para encontrar o que procura.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <button
                @click="clearSearch"
                class="px-4 py-2 font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Limpar busca
              </button>
              <button
                @click="clearFilters"
                class="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Limpar filtros
              </button>
            </div>
          </div>

          <!-- Initial State -->
          <div
            v-else
            class="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md dark:bg-gray-800"
          >
            <MagnifyingGlassIcon class="w-16 h-16 mb-4 text-gray-400" />
            <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Comece sua busca
            </h2>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              Digite um termo na barra de busca para encontrar conteúdo
              relevante.
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Você pode buscar por categorias, subcategorias, tópicos ou
              conteúdo específico.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
