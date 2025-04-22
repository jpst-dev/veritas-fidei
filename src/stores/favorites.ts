import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<string[]>([]);

  // Carrega os favoritos do localStorage
  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        favorites.value = JSON.parse(saved);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      favorites.value = [];
    }
  };

  // Salva os favoritos no localStorage
  const saveFavorites = () => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites.value));
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  };

  // Observe mudanças e salve no localStorage
  watch(
    favorites,
    () => {
      saveFavorites();
    },
    { deep: true }
  );

  // Adiciona ou remove um item dos favoritos
  const toggleFavorite = (id: string) => {
    // Garantir que o ID seja uma string
    const strId = String(id);

    const index = favorites.value.indexOf(strId);
    if (index === -1) {
      favorites.value.push(strId);
    } else {
      favorites.value.splice(index, 1);
    }

    // Força atualização imediata no localStorage
    saveFavorites();
  };

  // Verifica se um item é favorito
  const isFavorite = (id: string | number) => {
    // Garantir que o ID seja uma string para comparação
    const strId = String(id);
    return favorites.value.includes(strId);
  };

  // Carregar favoritos imediatamente
  loadFavorites();

  return {
    favorites,
    loadFavorites,
    toggleFavorite,
    isFavorite,
  };
});
