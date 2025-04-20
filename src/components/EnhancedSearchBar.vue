<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useDebounce } from "@/composables/useDebounce";
import { categories } from "@/data/categories";
import type { Category, Topic } from "@/data/categories";
import { tags } from "@/data/tags";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TagIcon,
  FolderIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  ClockIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import type { Tag } from "@/data/tags";

const props = defineProps<{
  searchHistory?: string[];
  placeholder?: string;
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", query: string): void;
  (e: "clear-history"): void;
}>();

const router = useRouter();
const inputRef = ref<HTMLInputElement | null>(null);
const searchQuery = ref(props.modelValue || "");
const isOpen = ref(false);
const selectedIndex = ref(-1);
const isLoading = ref(false);
const showHistory = ref(false);
const internalHistory = ref<string[]>(props.searchHistory || []);

// Carregar histórico do localStorage (caso não seja fornecido via props)
onMounted(() => {
  if (!props.searchHistory) {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      internalHistory.value = JSON.parse(history);
    }
  }

  // Focar na busca quando o componente é montado
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

// Atualizar quando searchHistory prop mudar
watch(
  () => props.searchHistory,
  (newHistory) => {
    if (newHistory) {
      internalHistory.value = newHistory;
    }
  },
  { immediate: true }
);

// Sincronizar v-model
watch(searchQuery, (newQuery) => {
  emit("update:modelValue", newQuery);

  if (newQuery) {
    isOpen.value = true;
    showHistory.value = false;
    debouncedSearch(newQuery);
  } else {
    isOpen.value = false;
  }
});

// Atualizar quando modelValue mudar
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined && newValue !== searchQuery.value) {
      searchQuery.value = newValue;
    }
  },
  { immediate: true }
);

// Debounce para a pesquisa
const debouncedSearch = useDebounce((query: string) => {
  handleSearch(query);
}, 300);

// Defina uma interface para os resultados de busca
interface SearchResultItem extends Topic {
  categoryId: string;
  subcategoryId: string;
  categoryTitle: string;
}

interface SearchResults {
  categories: Category[];
  topics: SearchResultItem[];
  tags: Tag[];
}

// Resultados agrupados com tipagem correta
const searchResults = ref<SearchResults>({
  categories: [],
  topics: [],
  tags: [],
});

// Verificar se existem resultados
const hasResults = computed(() => {
  const { categories, topics, tags } = searchResults.value;
  return categories.length > 0 || topics.length > 0 || tags.length > 0;
});

// Navegar para o resultado
const navigateToResult = (type: string, item: any) => {
  let route;
  switch (type) {
    case "category":
      route = { name: "category", params: { categoryId: item.id } };
      break;
    case "topic":
      route = {
        name: "topic",
        params: {
          categoryId: item.categoryId,
          subcategoryId: item.subcategoryId,
          topicId: item.id,
        },
      };
      break;
    case "tag":
      route = { name: "tag", params: { tagId: item.id } };
      break;
  }

  if (route) {
    addToHistory(searchQuery.value);
    router.push(route);
    closeSearch();
  }
};

// Adicionar ao histórico
const addToHistory = (query: string) => {
  if (query && query.trim() && !internalHistory.value.includes(query)) {
    internalHistory.value.unshift(query);
    if (internalHistory.value.length > 5) {
      internalHistory.value.pop();
    }

    if (!props.searchHistory) {
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(internalHistory.value)
      );
    }

    emit("search", query);
  }
};

// Limpar histórico
const clearHistory = () => {
  internalHistory.value = [];
  if (!props.searchHistory) {
    localStorage.removeItem("searchHistory");
  }
  emit("clear-history");
};

const closeSearch = () => {
  isOpen.value = false;
  showHistory.value = false;
  selectedIndex.value = -1;
};

const toggleShowHistory = () => {
  if (!searchQuery.value) {
    showHistory.value = !showHistory.value;
    if (showHistory.value) {
      isOpen.value = true;
    }
  }
};

// Eventos de teclado
const handleKeydown = (e: KeyboardEvent) => {
  if (!isOpen.value) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex.value = Math.min(
        selectedIndex.value + 1,
        getTotalResults() - 1
      );
      break;
    case "ArrowUp":
      e.preventDefault();
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
      break;
    case "Enter":
      e.preventDefault();
      if (selectedIndex.value >= 0) {
        const result = getResultByIndex(selectedIndex.value);
        if (result) {
          navigateToResult(result.type, result.item);
        } else if (searchQuery.value) {
          emit("search", searchQuery.value);
          addToHistory(searchQuery.value);
          router.push({ name: "search", query: { q: searchQuery.value } });
          closeSearch();
        }
      } else if (searchQuery.value) {
        emit("search", searchQuery.value);
        addToHistory(searchQuery.value);
        router.push({ name: "search", query: { q: searchQuery.value } });
        closeSearch();
      }
      break;
    case "Escape":
      e.preventDefault();
      closeSearch();
      break;
  }
};

