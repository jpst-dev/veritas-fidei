import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { execSync } from "child_process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "copy-markdown",
      closeBundle() {
        try {
          execSync("node scripts/copy-markdown.js");
          console.log("✅ Arquivos Markdown copiados com sucesso!");
        } catch (error) {
          console.error("❌ Erro ao copiar arquivos Markdown:", error);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          heroicons: ["@heroicons/vue"],
          "markdown-core": ["markdown-it"],
          highlight: ["highlight.js"],
        },
      },
    },
  },
  server: {
    // Configuração para servir arquivos Markdown em desenvolvimento
    fs: {
      allow: [".."],
    },
  },
  publicDir: "public",
  assetsInclude: ["**/*.md"],
});
