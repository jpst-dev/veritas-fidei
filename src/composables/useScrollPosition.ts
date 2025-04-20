import { ref, onMounted, onUnmounted } from "vue";

/**
 * Composable que monitora a posição de scroll da janela
 * @returns Um objeto com a posição atual de scroll
 */
export function useScrollPosition() {
  const scrollY = ref(0);
  const scrollX = ref(0);
  const scrollDirection = ref<"up" | "down" | null>(null);
  const lastScrollY = ref(0);

  function updateScroll() {
    // Guardar a direção do scroll
    if (window.scrollY > lastScrollY.value) {
      scrollDirection.value = "down";
    } else if (window.scrollY < lastScrollY.value) {
      scrollDirection.value = "up";
    }

    // Atualizar as posições
    lastScrollY.value = window.scrollY;
    scrollY.value = window.scrollY;
    scrollX.value = window.scrollX;
  }

  onMounted(() => {
    // Atualizar os valores iniciais
    updateScroll();

    // Adicionar o listener
    window.addEventListener("scroll", updateScroll, { passive: true });
  });

  onUnmounted(() => {
    // Remover o listener quando o componente for desmontado
    window.removeEventListener("scroll", updateScroll);
  });

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
}
