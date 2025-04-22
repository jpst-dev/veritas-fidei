import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ajustando os caminhos para serem relativos ao diretório do projeto
const projectRoot = path.join(__dirname, "..");
const sourceDir = path.join(projectRoot, "src/data/contents");
const targetDir = path.join(projectRoot, "dist/assets/contents");

console.log("Diretório de origem:", sourceDir);
console.log("Diretório de destino:", targetDir);

// Função para criar diretório se não existir
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Criando diretório: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Função para copiar arquivos recursivamente
function copyMarkdownFiles(source, target) {
  console.log(`\nProcessando diretório: ${source}`);

  // Criar diretório de destino se não existir
  ensureDirectoryExists(target);

  // Ler conteúdo do diretório
  const items = fs.readdirSync(source);
  console.log(`Encontrados ${items.length} itens em ${source}`);

  items.forEach((item) => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);

    // Verificar se é um diretório
    if (fs.statSync(sourcePath).isDirectory()) {
      console.log(`\nProcessando subdiretório: ${item}`);
      // Se for diretório, criar no destino e copiar seu conteúdo
      ensureDirectoryExists(targetPath);
      copyMarkdownFiles(sourcePath, targetPath);
    } else if (item.endsWith(".md")) {
      // Se for arquivo .md, copiar
      console.log(`Copiando arquivo: ${item}`);
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ ${item} copiado com sucesso!`);
    }
  });
}

// Executar a cópia
try {
  console.log("\nIniciando cópia de arquivos Markdown...");
  copyMarkdownFiles(sourceDir, targetDir);
  console.log("\n✓ Todos os arquivos Markdown foram copiados com sucesso!");
} catch (error) {
  console.error("\nErro ao copiar arquivos Markdown:", error);
  process.exit(1);
}
