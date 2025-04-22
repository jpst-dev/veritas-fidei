<script setup lang="ts">
import { ref } from "vue";
import {
  HeartIcon,
  EnvelopeIcon,
  BookOpenIcon,
  TagIcon,
  HomeIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/24/outline";
import cruz from "../../public/cruz.png";

// Ícones de redes sociais
import { UsersIcon, ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";

const currentYear = new Date().getFullYear();
const emailAddress = "jpst_2001@hotmail.com";
const emailSubmitted = ref(false);
const emailInput = ref("");

// Simular submissão do formulário de newsletter
const submitNewsletter = (e: Event) => {
  e.preventDefault();
  if (emailInput.value && emailInput.value.includes("@")) {
    emailSubmitted.value = true;
    setTimeout(() => {
      emailInput.value = "";
      emailSubmitted.value = false;
    }, 3000);
  }
};
</script>

<template>
  <footer
    class="relative pt-16 bg-white border-t border-gray-100 dark:border-gray-800 dark:bg-gray-900"
  >
    <!-- Elemento decorativo superior - cruz estilizada -->
    <div class="absolute -translate-x-1/2 -translate-y-1/2 top-5 left-1/2">
      <div
        class="flex items-center justify-center w-6 h-6 bg-white border-2 rounded-full border-primary-500 dark:bg-gray-900"
      >
        <div class="w-4 h-4 text-primary-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 4v7M12 11v9M8 11h8" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Padrão de fundo estilizado -->
    <div
      class="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.03] dark:opacity-[0.05]"
      aria-hidden="true"
    ></div>

    <div class="container relative z-10 px-4 mx-auto">
      <div
        class="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <!-- Sobre -->
        <div class="transition-all duration-300 hover:translate-y-[-5px]">
          <h3
            class="relative mb-5 text-lg font-bold text-gray-900 dark:text-white"
          >
            <span class="relative inline-flex items-center">
              Sobre
              <span
                class="absolute -bottom-1 left-0 w-12 h-[2px] bg-primary-500"
              ></span>
            </span>
          </h3>
          <p class="leading-relaxed text-gray-700 dark:text-gray-300">
            Um portal dedicado à apologética católica, oferecendo recursos e
            informações para fortalecer a fé e responder às questões sobre a
            doutrina católica com clareza e fidelidade ao Magistério da Igreja.
          </p>

          <div class="mt-5">
            <router-link
              to="/sobre"
              class="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 group"
            >
              Saiba mais sobre nossa missão
              <ArrowTopRightOnSquareIcon
                class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </router-link>
          </div>
        </div>

        <!-- Links Rápidos -->
        <div class="transition-all duration-300 hover:translate-y-[-5px]">
          <h3
            class="relative mb-5 text-lg font-bold text-gray-900 dark:text-white"
          >
            <span class="relative inline-flex items-center">
              Links Rápidos
              <span
                class="absolute -bottom-1 left-0 w-12 h-[2px] bg-primary-500"
              ></span>
            </span>
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/"
                class="inline-flex items-center text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 group"
              >
                <HomeIcon
                  class="w-4 h-4 mr-2 text-gray-400 transition-transform group-hover:text-primary-500 group-hover:scale-110 dark:text-gray-500"
                />
                <span>Início</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/explorar"
                class="inline-flex items-center text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 group"
              >
                <BookOpenIcon
                  class="w-4 h-4 mr-2 text-gray-400 transition-transform group-hover:text-primary-500 group-hover:scale-110 dark:text-gray-500"
                />
                <span>Categorias</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/tags"
                class="inline-flex items-center text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 group"
              >
                <TagIcon
                  class="w-4 h-4 mr-2 text-gray-400 transition-transform group-hover:text-primary-500 group-hover:scale-110 dark:text-gray-500"
                />
                <span>Tags</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/sobre"
                class="inline-flex items-center text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 group"
              >
                <InformationCircleIcon
                  class="w-4 h-4 mr-2 text-gray-400 transition-transform group-hover:text-primary-500 group-hover:scale-110 dark:text-gray-500"
                />
                <span>Sobre</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div class="transition-all duration-300 hover:translate-y-[-5px]">
          <h3
            class="relative mb-5 text-lg font-bold text-gray-900 dark:text-white"
          >
            <span class="relative inline-flex items-center">
              Contato
              <span
                class="absolute -bottom-1 left-0 w-12 h-[2px] bg-primary-500"
              ></span>
            </span>
          </h3>
          <ul class="space-y-4">
            <li class="flex items-start">
              <EnvelopeIcon
                class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-primary-600 dark:text-primary-400"
              />
              <a
                :href="`mailto:${emailAddress}`"
                class="text-gray-700 break-all hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {{ emailAddress }}
              </a>
            </li>
            <li>
              <h4 class="mb-2 font-medium text-gray-800 dark:text-gray-200">
                Redes Sociais:
              </h4>
              <div class="flex flex-wrap gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  class="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-9 h-9 hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:hover:bg-primary-900/50 dark:text-gray-400 dark:hover:text-primary-400 hover:scale-110"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  class="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-9 h-9 hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:hover:bg-primary-900/50 dark:text-gray-400 dark:hover:text-primary-400 hover:scale-110"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  class="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-9 h-9 hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:hover:bg-primary-900/50 dark:text-gray-400 dark:hover:text-primary-400 hover:scale-110"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path
                      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    ></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  class="flex items-center justify-center transition-all duration-300 bg-gray-100 rounded-full w-9 h-9 hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:hover:bg-primary-900/50 dark:text-gray-400 dark:hover:text-primary-400 hover:scale-110"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                    ></path>
                    <polygon
                      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    ></polygon>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="transition-all duration-300 hover:translate-y-[-5px]">
          <h3
            class="relative mb-5 text-lg font-bold text-gray-900 dark:text-white"
          >
            <span class="relative inline-flex items-center">
              Newsletter
              <span
                class="absolute -bottom-1 left-0 w-12 h-[2px] bg-primary-500"
              ></span>
            </span>
          </h3>
          <p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Inscreva-se para receber atualizações e novos conteúdos sobre
            apologética católica.
          </p>
          <form class="relative" @submit="submitNewsletter">
            <div
              class="overflow-hidden transition-all duration-300 rounded-lg shadow-sm"
            >
              <input
                v-model="emailInput"
                type="email"
                required
                placeholder="Seu email"
                :disabled="emailSubmitted"
                class="w-full px-4 py-3 pr-12 text-sm transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:border-primary-400"
              />
              <button
                type="submit"
                class="absolute right-0 flex items-center justify-center h-full px-4 text-white transition-all duration-300 rounded-r-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                :class="{ 'bg-green-600 hover:bg-green-700': emailSubmitted }"
              >
                <span v-if="!emailSubmitted">
                  <EnvelopeIcon class="w-5 h-5" />
                </span>
                <span v-else>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <p
              v-if="emailSubmitted"
              class="mt-2 text-sm text-green-600 dark:text-green-400"
            >
              Obrigado! Seu email foi cadastrado com sucesso.
            </p>
          </form>
        </div>
      </div>

      <!-- Copyright e elementos finais -->
      <div class="py-6 mt-8 border-t border-gray-200 dark:border-gray-800">
        <div
          class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 mr-3 overflow-hidden text-primary-600 dark:text-primary-400"
            >
              <img :src="cruz" alt="Cruz" />
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              © {{ currentYear }}
              <span class="font-medium">Apologética Católica</span>. Todos os
              direitos reservados.
            </p>
          </div>

          <div class="flex items-center space-x-4">
            <p
              class="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <span>Feito com</span>
              <HeartIcon class="w-4 h-4 mx-1 text-red-500 animate-pulse" />
              <span>para a Igreja</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Animação sutil nos links */
a {
  transition: all 0.2s ease-in-out;
}

/* Animação para os links principais */
li a:hover {
  transform: translateX(3px);
}

/* Respiro visual adicional para mobile */
@media (max-width: 640px) {
  .container {
    padding-bottom: 2rem;
  }
}
</style>
