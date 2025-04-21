/**
 * Utilitário para importar um arquivo Markdown como string
 * @param path Caminho para o arquivo Markdown
 * @returns Uma Promise que resolve para o conteúdo do arquivo
 */
export async function importMarkdown(path: string): Promise<string> {
  try {
    // Tenta importar primeiro como um módulo raw
    try {
      const content = await import(`${path}?raw`);
      return content.default;
    } catch (e) {
      // Se falhar, tenta buscar com fetch
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(
          `Erro ao carregar ${path}: ${response.status} ${response.statusText}`
        );
      }
      return await response.text();
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

  return `/src/data/contents/${filename}`;
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
