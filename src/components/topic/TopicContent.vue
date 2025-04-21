<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  BookOpenIcon,
  UserIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/24/outline";
import { useReadingProgress } from "@/composables/useReadingProgress";
import type { Topic } from "@/data/categories";

interface Props {
  topic: Topic;
  fontSize: string;
  isReadingMode?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "active-heading-change", heading: string): void;
}>();

const router = useRouter();
const { readingProgress } = useReadingProgress();

const contentRef = ref<HTMLElement | null>(null);
const activeHeading = ref("");
const content = ref<string>("");
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const handleScroll = () => {
  if (!contentRef.value) return;

  const headings = contentRef.value.querySelectorAll("h2, h3, h4");
  const headerOffset = 88; // Altura do header fixo

  for (const heading of headings) {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= headerOffset + 50 && rect.bottom >= headerOffset) {
      activeHeading.value = heading.id;
      emit("active-heading-change", heading.id);
      break;
    }
  }
};

/**
 * Carrega o conteúdo do tópico, seja do campo content ou do arquivo contentPath
 */
async function loadContent() {
  isLoading.value = true;
  error.value = null;

  try {
    // Se existe conteúdo direto no campo content, usamos ele
    if (props.topic.content) {
      content.value = props.topic.content;
      isLoading.value = false;
      return;
    }

    // Se existe contentPath, carregamos do arquivo
    if (props.topic.contentPath) {
      const response = await fetch(
        `/src/data/contents/${props.topic.contentPath}`
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao carregar conteúdo: ${response.status} ${response.statusText}`
        );
      }

      content.value = await response.text();
      isLoading.value = false;
      return;
    }

    // Se não tem nem content nem contentPath
    throw new Error("Tópico não possui conteúdo ou caminho para conteúdo");
  } catch (err) {
    console.error("Erro ao carregar conteúdo:", err);
    error.value =
      err instanceof Error
        ? err.message
        : "Erro desconhecido ao carregar conteúdo";
    isLoading.value = false;
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  loadContent();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Recarregar conteúdo quando o tópico mudar
watch(
  () => props.topic,
  () => {
    loadContent();
  },
  { deep: true }
);
</script>

<template>
  <div class="relative">
    <!-- Barra de progresso -->
    <div
      class="fixed top-0 left-0 right-0 z-50 h-1 bg-primary-500"
      :style="{ width: `${readingProgress}%` }"
    />

    <!-- Conteúdo principal -->
    <article
      ref="contentRef"
      class="prose prose-primary dark:prose-invert max-w-none"
      :class="[
        {
          'prose-sm': fontSize === 'sm',
          'prose-base': fontSize === 'base',
          'prose-lg': fontSize === 'lg',
          'prose-xl': fontSize === 'xl',
          'prose-2xl': fontSize === '2xl',
          'prose-slate': !isReadingMode,
          'prose-gray': isReadingMode,
          'max-w-4xl mx-auto': isReadingMode,
          'leading-relaxed': isReadingMode,
          'tracking-wide': isReadingMode,
        },
      ]"
    >
      <!-- Estado de carregamento -->
      <div v-if="isLoading" class="space-y-4 animate-pulse">
        <div
          class="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
          style="width: 40%"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
          style="width: 100%"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
          style="width: 95%"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
          style="width: 80%"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded-md dark:bg-gray-700"
          style="width: 60%"
        ></div>
      </div>

      <!-- Mensagem de erro -->
      <div
        v-else-if="error"
        class="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400"
      >
        <p>{{ error }}</p>
        <button
          @click="loadContent"
          class="px-4 py-2 mt-4 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
        >
          Tentar novamente
        </button>
      </div>

      <!-- Conteúdo do tópico -->
      <div v-else v-html="content" />

      <!-- Referências -->
      <section v-if="topic.references?.length" class="mt-16">
        <div class="flex items-center gap-3 mb-8">
          <div
            class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 mt-[60px] mb-[24px]"
          >
            <BookOpenIcon
              class="w-6 h-6 text-primary-600 dark:text-primary-400"
            />
          </div>
          <h2
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Referências
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div
            v-for="(ref, index) in topic.references"
            :key="index"
            class="relative p-6 transition-all duration-200 group rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div class="grid grid-cols-[auto_1fr_auto] gap-4">
              <div
                class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30"
              >
                <span
                  class="text-sm font-medium text-primary-600 dark:text-primary-400"
                >
                  {{ index + 1 }}
                </span>
              </div>
              <div class="min-w-0">
                <a
                  :href="ref.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-lg font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
                >
                  {{ ref.title }}
                </a>
                <div v-if="ref.author" class="flex items-center gap-2 mt-2">
                  <UserIcon class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ ref.author }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-3">
                  <LinkIcon class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span
                    class="text-sm text-gray-500 truncate dark:text-gray-500"
                  >
                    {{ ref.link }}
                  </span>
                </div>
              </div>
              <div class="flex items-center">
                <ArrowTopRightOnSquareIcon
                  class="w-5 h-5 text-gray-400 transition-colors dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.prose {
  @apply max-w-4xl mx-auto;
}

.prose :deep(h1) {
  @apply text-4xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white;
}

.prose :deep(h2) {
  @apply text-3xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white;
}

.prose :deep(h3) {
  @apply text-2xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white;
}

.prose :deep(h4) {
  @apply text-xl font-semibold tracking-tight mb-3 text-gray-900 dark:text-white;
}

.prose :deep(p) {
  @apply mb-6 leading-relaxed text-gray-700 dark:text-gray-300;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-6 pl-6 space-y-2;
}

.prose :deep(li) {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed;
}

.prose :deep(a) {
  @apply text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline;
}

.prose :deep(blockquote) {
  @apply pl-6 border-l-4 border-primary-500 dark:border-primary-400 italic text-gray-700 dark:text-gray-300 my-6;
}

.prose :deep(code) {
  @apply px-1.5 py-0.5 text-sm rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200;
}

.prose :deep(pre) {
  @apply p-4 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-x-auto my-6;
}

.prose :deep(pre code) {
  @apply bg-transparent p-0;
}

.prose :deep(img) {
  @apply rounded-lg shadow-md my-8;
}

.prose :deep(table) {
  @apply w-full my-6 border-collapse;
}

.prose :deep(th) {
  @apply px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white;
}

.prose :deep(td) {
  @apply px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300;
}

.prose :deep(hr) {
  @apply my-8 border-gray-200 dark:border-gray-700;
}

/* Estilos específicos para o modo de leitura */
.prose.prose-gray :deep(p) {
  @apply text-gray-800 dark:text-gray-200 leading-relaxed tracking-wide;
}

.prose.prose-gray :deep(h1),
.prose.prose-gray :deep(h2),
.prose.prose-gray :deep(h3),
.prose.prose-gray :deep(h4) {
  @apply font-serif tracking-tight;
}

.prose.prose-gray :deep(blockquote) {
  @apply border-l-4 border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-800/50 p-4;
}

.prose.prose-gray :deep(code) {
  @apply bg-gray-200 dark:bg-gray-700;
}

/* Responsividade */
@media (max-width: 640px) {
  .prose :deep(h1) {
    @apply text-3xl;
  }

  .prose :deep(h2) {
    @apply text-2xl;
  }

  .prose :deep(h3) {
    @apply text-xl;
  }

  .prose :deep(h4) {
    @apply text-lg;
  }
}
</style>