// Helpers para navegação por teclado
const getTotalResults = () => {
  if (showHistory.value) return internalHistory.value.length;

  const { categories, topics, tags } = searchResults.value;
  return categories.length + topics.length + tags.length;
};

const getResultByIndex = (index: number) => {
  if (showHistory.value) {
    if (index >= 0 && index < internalHistory.value.length) {
      searchQuery.value = internalHistory.value[index];
      return null;
    }
    return null;
  }

  let current = 0;
  const { categories, topics, tags } = searchResults.value;

  if (index < categories.length) {
    return { type: "category", item: categories[index] };
  }
  current += categories.length;

  if (index < current + topics.length) {
    return { type: "topic", item: topics[index - current] };
  }
  current += topics.length;

  if (index < current + tags.length) {
    return { type: "tag", item: tags[index - current] };
  }

  return null;
};

// Limpar eventos
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

// Adicionar eventos
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);

  // Fechar quando clicar fora
  document.addEventListener("click", (e) => {
    const target = e.target as Node;
    const dropdown = document.getElementById("search-dropdown");
    const searchInput = document.getElementById("search-input");

    if (
      dropdown &&
      searchInput &&
      !dropdown.contains(target) &&
      !searchInput.contains(target)
    ) {
      closeSearch();
    }
  });
});

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    searchResults.value = { categories: [], topics: [], tags: [] };
    return;
  }

  isLoading.value = true;
  try {
    const normalizedQuery = query.toLowerCase().trim();

    // Função auxiliar para verificar correspondências
    const matchesQuery = (text: string) =>
      text.toLowerCase().includes(normalizedQuery);

    // Filtrar categorias (limita a 3 resultados)
    const matchedCategories = categories
      .filter(
        (category) =>
          matchesQuery(category.title) || matchesQuery(category.description)
      )
      .slice(0, 3);

    // Filtrar tópicos (limita a 5 resultados)
    const matchedTopics = categories
      .flatMap((cat) =>
        cat.subcategories.flatMap((sub) =>
          sub.topics.map((topic) => ({
            ...topic,
            categoryId: cat.id,
            subcategoryId: sub.id,
            categoryTitle: cat.title,
          }))
        )
      )
      .filter(
        (topic) => matchesQuery(topic.title) || matchesQuery(topic.description)
      )
      .slice(0, 5);

    // Filtrar tags (limita a 3 resultados)
    const matchedTags = tags
      .filter((tag) => matchesQuery(tag.name) || matchesQuery(tag.description))
      .slice(0, 3);

    searchResults.value = {
      categories: matchedCategories,
      topics: matchedTopics,
      tags: matchedTags,
    };
  } finally {
    isLoading.value = false;
  }
};

// Pesquisar usando item do histórico
const searchWithHistoryItem = (query: string) => {
  searchQuery.value = query;
  handleSearch(query);
  showHistory.value = false;
};

// Limpar campo de busca
const clearSearch = () => {
  searchQuery.value = "";
  closeSearch();
};

// Realizar busca com Enter
const submitSearch = () => {
  if (searchQuery.value.trim()) {
    emit("search", searchQuery.value);
    addToHistory(searchQuery.value);
    router.push({ name: "search", query: { q: searchQuery.value } });
    closeSearch();
  }
};
</script>

