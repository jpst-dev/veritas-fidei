<script setup lang="ts">
import { useRouter } from "vue-router";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div
    class="relative min-h-[70vh] flex items-center justify-center py-12 px-4"
  >
    <!-- Background decorativo -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute w-64 h-64 rounded-full top-20 left-10 bg-primary-200/40 dark:bg-primary-900/20 blur-3xl"
      ></div>
      <div
        class="absolute rounded-full bottom-20 right-10 w-80 h-80 bg-gold-200/30 dark:bg-gold-900/20 blur-3xl"
      ></div>
    </div>

    <div class="container relative z-10 max-w-lg mx-auto text-center">
      <!-- Ícone decorativo -->
      <div class="flex justify-center mb-8">
        <div class="relative">
          <span
            class="absolute inset-0 rounded-full animate-ping bg-primary-400/30 dark:bg-primary-600/20"
          ></span>
          <div
            class="relative p-4 bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-2xl dark:border-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-16 h-16 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Conteúdo -->
      <h1
        class="font-extrabold text-8xl text-primary-600 dark:text-primary-400"
      >
        404
      </h1>
      <div class="flex justify-center my-4">
        <div class="accent-line"></div>
      </div>
      <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        Página não encontrada
      </h2>
      <p class="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>

      <!-- Botões de ação -->
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          @click="goHome"
          class="flex items-center justify-center gap-2 btn btn-primary"
        >
          <HomeIcon class="w-5 h-5" />
          Voltar para o início
        </button>
        <router-link
          to="/buscar"
          class="flex items-center justify-center gap-2 btn btn-outline"
        >
          <MagnifyingGlassIcon class="w-5 h-5" />
          Buscar conteúdo
        </router-link>
      </div>
    </div>
  </div>
</template>
