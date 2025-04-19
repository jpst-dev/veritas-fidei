<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { tags } from "@/data/tags";
import { useThemeStore } from "@/stores/theme";
import { getIconComponent } from "@/utils/IconMapping";
import SearchBar from "@/components/SearchBar.vue";
import TopicCard from "@/components/TopicCard.vue";
import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  GiftIcon,
  BookOpenIcon,
  UserGroupIcon,
  HeartIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  TagIcon,
  BookmarkIcon,
  ClockIcon as ClockIconOutline,
  ChartBarIcon,
  ScaleIcon,
  FireIcon,
  BoltIcon,
  ExclamationCircleIcon,
  ChevronUpIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

// Create aliases for icons to replace the non-working ones
const ClockIcon = ClockIconOutline;
const LightBulbIcon = FireIcon; // Use FireIcon as a replacement for LightBulbIcon
const SparklesIcon = BoltIcon; // Use BoltIcon as a replacement for SparklesIcon
const ExclamationTriangleIcon = ExclamationCircleIcon; // Use ExclamationCircleIcon as replacement
const ArrowUpIcon = ChevronUpIcon; // Use ChevronUpIcon as replacement
const UsersIcon = UserGroupIcon; // Use UserGroupIcon as replacement

const router = useRouter();
const themeStore = useThemeStore();

interface TopicItem {
  id: number;
  title: string;
  description: string;
  categoryId: string;
  categoryTitle: string;
  subcategoryId: string;
  subcategoryTitle: string;
  icon: string;
  tags: string[];
  readingTime: string;
  difficulty: string;
  lastUpdated: string;
  progress: number;
}

// Filter categories to display only those with topics
const featuredCategories = computed(() => {
  return categories
    .filter((category) => category.stats.totalTopics > 0)
    .slice(0, 3);
});

// Get the most recent topics from all categories
const recentTopics = computed(() => {
  const allTopics: TopicItem[] = [];

  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.topics.forEach((topic) => {
        allTopics.push({
          id: topic.id,
          title: topic.title,
          description: topic.description,
          categoryId: category.id,
          categoryTitle: category.title,
          subcategoryId: subcategory.id,
          subcategoryTitle: subcategory.title,
          icon: subcategory.icon || "BookOpenIcon",
          tags: topic.tags,
          readingTime: topic.stats.readingTime,
          difficulty: topic.stats.difficulty,
          lastUpdated: topic.stats.lastUpdated,
          progress: topic.stats.progress || 0,
        });
      });
    });
  });

  // Sort by lastUpdated date (newest first)
  return allTopics
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    .slice(0, 3);
});

// Popular tags
const popularTags = computed(() => {
  return tags.slice(0, 6);
});

