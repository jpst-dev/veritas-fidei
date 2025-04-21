#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const slugify = require("slugify");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((res) => rl.question(q, res));

const askMultiple = async (label) => {
  const items = [];
  let more = true;
  while (more) {
    const input = await ask(label);
    if (!input || input.toLowerCase() === "n") {
      more = false;
    } else {
      items.push(input);
    }
  }
  return items;
};

(async () => {
  const title = await ask("Título do tópico: ");
  const description = await ask("Descrição curta: ");
  const categorySlug = slugify(await ask("Categoria (slug/id): "), {
    lower: true,
    strict: true,
  });
  const subcategoryId = slugify(await ask("Subcategoria (id): "), {
    lower: true,
    strict: true,
  });
  const subcategoryTitle = await ask(
    "Título da subcategoria (caso precise criar): "
  );
  const subcategoryDescription = await ask("Descrição da subcategoria: ");
  const readingTime = await ask("Tempo de leitura (minutos): ");
  const difficulty = await ask(
    "Dificuldade (Iniciante, Intermediário, Avançado): "
  );

  const tagsInput = await ask("Tags (separadas por vírgula): ");
  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const references = [];
  const addRefs = await ask("Deseja adicionar referências? (s/n): ");
  if (addRefs.toLowerCase() === "s") {
    let more = true;
    while (more) {
      const title = await ask("  • Título da referência: ");
      const author = await ask("  • Autor: ");
      const link = await ask("  • Link: ");
      references.push({ title, author, link });
      const next = await ask("  Adicionar outra? (s/n): ");
      if (next.toLowerCase() !== "s") more = false;
    }
  }

  const slug = slugify(title, { lower: true, strict: true });
  const today = new Date().toISOString().split("T")[0];
  const mdPath = path.resolve(`src/data/contents/${slug}.md`);
  const categoryPath = path.resolve(`src/data/categories/${categorySlug}.ts`);
  const templatePath = path.resolve("src/data/template-topico-apologetica.md");

  if (!fs.existsSync(mdPath)) {
    const mdContent = fs.existsSync(templatePath)
      ? fs.readFileSync(templatePath, "utf-8")
      : `## Introdução\n\n${title}...`;
    fs.writeFileSync(mdPath, mdContent);
    console.log(`✅ Arquivo Markdown criado: src/data/contents/${slug}.md`);
  }

  if (!fs.existsSync(categoryPath)) {
    console.error(`❌ Categoria '${categorySlug}' não encontrada.`);
    process.exit(1);
  }

  let fileContent = fs.readFileSync(categoryPath, "utf-8");
  let id = 1;

  const subcatTopicsRegex = new RegExp(
    "id:\\s*['\"]" +
      subcategoryId +
      "['\"][\\s\\S]*?topics\\s*:\\s*\\[([\\s\\S]*?)\\]"
  );

  const match = fileContent.match(subcatTopicsRegex);
  if (match) {
    const existing = match[1];
    const existingIds = Array.from(existing.matchAll(/id:\s*(\d+)/g)).map((m) =>
      parseInt(m[1])
    );
    if (existingIds.length) id = Math.max(...existingIds) + 1;
  }

  const topicBlock = `{
      id: ${id},
      title: "${title}",
      description: "${description}",
      contentPath: "${slug}.md",
      references: ${JSON.stringify(references, null, 2)},
      tags: ${JSON.stringify(tags)},
      stats: {
        readingTime: "${readingTime}",
        difficulty: "${difficulty}",
        lastUpdated: "${today}",
        progress: 0
      }
    }`;

  if (fileContent.includes(`id: "${subcategoryId}"`)) {
    const topicMatch = fileContent.match(subcatTopicsRegex);

    if (topicMatch && topicMatch[0]) {
      const oldBlock = topicMatch[0];

      const updatedBlock = oldBlock.replace(
        /topics\s*:\s*\[(\s*[\s\S]*?)\s*\]/,
        (match, p1) => {
          const hasExisting = p1.trim().length > 0;
          const newContent = hasExisting
            ? p1.trim() + ",\n    " + topicBlock
            : "    " + topicBlock;
          return "topics: [\n" + newContent + "\n  ]";
        }
      );

      fileContent = fileContent.replace(oldBlock, updatedBlock);
      fs.writeFileSync(categoryPath, fileContent);
      console.log(
        `✅ Tópico inserido corretamente na subcategoria '${subcategoryId}'`
      );
    } else {
      console.log(
        `⚠️ Subcategoria '${subcategoryId}' encontrada, mas não localizou array de tópicos.`
      );
    }
  } else {
    const newSub = `{
    id: "${subcategoryId}",
    title: "${subcategoryTitle}",
    description: "${subcategoryDescription}",
    icon: "BookOpenIcon",
    topics: [
      ${topicBlock}
    ],
    stats: {
      totalTopics: 1,
      readingTime: "${readingTime} min",
      difficulty: "${difficulty}",
      lastUpdated: "${today}"
    }
  }`;
    fileContent = fileContent.replace(
      /subcategories:\s*\[/,
      `subcategories: [\n  ${newSub},`
    );
    fs.writeFileSync(categoryPath, fileContent);
    console.log(`✅ Subcategoria '${subcategoryId}' criada com tópico.`);
  }

  rl.close();
})();
