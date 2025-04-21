<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookmarks } from "@/composables/useBookmarks";
import { useReadingProgress } from "@/composables/useReadingProgress";
import { categories } from "@/data/categories";
import type { Topic } from "@/data/categories";
import TopicHeader from "@/components/topic/TopicHeader.vue";
import TopicContentLoader from "@/components/topic/TopicContentLoader.vue";
import TopicSidebar from "@/components/topic/TopicSidebar.vue";
import TopicNavigation from "@/components/topic/TopicNavigation.vue";

interface ExtendedTopic extends Topic {
  categoryId: string;
  subcategoryId: string;
  categoryTitle: string;
  subcategoryTitle: string;
}

const route = useRoute();
const router = useRouter();
const { bookmarks, toggleBookmark } = useBookmarks();
const { readingProgress, updateProgress } = useReadingProgress();

// UI State
const fontSize = ref("base");
const isReadingMode = ref(false);
const activeHeading = ref("");
const isFocusMode = ref(false);
const contentLoaderRef = ref(null);
const sidebarRef = ref<InstanceType<typeof TopicSidebar> | null>(null);

// Computed
const currentTopic = computed<ExtendedTopic | null>(() => {
  const categoryId = route.params.categoryId as string;
  const subcategoryId = route.params.subcategoryId as string;
  const topicId = route.params.topicId as string;

  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;

  const subcategory = category.subcategories.find(
    (s) => s.id === subcategoryId
  );
  if (!subcategory) return null;

  const topic = subcategory.topics.find((t) => t.id === Number(topicId));
  if (!topic) return null;

  return {
    ...topic,
    categoryId,
    subcategoryId,
    categoryTitle: category.title,
    subcategoryTitle: subcategory.title,
  };
});

const relatedTopics = computed(() => {
  if (!currentTopic.value) return [];
  const categoryId = currentTopic.value.categoryId;
  const subcategoryId = currentTopic.value.subcategoryId;

  const category = categories.find((c) => c.id === categoryId);
  if (!category) return [];

  const subcategory = category.subcategories.find(
    (s) => s.id === subcategoryId
  );
  if (!subcategory) return [];

  return subcategory.topics
    .filter((topic) => topic.id !== currentTopic.value?.id)
    .map((topic) => ({
      ...topic,
      categoryId,
      subcategoryId,
      categoryTitle: category.title,
      subcategoryTitle: subcategory.title,
    }));
});

const isBookmarked = computed(() => {
  if (!currentTopic.value) return false;
  return bookmarks.value.includes(currentTopic.value.id.toString());
});

const previousTopic = computed(() => {
  if (!currentTopic.value) return null;
  const currentIndex = relatedTopics.value.findIndex(
    (t) => t.id === currentTopic.value?.id
  );
  return currentIndex > 0 ? relatedTopics.value[currentIndex - 1] : null;
});

const nextTopic = computed(() => {
  if (!currentTopic.value) return null;
  const currentIndex = relatedTopics.value.findIndex(
    (t) => t.id === currentTopic.value?.id
  );
  return currentIndex < relatedTopics.value.length - 1
    ? relatedTopics.value[currentIndex + 1]
    : null;
});

// Methods
const handleBookmark = () => {
  if (!currentTopic.value) return;
  toggleBookmark(currentTopic.value.id.toString());
};

const handleShare = () => {
  if (!currentTopic.value) return;
  navigator.share({
    title: currentTopic.value.title,
    text: currentTopic.value.description,
    url: window.location.href,
  });
};

const handleFocusModeToggle = () => {
  isFocusMode.value = !isFocusMode.value;
};

const handleActiveHeadingChange = (heading: string) => {
  activeHeading.value = heading;
};

const handleHeadingsExtracted = (headings: any[]) => {
  if (sidebarRef.value) {
    sidebarRef.value.updateHeadings(headings);
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", updateProgress);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Reading Progress Bar -->
    <div
      class="fixed top-0 left-0 z-50 h-1 transition-all duration-300 bg-primary-600 dark:bg-primary-500"
      :style="{ width: `${readingProgress}%` }"
    />

    <div v-if="currentTopic" class="flex flex-col">
      <!-- Header Section - Full Width -->
      <div class="w-full">
        <TopicHeader
          :topic="currentTopic"
          :is-bookmarked="isBookmarked"
          :font-size="fontSize"
          :is-focus-mode="isFocusMode"
          :is-reading-mode="isReadingMode"
          @bookmark="handleBookmark"
          @share="handleShare"
          @focus-mode-toggle="handleFocusModeToggle"
        />
      </div>

      <!-- Main Content and Sidebar -->
      <div
        class="container flex flex-col gap-8 px-4 py-8 mx-auto border-t border-gray-100 dark:border-gray-800 lg:flex-row"
      >
        <!-- Main Content -->
        <div class="flex-1" :class="{ 'lg:max-w-4xl lg:mx-auto': isFocusMode }">
          <!-- Content Section -->
          <div class="pt-8">
            <TopicContentLoader
              ref="contentLoaderRef"
              :topic="currentTopic"
              :font-size="fontSize"
              @active-heading-change="handleActiveHeadingChange"
              @headings-extracted="handleHeadingsExtracted"
            />

            <TopicNavigation
              :previous-topic="previousTopic"
              :next-topic="nextTopic"
              class="mt-12"
            />
          </div>
        </div>

        <!-- Sidebar -->
        <div v-if="!isFocusMode" class="flex-shrink-0 lg:w-80">
          <TopicSidebar
            ref="sidebarRef"
            :topic="currentTopic"
            :related-topics="relatedTopics"
            :active-heading="activeHeading"
          />
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="container px-4 py-12 mx-auto text-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Tópico não encontrado
      </h1>
      <p class="mt-4 text-gray-600 dark:text-gray-400">
        O tópico que você está procurando não existe ou foi removido.
      </p>
      <button
        @click="router.push('/')"
        class="px-4 py-2 mt-6 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
      >
        Voltar para a página inicial
      </button>
    </div>
  </div>
</template>
