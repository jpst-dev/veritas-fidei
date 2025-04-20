<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="font-extrabold text-indigo-600 text-9xl">404</h1>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Página não encontrada
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <div class="space-y-4 rounded-md shadow-sm">
          <router-link
            to="/"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar para o início
          </router-link>

          <router-link
            to="/explorar"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Explorar categorias
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
