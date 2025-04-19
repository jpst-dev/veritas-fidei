<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { getIconComponent } from "@/utils/IconMapping";
import { tags } from "@/data/tags";

const router = useRouter();

// Map color strings from tags.ts to Tailwind classes
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    amber:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    indigo:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    emerald:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  };

  return (
    colorMap[color] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  );
};

// Compute tag counts based on usage in categories
const tagList = computed(() => {
  return tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    description: tag.description,
    icon: tag.icon,
    // In a real scenario, you would calculate this based on actual usage
    count: Math.floor(Math.random() * 20) + 5, // Placeholder for demo
    colorClass: getColorClass(tag.color),
  }));
});

const handleTagClick = (tagId: string) => {
  // Use replace instead of push to ensure the component refreshes
  // when clicking on different tags from a tag page
  router.replace({ name: "tag", params: { tagId } });
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      v-for="tag in tagList"
      :key="tag.id"
      @click="handleTagClick(tag.id)"
      class="flex items-center px-4 py-2 transition-all duration-200 rounded-full hover:scale-105"
      :class="tag.colorClass"
    >
      <component :is="getIconComponent(tag.icon)" class="w-4 h-4 mr-2" />
      <span class="font-medium">{{ tag.name }}</span>
      <span class="ml-2 text-sm opacity-75">({{ tag.count }})</span>
    </button>
  </div>
</template>
