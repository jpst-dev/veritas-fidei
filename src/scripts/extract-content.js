import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para converter string para kebab-case
function toKebabCase(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/--+/g, "-"); // Remove hífens duplicados
}

// Pasta para armazenar os arquivos de conteúdo
const CONTENTS_DIR = path.resolve(__dirname, "../data/contents");

// Garantir que a pasta de conteúdos exista
if (!fs.existsSync(CONTENTS_DIR)) {
  fs.mkdirSync(CONTENTS_DIR, { recursive: true });
  console.log(`Pasta criada: ${CONTENTS_DIR}`);
}

// Caminho para a pasta de categorias
const CATEGORIES_DIR = path.resolve(__dirname, "../data/categories");

// Arquivos de categorias para processar (exclui o arquivo index.ts e types.ts)
const categoryFiles = fs
  .readdirSync(CATEGORIES_DIR)
  .filter(
    (file) => file.endsWith(".ts") && !["index.ts", "types.ts"].includes(file)
  );

console.log(
  `Encontrados ${categoryFiles.length} arquivos de categorias para processar.`
);

// Processar cada arquivo de categoria
categoryFiles.forEach((file) => {
  const filePath = path.join(CATEGORIES_DIR, file);
  const content = fs.readFileSync(filePath, "utf8");

  console.log(`Processando arquivo: ${file}`);

  // Analisar o conteúdo para encontrar objetos de tópicos e extrair o campo content
  let modifiedContent = content;
  let topicsFound = 0;

  // Regex para encontrar tópicos (objetos com campo content)
  const topicRegex = /\{(?:[^{}]|(?:\{[^{}]*\}))*content:\s*`([^`]*)`[^}]*\}/gs;

  // Extrair cada tópico e seu conteúdo
  let match;
  while ((match = topicRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const topicContent = match[1];

    // Extrair o título do tópico
    const titleMatch = /title:\s*["']([^"']*)/g.exec(fullMatch);
    if (!titleMatch) continue;

    const title = titleMatch[1];
    const filename = `${toKebabCase(title)}.md`;

    // Criar arquivo de conteúdo
    const contentFilePath = path.join(CONTENTS_DIR, filename);
    fs.writeFileSync(contentFilePath, topicContent, "utf8");
    console.log(`Criado arquivo: ${filename}`);

    // Substituir o campo content por contentPath no objeto original
    const modifiedTopic = fullMatch.replace(
      /content:\s*`[^`]*`/g,
      `contentPath: "${filename}"`
    );

    modifiedContent = modifiedContent.replace(fullMatch, modifiedTopic);
    topicsFound++;
  }

  // Salvar o arquivo modificado
  fs.writeFileSync(filePath, modifiedContent, "utf8");
  console.log(`${topicsFound} tópicos processados em ${file}`);
});

console.log("Extração de conteúdo concluída com sucesso!");
