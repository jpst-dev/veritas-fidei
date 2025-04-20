<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  ScaleIcon,
  HeartIcon,
  AcademicCapIcon,
  BookOpenIcon,
  LightBulbIcon,
  UserGroupIcon,
  SparklesIcon,
  GlobeAltIcon,
} from "@heroicons/vue/24/outline";

// Estado para animações
const animatedElements = ref({
  hero: false,
  mission: false,
  values: false,
  team: false,
});

// Ativar animações
onMounted(() => {
  setTimeout(() => {
    animatedElements.value.hero = true;
  }, 100);
  setTimeout(() => {
    animatedElements.value.mission = true;
  }, 400);
  setTimeout(() => {
    animatedElements.value.values = true;
  }, 700);
  setTimeout(() => {
    animatedElements.value.team = true;
  }, 1000);
});

const team = ref([
  {
    name: "Equipe de Apologética",
    role: "Desenvolvedores e Pesquisadores",
    description:
      "Dedicados a fornecer respostas fundamentadas sobre a fé católica, unindo conhecimento teológico e tecnologia moderna para difundir a verdade",
    image: "/team-placeholder.jpg",
  },
]);

const mission = {
  title: "Nossa Missão",
  content: `
    <p class="mb-4 leading-relaxed">O projeto <em>Apologética Católica</em> nasceu da necessidade de fornecer respostas claras e fundamentadas às questões mais comuns sobre a fé católica, em um mundo onde informações confusas ou imprecisas muitas vezes predominam.</p>
    
    <p class="mb-6 leading-relaxed">Nosso compromisso é oferecer conteúdo confiável e acessível, baseado nas Sagradas Escrituras, na Tradição e no Magistério da Igreja, com uma abordagem que honra tanto a fé quanto a razão.</p>
    
    <h3 class="mt-8 mb-4 text-xl font-bold">Nossos objetivos:</h3>
    <ul class="pl-5 space-y-3 list-disc">
      <li>Apresentar argumentos sólidos baseados na razão e na fé</li>
      <li>Fornecer recursos confiáveis para o estudo da doutrina católica</li>
      <li>Promover o diálogo respeitoso sobre questões de fé</li>
      <li>Ajudar na formação de católicos bem informados</li>
    </ul>
  `,
};

