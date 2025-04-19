<script setup lang="ts">
import { ref } from "vue";

const team = ref([
  {
    name: "Equipe de Apologética",
    role: "Desenvolvedores e Pesquisadores",
    description:
      "Dedicados a fornecer respostas fundamentadas sobre a fé católica",
    image: "/team-placeholder.jpg",
  },
]);

const mission = {
  title: "Nossa Missão",
  content: `
    <p>O projeto Apologética Católica nasceu da necessidade de fornecer respostas claras e fundamentadas às questões mais comuns sobre a fé católica. Nosso objetivo é:</p>
    
    <ul>
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
    description: "Compromisso com a verdade revelada e a razão",
    icon: "ScaleIcon",
  },
  {
    title: "Caridade",
    description: "Respeito e amor ao próximo no diálogo",
    icon: "HeartIcon",
  },
  {
    title: "Formação",
    description: "Dedicação ao estudo e aprofundamento da fé",
    icon: "AcademicCapIcon",
  },
];
</script>

<template>
  <div class="min-h-screen py-12">
    <div class="container px-4 mx-auto">
      <h1 class="mb-12 text-4xl font-bold text-center">Sobre o Projeto</h1>

      <!-- Mission Section -->
      <section class="mb-12 card">
        <h2 class="mb-6 text-2xl font-bold">{{ mission.title }}</h2>
        <div
          class="prose dark:prose-invert max-w-none"
          v-html="mission.content"
        ></div>
      </section>

      <!-- Values Section -->
      <section class="mb-12">
        <h2 class="mb-8 text-2xl font-bold text-center">Nossos Valores</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="value in values"
            :key="value.title"
            class="text-center card"
          >
            <div class="mb-4 text-primary-600">
              <component :is="value.icon" class="w-8 h-8 mx-auto" />
            </div>
            <h3 class="mb-2 text-xl font-semibold">{{ value.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ value.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section>
        <h2 class="mb-8 text-2xl font-bold text-center">Nossa Equipe</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="member in team"
            :key="member.name"
            class="text-center card"
          >
            <img
              :src="member.image"
              :alt="member.name"
              class="w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <h3 class="mb-2 text-xl font-semibold">{{ member.name }}</h3>
            <p class="mb-2 font-medium text-primary-600">{{ member.role }}</p>
            <p class="text-gray-600 dark:text-gray-300">
              {{ member.description }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
