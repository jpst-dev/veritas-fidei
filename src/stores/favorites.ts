import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<string[]>([]);

  // Carrega os favoritos do localStorage
  const loadFavorites = () => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      favorites.value = JSON.parse(saved);
    }
  };

  // Salva os favoritos no localStorage
  watch(
    favorites,
    (newFavorites) => {
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    },
    { deep: true }
  );

  // Adiciona ou remove um item dos favoritos
  const toggleFavorite = (id: string) => {
    const index = favorites.value.indexOf(id);
    if (index === -1) {
      favorites.value.push(id);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  // Verifica se um item é favorito
  const isFavorite = (id: string) => {
    return favorites.value.includes(id);
  };

  return {
    favorites,
    loadFavorites,
    toggleFavorite,
    isFavorite,
  };
});
