import { ref } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

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
    return "";
  },
});

export const useMarkdown = () => {
  const markdownContent = ref("");

  const getMarkdownPath = (filename: string): string => {
    if (import.meta.env.PROD) {
      return `/assets/contents/${filename}`;
    }
    return `/src/data/contents/${filename}`;
  };

  const importMarkdown = async (filename: string) => {
    try {
      if (import.meta.env.PROD) {
        const response = await fetch(getMarkdownPath(filename));
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const text = await response.text();
        markdownContent.value = md.render(text);
      } else {
        const module = await import(`../data/contents/${filename}`);
        markdownContent.value = md.render(module.default);
      }
    } catch (error) {
      console.error("Error loading markdown:", error);
      markdownContent.value = "Erro ao carregar o conteúdo.";
    }
  };

  return {
    markdownContent,
    importMarkdown,
  };
};

/**
 * Utilitário para importar um arquivo Markdown como string
 * @param path Caminho para o arquivo Markdown
 * @returns Uma Promise que resolve para o conteúdo do arquivo
 */
export async function importMarkdown(path: string): Promise<string> {
  try {
    if (import.meta.env.PROD) {
      // Em produção, buscamos do diretório assets
      const response = await fetch(`/assets/contents/${path}`);
      if (!response.ok) {
        throw new Error(
          `Erro ao carregar ${path}: ${response.status} ${response.statusText}`
        );
      }
      return await response.text();
    } else {
      // Em desenvolvimento, usamos import dinâmico
      const content = await import(`../data/contents/${path}?raw`);
      return content.default;
    }
  } catch (error) {
    console.error(`Erro ao importar arquivo Markdown: ${path}`, error);
    throw error;
  }
}

/**
 * Retorna o caminho absoluto para um arquivo Markdown dentro da pasta de conteúdos
 * @param filename Nome do arquivo Markdown (com extensão .md)
 * @returns Caminho completo para o arquivo
 */
export function getMarkdownPath(filename: string): string {
  // Certifica-se de que o nome do arquivo termine com .md
  if (!filename.endsWith(".md")) {
    filename = `${filename}.md`;
  }

  return filename;
}

/**
 * Exemplo de como usar a importação de Markdown:
 *
 * import { importMarkdown, getMarkdownPath } from '@/utils/markdownUtils';
 *
 * // No componente Vue (método setup ou onMounted):
 * const content = ref('');
 *
 * async function loadMarkdown() {
 *   try {
 *     // Método 1: Usando caminho direto
 *     content.value = await importMarkdown('/src/data/contents/exemplo.md');
 *
 *     // Método 2: Usando a função utilitária
 *     content.value = await importMarkdown(getMarkdownPath('exemplo'));
 *   } catch (error) {
 *     console.error('Erro ao carregar markdown', error);
 *   }
 * }
 */
