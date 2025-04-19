import { categories } from "@/data/categories";
import type { Topic } from "@/data/categories";

export function useTopics() {
  const getTopicById = (
    categoryId: string,
    subcategoryId: string,
    topicId: string
  ): Topic | null => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return null;

    const subcategory = category.subcategories.find(
      (s) => s.id === subcategoryId
    );
    if (!subcategory) return null;

    const topic = subcategory.topics.find((t) => t.id === Number(topicId));
    return topic || null;
  };

  return {
    getTopicById,
  };
}
