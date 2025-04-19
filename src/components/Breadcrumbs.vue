<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ChevronRightIcon, HomeIcon } from "@heroicons/vue/24/outline";

interface Breadcrumb {
  name: string;
  path: string;
  isLast: boolean;
}

const route = useRoute();

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const paths = route.path.split("/").filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [];

  let currentPath = "";
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    breadcrumbs.push({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: currentPath,
      isLast: index === paths.length - 1,
    });
  });

  return breadcrumbs;
});
</script>

<template>
  <nav class="py-4" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li>
        <router-link
          to="/"
          class="flex items-center text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <HomeIcon class="w-5 h-5" />
        </router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <ChevronRightIcon class="w-4 h-4 text-gray-400" />
          <router-link
            v-if="!crumb.isLast"
            :to="crumb.path"
            class="ml-2 text-sm font-medium text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            {{ crumb.name }}
          </router-link>
          <span
            v-else
            class="ml-2 text-sm font-medium text-primary-600 dark:text-primary-400"
          >
            {{ crumb.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
