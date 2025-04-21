import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Executando script de extração de conteúdo...");
try {
  execSync("node src/scripts/extract-content.js", { stdio: "inherit" });
  console.log("\nScript executado com sucesso!");
} catch (error) {
  console.error("Erro ao executar o script:", error.message);
  process.exit(1);
}

// Verificar se os arquivos foram criados
const contentsDir = path.join(__dirname, "../data/contents");
if (fs.existsSync(contentsDir)) {
  const files = fs.readdirSync(contentsDir);
  console.log(
    `\nForam criados ${files.length} arquivos de conteúdo na pasta src/data/contents/`
  );
} else {
  console.log(
    "\nA pasta de conteúdos não foi criada. Verifique os logs de erro acima."
  );
}
