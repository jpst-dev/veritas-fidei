// Script para converter arquivos HTML em Markdown
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para converter HTML para Markdown
function htmlToMarkdown(html) {
  // Remove espaços em branco extras e linhas vazias
  let cleanHtml = html.trim();

  // Converte tags de cabeçalho
  cleanHtml = cleanHtml.replace(/<h1>(.*?)<\/h1>/g, "# $1");
  cleanHtml = cleanHtml.replace(/<h2>(.*?)<\/h2>/g, "## $1");
  cleanHtml = cleanHtml.replace(/<h3>(.*?)<\/h3>/g, "### $1");
  cleanHtml = cleanHtml.replace(/<h4>(.*?)<\/h4>/g, "#### $1");
  cleanHtml = cleanHtml.replace(/<h5>(.*?)<\/h5>/g, "##### $1");
  cleanHtml = cleanHtml.replace(/<h6>(.*?)<\/h6>/g, "###### $1");

  // Converte tags de parágrafo
  cleanHtml = cleanHtml.replace(/<p>(.*?)<\/p>/g, "$1\n\n");

  // Converte tags de ênfase
  cleanHtml = cleanHtml.replace(/<strong>(.*?)<\/strong>/g, "**$1**");
  cleanHtml = cleanHtml.replace(/<em>(.*?)<\/em>/g, "*$1*");

  // Converte listas não ordenadas
  cleanHtml = cleanHtml.replace(
    /<ul>([\s\S]*?)<\/ul>/g,
    function (match, content) {
      return content.replace(/<li>([\s\S]*?)<\/li>/g, "- $1\n");
    }
  );

  // Converte listas ordenadas
  cleanHtml = cleanHtml.replace(
    /<ol>([\s\S]*?)<\/ol>/g,
    function (match, content) {
      let index = 1;
      return content.replace(/<li>([\s\S]*?)<\/li>/g, function (match, item) {
        return `${index++}. ${item}\n`;
      });
    }
  );

  // Converte links
  cleanHtml = cleanHtml.replace(/<a href="(.*?)".*?>(.*?)<\/a>/g, "[$2]($1)");

  // Converte quebras de linha especificadas com <br> para nova linha em Markdown
  cleanHtml = cleanHtml.replace(/<br>/g, "\n");
  cleanHtml = cleanHtml.replace(/<br\/>/g, "\n");
  cleanHtml = cleanHtml.replace(/<br \/>/g, "\n");

  // Converte blockquotes
  cleanHtml = cleanHtml.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/g,
    function (match, content) {
      // Adiciona '> ' no início de cada linha do conteúdo
      return (
        content
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n") + "\n\n"
      );
    }
  );

  // Converte imagens
  cleanHtml = cleanHtml.replace(
    /<img src="(.*?)" alt="(.*?)".*?>/g,
    "![$2]($1)"
  );
  cleanHtml = cleanHtml.replace(/<img src="(.*?)".*?>/g, "![]($1)");

  // Converte código
  cleanHtml = cleanHtml.replace(/<code>(.*?)<\/code>/g, "`$1`");
  cleanHtml = cleanHtml.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    "```\n$1\n```"
  );

  // Limpa tags de formatação HTML que possam ter sobrado
  cleanHtml = cleanHtml.replace(/<\/?[^>]+(>|$)/g, "");

  // Remove múltiplas linhas vazias consecutivas
  cleanHtml = cleanHtml.replace(/\n{3,}/g, "\n\n");

  return cleanHtml;
}

async function isDirectory(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

async function processDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);

      if (await isDirectory(filePath)) {
        // Se for um diretório, processa-o recursivamente
        await processDirectory(filePath);
      } else if (path.extname(file) === ".html") {
        // Se for um arquivo .html, converte-o para .md
        try {
          console.log(`Convertendo HTML para Markdown: ${filePath}`);
          const content = await fs.readFile(filePath, "utf8");
          const markdownContent = htmlToMarkdown(content);

          // Cria o nome do arquivo de saída (substitui .html por .md)
          const outputPath = filePath.replace(/\.html$/, ".md");

          await fs.writeFile(outputPath, markdownContent, "utf8");
          console.log(`Convertido com sucesso: ${outputPath}`);
        } catch (error) {
          console.error(`Erro ao processar arquivo ${filePath}:`, error);
        }
      } else if (path.extname(file) === ".md") {
        // Se for um arquivo .md, verifica se tem tags HTML
        try {
          const content = await fs.readFile(filePath, "utf8");

          // Verifica se o conteúdo parece HTML (contém tags HTML)
          if (
            content.includes("<h") ||
            content.includes("<p>") ||
            content.includes("<div") ||
            content.includes("<ul") ||
            content.includes("<ol")
          ) {
            console.log(`Convertendo conteúdo HTML em arquivo MD: ${filePath}`);
            const markdownContent = htmlToMarkdown(content);
            await fs.writeFile(filePath, markdownContent, "utf8");
            console.log(`Convertido com sucesso: ${filePath}`);
          } else {
            console.log(`Ignorando (já parece ser Markdown): ${filePath}`);
          }
        } catch (error) {
          console.error(`Erro ao processar arquivo ${filePath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Erro ao processar diretório ${directoryPath}:`, error);
  }
}

// Diretório principal com os arquivos de conteúdo
const contentsDir = path.join(__dirname, "..", "src", "data", "contents");

// Verifica se o diretório existe
async function main() {
  try {
    // Verifica se o diretório existe
    await fs.access(contentsDir);
    console.log(`Iniciando conversão no diretório: ${contentsDir}`);

    // Inicia o processamento
    await processDirectory(contentsDir);
    console.log("Conversão concluída com sucesso!");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`O diretório ${contentsDir} não existe!`);
    } else {
      console.error("Erro durante a conversão:", error);
    }
  }
}

main();
