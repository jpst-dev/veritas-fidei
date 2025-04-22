<script setup lang="ts">
import { ref, onMounted, watch, computed, defineAsyncComponent } from "vue";
import type { Component } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useScrollPosition } from "../composables/useScrollPosition";
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BookOpenIcon,
  InformationCircleIcon,
  TagIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";
import cruz from "../../public/cruz.png";

// Usar componente de busca melhorado, se disponível
let EnhancedSearchBar: Component | null = null;
try {
  EnhancedSearchBar = defineAsyncComponent(() =>
    import("@/components/EnhancedSearchBar.vue").catch(() => {
      console.warn("EnhancedSearchBar não encontrado, usando busca padrão");
      return {};
    })
  );
} catch (e) {
  console.warn("Erro ao importar componente de busca:", e);
}

const router = useRouter();
const themeStore = useThemeStore();
const isMenuOpen = ref(false);
const searchQuery = ref("");
const showSearch = ref(false);

// Monitor de scroll para efeitos
const { scrollY } = useScrollPosition();
const isScrolled = computed(() => scrollY.value > 20);

// Variável para rastrear o path ativo e adicionar animações
const activePath = computed(() => router.currentRoute.value.path);

const navItems = [
  {
    name: "Início",
    path: "/",
    icon: HomeIcon,
    description: "Página inicial",
  },
  {
    name: "Explorar",
    path: "/explorar",
    icon: BookOpenIcon,
    description: "Explorar categorias",
  },
  {
    name: "Tópicos",
    path: "/topicos",
    icon: AcademicCapIcon,
    description: "Ver todos os tópicos",
  },
  {
    name: "Tags",
    path: "/tags",
    icon: TagIcon,
    description: "Explorar por tags",
  },
  {
    name: "Sobre",
    path: "/sobre",
    icon: InformationCircleIcon,
    description: "Sobre o projeto",
  },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    // Focar no campo de busca após um pequeno delay para permitir o render
    setTimeout(() => {
      const searchInput = document.getElementById("search-input");
      if (searchInput) searchInput.focus();
    }, 50);
  }
};

const navigateToSearch = () => {
  if (EnhancedSearchBar) {
    toggleSearch();
  } else {
    router.push({ name: "search" });
    isMenuOpen.value = false;
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Fechar o menu ao mudar de rota
watch(
  () => router.currentRoute.value.path,
  () => {
    closeMenu();
    showSearch.value = false;
  }
);

// Inicializar tema ao montar
onMounted(() => {
  themeStore.initTheme();

  // Fechar menu com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      showSearch.value = false;
    }
  });
});
</script>

