import { ref } from "vue";

/**
 * Composable para gerenciar o histórico de pesquisa
 */
export function useSearchHistory(maxItems = 5) {
  const searchHistory = ref<string[]>([]);

  // Carregar histórico do localStorage
  const loadHistory = () => {
    try {
      const savedHistory = localStorage.getItem("searchHistory");
      if (savedHistory) {
        searchHistory.value = JSON.parse(savedHistory);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico de busca:", error);
      searchHistory.value = [];
    }
  };

  // Inicializa o histórico
  loadHistory();

  // Adicionar ao histórico
  const addToHistory = (query: string) => {
    if (!query || !query.trim()) return;

    // Remove entrada duplicada, se existir
    const index = searchHistory.value.indexOf(query);
    if (index !== -1) {
      searchHistory.value.splice(index, 1);
    }

    // Adiciona ao início
    searchHistory.value.unshift(query);

    // Limita o número de itens
    if (searchHistory.value.length > maxItems) {
      searchHistory.value = searchHistory.value.slice(0, maxItems);
    }

    // Salva no localStorage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
  };

  // Limpar histórico
  const clearHistory = () => {
    searchHistory.value = [];
    localStorage.removeItem("searchHistory");
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory,
  };
}
