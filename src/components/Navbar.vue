<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useThemeStore } from "@/stores/theme";
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
} from "@heroicons/vue/24/outline";

const router = useRouter();
const themeStore = useThemeStore();
const isMenuOpen = ref(false);
const searchQuery = ref("");

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
    path: "/topics",
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

const navigateToSearch = () => {
  router.push({ name: "search" });
  isMenuOpen.value = false;
};

onMounted(() => {
  themeStore.initTheme();
});
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white shadow dark:bg-gray-800">
    <div class="container px-4 mx-auto">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <span
            class="text-xl font-bold text-primary-600 dark:text-primary-400"
          >
            Apologética Católica
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-2">
          <!-- Navigation Links -->
          <div class="flex items-center">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="relative flex items-center px-4 py-2 text-gray-700 transition-colors rounded-md hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
              :class="{
                'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium':
                  $route.path === item.path ||
                  $route.path.startsWith(item.path + '/'),
              }"
            >
              <component :is="item.icon" class="w-5 h-5 mr-2" />
              <span>{{ item.name }}</span>
            </router-link>

            <!-- Search Button -->
            <button
              @click="navigateToSearch"
              class="flex items-center px-4 py-2 text-gray-700 transition-colors rounded-md hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
            >
              <MagnifyingGlassIcon class="w-5 h-5 mr-2" />
              <span>Buscar</span>
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="themeStore.toggleTheme"
            class="p-2 ml-2 text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Alternar tema"
          >
            <SunIcon v-if="!themeStore.isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button
            @click="navigateToSearch"
            class="p-2 mr-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Buscar"
          >
            <MagnifyingGlassIcon class="w-5 h-5" />
          </button>
          <button
            @click="themeStore.toggleTheme"
            class="p-2 mr-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Alternar tema"
          >
            <SunIcon v-if="!themeStore.isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
          <button
            @click="toggleMenu"
            class="p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            aria-label="Abrir menu"
          >
            <Bars3Icon v-if="!isMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute left-0 right-0 bg-white shadow-lg top-16 dark:bg-gray-800 md:hidden"
    >
      <div class="container px-4 py-2 mx-auto">
        <!-- Mobile Navigation Links -->
        <div class="flex flex-col space-y-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            :class="{
              'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400':
                $route.path === item.path ||
                $route.path.startsWith(item.path + '/'),
            }"
            @click="isMenuOpen = false"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            <div class="flex flex-col">
              <span class="font-medium">{{ item.name }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{
                item.description
              }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
