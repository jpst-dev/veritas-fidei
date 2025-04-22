<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import {
  BookOpenIcon,
  UserIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/vue/24/outline";

interface Props {
  content: string;
  fontSize?: string;
  references?: Array<{
    title: string;
    author?: string;
    link?: string;
  }>;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "headings-extracted", headings: any[]): void;
  (e: "active-heading-change", heading: string): void;
}>();

// Referência para o elemento de conteúdo
const contentRef = ref<HTMLElement | null>(null);

// Configuração do markdown-it com plugins
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ""; // uso do highlighter padrão
  },
});

// Renderiza o markdown em HTML
const renderedContent = computed(() => {
  if (!props.content) return "";
  return md.render(props.content);
});

// Gera um ID único para os headings
const generateHeadingId = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim();
};

// Processa o conteúdo HTML para adicionar IDs aos headings
const processedContent = computed(() => {
  if (!renderedContent.value) return "";

  // Adiciona IDs aos headings para navegação
  return renderedContent.value.replace(
    /<h([1-6])>(.*?)<\/h\1>/g,
    (match, level, content) => {
      const id = generateHeadingId(content);
      return `<h${level} id="${id}">${content}</h${level}>`;
    }
  );
});

// Extrai os headings do conteúdo processado
const extractHeadings = () => {
  if (!contentRef.value) return;

  const headingElements = contentRef.value.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  );

  const headings = Array.from(headingElements).map((heading) => ({
    id: heading.id,
    text: heading.textContent || "",
    level: parseInt(heading.tagName[1]),
  }));

  emit("headings-extracted", headings);
};

// Monitorar o scroll para atualizar o heading ativo
const handleScroll = () => {
  if (!contentRef.value) return;

  const headingElements = contentRef.value.querySelectorAll("h2, h3, h4");
  const headerOffset = 88; // Altura do header fixo

  for (const heading of headingElements) {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= headerOffset + 50 && rect.bottom >= headerOffset) {
      emit("active-heading-change", heading.id);
      break;
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  extractHeadings();
  window.addEventListener("scroll", handleScroll);
});

watch(
  () => props.content,
  () => {
    nextTick(() => {
      extractHeadings();
    });
  }
);

// Limpar eventos ao desmontar
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div>
    <div
      ref="contentRef"
      class="markdown-content"
      v-html="processedContent"
      :class="[
        {
          'prose-sm': fontSize === 'sm',
          'prose-base': fontSize === 'base',
          'prose-lg': fontSize === 'lg' || !fontSize,
          'prose-xl': fontSize === 'xl',
          'prose-2xl': fontSize === '2xl',
        },
      ]"
    ></div>

    <!-- Referências -->
    <section v-if="props.references?.length" class="mt-16">
      <div class="flex items-center gap-3 mb-8">
        <div class="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
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
          v-for="(ref, index) in props.references"
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
                v-if="ref.link"
                :href="ref.link"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-lg font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
              >
                {{ ref.title }}
              </a>
              <span
                v-else
                class="block text-lg font-medium text-gray-800 dark:text-gray-200"
              >
                {{ ref.title }}
              </span>
              <div v-if="ref.author" class="flex items-center gap-2 mt-2">
                <UserIcon class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ ref.author }}
                </span>
              </div>
              <div v-if="ref.link" class="flex items-center gap-2 mt-3">
                <LinkIcon class="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span class="text-sm text-gray-500 truncate dark:text-gray-500">
                  {{ ref.link }}
                </span>
              </div>
            </div>
            <div v-if="ref.link" class="flex items-center">
              <ArrowTopRightOnSquareIcon
                class="w-5 h-5 text-gray-400 transition-colors dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.markdown-content {
  @apply prose max-w-none dark:prose-invert prose-headings:text-primary-900 prose-a:text-primary-600 dark:prose-headings:text-primary-100 dark:prose-a:text-primary-400;
}

.markdown-content :deep(h1) {
  @apply text-3xl font-bold mb-6 text-gray-900 dark:text-white;
}

.markdown-content :deep(h2) {
  @apply text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100;
}

.markdown-content :deep(h3) {
  @apply text-xl font-medium mt-6 mb-3 text-gray-800 dark:text-gray-100;
}

.markdown-content :deep(p) {
  @apply mb-4 text-gray-700 dark:text-gray-300 leading-relaxed;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  @apply mb-4 pl-6;
}

.markdown-content :deep(li) {
  @apply mb-2 text-gray-700 dark:text-gray-300;
}

.markdown-content :deep(blockquote) {
  @apply pl-4 py-1 border-l-4 border-gray-300 dark:border-gray-600 my-4 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg;
}

.markdown-content :deep(a) {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}

.markdown-content :deep(pre) {
  @apply p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto;
}

.markdown-content :deep(code) {
  @apply font-mono text-sm text-gray-800 dark:text-gray-200;
}

.markdown-content :deep(img) {
  @apply rounded-lg max-w-full shadow-md my-6 mx-auto;
}

.markdown-content :deep(table) {
  @apply w-full border-collapse border border-gray-300 dark:border-gray-700 my-6;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  @apply border border-gray-300 dark:border-gray-700 p-2 text-left;
}

.markdown-content :deep(th) {
  @apply bg-gray-100 dark:bg-gray-800;
}

/* Responsividade */
@media (max-width: 640px) {
  .markdown-content :deep(h1) {
    @apply text-2xl;
  }

  .markdown-content :deep(h2) {
    @apply text-xl;
  }

  .markdown-content :deep(h3) {
    @apply text-lg;
  }
}
</style>
