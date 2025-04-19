<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-9xl font-extrabold text-indigo-600">404</h1>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Página não encontrada
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <router-link
            to="/"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar para o início
          </router-link>

          <router-link
            to="/explorar"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Explorar categorias
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
