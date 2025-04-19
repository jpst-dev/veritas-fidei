<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { tags, taggedItems } from "@/data/tags";
import { categories } from "@/data/categories";
import TagList from "@/components/TagList.vue";
import { getIconComponent } from "@/utils/IconMapping";
import TopicCard from "@/components/TopicCard.vue";
import {
  ArrowLeftIcon,
  HomeIcon,
  ChevronRightIcon,
  TagIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

interface TaggedContent {
  type: "category" | "subcategory";
  category: any;
  item: any;
}

const route = useRoute();
const tagId = computed(() => route.params.tagId as string);

const currentTag = computed(() => {
  return tags.find((tag) => tag.id === tagId.value);
});

const taggedContent = computed<TaggedContent[]>(() => {
  if (!currentTag.value) return [];

  return taggedItems
    .filter((item) => item.tags.includes(tagId.value))
    .map((item) => {
      const category = categories.find((cat) => cat.id === item.categoryId);
      if (!category) return null;

      if (item.subcategoryId) {
        const subcategory = category.subcategories.find(
          (sub) => sub.id === item.subcategoryId
        );
        if (!subcategory) return null;

        return {
          type: "subcategory",
          category,
          item: subcategory,
        } as TaggedContent;
      }

      return {
        type: "category",
        category,
        item: category,
      } as TaggedContent;
    })
    .filter((item): item is TaggedContent => item !== null);
});

// Compute popular categories that have tags
const popularCategories = computed(() => {
  const categoryMap = new Map();

  // Count the occurrences of each category in taggedItems
  taggedItems.forEach((item) => {
    if (!categoryMap.has(item.categoryId)) {
      const category = categories.find((cat) => cat.id === item.categoryId);
      if (category) {
        categoryMap.set(item.categoryId, {
          ...category,
          count: 1,
        });
      }
    } else {
      const existing = categoryMap.get(item.categoryId);
      categoryMap.set(item.categoryId, {
        ...existing,
        count: existing.count + 1,
      });
    }
  });

  // Convert to array and sort by count
  return Array.from(categoryMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 4); // Take top 4 categories
});

// Add router functionality
const router = useRouter();

const navigateToCategory = (categoryId: string, subcategoryId?: string) => {
  if (subcategoryId) {
    router.push({
      name: "subcategory",
      params: { categoryId, subcategoryId },
    });
  } else {
    router.push({
      name: "category",
      params: { categoryId },
    });
  }
};

// Tag search functionality
const searchQuery = ref("");

const filteredTags = computed(() => {
  if (!searchQuery.value.trim()) return tags;

  const query = searchQuery.value.toLowerCase();
  return tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(query) ||
      tag.description.toLowerCase().includes(query)
  );
});

