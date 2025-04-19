<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { categories } from "@/data/categories";
import {
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

interface SearchableItem {
  id: string;
  title: string;
  type: string;
  path: string;
}

interface SearchHistory {
  query: string;
  timestamp: number;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  icon: any;
  url: string;
}

const router = useRouter();
const searchQuery = ref("");
const showSuggestions = ref(false);
const searchHistory = ref<SearchHistory[]>([]);
const showResults = ref(false);
const searchResults = ref<SearchResult[]>([]);

// Carrega o histórico de buscas do localStorage
onMounted(() => {
  const savedHistory = localStorage.getItem("searchHistory");
  if (savedHistory) {
    searchHistory.value = JSON.parse(savedHistory);
  }
});

// Combina categorias, subcategorias e tópicos para busca
const searchableItems = computed(() => {
  const items: SearchableItem[] = [];

  // Adiciona categorias
  categories.forEach((category) => {
    items.push({
      id: category.id,
      title: category.title,
      type: "Categoria",
      path: `/category/${category.id}`,
    });

    // Adiciona subcategorias
    category.subcategories.forEach((subcategory) => {
      items.push({
        id: subcategory.id,
        title: subcategory.title,
        type: "Subcategoria",
        path: `/category/${category.id}/${subcategory.id}`,
      });
    });
  });

  return items;
});

// Filtra os itens baseado na busca
const filteredItems = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  return searchableItems.value.filter((item) =>
    item.title.toLowerCase().includes(query)
  );
});

const handleSearch = () => {
  if (!searchQuery.value) {
    showResults.value = false;
    searchResults.value = [];
    return;
  }

  const query = searchQuery.value.toLowerCase();
  const results: SearchResult[] = [];

  // Search in categories
  categories.forEach((category) => {
    if (category.title.toLowerCase().includes(query)) {
      results.push({
        id: category.id,
        title: category.title,
        description: category.description,
        icon: category.icon,
        url: `/explorar/${category.id}`,
      });
    }

    // Search in subcategories
    category.subcategories.forEach((subcategory) => {
      if (subcategory.title.toLowerCase().includes(query)) {
        results.push({
          id: subcategory.id,
          title: subcategory.title,
          description: subcategory.description,
          icon: subcategory.icon,
          url: `/explorar/${category.id}/${subcategory.id}`,
        });
      }

      // Search in topics
      subcategory.topics.forEach((topic) => {
        if (topic.title.toLowerCase().includes(query)) {
          results.push({
            id: topic.id.toString(),
            title: topic.title,
            description: topic.description,
            icon: subcategory.icon,
            url: `/explorar/${category.id}/${subcategory.id}/${topic.id}`,
          });
        }
      });
    });
  });

  searchResults.value = results;
  showResults.value = true;
};

const handleItemClick = (path: string) => {
  router.push(path);
  searchQuery.value = "";
  showSuggestions.value = false;
};

const handleBlur = () => {
  window.setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const clearHistory = () => {
  searchHistory.value = [];
  localStorage.removeItem("searchHistory");
};

const clearSearch = () => {
  searchQuery.value = "";
  showResults.value = false;
  searchResults.value = [];
};

const navigateToResult = (result: SearchResult) => {
  router.push(result.url);
  clearSearch();
};
</script>

<template>
  <div class="relative">
    <div class="relative">
      <MagnifyingGlassIcon
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Pesquisar tópicos, categorias ou tags..."
        class="w-full pl-12 pr-4 py-3 text-lg bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
        @input="handleSearch"
      />
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Results Dropdown -->
    <div
      v-if="showResults && searchResults.length > 0"
      class="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg dark:bg-gray-800"
    >
      <div class="py-2">
        <div
          v-for="result in searchResults"
          :key="result.id"
          class="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          @click="navigateToResult(result)"
        >
          <div class="flex items-center">
            <component
              :is="result.icon"
              class="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400"
            />
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">
                {{ result.title }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ result.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
