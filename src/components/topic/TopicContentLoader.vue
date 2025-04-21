<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import type { Topic } from "@/data/categories/types";
import MarkdownRenderer from "@/components/common/MarkdownRenderer.vue";
import { importMarkdown, getMarkdownPath } from "@/utils/markdownUtils";

interface Props {
  topic: Topic;
  fontSize?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "active-heading-change", heading: string): void;
  (e: "headings-extracted", headings: any[]): void;
}>();

const content = ref<string>("");
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const activeHeading = ref("");
const headings = ref<any[]>([]);

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

    // Se existe contentPath, carregamos do arquivo usando o utilitário
    if (props.topic.contentPath) {
      try {
        const markdownContent = await importMarkdown(
          getMarkdownPath(props.topic.contentPath)
        );
        content.value = markdownContent;
        isLoading.value = false;
        return;
      } catch (err) {
        throw new Error(
          `Erro ao carregar arquivo Markdown: ${
            err instanceof Error ? err.message : "Erro desconhecido"
          }`
        );
      }
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

// Recebemos os headings extraídos do MarkdownRenderer
const handleHeadingsExtracted = (extractedHeadings: any[]) => {
  headings.value = extractedHeadings;
  emit("headings-extracted", extractedHeadings);
};

// Recebemos a mudança de heading ativo do MarkdownRenderer
const handleActiveHeadingChange = (heading: string) => {
  activeHeading.value = heading;
  emit("active-heading-change", heading);
};

// Carregar conteúdo quando o componente é montado
onMounted(() => {
  loadContent();
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
  <div class="topic-content" ref="contentRef">
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

    <!-- Conteúdo do tópico usando o novo MarkdownRenderer -->
    <MarkdownRenderer
      v-else
      :content="content"
      :font-size="fontSize"
      :references="props.topic.references"
      @headings-extracted="handleHeadingsExtracted"
      @active-heading-change="handleActiveHeadingChange"
    />
  </div>
</template>

<style scoped>
/* Mantemos apenas o estilização básica para o contêiner,
   já que os estilos específicos de markdown agora estão no MarkdownRenderer */
.topic-content {
  @apply w-full;
}
</style>
