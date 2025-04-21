#!/usr/bin/env node

/**
 * Script para criar novo tópico de apologética católica.
 * Gera:
 * - Um arquivo .md com base no template
 * - Um objeto de tópico (para colar no arquivo da subcategoria)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const slugify = require('slugify');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

(async () => {
  const title = await ask("Título do novo tópico: ");
  const description = await ask("Descrição curta do tópico: ");
  const category = await ask("Categoria (ex: doutrina, mariologia...): ");
  const subcategory = await ask("Subcategoria (id): ");
  const readingTime = await ask("Tempo de leitura estimado (em minutos): ");
  const difficulty = await ask("Dificuldade (Iniciante, Intermediário, Avançado): ");
  const date = new Date().toISOString().split('T')[0];

  const slug = slugify(title, { lower: true, strict: true });
  const mdPath = path.resolve(__dirname, `../src/data/contents/${slug}.md`);
  const templatePath = path.resolve(__dirname, '../src/data/template-topico-apologetica.md');

  // Cria arquivo .md
  const template = fs.existsSync(templatePath)
    ? fs.readFileSync(templatePath, 'utf-8')
    : `## Introdução\n\n${title}...`;

  fs.writeFileSync(mdPath, template);
  console.log(`✅ Arquivo .md criado: contents/${slug}.md\n`);

  // Cria objeto tópico
  const topic = {
    id: "???",
    title,
    description,
    contentPath: `${slug}.md`,
    references: [],
    tags: [],
    stats: {
      readingTime,
      difficulty,
      lastUpdated: date,
      progress: 0
    }
  };

  console.log("📦 Bloco de tópico para colar em sua subcategoria:");
  console.log(JSON.stringify(topic, null, 2));

  rl.close();
})();
