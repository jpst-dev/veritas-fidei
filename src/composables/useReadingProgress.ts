import { ref } from "vue";

export function useReadingProgress() {
  const readingProgress = ref(0);

  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / documentHeight) * 100;
    readingProgress.value = Math.min(100, Math.max(0, progress));
  };

  return {
    readingProgress,
    updateProgress,
  };
}
