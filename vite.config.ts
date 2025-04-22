import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { execSync } from "child_process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "copy-markdown",
      closeBundle() {
        try {
          execSync("node scripts/copy-markdown.js");
          console.log("Arquivos Markdown copiados com sucesso!");
        } catch (error) {
          console.error("Erro ao copiar arquivos Markdown:", error);
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
    assetsDir: "assets",
    sourcemap: true,
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
    emptyOutDir: true,
  },
  assetsInclude: ["**/*.md"],
  publicDir: "public",
});