<template>
  <header>
    <!-- Navbar principal -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="[
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md dark:bg-gray-900/95'
          : 'bg-white dark:bg-gray-900',
        showSearch && 'search-active',
      ]"
    >
      <div class="container px-4 mx-auto">
        <div class="flex items-center justify-between h-16">
          <!-- Logo com variação para estados -->
          <router-link
            to="/"
            class="relative flex items-center overflow-hidden font-bold group"
            :class="[
              isScrolled ? 'text-xl' : 'text-xl sm:text-2xl',
              'text-primary-600 dark:text-primary-400 transition-all duration-300',
            ]"
          >
            <!-- Indicador decorativo para hover -->
            <span
              class="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 bg-primary-500 transition-transform duration-300 group-hover:scale-x-100 origin-left"
            ></span>

            <!-- Logo/icon do site -->
            <div class="flex items-center gap-2">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30"
              >
                <div class="w-4 h-4 text-primary-600 dark:text-primary-400">
                  <img :src="cruz" alt="Cruz" />
                </div>
              </div>
              <span class="hidden sm:inline-block">Veritas Fidei</span>
              <span class="sm:hidden">AP</span>
            </div>
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-1">
            <!-- Navigation Links -->
            <div class="flex items-center">
              <router-link
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="relative flex items-center px-4 py-2 text-gray-700 transition-all duration-300 rounded-md hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 group"
                :class="{
                  'text-primary-600 dark:text-primary-400 font-medium':
                    activePath === item.path ||
                    activePath.startsWith(item.path + '/'),
                }"
              >
                <!-- Indicador ativo -->
                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 dark:bg-primary-400 transform origin-left transition-transform duration-300"
                  :class="[
                    activePath === item.path ||
                    activePath.startsWith(item.path + '/')
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100',
                  ]"
                ></span>

                <component
                  :is="item.icon"
                  class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110"
                  :class="{
                    'text-primary-500 dark:text-primary-400':
                      activePath === item.path ||
                      activePath.startsWith(item.path + '/'),
                  }"
                />
                <span>{{ item.name }}</span>
              </router-link>

              <!-- Search Button -->
              <button
                @click="navigateToSearch"
                class="relative flex items-center px-4 py-2 text-gray-700 transition-all duration-300 rounded-md hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400 group"
                aria-label="Buscar conteúdo"
              >
                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 dark:bg-primary-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                ></span>
                <MagnifyingGlassIcon
                  class="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110"
                />
                <span>Buscar</span>
              </button>
            </div>

            <!-- Theme Toggle -->
            <button
              @click="themeStore.toggleTheme"
              class="p-3 ml-2 text-gray-700 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Alternar tema"
            >
              <SunIcon
                v-if="!themeStore.isDark"
                class="w-5 h-5 transition-transform hover:rotate-12"
              />
              <MoonIcon
                v-else
                class="w-5 h-5 transition-transform hover:rotate-12"
              />
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex items-center md:hidden">
            <button
              @click="navigateToSearch"
              class="p-2 mr-2 text-gray-700 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 active:scale-95"
              aria-label="Buscar"
            >
              <MagnifyingGlassIcon class="w-5 h-5" />
            </button>
            <button
              @click="themeStore.toggleTheme"
              class="p-2 mr-2 text-gray-700 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 active:scale-95"
              aria-label="Alternar tema"
            >
              <SunIcon v-if="!themeStore.isDark" class="w-5 h-5" />
              <MoonIcon v-else class="w-5 h-5" />
            </button>
            <button
              @click="toggleMenu"
              class="p-2 text-gray-700 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 active:scale-95"
              :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
              :aria-expanded="isMenuOpen"
            >
              <Bars3Icon v-if="!isMenuOpen" class="w-6 h-6" />
              <XMarkIcon v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de Busca -->
      <div
        v-if="showSearch && EnhancedSearchBar"
        class="absolute inset-x-0 z-40 p-4 mx-auto transition-all duration-300 transform border-t border-b border-gray-200 top-16 bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 dark:border-gray-800"
      >
        <div class="container mx-auto">
          <EnhancedSearchBar
            id="search-input"
            v-model="searchQuery"
            placeholder="Busque por tópicos, categorias ou tags..."
            @search="showSearch = false"
          />
          <div class="flex justify-end mt-4">
            <button
              @click="showSearch = false"
              class="flex items-center px-2 py-1 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XMarkIcon class="w-4 h-4 mr-1" /> Fechar
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu com Animação de Slide -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="-translate-y-4 opacity-0"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed left-0 right-0 z-40 bg-white shadow-lg top-16 dark:bg-gray-800 md:hidden"
      >
        <div class="container px-4 py-4 mx-auto">
          <!-- Mobile Navigation Links -->
          <div class="flex flex-col space-y-3">
            <router-link
              v-for="(item, index) in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center p-3 transition-all duration-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-98"
              :class="[
                activePath === item.path ||
                activePath.startsWith(item.path + '/')
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-gray-700 dark:text-gray-200',
                `delay-${index * 50}`,
              ]"
              @click="closeMenu"
            >
              <div
                class="flex items-center justify-center p-2 mr-3 rounded-lg"
                :class="[
                  activePath === item.path ||
                  activePath.startsWith(item.path + '/')
                    ? 'bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
                ]"
              >
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <div class="flex flex-col">
                <span class="font-medium">{{ item.name }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{
                  item.description
                }}</span>
              </div>
              <ArrowRightIcon
                class="w-4 h-4 ml-auto text-gray-400 transition-transform duration-300 dark:text-gray-600"
                :class="{
                  'translate-x-1':
                    activePath === item.path ||
                    activePath.startsWith(item.path + '/'),
                }"
              />
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <!-- Espaçador para compensar o navbar fixo -->
  <div class="h-16"></div>
</template>

<style scoped>
/* Animação sutilmente diferente para cada item do menu mobile */
.delay-0 {
  transition-delay: 0ms;
}
.delay-50 {
  transition-delay: 50ms;
}
.delay-100 {
  transition-delay: 100ms;
}
.delay-150 {
  transition-delay: 150ms;
}
.delay-200 {
  transition-delay: 200ms;
}

/* Efeito ativo para escala */
.active\:scale-95:active {
  transform: scale(0.95);
}

.active\:scale-98:active {
  transform: scale(0.98);
}

/* Ajuste para quando a busca está ativa */
.search-active {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Espaçamento em telas pequenas */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