const values = [
  {
    title: "Verdade",
    description:
      "Compromisso inquebrantável com a verdade revelada e a razão humana, buscando sempre a clareza e a precisão em nossos conteúdos",
    icon: ScaleIcon,
    color: "text-blue-600 dark:text-blue-400",
    colorBg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Caridade",
    description:
      "Abordagem respeitosa e amorosa no diálogo com todas as pessoas, independente de suas crenças, reconhecendo a dignidade de cada ser humano",
    icon: HeartIcon,
    color: "text-red-600 dark:text-red-400",
    colorBg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    title: "Formação",
    description:
      "Dedicação contínua ao estudo e aprofundamento da fé, para oferecer conteúdo de qualidade que nutra tanto o intelecto quanto a espiritualidade",
    icon: AcademicCapIcon,
    color: "text-amber-600 dark:text-amber-400",
    colorBg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    title: "Fidelidade",
    description:
      "Adesão total ao Magistério da Igreja e sua Tradição, preservando a integridade da doutrina católica em todos os nossos conteúdos",
    icon: BookOpenIcon,
    color: "text-indigo-600 dark:text-indigo-400",
    colorBg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    title: "Acessibilidade",
    description:
      "Apresentação da teologia católica em linguagem clara e acessível a todos, independentemente de seu nível de conhecimento prévio",
    icon: LightBulbIcon,
    color: "text-green-600 dark:text-green-400",
    colorBg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Universalidade",
    description:
      "Reconhecimento do caráter universal da Igreja, respeitando suas diferentes expressões legítimas e abraçando a riqueza de sua diversidade",
    icon: GlobeAltIcon,
    color: "text-purple-600 dark:text-purple-400",
    colorBg: "bg-purple-50 dark:bg-purple-900/20",
  },
];
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section com padrão decorativo inspirado em vitrais -->
    <header
      class="relative py-20 overflow-hidden text-white bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
    >
      <!-- Padrão de fundo estilo vitral/mosaico -->
      <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

      <!-- Elementos decorativos -->
      <div
        class="absolute top-0 right-0 w-64 h-64 rounded-full translate-x-1/4 -translate-y-1/4 bg-primary-400 opacity-20 blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-64 h-64 rounded-full -translate-x-1/4 translate-y-1/4 bg-primary-700 opacity-20 blur-3xl"
      ></div>

      <div
        class="container relative z-10 px-4 mx-auto text-center transition-all duration-1000 transform"
        :class="{
          'opacity-100 translate-y-0': animatedElements.hero,
          'opacity-0 translate-y-8': !animatedElements.hero,
        }"
      >
        <div
          class="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white border rounded-full bg-white/10 backdrop-blur-sm border-white/10"
        >
          <SparklesIcon
            class="w-4 h-4 mr-2 text-primary-200"
            aria-hidden="true"
          />
          <span>Conheça nosso projeto</span>
        </div>

        <h1
          class="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl"
        >
          Sobre a Apologética Católica
        </h1>

        <p class="max-w-2xl mx-auto text-xl text-primary-100">
          Dedicados a apresentar a verdade da fé católica com clareza, beleza e
          profundidade
        </p>
      </div>

      <!-- Decorative wave divider -->
      <div
        class="absolute bottom-0 left-0 right-0 text-white dark:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          class="w-full h-[70px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </header>

    <main class="container px-4 py-16 mx-auto">
      <!-- Mission Section -->
      <section
        class="max-w-4xl mx-auto mb-24"
        :class="{
          'opacity-100 translate-y-0': animatedElements.mission,
          'opacity-0 translate-y-8': !animatedElements.mission,
        }"
        style="transition: all 0.8s ease-out"
      >
        <div
          class="relative p-8 overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl dark:bg-gray-800 dark:border-gray-700"
        >
          <!-- Decorative cross watermark -->
          <div class="absolute opacity-5 -right-2 -bottom-2 dark:opacity-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <!-- Cruz católica mais detalhada e tradicional -->
              <path d="M12 2v7M12 9v13M8 9h8" />
            </svg>
          </div>

          <div class="relative">
            <div class="flex items-center gap-3 mb-6">
              <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30">
                <BookOpenIcon
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h2
                class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ mission.title }}
              </h2>
            </div>

            <div
              class="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-a:text-primary-600 dark:prose-a:text-primary-400"
              v-html="mission.content"
            ></div>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section
        class="mb-24"
        :class="{
          'opacity-100 translate-y-0': animatedElements.values,
          'opacity-0 translate-y-8': !animatedElements.values,
        }"
        style="transition: all 0.8s ease-out"
      >
        <div class="max-w-4xl mx-auto mb-10 text-center">
          <h2
            class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Nossos Valores
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Princípios que orientam nossa missão de difundir e defender a fé
            católica
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(value, index) in values"
            :key="value.title"
            class="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 value-card rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg group"
            :style="`transition-delay: ${index * 50}ms`"
          >
            <!-- Gradiente decorativo no topo -->
            <div
              class="absolute inset-x-0 top-0 h-1 transition-transform duration-300 origin-left transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-primary-500 to-primary-400"
              aria-hidden="true"
            ></div>

            <div class="flex flex-col items-start">
              <div
                class="p-3 mb-4 transition-all duration-300 rounded-full shadow-sm group-hover:scale-110 group-hover:shadow-md"
                :class="value.colorBg"
              >
                <component
                  :is="value.icon"
                  class="w-6 h-6 transition-transform duration-300 group-hover:rotate-3"
                  :class="value.color"
                  aria-hidden="true"
                />
              </div>

              <h3
                class="mb-3 text-xl font-bold tracking-tight text-gray-900 transition-colors duration-200 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
              >
                {{ value.title }}
              </h3>

              <p
                class="text-gray-600 transition-colors duration-200 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200"
              >
                {{ value.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section
        class="mb-16"
        :class="{
          'opacity-100 translate-y-0': animatedElements.team,
          'opacity-0 translate-y-8': !animatedElements.team,
        }"
        style="transition: all 0.8s ease-out"
      >
        <div class="max-w-4xl mx-auto mb-10 text-center">
          <h2
            class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Nossa Equipe
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Conheça os dedicados estudiosos e desenvolvedores por trás deste
            projeto
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="member in team"
            :key="member.name"
            class="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1"
          >
            <div class="relative">
              <img
                :src="member.image"
                :alt="member.name"
                class="object-cover w-full h-64"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
              ></div>
            </div>

            <div class="relative z-10 p-6 -mt-16 text-center">
              <div
                class="inline-flex items-center justify-center w-16 h-16 mb-4 text-white rounded-full bg-primary-600"
              >
                <UserGroupIcon class="w-8 h-8" />
              </div>

              <h3 class="mb-2 text-xl font-bold text-white dark:text-white">
                {{ member.name }}
              </h3>

              <p class="mb-3 font-medium text-primary-200">{{ member.role }}</p>

              <div
                class="p-4 mt-5 bg-white rounded-lg shadow-sm dark:bg-gray-700"
              >
                <p class="text-gray-700 dark:text-gray-300">
                  {{ member.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section
        class="relative overflow-hidden shadow-lg bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 rounded-2xl"
      >
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div class="relative z-10 p-8 text-center md:py-14 md:px-16">
          <div
            class="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <HeartIcon class="w-8 h-8 text-white" aria-hidden="true" />
          </div>

          <h2
            class="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl"
          >
            Junte-se à Nossa Missão
          </h2>

          <p class="max-w-2xl mx-auto mb-8 text-lg text-primary-100">
            Ajude-nos a difundir a verdade da fé católica, compartilhando nosso
            conteúdo e oferecendo sugestões para melhorarmos.
          </p>

          <div
            class="flex flex-col items-center justify-center gap-4 md:flex-row"
          >
            <router-link
              to="/explorar"
              class="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white transition-all duration-300 border-2 border-white rounded-xl md:w-auto bg-primary-800 hover:bg-primary-900 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Explorar conteúdo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>

            <a
              href="mailto:jpst_2001@hotmail.com"
              class="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white transition-all duration-300 border-2 rounded-xl md:w-auto border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Entre em contato
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.value-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;
}

.value-card:hover {
  transform: translateY(-0.25rem);
}

/* Cruz decorativa para fontes claras */
@font-face {
  font-family: "Cross Decoration";
  src: url("/fonts/cross.woff2") format("woff2");
}

.prose h3::before {
  content: "†";
  display: inline-block;
  margin-right: 0.5rem;
  color: theme("colors.primary.500");
}

/* Animação de entrada para os cards de valores */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.value-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}
</style>
