import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.join(__dirname, "../src/data/contents");
const targetDir = path.join(__dirname, "../public/assets/contents");

// Criar diretório de destino se não existir
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Ler arquivos do diretório de origem
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error("Erro ao ler diretório de origem:", err);
    return;
  }

  // Filtrar apenas arquivos .md
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  // Copiar cada arquivo
  markdownFiles.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    fs.copyFile(sourcePath, targetPath, (err) => {
      if (err) {
        console.error(`Erro ao copiar ${file}:`, err);
      } else {
        console.log(`Arquivo ${file} copiado com sucesso!`);
      }
    });
  });
});
