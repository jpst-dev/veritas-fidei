<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { categories } from "@/data/categories";
import { tags } from "@/data/tags";
import { useBookmarks } from "@/composables/useBookmarks";
import { getIconComponent } from "@/utils/IconMapping";
import { useAnimation } from "@/composables/useAnimation";
import CategoryCard from "@/components/category/CategoryCard.vue";
import FeaturedCategoryCard from "@/components/category/FeaturedCategoryCard.vue";
import TagList from "@/components/TagList.vue";
import TopicCard from "@/components/TopicCard.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import MissionCard from "@/components/MissionCard.vue";
import EnhancedSearchBar from "@/components/EnhancedSearchBar.vue";
import { useSearchHistory } from "@/composables/useSearchHistory";
import { useDebounce } from "@/composables/useDebounce";
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  LightBulbIcon,
  BookmarkIcon,
  ChartBarIcon,
  UserGroupIcon,
  FireIcon,
  ArrowPathIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  ScaleIcon,
  HeartIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  FolderIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const { bookmarks, toggleBookmark } = useBookmarks();
const { searchHistory, addToHistory } = useSearchHistory();
const searchQuery = ref("");

// Estado para animações
const animatedElements = ref({
  search: false,
  stats: false,
  categories: false,
  topics: false,
  tags: false,
  hero: false,
  navigationGuide: false,
});

// Ativar animações após o carregamento
onMounted(() => {
  animatedElements.value.hero = true;
  setTimeout(() => {
    animatedElements.value.search = true;
  }, 200);
  setTimeout(() => {
    animatedElements.value.stats = true;
  }, 400);
  setTimeout(() => {
    animatedElements.value.categories = true;
  }, 600);
  setTimeout(() => {
    animatedElements.value.topics = true;
  }, 800);
  setTimeout(() => {
    animatedElements.value.tags = true;
  }, 1000);
  setTimeout(() => {
    animatedElements.value.navigationGuide = true;
  }, 1200);
});

// Gerencia animações
const { userScrolled } = useAnimation({
  initialDelay: 100,
  elementDelay: 200,
  elements: ["hero", "search", "stats", "navigationGuide"],
});

// Featured Categories
const featuredCategories = computed(() => {
  return categories
    .filter((category) => category.stats.totalTopics > 0)
    .sort((a, b) => b.stats.totalTopics - a.stats.totalTopics)
    .slice(0, 3);
});

// Recent Topics
const recentTopics = computed(() => {
  const allTopics: any[] = [];
  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      subcategory.topics.forEach((topic) => {
        allTopics.push({
          ...topic,
          categoryId: category.id,
          subcategoryId: subcategory.id,
          categoryTitle: category.title,
          subcategoryTitle: subcategory.title,
        });
      });
    });
  });
  return allTopics
    .sort(
      (a, b) =>
        new Date(b.stats.lastUpdated).getTime() -
        new Date(a.stats.lastUpdated).getTime()
    )
    .slice(0, 6);
});

