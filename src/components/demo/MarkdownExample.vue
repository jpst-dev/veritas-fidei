<script setup lang="ts">
import { ref, onMounted } from "vue";
import MarkdownRenderer from "@/components/common/MarkdownRenderer.vue";
import { importMarkdown, getMarkdownPath } from "@/utils/markdownUtils";

// Estados
const markdownContent = ref<string>("");
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);
const selectedFile = ref<string>("intercessao-dos-santos.md");

// Lista de arquivos disponíveis
const availableFiles = [
  { id: "intercessao-dos-santos.md", title: "Intercessão dos Santos" },
  { id: "sola-scriptura.md", title: "Sola Scriptura" },
  { id: "o-problema-do-mal.md", title: "O Problema do Mal" },
  {
    id: "as-cinco-vias-de-sao-tomas-de-aquino.md",
    title: "As Cinco Vias de São Tomás de Aquino",
  },
];

// Carregar o conteúdo Markdown
async function loadMarkdownFile(filename: string) {
  isLoading.value = true;
  error.value = null;

  try {
    markdownContent.value = await importMarkdown(getMarkdownPath(filename));
  } catch (err) {
    console.error(`Erro ao carregar arquivo ${filename}:`, err);
    error.value =
      err instanceof Error
        ? err.message
        : "Erro desconhecido ao carregar arquivo";
  } finally {
    isLoading.value = false;
  }
}

// Manipular a seleção de arquivo
function handleFileChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  selectedFile.value = target.value;
  loadMarkdownFile(selectedFile.value);
}

// Iniciar carregando o primeiro arquivo
onMounted(() => {
  loadMarkdownFile(selectedFile.value);
});

// Manipular extração de títulos (apenas para demonstração)
function handleHeadingsExtracted(headings: any[]) {
  console.log("Títulos extraídos:", headings);
}
</script>

<template>
  <div class="p-6 bg-white shadow-md dark:bg-gray-900 rounded-xl">
    <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
      Exemplo de Renderização Markdown
    </h2>

    <!-- Seletor de arquivo -->
    <div class="mb-6">
      <label
        for="file-select"
        class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Selecione um arquivo Markdown:
      </label>
      <select
        id="file-select"
        v-model="selectedFile"
        @change="handleFileChange"
        class="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      >
        <option v-for="file in availableFiles" :key="file.id" :value="file.id">
          {{ file.title }}
        </option>
      </select>
    </div>

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
    </div>

    <!-- Mensagem de erro -->
    <div
      v-else-if="error"
      class="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400"
    >
      <p>{{ error }}</p>
      <button
        @click="loadMarkdownFile(selectedFile)"
        class="px-4 py-2 mt-4 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Renderização do Markdown -->
    <div v-else class="p-6 bg-white rounded-lg dark:bg-gray-800">
      <MarkdownRenderer
        :content="markdownContent"
        font-size="lg"
        @headings-extracted="handleHeadingsExtracted"
      />
    </div>
  </div>
</template>
