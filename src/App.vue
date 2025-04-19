<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";
import { watch } from "vue";

const router = useRouter();

// Scroll para o topo ao mudar de rota
watch(
  () => router.currentRoute.value,
  () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <main class="container px-4 mx-auto">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