// Quick facts about the site
const quickFacts = ref([
  {
    title: "Categorias",
    value: categories.length,
    icon: BookOpenIcon,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    title: "Tópicos",
    value: categories.reduce(
      (sum, category) => sum + category.stats.totalTopics,
      0
    ),
    icon: AcademicCapIcon,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    title: "Dificuldades",
    value: "3 níveis",
    icon: ChartBarIcon,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    title: "Tags",
    value: tags.length,
    icon: TagIcon,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
]);

const navigateToCategory = (categoryId: string) => {
  router.push({
    name: "category",
    params: { categoryId },
  });
};

const navigateToTopic = (topic: TopicItem) => {
  router.push({
    name: "topic",
    params: {
      categoryId: topic.categoryId,
      subcategoryId: topic.subcategoryId,
      topicId: topic.id.toString(),
    },
  });
};

const navigateToTag = (tagId: string) => {
  router.push({
    name: "tag",
    params: { tagId },
  });
};

const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case "Iniciante":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Intermediário":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Avançado":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section with improved CTA -->
    <header
      class="relative py-24 text-center text-white bg-gradient-to-br from-primary-600 to-primary-800"
    >
      <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div class="container relative px-4 mx-auto">
        <h1 class="mb-4 text-5xl font-bold md:text-6xl">
          Apologética Católica
        </h1>
        <p class="max-w-2xl mx-auto mb-8 text-xl text-primary-100">
          Respostas fundamentadas para as principais questões sobre a fé
          católica
        </p>
        <div class="max-w-xl mx-auto mb-8">
          <SearchBar />
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/explorar"
            class="px-6 py-3 font-medium text-white transition-all duration-300 border-2 border-white rounded-lg shadow-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Explorar Categorias
          </router-link>
          <router-link
            to="/sobre"
            class="px-6 py-3 font-medium text-white transition-all duration-300 border-2 border-white rounded-lg shadow-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Sobre o Projeto
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container px-4 py-12 mx-auto">
      <!-- Quick Facts Section -->
      <section class="mb-16">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(fact, index) in quickFacts"
            :key="index"
            class="p-6 transition-all duration-300 bg-white shadow-lg rounded-xl dark:bg-gray-800 hover:shadow-xl"
          >
            <div class="flex items-center">
              <div class="p-3 mr-4 rounded-full" :class="fact.color">
                <component :is="fact.icon" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {{ fact.title }}
                </p>
                <h2 class="text-2xl font-bold">{{ fact.value }}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Improved Quick Navigation with clear purpose -->
      <section class="mb-16">
        <h2 class="mb-8 text-3xl font-bold text-center">Como Navegar</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            class="p-6 transition-all duration-300 bg-white shadow-lg group rounded-xl dark:bg-gray-800 hover:shadow-xl"
          >
            <div class="flex items-center mb-4">
              <div
                class="p-3 mr-4 rounded-lg bg-primary-50 dark:bg-primary-900"
              >
                <BookOpenIcon
                  class="w-8 h-8 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3 class="text-xl font-bold">Por Categoria</h3>
            </div>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              Navegue por temas organizados em categorias e subcategorias para
              encontrar respostas.
            </p>
            <router-link
              to="/explorar"
              class="inline-flex items-center font-medium transition-all duration-200 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
            >
              <span>Explorar categorias</span>
              <ArrowRightIcon
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              />
            </router-link>
          </div>

          <div
            class="p-6 transition-all duration-300 bg-white shadow-lg group rounded-xl dark:bg-gray-800 hover:shadow-xl"
          >
            <div class="flex items-center mb-4">
              <div
                class="p-3 mr-4 rounded-lg bg-primary-50 dark:bg-primary-900"
              >
                <TagIcon
                  class="w-8 h-8 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3 class="text-xl font-bold">Por Tag</h3>
            </div>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              Encontre conteúdo específico usando tags que agrupam temas
              relacionados.
            </p>
            <router-link
              to="/tags"
              class="inline-flex items-center font-medium transition-all duration-200 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
            >
              <span>Ver todas as tags</span>
              <ArrowRightIcon
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              />
            </router-link>
          </div>

          <div
            class="p-6 transition-all duration-300 bg-white shadow-lg group rounded-xl dark:bg-gray-800 hover:shadow-xl"
          >
            <div class="flex items-center mb-4">
              <div
                class="p-3 mr-4 rounded-lg bg-primary-50 dark:bg-primary-900"
              >
                <MagnifyingGlassIcon
                  class="w-8 h-8 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3 class="text-xl font-bold">Por Busca</h3>
            </div>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              Pesquise diretamente por palavras-chave para encontrar tópicos
              específicos.
            </p>
            <router-link
              to="/buscar"
              class="inline-flex items-center font-medium transition-all duration-200 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
            >
              <span>Ir para busca</span>
              <ArrowRightIcon
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              />
            </router-link>
          </div>
        </div>
      </section>

      <!-- Featured Categories with more visual appeal -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold">Categorias em Destaque</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
              Principais áreas de estudo para apologética católica
            </p>
          </div>
          <router-link
            to="/explorar"
            class="inline-flex items-center px-4 py-2 font-medium transition-all duration-200 bg-white rounded-lg shadow-sm text-primary-600 hover:bg-gray-50 hover:text-primary-800 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700 dark:hover:text-primary-300"
          >
            <span>Ver todas</span>
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </router-link>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            v-for="category in featuredCategories"
            :key="category.id"
            @click="navigateToCategory(category.id)"
            class="overflow-hidden transition-all duration-300 bg-white shadow-lg cursor-pointer rounded-xl dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1"
          >
            <!-- Category header with gradient background -->
            <div
              class="p-6 text-white bg-gradient-to-r from-primary-700 to-primary-500"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <component
                    :is="getIconComponent(category.icon)"
                    class="w-8 h-8 mr-3"
                  />
                  <h3 class="text-xl font-semibold">{{ category.title }}</h3>
                </div>
              </div>
            </div>

            <!-- Category content -->
            <div class="p-6">
              <p class="mb-4 text-gray-600 dark:text-gray-300">
                {{ category.description }}
              </p>

              <!-- Stats -->
              <div class="p-3 mb-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div class="flex flex-wrap gap-3">
                  <span
                    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full text-primary-700 bg-primary-100 dark:bg-primary-900 dark:text-primary-300"
                  >
                    <BookOpenIcon class="w-3 h-3 mr-1" />
                    {{ category.stats?.totalTopics }} tópicos
                  </span>
                  <span
                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
                  >
                    <ClockIcon class="w-3 h-3 mr-1" />
                    {{ category.stats?.readingTime }}
                  </span>
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
                      category.stats?.difficulty === 'Iniciante'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : category.stats?.difficulty === 'Intermediário'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
                    ]"
                  >
                    <AcademicCapIcon class="w-3 h-3 mr-1" />
                    {{ category.stats?.difficulty }}
                  </span>
                </div>
              </div>

              <!-- Subcategories preview -->
              <h4
                class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400"
              >
                Subcategorias:
              </h4>
              <ul class="mb-4 space-y-1">
                <li
                  v-for="subcategory in category.subcategories.slice(0, 3)"
                  :key="subcategory.id"
                  class="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <div
                    class="w-1.5 h-1.5 mr-2 rounded-full bg-primary-500"
                  ></div>
                  {{ subcategory.title }}
                </li>
                <li
                  v-if="category.subcategories.length > 3"
                  class="text-sm text-primary-600 dark:text-primary-400"
                >
                  + {{ category.subcategories.length - 3 }} mais...
                </li>
              </ul>

              <div
                class="inline-flex items-center font-medium transition-all duration-200 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
              >
                <span>Explorar categoria</span>
                <ArrowRightIcon class="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Topics with better visual layout -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold">Tópicos Recentes</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-300">
              Últimos conteúdos adicionados à plataforma
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <TopicCard
            v-for="topic in recentTopics"
            :key="topic.id"
            :topic="topic"
            :show-bookmark="false"
            :show-category-path="true"
          />
        </div>
      </section>

      <!-- Popular Tags -->
      <section class="mb-16">
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold">Tags Populares</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            Encontre conteúdo por temas específicos
          </p>
        </div>
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        >
          <div
            v-for="tag in popularTags"
            :key="tag.id"
            @click="navigateToTag(tag.id)"
            class="flex flex-col items-center p-4 transition-all duration-300 bg-white rounded-lg shadow-md cursor-pointer dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
          >
            <component
              :is="getIconComponent(tag.icon)"
              class="w-10 h-10 mb-2 text-primary-600 dark:text-primary-400"
            />
            <h3 class="mb-1 font-medium">{{ tag.name }}</h3>
            <p class="text-xs text-center text-gray-500 dark:text-gray-400">
              {{ tag.description }}
            </p>
          </div>
        </div>
        <div class="mt-6 text-center">
          <router-link
            to="/tags"
            class="inline-flex items-center px-5 py-2.5 font-medium text-white transition-all duration-300 rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span>Ver todas as tags</span>
            <ArrowRightIcon class="w-5 h-5 ml-2" />
          </router-link>
        </div>
      </section>

      <!-- Call to Action -->
      <section
        class="p-8 mb-8 text-center shadow-xl bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl"
      >
        <h2 class="mb-4 text-3xl font-bold text-white">
          Aprofunde seu conhecimento sobre a fé católica
        </h2>
        <p class="max-w-2xl mx-auto mb-6 text-lg text-primary-100">
          Explore nossa base de conhecimento completa e encontre respostas para
          suas perguntas sobre a fé católica
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/explorar"
            class="px-6 py-3 font-medium text-white transition-all duration-300 border-2 border-white rounded-lg shadow-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Começar a explorar
          </router-link>
          <router-link
            to="/sobre"
            class="px-6 py-3 font-medium text-white transition-all duration-300 border-2 border-white rounded-lg shadow-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Sobre o projeto
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>
