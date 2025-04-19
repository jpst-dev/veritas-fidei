<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/outline";

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="container px-4 py-12 mx-auto">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Sobre -->
        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Sobre
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Um portal dedicado à apologética católica, oferecendo recursos e
            informações para fortalecer a fé e responder às questões sobre a
            doutrina católica.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Links Rápidos
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                Início
              </router-link>
            </li>
            <li>
              <router-link
                to="/explorar"
                class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                Categorias
              </router-link>
            </li>
            <li>
              <router-link
                to="/tags"
                class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                Tags
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                Sobre
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Contato
          </h3>
          <ul class="space-y-2">
            <li class="text-gray-600 dark:text-gray-300">
              Email: contato@apologetica-catolica.com
            </li>
            <li class="text-gray-600 dark:text-gray-300">
              Redes Sociais:
              <div class="flex mt-2 space-x-4">
                <a
                  href="#"
                  class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  class="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                >
                  Instagram
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Newsletter
          </h3>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            Inscreva-se para receber atualizações e novos conteúdos.
          </p>
          <form class="flex">
            <input
              type="email"
              placeholder="Seu email"
              class="flex-1 px-4 py-2 text-sm border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white rounded-r-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Inscrever
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright -->
      <div class="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col items-center justify-between md:flex-row">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            © {{ currentYear }} Apologética Católica. Todos os direitos
            reservados.
          </p>
          <p
            class="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-300 md:mt-0"
          >
            Feito com
            <HeartIcon class="w-4 h-4 mx-1 text-red-500" />
            para a Igreja
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
