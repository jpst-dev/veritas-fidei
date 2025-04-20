import { ref, onMounted } from "vue";

interface AnimationOptions {
  initialDelay?: number;
  elementDelay?: number;
  elements?: string[];
}

export function useAnimation(options: AnimationOptions = {}) {
  const { initialDelay = 100, elementDelay = 200, elements = [] } = options;

  const animatedElements = ref<Record<string, boolean>>({});
  const userScrolled = ref(false);

  // Inicializa todos os elementos como não animados
  elements.forEach((element) => {
    animatedElements.value[element] = false;
  });

  // Função que anima os elementos em sequência
  const startAnimationSequence = () => {
    let delay = initialDelay;

    elements.forEach((element) => {
      setTimeout(() => {
        animatedElements.value[element] = true;
      }, delay);

      delay += elementDelay;
    });
  };

  // Monitora rolagem da página
  const handleScroll = () => {
    userScrolled.value = window.scrollY > 0;
  };

  onMounted(() => {
    startAnimationSequence();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return {
    animatedElements,
    userScrolled,
  };
}