// Popular Tags
const popularTags = computed(() => {
  return tags
    .map((tag) => ({
      ...tag,
      count: Math.floor(Math.random() * 20) + 5, // Placeholder for demo
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
});

// Quick Facts
const quickFacts = [
  {
    title: "Categorias",
    value: categories.length,
    icon: BookOpenIcon,
    description: "Áreas de estudo organizadas",
    color:
      "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
  },
  {
    title: "Tópicos",
    value: categories.reduce((total, cat) => total + cat.stats.totalTopics, 0),
    icon: AcademicCapIcon,
    description: "Artigos e estudos disponíveis",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Dificuldades",
    value: "3 Níveis",
    icon: ChartBarIcon,
    description: "Iniciante, Intermediário e Avançado",
    color:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  {
    title: "Tags",
    value: tags.length,
    icon: TagIcon,
    description: "Temas e assuntos categorizados",
    color:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
];

// Mission and Value statements
const missionStatements = [
  {
    title: "Verdade",
    icon: ScaleIcon,
    description:
      "Promovemos a busca pela verdade através de argumentos sólidos e fundamentados",
    color:
      "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400",
  },
  {
    title: "Fé",
    icon: HeartIcon,
    description: "Fortalecemos a fé através do conhecimento e da razão",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Diálogo",
    icon: ChatBubbleLeftRightIcon,
    description:
      "Facilitamos o diálogo respeitoso sobre questões de fé e doutrina",
    color:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
  },
];

// Navigation Steps
const navigationSteps = [
  {
    title: "Explore Categorias",
    description: "Navegue por nossas categorias organizadas por temas",
    icon: BookOpenIcon,
    color: "text-primary-600 dark:text-primary-400",
  },
  {
    title: "Encontre Tópicos",
    description: "Descubra artigos e estudos relevantes",
    icon: AcademicCapIcon,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Aprofunde-se",
    description: "Leia e estude os conteúdos em seu próprio ritmo",
    icon: LightBulbIcon,
    color: "text-amber-600 dark:text-amber-400",
  },
];

// Função de busca
const handleSearch = (query: string) => {
  if (!query || !query.trim()) return;

  // Adiciona a query ao histórico
  addToHistory(query);

  // Navega para a página de resultados
  router.push({
    name: "search",
    query: { q: query },
  });
};

// Debounce para a função de busca
const debouncedSearch = useDebounce((query: string) => {
  handleSearch(query);
}, 300);

const handleCategoryClick = (categoryId: string) => {
  router.push(`/explorar/${categoryId}`);
};

const handleTopicClick = (topic: any) => {
  router.push(
    `/explorar/${topic.categoryId}/${topic.subcategoryId}/${topic.id}`
  );
};

const handleTagClick = (tagId: string) => {
  router.push({ name: "tag", params: { tagId } });
};

// Mapeamento de títulos de passos para rotas
const getStepLink = (title: string): string => {
  switch (title) {
    case "Explore Categorias":
      return "/explorar";
    case "Encontre Tópicos":
      return "/topicos";
    case "Pesquise por Tags":
      return "/tags";
    default:
      return "/";
  }
};

const handleSuggestionClick = (suggestion: string) => {
  searchQuery.value = suggestion;
  handleSearch(suggestion);
};
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section with Background Pattern -->
    <header
      class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 dark:from-gray-900 dark:via-primary-950 dark:to-primary-900"
      aria-labelledby="hero-heading"
    >
      <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-15"></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-900/40 dark:to-gray-900/60"
      ></div>

      <div class="container relative px-4 py-16 mx-auto md:py-20 lg:py-24">
        <!-- Badge e Título -->
        <div
          class="max-w-3xl mx-auto mb-12 text-center"
          :class="{
            'opacity-100 translate-y-0': animatedElements.hero,
            'opacity-0 translate-y-4': !animatedElements.hero,
          }"
          style="transition: all 0.6s ease-out"
        >
          <div
            class="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white border rounded-full bg-white/10 backdrop-blur-sm border-white/10"
          >
            <ScaleIcon
              class="w-4 h-4 mr-2 text-primary-200"
              aria-hidden="true"
            />
            <span>Veritas Fidei</span>
          </div>

          <h1
            id="hero-heading"
            class="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Apologética Católica
          </h1>
          <p class="max-w-2xl mx-auto mb-8 text-lg text-primary-100 md:text-xl">
            Explore artigos, estudos e discussões sobre a verdade da fé,
            filosofia, teologia e apologética católica.
          </p>
        </div>

        <!-- Search Bar - Centralizado, com z-index elevado e espaço suficiente -->
        <div
          class="relative z-30 max-w-2xl mx-auto mb-16"
          :class="{
            'opacity-100 translate-y-0': animatedElements.search,
            'opacity-0 translate-y-4': !animatedElements.search,
          }"
          style="transition: all 0.6s ease-out 0.2s"
        >
          <EnhancedSearchBar
            v-model="searchQuery"
            :search-history="searchHistory"
            @search="debouncedSearch"
            @suggestion-click="handleSuggestionClick"
            placeholder="Buscar tópicos, categorias, tags..."
            class="w-full shadow-xl"
          />

          <!-- Search suggestions -->
          <div class="flex flex-wrap justify-center gap-3 mt-5">
            <span class="text-sm font-medium text-white/80">Populares:</span>
            <button
              v-for="suggestion in ['Eucaristia', 'Maria', 'Bíblia', 'Papado']"
              :key="suggestion"
              @click="handleSuggestionClick(suggestion)"
              class="px-4 py-1.5 text-sm transition-all duration-300 rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- Quick Stats - Layout mais moderno -->
        <div
          class="grid max-w-4xl grid-cols-1 gap-6 pt-8 mx-auto sm:grid-cols-2 lg:grid-cols-4"
          :class="{
            'opacity-100 translate-y-0': animatedElements.stats,
            'opacity-0 translate-y-4': !animatedElements.stats,
          }"
          style="transition: all 0.6s ease-out 0.4s"
          aria-label="Estatísticas rápidas"
        >
          <div
            v-for="fact in quickFacts"
            :key="fact.title"
            class="relative flex items-center p-5 space-x-4 transition-all duration-300 border bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:bg-white/10 hover:shadow-lg hover:border-white/20 hover:transform hover:scale-102 hover:-translate-y-1 group"
          >
            <div
              class="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg"
              :class="fact.color"
            >
              <component
                :is="fact.icon"
                class="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </div>
            <div class="flex flex-col">
              <div class="text-2xl font-bold text-white">{{ fact.value }}</div>
              <div class="text-sm font-medium text-white/70">
                {{ fact.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subtle scroll indicator -->
      <div
        class="absolute transition-opacity duration-500 -translate-x-1/2 bottom-8 left-1/2 text-white/90 animate-bounce"
        :class="{ 'opacity-0': userScrolled }"
        aria-hidden="true"
      >
        <ArrowDownIcon class="w-6 h-6" />
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

    <!-- Main Content -->
    <main
      class="container relative z-10 px-4 py-16 mx-auto bg-white dark:bg-gray-900"
    >
      <!-- Mission Statement -->
      <section class="mb-24" aria-labelledby="mission-heading">
        <h2 id="mission-heading" class="sr-only">Nossa Missão</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <MissionCard
            v-for="(mission, index) in missionStatements"
            :key="index"
            :title="mission.title"
            :description="mission.description"
            :icon="mission.icon"
            :color="mission.color"
          />
        </div>
      </section>

      <!-- Featured Categories -->
      <section class="mb-24" aria-labelledby="featured-categories-heading">
        <SectionHeader
          id="featured-categories-heading"
          title="Categorias em Destaque"
          :icon="SparklesIcon"
          viewAllLink="/explorar"
        />

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeaturedCategoryCard
            v-for="(category, index) in featuredCategories"
            :key="category.id"
            :category="category"
            :index="index"
            @click="handleCategoryClick(category.id)"
            @toggle-bookmark="toggleBookmark"
            class="transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg"
          />
        </div>
      </section>

      <!-- Recent Topics -->
      <section class="mb-24" aria-labelledby="recent-topics-heading">
        <SectionHeader
          id="recent-topics-heading"
          title="Últimos Artigos"
          :icon="DocumentTextIcon"
          viewAllLink="/topicos"
        />

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TopicCard
            v-for="topic in recentTopics"
            :key="topic.id"
            :topic="{
              ...topic,
              category: topic.categoryTitle,
              subcategory: topic.subcategoryTitle,
            }"
            :show-bookmark="true"
            :show-category-path="true"
            @toggle-bookmark="toggleBookmark"
            class="transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg"
          />
        </div>
      </section>

      <!-- Como Explorar - Navigation Guide -->
      <section class="mb-24" aria-labelledby="navigation-guide-heading">
        <div class="container px-6 mx-auto">
          <SectionHeader
            id="navigation-guide-heading"
            title="Como Explorar"
            :icon="LightBulbIcon"
            class="mb-8"
          />

          <div
            class="grid grid-cols-1 gap-8 md:grid-cols-3"
            :class="{
              'opacity-100 translate-y-0': animatedElements.navigationGuide,
              'opacity-0 translate-y-8': !animatedElements.navigationGuide,
            }"
            style="transition: all 0.6s ease-out"
          >
            <router-link
              v-for="(step, index) in navigationSteps"
              :key="index"
              :to="getStepLink(step.title)"
              class="flex flex-col h-full p-6 transition-all duration-300 bg-white border shadow-sm rounded-xl border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:shadow-md hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 group"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="flex items-center justify-center w-12 h-12 transition-colors duration-300 rounded-full group-hover:scale-110"
                  :class="step.color"
                >
                  <component
                    :is="step.icon"
                    class="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  class="text-xl font-semibold transition-colors duration-300 text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                >
                  {{ step.title }}
                </h3>
              </div>
              <p class="mb-4 text-slate-600 dark:text-slate-300">
                {{ step.description }}
              </p>
              <div
                class="flex items-center mt-auto text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300"
              >
                <span class="font-medium">Explorar</span>
                <ArrowRightIcon
                  class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                />
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Popular Tags -->
      <section class="mb-24" aria-labelledby="popular-tags-heading">
        <SectionHeader
          id="popular-tags-heading"
          title="Tags Populares"
          :icon="TagIcon"
          viewAllLink="/tags"
        />

        <TagList :tags="popularTags" @tag-click="handleTagClick" />
      </section>

      <!-- Call to Action -->
      <section
        class="relative mb-12 overflow-hidden shadow-xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 rounded-2xl"
        aria-labelledby="cta-heading"
      >
        <!-- Background elements -->
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-15"></div>

        <!-- Decorative elements -->
        <div
          class="absolute top-0 right-0 w-64 h-64 rounded-full translate-x-1/4 -translate-y-1/4 bg-primary-400 opacity-20 blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 rounded-full -translate-x-1/4 translate-y-1/4 bg-primary-700 opacity-20 blur-3xl"
        ></div>

        <div class="relative z-10 p-8 py-12 text-center md:py-20 md:px-16">
          <!-- Ícone com animação sutil -->
          <div
            class="inline-flex items-center justify-center w-20 h-20 mb-8 transition-transform duration-700 rounded-full shadow-lg animate-pulse-slow bg-white/20 backdrop-blur-sm"
          >
            <QuestionMarkCircleIcon
              class="w-10 h-10 text-white"
              aria-hidden="true"
            />
          </div>

          <!-- Título com efeito de destaque -->
          <h2
            id="cta-heading"
            class="relative mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            <span class="relative z-10">Tem dúvidas sobre a fé católica?</span>
            <span
              class="absolute inset-x-0 bottom-0 h-3 mt-2 -z-10 bg-primary-400/30"
            ></span>
          </h2>

          <p class="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-white">
            Explore nossos artigos para aprofundar seu conhecimento da fé e
            encontrar respostas fundamentadas para as principais questões.
          </p>

          <!-- Botões com melhor contraste e efeitos -->
          <div
            class="flex flex-col items-center justify-center gap-5 mt-8 md:flex-row"
          >
            <router-link
              to="/explorar"
              class="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-medium text-white transition-all duration-300 border-2 border-white group rounded-xl md:w-auto bg-primary-800 hover:bg-primary-900 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Começar a explorar
              <ArrowRightIcon
                class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </router-link>
            <router-link
              to="/sobre"
              class="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-medium text-white transition-all duration-300 border-2 rounded-xl md:w-auto border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Sobre o projeto
              <InformationCircleIcon class="w-5 h-5 ml-2" aria-hidden="true" />
            </router-link>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Adiciona transições suaves para interações */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Melhora a acessibilidade do foco */
:focus-visible {
  outline: 2px solid theme("colors.primary.500");
  outline-offset: 2px;
}

/* Adiciona efeito de hover mais suave */
.hover\:shadow-md:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Melhora a legibilidade do texto */
.prose {
  max-width: 65ch;
}

/* Adiciona suporte para modo escuro */
.dark .prose {
  color: theme("colors.slate.300");
}

/* Melhora o contraste para acessibilidade */
.text-primary-100 {
  color: rgba(255, 255, 255, 0.95);
}

/* Animação de bounce para o ícone de scroll */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%) translateX(-50%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0) translateX(-50%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