<template>
  <div class="relative w-full">
    <!-- Campo de Pesquisa -->
    <div
      class="relative flex items-center overflow-hidden transition-all duration-200 bg-white border rounded-lg shadow-lg focus-within:ring-2 focus-within:border-primary-500 focus-within:ring-primary-500/30 dark:bg-gray-800 dark:border-gray-700"
    >
      <!-- Ícone de pesquisa ou loading -->
      <div class="flex items-center justify-center pl-4 pr-2">
        <MagnifyingGlassIcon
          v-if="!isLoading"
          class="w-5 h-5 text-gray-400 dark:text-gray-500"
        />
        <svg
          v-else
          class="w-5 h-5 text-primary-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>

      <!-- Input -->
      <input
        ref="inputRef"
        id="search-input"
        v-model="searchQuery"
        type="search"
        :placeholder="placeholder || 'Pesquisar tópicos, categorias, tags...'"
        class="w-full py-3 text-base text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
        @focus="toggleShowHistory"
        @keydown.enter="submitSearch"
      />

      <!-- Botões de ação -->
      <div class="flex items-center gap-1 px-3">
        <!-- Botão de histórico (mostrado apenas se houver histórico) -->
        <button
          v-if="internalHistory.length > 0"
          type="button"
          @click="toggleShowHistory"
          class="flex items-center justify-center w-8 h-8 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Histórico de pesquisa"
        >
          <ClockIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        <!-- Botão para limpar input (visível apenas quando há texto) -->
        <button
          v-if="searchQuery"
          type="button"
          @click="clearSearch"
          class="flex items-center justify-center w-8 h-8 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Limpar pesquisa"
        >
          <XMarkIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>

    <!-- Menu Dropdown (resultados ou histórico) -->
    <div
      id="search-dropdown"
      v-if="
        isOpen &&
        ((hasResults && !showHistory) ||
          (showHistory && internalHistory.length > 0))
      "
      class="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white rounded-lg shadow-xl top-full dark:bg-gray-800 dark:border dark:border-gray-700"
    >
      <!-- Histórico de pesquisa -->
      <div
        v-if="showHistory && internalHistory.length > 0"
        class="divide-y divide-gray-100 dark:divide-gray-700"
      >
        <div
          class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800"
        >
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">
            Pesquisas recentes
          </h3>
          <button
            @click="clearHistory"
            class="flex items-center px-2 py-1 text-xs text-gray-600 transition-colors rounded dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <TrashIcon class="w-3 h-3 mr-1" />
            Limpar
          </button>
        </div>

        <ul class="overflow-y-auto max-h-80">
          <li
            v-for="(item, index) in internalHistory"
            :key="index"
            @click="searchWithHistoryItem(item)"
            class="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
            :class="{
              'bg-primary-50 dark:bg-primary-900/20': selectedIndex === index,
            }"
          >
            <ClockIcon class="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
            <span class="text-gray-800 dark:text-gray-200">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Resultados de pesquisa -->
      <div
        v-if="!showHistory && hasResults"
        class="overflow-y-auto divide-y divide-gray-100 max-h-80 dark:divide-gray-700"
      >
        <!-- Categorias -->
        <div v-if="searchResults.categories.length > 0">
          <div
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400"
          >
            Categorias
          </div>
          <ul>
            <li
              v-for="(category, index) in searchResults.categories"
              :key="category.id"
              @click="navigateToResult('category', category)"
              class="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              :class="{
                'bg-primary-50 dark:bg-primary-900/20': selectedIndex === index,
              }"
            >
              <div
                class="flex-shrink-0 p-1 mr-3 rounded-md bg-primary-50 dark:bg-primary-900/30"
              >
                <FolderIcon
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ category.title }}
                </h4>
                <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                  {{ category.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Tópicos -->
        <div v-if="searchResults.topics.length > 0">
          <div
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400"
          >
            Tópicos
          </div>
          <ul>
            <li
              v-for="(topic, index) in searchResults.topics"
              :key="topic.id"
              @click="navigateToResult('topic', topic)"
              class="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              :class="{
                'bg-primary-50 dark:bg-primary-900/20':
                  selectedIndex === searchResults.categories.length + index,
              }"
            >
              <div
                class="flex-shrink-0 p-1 mr-3 rounded-md bg-primary-50 dark:bg-primary-900/30"
              >
                <DocumentTextIcon
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ topic.title }}
                </h4>
                <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                  {{ topic.categoryTitle }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Tags -->
        <div v-if="searchResults.tags.length > 0">
          <div
            class="px-4 py-2 text-xs font-medium text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400"
          >
            Tags
          </div>
          <ul>
            <li
              v-for="(tag, index) in searchResults.tags"
              :key="tag.id"
              @click="navigateToResult('tag', tag)"
              class="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              :class="{
                'bg-primary-50 dark:bg-primary-900/20':
                  selectedIndex ===
                  searchResults.categories.length +
                    searchResults.topics.length +
                    index,
              }"
            >
              <div
                class="flex-shrink-0 p-1 mr-3 rounded-md bg-primary-50 dark:bg-primary-900/30"
              >
                <TagIcon
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ tag.name }}
                </h4>
                <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                  {{ tag.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Rodapé com instruções de navegação -->
      <div
        v-if="!showHistory && hasResults"
        class="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700 dark:text-gray-400"
      >
        <div class="flex items-center gap-3">
          <span class="flex items-center">
            <ArrowUpIcon class="w-3 h-3 mr-1" />
            <ArrowDownIcon class="w-3 h-3 mr-1" />
            navegar
          </span>
          <span class="flex items-center">
            <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
              >Enter</kbd
            >
            selecionar
          </span>
          <span class="flex items-center">
            <kbd class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded"
              >Esc</kbd
            >
            fechar
          </span>
        </div>
        <div>
          <router-link
            :to="{ name: 'search', query: { q: searchQuery } }"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            @click="
              addToHistory(searchQuery);
              closeSearch();
            "
          >
            Ver todos os resultados
            <ChevronRightIcon class="inline w-3 h-3" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-highlight {
  background-color: rgba(var(--color-primary-200), 0.5);
  padding: 0 2px;
  border-radius: 2px;
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

#search-dropdown {
  animation: fadeIn 0.2s ease-out;
}
</style>