// Watch for route changes
watch(
  () => route.params.tagId,
  () => {
    // Force component to update when the route changes but the component instance is reused
    if (route.name === "tag") {
      // You can add any additional logic here to refresh data if needed
      window.scrollTo(0, 0); // Scroll to top when changing tags
    }
  }
);
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900"
    :key="`${String($route.name)}-${tagId}`"
  >
    <!-- When a specific tag is found -->
    <div v-if="tagId && currentTag">
      <!-- Hero Header with Gradient Background -->
      <header
        class="relative py-12 text-white bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500"
      >
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div class="container relative px-4 mx-auto">
          <!-- Breadcrumb Navigation -->
          <nav class="flex items-center mb-6 text-sm text-primary-100">
            <router-link to="/" class="flex items-center hover:text-white">
              <HomeIcon class="w-4 h-4 mr-1" />
              Início
            </router-link>
            <ChevronRightIcon class="w-4 h-4 mx-2" />
            <router-link to="/tags" class="hover:text-white">
              Tags
            </router-link>
            <ChevronRightIcon class="w-4 h-4 mx-2" />
            <span class="font-medium text-white">
              {{ currentTag.name }}
            </span>
          </nav>

          <!-- Tag Header -->
          <div class="flex flex-col items-center mb-6 text-center">
            <div class="p-4 mb-4 rounded-xl bg-white/15 backdrop-blur-sm">
              <component
                :is="getIconComponent(currentTag.icon)"
                class="w-12 h-12 text-white"
              />
            </div>
            <h1 class="text-3xl font-bold md:text-4xl">
              {{ currentTag.name }}
            </h1>
            <p class="mt-2 text-lg text-primary-100">
              {{ currentTag.description }}
            </p>
          </div>

          <!-- Back Button in absolute position for larger screens -->
          <router-link
            to="/tags"
            class="absolute items-center hidden px-4 py-2 text-sm font-medium text-white transition-all duration-200 rounded-lg shadow-md right-4 top-6 md:inline-flex bg-primary-800/70 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar
          </router-link>

          <!-- Tagged Content Stats -->
          <div class="grid grid-cols-1 gap-3 mt-8 sm:grid-cols-3">
            <div
              class="p-3 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div class="flex items-start">
                <div class="p-2 mr-3 rounded-md bg-primary-400/20">
                  <DocumentTextIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold">
                    {{ taggedContent.length }}
                  </h3>
                  <p class="text-xs text-primary-100">Itens relacionados</p>
                </div>
              </div>
            </div>

            <div
              class="p-3 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div class="flex items-start">
                <div class="p-2 mr-3 rounded-md bg-primary-400/20">
                  <TagIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold">{{ tags.length }}</h3>
                  <p class="text-xs text-primary-100">Tags totais</p>
                </div>
              </div>
            </div>

            <div
              class="p-3 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div class="flex items-start">
                <div class="p-2 mr-3 rounded-md bg-primary-400/20">
                  <BookOpenIcon class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold">
                    {{ popularCategories.length }}
                  </h3>
                  <p class="text-xs text-primary-100">Categorias populares</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Back Button -->
          <router-link
            to="/tags"
            class="flex items-center justify-center w-full px-4 py-3 mt-6 text-sm font-medium text-white transition-all duration-200 rounded-lg bg-primary-800/70 md:hidden hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          >
            <ArrowLeftIcon class="w-4 h-4 mr-2" />
            Voltar para todas as tags
          </router-link>
        </div>
      </header>

      <div class="container px-4 py-8 mx-auto">
        <!-- Lista de Tags -->
        <div class="mb-12">
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Todas as Tags
          </h2>
          <TagList />
        </div>

        <!-- Conteúdo Relacionado -->
        <div class="mb-16">
          <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Conteúdo Relacionado
          </h2>

          <div
            v-if="taggedContent.length > 0"
            class="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div
              v-for="content in taggedContent"
              :key="content.item.id"
              class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 group hover:shadow-lg hover:-translate-y-1"
              @click="
                navigateToCategory(
                  content.category.id,
                  content.type === 'subcategory' ? content.item.id : undefined
                )
              "
            >
              <div class="p-6">
                <div class="flex items-center mb-4">
                  <div
                    class="p-2 mr-3 rounded-lg bg-primary-50 dark:bg-primary-900/30"
                  >
                    <component
                      :is="getIconComponent(content.item.icon)"
                      class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <h3
                    class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                  >
                    {{ content.item.title }}
                  </h3>
                </div>

                <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {{ content.item.description }}
                </p>

                <div
                  v-if="content.type === 'subcategory'"
                  class="flex items-center pt-3 mt-auto text-sm font-medium border-t border-gray-100 text-primary-600 dark:border-gray-700 dark:text-primary-400"
                >
                  Em
                  <span class="mx-1 font-semibold">{{
                    content.category.title
                  }}</span>
                  <ArrowRightIcon
                    class="w-4 h-4 transition-transform group-hover:translate-x-1"
                  />
                </div>
                <div
                  v-else
                  class="pt-3 mt-auto border-t border-gray-100 dark:border-gray-700"
                >
                  <div
                    class="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400"
                  >
                    <span>Ver categoria</span>
                    <ArrowRightIcon
                      class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="p-10 text-center bg-white rounded-lg shadow-sm dark:bg-gray-800"
          >
            <div
              class="inline-flex items-center justify-center p-6 mb-6 bg-gray-100 rounded-full dark:bg-gray-700"
            >
              <TagIcon class="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Nenhum conteúdo relacionado
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Nenhum conteúdo relacionado encontrado para esta tag.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- When no tag ID is provided, show all tags -->
    <div v-else-if="!tagId">
      <!-- Hero Header for All Tags -->
      <header
        class="relative py-12 text-white bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500"
      >
        <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div class="container relative px-4 mx-auto text-center">
          <!-- Breadcrumb Navigation -->
          <nav
            class="flex items-center justify-center mb-6 text-sm text-primary-100"
          >
            <router-link to="/" class="flex items-center hover:text-white">
              <HomeIcon class="w-4 h-4 mr-1" />
              Início
            </router-link>
            <ChevronRightIcon class="w-4 h-4 mx-2" />
            <span class="font-medium text-white">Tags</span>
          </nav>

          <div class="flex justify-center mb-4">
            <div class="p-4 rounded-xl bg-white/15 backdrop-blur-sm">
              <TagIcon class="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 class="text-3xl font-bold md:text-4xl">Tags</h1>
          <p class="max-w-2xl mx-auto mt-2 text-lg text-primary-100">
            Explore o conteúdo por tópicos específicos e descubra recursos
            relacionados
          </p>

          <!-- Search bar -->
          <div class="max-w-md mx-auto mt-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Pesquisar tags..."
                class="w-full px-4 py-3 pl-10 text-gray-700 border rounded-lg bg-white/90 border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm dark:bg-gray-700/90 dark:border-gray-600 dark:text-gray-200"
              />
              <div class="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid max-w-md grid-cols-3 gap-3 mx-auto mt-8">
            <div
              class="p-3 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div class="flex flex-col items-center">
                <h3 class="text-2xl font-bold">{{ tags.length }}</h3>
                <p class="text-xs text-primary-100">Tags totais</p>
              </div>
            </div>

            <div
              class="p-3 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div class="flex flex-col items-center">
                <h3 class="text-2xl font-bold">{{ taggedItems.length }}</h3>
                <p class="text-xs text-primary-100">Itens com tags</p>
              </div>
            </div>

            <div
              class="p-3 overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"
            >
              <div class="flex flex-col items-center">
                <h3 class="text-2xl font-bold">
                  {{ popularCategories.length }}
                </h3>
                <p class="text-xs text-primary-100">Categorias</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="container px-4 py-8 mx-auto">
        <!-- All Tags in a grid -->
        <div class="mb-16">
          <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            {{ searchQuery ? "Resultados da Pesquisa" : "Todas as Tags" }}
          </h2>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="tag in filteredTags"
              :key="tag.id"
              @click="
                router.replace({ name: 'tag', params: { tagId: tag.id } })
              "
              class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 group hover:shadow-lg hover:-translate-y-1"
            >
              <div class="p-6">
                <div class="flex flex-col items-center text-center">
                  <div
                    class="p-3 mb-4 rounded-lg bg-primary-50 dark:bg-primary-900/30"
                  >
                    <component
                      :is="getIconComponent(tag.icon)"
                      class="w-8 h-8 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <h3
                    class="mb-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                  >
                    {{ tag.name }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ tag.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- No results message -->
          <div
            v-if="searchQuery && filteredTags.length === 0"
            class="p-10 text-center bg-white rounded-lg shadow-sm dark:bg-gray-800"
          >
            <div
              class="inline-flex items-center justify-center p-6 mb-6 bg-gray-100 rounded-full dark:bg-gray-700"
            >
              <MagnifyingGlassIcon
                class="w-12 h-12 text-gray-400 dark:text-gray-500"
              />
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Nenhuma tag encontrada
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Nenhuma tag corresponde ao seu termo de busca.
            </p>
          </div>
        </div>

        <!-- Popular Categories Section -->
        <div class="mb-16">
          <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Categorias Populares
          </h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              v-for="category in popularCategories"
              :key="category.id"
              @click="navigateToCategory(category.id)"
              class="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 group hover:shadow-lg hover:-translate-y-1"
            >
              <div class="p-6">
                <div class="flex items-start">
                  <div
                    class="p-3 mr-4 rounded-lg bg-primary-50 dark:bg-primary-900/30"
                  >
                    <component
                      :is="getIconComponent(category.icon)"
                      class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <div>
                    <h3
                      class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400"
                    >
                      {{ category.title }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {{ category.description }}
                    </p>
                  </div>
                </div>

                <div
                  class="flex items-center pt-4 mt-4 text-sm font-medium border-t border-gray-100 text-primary-600 dark:border-gray-700 dark:text-primary-400"
                >
                  <span>Explorar categoria</span>
                  <ArrowRightIcon
                    class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- When a tag ID is provided but not found -->
    <div v-else class="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container px-4 mx-auto text-center">
        <div class="max-w-md mx-auto">
          <div
            class="flex items-center justify-center w-24 h-24 p-4 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900/30"
          >
            <TagIcon class="w-12 h-12 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Tag não encontrada
          </h1>
          <p class="mb-8 text-lg text-gray-600 dark:text-gray-300">
            A tag que você está procurando não existe ou foi removida.
          </p>
          <router-link
            to="/tags"
            class="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <ArrowLeftIcon class="w-5 h-5 mr-2" />
            Ver todas as tags
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
