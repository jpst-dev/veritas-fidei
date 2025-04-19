import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  // Inicializa o tema baseado nas preferências do sistema
  const initTheme = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = prefersDark;
    }

    updateTheme();
  };

  // Alterna entre tema claro e escuro
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  // Atualiza o tema no DOM e salva no localStorage
  const updateTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Observa mudanças no tema do sistema
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      isDark.value = e.matches;
      updateTheme();
    }
  });

  return {
    isDark,
    initTheme,
    toggleTheme,
  };
});
